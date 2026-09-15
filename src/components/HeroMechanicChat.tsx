"use client";

import { ChatPanel } from "@/components/ChatPanel";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

export function HeroMechanicChat() {
  const t = useTranslations("chat");

  return (
    <div className="relative mx-auto flex min-h-[460px] w-full flex-col items-center justify-end lg:block">
      <img
        src={withBase("/hero/mechanic.png")}
        alt={t("portraitAlt")}
        className="mb-3 h-44 object-contain object-bottom lg:pointer-events-none lg:absolute lg:right-[-8%] lg:bottom-0 lg:mb-0 lg:h-[108%] lg:max-w-none lg:drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
      />
      <div className="relative z-10 w-full max-w-[400px] lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
        <ChatPanel variant="hero" />
      </div>
    </div>
  );
}
