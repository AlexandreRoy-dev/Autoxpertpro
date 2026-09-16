"use client";

import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function PortalGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations("portal");
  const { portalOpen, openPortal, hydrated } = useStore();

  if (!hydrated) {
    return (
      <section className="ax-portal">
        <div className="container">
          <p className="ax-portal-loading">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (!portalOpen) {
    return (
      <section className="ax-portal">
        <div className="container">
          <div className="ax-portal-gate">
            <p className="ax-portal-gate__kicker">{t("gateKicker")}</p>
            <h1>{t("gateTitle")}</h1>
            <p className="ax-portal-gate__lead">{t("gateBody")}</p>
            <ul className="ax-portal-gate__list">
              <li>{t("gateHint1")}</li>
              <li>{t("gateHint2")}</li>
              <li>{t("gateHint3")}</li>
            </ul>
            <button type="button" className="thm-btn" onClick={openPortal}>
              {t("enter")}
              <span className="icon-next" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
