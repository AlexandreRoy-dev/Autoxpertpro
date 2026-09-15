"use client";

import { LocaleSwitch } from "@/components/LocaleSwitch";
import { ServixaLogo } from "@/components/ServixaLogo";
import { Link, usePathname } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function SiteHeader({ variant }: { variant: "storefront" | "portal" }) {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const { cartCount, favorites } = useStore();
  const pathname = usePathname();
  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/pieces" as const, label: t("parts") },
    { href: "/compte/vehicules" as const, label: t("vehicles") },
    { href: "/compte/entretien" as const, label: t("service") },
    { href: "/compte/favoris" as const, label: t("favorites") },
  ];

  return (
    <header className="main-header-two">
      <div className="main-menu-two__top">
        <div className="main-menu-two__top-inner">
          <ul className="list-unstyled main-menu-two__contact-list">
            <li>
              <div className="icon">
                <i className="icon-phone-call" />
              </div>
              <div className="text">
                <p>
                  <a href={`tel:${tf("phone").replace(/\s/g, "")}`}>{tf("phone")}</a>
                </p>
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="icon-email" />
              </div>
              <div className="text">
                <p>
                  <a href={`mailto:${tf("email")}`}>{tf("email")}</a>
                </p>
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="icon-location1" />
              </div>
              <div className="text">
                <p>{t("region")}</p>
              </div>
            </li>
          </ul>
          <p className="main-menu-two__top-welcome-text">{t("welcome")}</p>
          <div className="main-menu-two__top-right">
            <div className="main-menu-two__top-time">
              <div className="main-menu-two__top-time-icon">
                <span className="fas fa-clock" />
              </div>
              <p className="main-menu-two__top-text">{t("hours")}</p>
            </div>
            <LocaleSwitch light />
          </div>
        </div>
      </div>
      <nav className="main-menu main-menu-two">
        <div className="main-menu-two__wrapper">
          <div className="main-menu-two__wrapper-inner">
            <div className="main-menu-two__left">
              <div className="main-menu-two__logo">
                <ServixaLogo />
              </div>
            </div>
            <div className="main-menu-two__main-menu-box">
              <a href="#" className="mobile-nav__toggler" aria-label="Menu">
                <i className="fa fa-bars" />
              </a>
              <ul className="main-menu__list">
                {links.map((link) => (
                  <li key={link.href} className={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "current" : undefined}>
                    <Link href={link.href}>
                      {link.label}
                      {link.href === "/compte/favoris" && favorites.length > 0 ? ` (${favorites.length})` : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="main-menu-two__right">
              <div className="main-menu-two__call">
                <div className="main-menu-two__call-icon">
                  <i className="icon-phone-call" />
                </div>
                <div className="main-menu-two__call-content">
                  <p className="main-menu-two__call-sub-title">{t("callAnytime")}</p>
                  <h5 className="main-menu-two__call-number">
                    <a href={`tel:${tf("phone").replace(/\s/g, "")}`}>{tf("phone")}</a>
                  </h5>
                </div>
              </div>
              <div className="main-menu-two__search-cart-box">
                <div className="main-menu-two__search-cart-box">
                  <div className="main-menu-two__search-box">
                    <Link href="/pieces" className="main-menu-two__search fal fa-search" aria-label={t("parts")} />
                  </div>
                  <div className="main-menu-two__cart-box">
                    <Link href="/panier" className="main-menu-two__cart">
                      <span className="far fa-shopping-cart" />
                      <span className="main-menu-two__cart-count">{String(cartCount).padStart(2, "0")}</span>
                    </Link>
                  </div>
                </div>
              </div>
              {variant === "storefront" ? (
                <div className="main-menu-two__btn-box">
                  <Link href="/compte" className="thm-btn">
                    {t("account")}
                    <span>
                      <i className="icon-next" />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
