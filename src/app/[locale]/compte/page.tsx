"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { Link } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("account");
  const tp = useTranslations("portal");
  const { closePortal, portalOpen } = useStore();

  return (
    <PortalChrome>
      <PortalGate>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="mt-3 text-white/65">{t("lead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/compte/vehicules" className="btn btn-orange">
              {t("open")}
            </Link>
            <Link href="/compte/entretien" className="btn btn-ghost text-white">
              Entretien
            </Link>
            <Link href="/compte/achats" className="btn btn-ghost text-white">
              Achats
            </Link>
            {portalOpen ? (
              <button type="button" className="btn btn-ghost text-white" onClick={closePortal}>
                {tp("leave")}
              </button>
            ) : null}
          </div>
        </div>
      </PortalGate>
    </PortalChrome>
  );
}
