"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { PortalSidebar, PortalTabs } from "@/components/PortalNav";
import { Link } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function PortalShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const tp = useTranslations("portal");
  const { closePortal } = useStore();

  return (
    <PortalChrome>
      <PortalGate>
        <section className="ax-portal">
          <div className="container">
            <div className="ax-portal__layout">
              <PortalSidebar />
              <div className="ax-portal__main">
                <header className="ax-portal-head">
                  <div>
                    <h1>{title}</h1>
                    {lead ? <p>{lead}</p> : null}
                  </div>
                  <div className="ax-portal-head__actions">
                    <Link href="/pieces" className="ax-portal-text-btn">
                      {tp("shopParts")}
                    </Link>
                    <button type="button" className="ax-portal-text-btn" onClick={closePortal}>
                      {tp("leave")}
                    </button>
                  </div>
                </header>
                {children}
              </div>
            </div>
          </div>
          <PortalTabs />
        </section>
      </PortalGate>
    </PortalChrome>
  );
}
