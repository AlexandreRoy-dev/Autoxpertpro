"use client";

import { getVehicle } from "@/data/vehicles";
import { answerChat, greeting, type ChatLink, type ChatReply } from "@/lib/chatbot";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useLocale } from "next-intl";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: ChatLink[];
};

type ChatApi = {
  open: boolean;
  setOpen: (open: boolean) => void;
  draft: string | null;
  openChat: (draft?: string) => void;
  consumeDraft: () => string | null;
  messages: ChatMessage[];
  pending: boolean;
  send: (text: string) => Promise<void>;
};

const ChatContext = createContext<ChatApi | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as "fr" | "en";
  const { selectedFitmentId, cartCount, cart, orders } = useStore();
  const vehicle = selectedFitmentId ? (getVehicle(selectedFitmentId) ?? null) : null;
  const ctx = useMemo(
    () => ({ locale, vehicle, cartCount, cart, orders }),
    [locale, vehicle, cartCount, cart, orders],
  );

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const hello = greeting(ctx);
    return [{ id: "hello", role: "assistant", text: hello.text, links: hello.links }];
  });

  const openChat = useCallback((nextDraft?: string) => {
    setDraft(nextDraft ?? null);
    setOpen(true);
  }, []);

  const consumeDraft = useCallback(() => {
    const value = draft;
    setDraft(null);
    return value;
  }, [draft]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;
      const userMessage: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed };
      const history = [...messages, userMessage];
      setMessages(history);
      setPending(true);

      const fallback = () => {
        const reply = answerChat(trimmed, ctx);
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: "assistant", text: reply.text, links: reply.links },
        ]);
      };

      try {
        const res = await fetch(withBase("/api/chat/"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastUser: trimmed,
            locale,
            fitmentId: selectedFitmentId,
            cartCount,
            messages: history.map((message) => ({ role: message.role, content: message.text })),
          }),
        });

        if (!res.ok || res.headers.get("x-chat-mode") === "fallback") {
          const data = (await res.json().catch(() => null)) as ChatReply | null;
          if (data?.text) {
            setMessages((prev) => [
              ...prev,
              { id: `a-${Date.now()}`, role: "assistant", text: data.text, links: data.links },
            ]);
          } else {
            fallback();
          }
          return;
        }

        const assistantId = `a-${Date.now()}`;
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", text: "" }]);
        const reader = res.body?.getReader();
        if (!reader) {
          fallback();
          return;
        }
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const next = acc;
          setMessages((prev) => prev.map((message) => (message.id === assistantId ? { ...message, text: next } : message)));
        }
        if (!acc.trim()) fallback();
      } catch {
        fallback();
      } finally {
        setPending(false);
      }
    },
    [pending, messages, ctx, locale, selectedFitmentId, cartCount],
  );

  const value = useMemo(
    () => ({ open, setOpen, draft, openChat, consumeDraft, messages, pending, send }),
    [open, draft, openChat, consumeDraft, messages, pending, send],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
