"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ChatApi = {
  open: boolean;
  setOpen: (open: boolean) => void;
  draft: string | null;
  openChat: (draft?: string) => void;
  consumeDraft: () => string | null;
};

const ChatContext = createContext<ChatApi | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const openChat = useCallback((nextDraft?: string) => {
    setDraft(nextDraft ?? null);
    setOpen(true);
  }, []);

  const consumeDraft = useCallback(() => {
    const value = draft;
    setDraft(null);
    return value;
  }, [draft]);

  const value = useMemo(
    () => ({ open, setOpen, draft, openChat, consumeDraft }),
    [open, draft, openChat, consumeDraft],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
