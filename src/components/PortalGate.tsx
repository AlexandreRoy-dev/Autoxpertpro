"use client";

import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function PortalGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations("portal");
  const { portalOpen, openPortal, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="wrap py-20">
        <p className="text-muted">{t("loading")}</p>
      </div>
    );
  }

  if (!portalOpen) {
    return (
      <div className="wrap py-16">
        <div className="card max-w-xl p-8">
          <p className="text-sm text-muted">{t("gateKicker")}</p>
          <h1 className="display mt-2 text-3xl">{t("gateTitle")}</h1>
          <p className="mt-4 text-muted">{t("gateBody")}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-ink">
            <li>{t("gateHint1")}</li>
            <li>{t("gateHint2")}</li>
            <li>{t("gateHint3")}</li>
          </ul>
          <button type="button" className="btn btn-accent mt-8" onClick={openPortal}>
            {t("enter")}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
