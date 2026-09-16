"use client";

import { ServixaLogo } from "@/components/ServixaLogo";
import { Link, usePathname } from "@/i18n/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const MobileNavContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("locked", open);
    return () => document.body.classList.remove("locked");
  }, [open]);

  return <MobileNavContext.Provider value={{ open, setOpen }}>{children}</MobileNavContext.Provider>;
}

function useMobileNav() {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("MobileNavProvider is required");
  }
  return context;
}

export function MobileNavToggle() {
  const { open, setOpen } = useMobileNav();

  return (
    <button
      type="button"
      className="mobile-nav__toggler"
      aria-label="Menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <i className="fa fa-bars" />
    </button>
  );
}

export function MobileNavDrawer({ variant }: { variant: "storefront" | "portal" }) {
  const { open, setOpen } = useMobileNav();
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const pathname = usePathname();
  const links =
    variant === "portal"
      ? [
          { href: "/" as const, label: t("home") },
          { href: "/pieces" as const, label: t("parts") },
          { href: "/blog" as const, label: t("blog") },
        ]
      : [
          { href: "/" as const, label: t("home") },
          { href: "/pieces" as const, label: t("parts") },
          { href: "/blog" as const, label: t("blog") },
          { href: "/compte/vehicules" as const, label: t("vehicles") },
          { href: "/compte/entretien" as const, label: t("service") },
          { href: "/compte/favoris" as const, label: t("favorites") },
        ];

  return (
    <div className={`mobile-nav__wrapper${open ? " expanded" : ""}`}>
      <button type="button" className="mobile-nav__overlay" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="mobile-nav__content">
        <button type="button" className="mobile-nav__close" onClick={() => setOpen(false)} aria-label="Close">
          <i className="fa fa-times" />
        </button>
        <div className="logo-box">
          <ServixaLogo />
        </div>
        <div className="mobile-nav__container">
          <ul className="main-menu__list">
            {links.map((link) => (
              <li
                key={link.href}
                className={
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "current"
                    : undefined
                }
              >
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
  );
}
