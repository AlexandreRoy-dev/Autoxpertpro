"use client";

import { Link } from "@/i18n/navigation";
import { useChat } from "@/lib/chat";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function ChatWidget() {
  const t = useTranslations("chat");
  const { open, setOpen, messages, pending, send, draft, consumeDraft } = useChat();
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const next = consumeDraft();
    if (next) setText(next);
  }, [draft, consumeDraft]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending, open]);

  const starters = [t("s1"), t("s2"), t("s3"), t("s4")];

  const submit = (value = text) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setText("");
    void send(trimmed);
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div className="pointer-events-auto flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-line bg-card shadow-xl">
          <div className="flex items-center justify-between bg-header px-4 py-3 text-[#f3eee6]">
            <div>
              <p className="text-sm font-semibold">{t("title")}</p>
              <p className="text-xs text-[#f3eee6]/60">{t("subtitle")}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t("close")}>
              ×
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === "user" ? "ml-8 rounded-md bg-ink px-3 py-2 text-white" : "mr-6"}
              >
                <p>{message.text}</p>
                {message.links?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href as "/"}
                        className="text-accent underline"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {pending ? <p className="text-muted">{t("thinking")}</p> : null}
            {messages.length <= 1 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted">{t("starter")}</p>
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="block w-full rounded-md border border-line px-3 py-2 text-left hover:border-ink"
                    onClick={() => submit(starter)}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <input
              className="input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t("placeholder")}
            />
            <button type="submit" className="btn btn-accent" disabled={pending}>
              {t("send")}
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        className="pointer-events-auto h-14 w-14 overflow-hidden rounded-full border-2 border-accent bg-header"
        onClick={() => setOpen(!open)}
        aria-label={t("title")}
      >
        <img src={withBase("/stock/mechanic.jpg")} alt="" className="h-full w-full object-cover object-[center_20%]" />
      </button>
    </div>
  );
}
