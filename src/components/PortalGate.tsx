"use client";

import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function PortalGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations("portal");
  const { portalOpen, openPortal, hydrated } = useStore();

  if (!hydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-white/60">…</div>;
  }

  if (!portalOpen) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">{t("gateTitle")}</h1>
        <p className="mt-4 text-white/70">{t("gateBody")}</p>
        <button type="button" className="btn btn-orange mt-8" onClick={openPortal}>
          {t("enter")}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
