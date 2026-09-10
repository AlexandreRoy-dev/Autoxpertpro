"use client";

import { Link } from "@/i18n/navigation";
import { useChat } from "@/lib/chat";
import { answerChat, greeting, type ChatLink, type ChatReply } from "@/lib/chatbot";
import { useStore } from "@/lib/store";
import { getVehicle } from "@/data/vehicles";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: ChatLink[];
};

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale() as "fr" | "en";
  const { open, setOpen, draft, consumeDraft } = useChat();
  const { selectedFitmentId, cartCount, cart, orders } = useStore();
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) ?? null : null;
  const ctx = { locale, vehicle, cartCount, cart, orders };
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const hello = greeting(ctx);
    return [{ id: "hello", role: "assistant", text: hello.text, links: hello.links }];
  });
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || !draft) return;
    const text = consumeDraft();
    if (text) send(text);
    // send uses latest vehicle context from this render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, draft]);

  const pushReply = (reply: ChatReply) => {
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: "assistant", text: reply.text, links: reply.links },
    ]);
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setInput("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);
    setPending(true);
    window.setTimeout(() => {
      pushReply(answerChat(trimmed, ctx));
      setPending(false);
    }, 450);
  };

  const suggestions = [t("s1"), t("s2"), t("s3"), t("s4")];

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section className="pointer-events-auto flex h-[min(560px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-[#111827] text-white shadow-2xl ring-1 ring-white/10">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">{t("title")}</p>
              <p className="text-xs text-white/50">{t("subtitle")}</p>
            </div>
            <button type="button" className="text-white/60" onClick={() => setOpen(false)} aria-label={t("close")}>
              ×
            </button>
          </header>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user" ? "bg-orange text-white" : "bg-white/10"
                  }`}
                >
                  {message.text}
                </div>
                {message.links?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <Link
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/85 hover:bg-white/20"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {pending ? <p className="text-xs text-white/45">{t("thinking")}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-2">
            {suggestions.map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full bg-white/10 px-2.5 py-1 text-left text-xs text-white/75 hover:bg-white/15"
                onClick={() => send(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-white/10 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              className="input flex-1 border-white/15 bg-[#0b1220] text-white"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t("placeholder")}
            />
            <button type="submit" className="btn btn-orange px-3" disabled={!input.trim() || pending}>
              {t("send")}
            </button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label={t("title")}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H9l-4 3.5V6.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </button>
    </div>
  );
}
