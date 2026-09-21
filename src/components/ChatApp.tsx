"use client";

import { PartsRail } from "@/components/PartsRail";
import { useChat } from "@/lib/chat";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function ChatApp() {
  const t = useTranslations("chat");
  const tr = useTranslations("rail");
  const { messages, pending, send } = useChat();
  const [text, setText] = useState("");
  const [railOpen, setRailOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const starters = [t("s1"), t("s2"), t("s3"), t("s4")];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  const submit = (value = text) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setText("");
    void send(trimmed);
  };

  return (
    <div className="flex h-full min-h-0">
      <section className="flex min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-2xl px-4 py-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 ${message.role === "user" ? "ml-8 md:ml-16" : "mr-4"}`}
              >
                <p className="mb-1 text-xs uppercase tracking-wide text-muted">
                  {message.role === "user" ? t("you") : t("title")}
                </p>
                <div
                  className={
                    message.role === "user"
                      ? "rounded-md bg-ink px-4 py-3 text-white"
                      : "rounded-md bg-card px-4 py-3"
                  }
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {pending ? <p className="text-sm text-muted">{t("thinking")}</p> : null}
            {messages.length <= 1 ? (
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="card px-4 py-3 text-left text-sm hover:border-ink"
                    onClick={() => submit(starter)}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
        </div>
        <form
          className="border-t border-line bg-paper/90 px-4 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="mx-auto flex max-w-2xl gap-2">
            <div className="lg:hidden">
              <button type="button" className="btn btn-ghost" onClick={() => setRailOpen((v) => !v)}>
                {tr("title")}
              </button>
            </div>
            <input
              className="input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t("placeholder")}
            />
            <button type="submit" className="btn btn-accent" disabled={pending}>
              {t("send")}
            </button>
          </div>
        </form>
      </section>

      <div className="hidden w-[380px] shrink-0 lg:block">
        <PartsRail />
      </div>

      {railOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={() => setRailOpen(false)}>
          <div className="absolute inset-y-0 right-0 w-[min(100%,22rem)]" onClick={(event) => event.stopPropagation()}>
            <PartsRail />
          </div>
        </div>
      ) : null}
    </div>
  );
}
