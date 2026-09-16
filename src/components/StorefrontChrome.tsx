"use client";

import { Atmosphere } from "@/components/Atmosphere";
import { MobileNavDrawer, MobileNavProvider } from "@/components/MobileNav";
import { ServixaRuntime } from "@/components/ServixaRuntime";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useTranslations } from "next-intl";

export function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");

  return (
    <MobileNavProvider>
      <div className="page-wrapper">
        <ServixaRuntime />
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Atmosphere variant="dark" />
        </div>
        <SiteHeader variant="storefront" />
        <main>{children}</main>
        <SiteFooter />
        <MobileNavDrawer variant="storefront" />

        <a href="#top" data-target="html" className="scroll-to-target scroll-to-top">
          <span className="scroll-to-top__wrapper">
            <span className="scroll-to-top__inner" />
          </span>
          <span className="scroll-to-top__text">{t("backTop")}</span>
        </a>
      </div>
    </MobileNavProvider>
  );
}
