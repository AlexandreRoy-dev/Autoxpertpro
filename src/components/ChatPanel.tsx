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
  const started = messages.some((message) => message.role === "user");

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (variant === "dock" && open) inputRef.current?.focus();
  }, [open, variant]);

  useEffect(() => {
    if (variant === "dock" && !open) return;
    const text = consumeDraft();
    if (text) void send(text);
  }, [open, variant, consumeDraft, send]);

  const ask = (text: string) => {
    void send(text);
    setInput("");
  };

  return (
    <section className={`chat-panel ax-chat ax-chat--${variant}`}>
      <header className="ax-chat__head">
        <img src={withBase("/stock/mechanic.jpg")} alt="" className="ax-chat__avatar" />
        <div className="ax-chat__who">
          <p className="ax-chat__name">{t("title")}</p>
          <p className="ax-chat__role">{t("subtitle")}</p>
        </div>
        {onClose ? (
          <button type="button" className="ax-chat__close" onClick={onClose} aria-label={t("close")}>
            ×
          </button>
        ) : null}
      </header>

      {!started ? (
        <div className="ax-chat__starter">
          {messages
            .filter((message) => message.role === "assistant")
            .slice(0, 1)
            .map((message) => (
              <p key={message.id} className="ax-chat__greeting">
                {message.text}
              </p>
            ))}
          <p className="ax-chat__prompt">{t("starter")}</p>
          <div className="ax-chat__options">
            {suggestions.map((label) => (
              <button key={label} type="button" className="ax-chat__option" disabled={pending} onClick={() => ask(label)}>
                {label}
                <span className="icon-next" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={scroller} className="ax-chat__thread">
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "ax-chat__row ax-chat__row--user" : "ax-chat__row"}>
              <div className={message.role === "user" ? "ax-chat__bubble ax-chat__bubble--user" : "ax-chat__bubble"}>
                {message.text}
              </div>
              {message.links?.length ? (
                <div className="ax-chat__links">
                  {message.links.map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      className="ax-chat__link"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {pending ? <p className="ax-chat__pending">{t("thinking")}</p> : null}
        </div>
      )}

      <form
        className="ax-chat__composer"
        onSubmit={(event) => {
          event.preventDefault();
          if (input.trim()) ask(input);
        }}
      >
        <input
          ref={inputRef}
          className="input ax-chat__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={started ? t("placeholder") : t("orType")}
        />
        <button type="submit" className="btn btn-orange ax-chat__send" disabled={!input.trim() || pending}>
          {t("send")}
        </button>
      </form>
    </section>
  );
}
