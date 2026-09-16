"use client";

import { ChatPanel } from "@/components/ChatPanel";
import { useChat } from "@/lib/chat";
import { usePathname } from "@/i18n/navigation";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

export function ChatWidget() {
  const t = useTranslations("chat");
  const pathname = usePathname();
  const { open, setOpen } = useChat();
  const onHome = pathname === "/";
  const onPortal = pathname === "/compte" || pathname.startsWith("/compte/");

  if (onHome || onPortal) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div className="pointer-events-auto">
          <ChatPanel variant="dock" onClose={() => setOpen(false)} />
        </div>
      ) : null}
      <button
        type="button"
        className="pointer-events-auto flex h-16 w-16 overflow-hidden rounded-full bg-workshop shadow-lg ring-2 ring-orange"
        onClick={() => setOpen(!open)}
        aria-label={t("title")}
      >
        <img src={withBase("/stock/mechanic.jpg")} alt="" className="h-full w-full object-cover object-[center_20%]" />
      </button>
    </div>
  );
}
