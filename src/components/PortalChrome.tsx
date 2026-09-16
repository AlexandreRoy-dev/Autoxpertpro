"use client";

import { Atmosphere } from "@/components/Atmosphere";
import { ServixaLogo } from "@/components/ServixaLogo";
import { ServixaRuntime } from "@/components/ServixaRuntime";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useTranslations } from "next-intl";

export function PortalChrome({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");

  return (
    <div className="page-wrapper portal">
      <ServixaRuntime />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Atmosphere variant="dark" />
      </div>
      <SiteHeader variant="portal" />
      <main>{children}</main>
      <SiteFooter />

      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler" />
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler">
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <ServixaLogo />
          </div>
          <div className="mobile-nav__container" />
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope" />
              <a href={`mailto:${tf("email")}`}>{tf("email")}</a>
            </li>
            <li>
              <i className="fas fa-phone" />
              <a href={`tel:${tf("phone").replace(/\s/g, "")}`}>{tf("phone")}</a>
            </li>
          </ul>
        </div>
      </div>

      <a href="#top" data-target="html" className="scroll-to-target scroll-to-top">
        <span className="scroll-to-top__wrapper">
          <span className="scroll-to-top__inner" />
        </span>
        <span className="scroll-to-top__text">{t("backTop")}</span>
      </a>
    </div>
  );
}
