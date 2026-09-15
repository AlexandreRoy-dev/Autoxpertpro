"use client";

import { Link } from "@/i18n/navigation";
import { useChat } from "@/lib/chat";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function ChatPanel({
  variant = "dock",
  onClose,
}: {
  variant?: "hero" | "dock";
  onClose?: () => void;
}) {
  const t = useTranslations("chat");
  const { messages, pending, send, consumeDraft, open } = useChat();
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = [t("s1"), t("s2"), t("s3"), t("s4")];

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (variant === "hero" || open) inputRef.current?.focus();
  }, [open, variant]);

  useEffect(() => {
    if (variant === "dock" && !open) return;
    const text = consumeDraft();
    if (text) void send(text);
  }, [open, variant, consumeDraft, send]);

  return (
    <section
      className={`chat-panel flex flex-col overflow-hidden text-white ${
        variant === "hero"
          ? "h-[min(440px,62vh)] w-full rounded-[22px] bg-[#111]/82 shadow-2xl ring-1 ring-white/12 backdrop-blur-md"
          : "h-[min(560px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] rounded-2xl bg-[#111827] shadow-2xl ring-1 ring-white/10"
      }`}
    >
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <img
          src={withBase("/hero/mechanic.png")}
          alt=""
          className="h-11 w-11 rounded-full object-cover object-[center_12%] ring-2 ring-orange"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{t("title")}</p>
          <p className="text-xs text-white/50">{t("subtitle")}</p>
        </div>
        {onClose ? (
          <button type="button" className="text-white/60" onClick={onClose} aria-label={t("close")}>
            ×
          </button>
        ) : null}
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
                    onClick={onClose}
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
            onClick={() => void send(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-white/10 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
          setInput("");
        }}
      >
        <input
          ref={inputRef}
          className="input flex-1"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("placeholder")}
        />
        <button type="submit" className="btn btn-orange px-3" disabled={!input.trim() || pending}>
          {t("send")}
        </button>
      </form>
    </section>
  );
}
