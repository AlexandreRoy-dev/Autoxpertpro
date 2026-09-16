"use client";

import { portalLinks } from "@/data/portal-nav";
import { Link, usePathname } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

function countFor(href: string, favorites: number, garage: number, orders: number) {
  if (href === "/compte/favoris") return favorites;
  if (href === "/compte/vehicules") return garage;
  if (href === "/compte/achats") return orders;
  return 0;
}

function isActive(pathname: string, href: string) {
  if (href === "/compte") return pathname === "/compte";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PortalSidebar() {
  const t = useTranslations("nav");
  const ta = useTranslations("account");
  const tp = useTranslations("portal");
  const pathname = usePathname();
  const { closePortal, favorites, garage, orders } = useStore();

  return (
    <aside className="ax-portal-sidebar">
      <div className="ax-portal-sidebar__user">
        <span className="ax-portal-avatar" aria-hidden>
          AX
        </span>
        <div>
          <p className="ax-portal-sidebar__name">{ta("title")}</p>
          <p className="ax-portal-sidebar__meta">{t("region")}</p>
        </div>
      </div>
      <nav aria-label={tp("navLabel")}>
        <ul className="ax-portal-sidebar__menu">
          {portalLinks.map((link) => {
            const count = countFor(link.href, favorites.length, garage.length, orders.length);
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  className={`ax-portal-side-link${active ? " is-active" : ""}`}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  <i className={link.icon} aria-hidden />
                  <span>{t(link.key)}</span>
                  {count > 0 ? <em>{count}</em> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button type="button" className="ax-portal-side-link ax-portal-side-link--leave" onClick={closePortal}>
        <i className="far fa-sign-out-alt" aria-hidden />
        <span>{tp("leave")}</span>
      </button>
    </aside>
  );
}

export function PortalTabs() {
  const t = useTranslations("nav");
  const tp = useTranslations("portal");
  const pathname = usePathname();
  const { favorites, garage, orders } = useStore();

  return (
    <nav className="ax-portal-tabs" aria-label={tp("navLabel")}>
      {portalLinks.map((link) => {
        const count = countFor(link.href, favorites.length, garage.length, orders.length);
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            className={`ax-portal-tab${active ? " is-active" : ""}`}
            href={link.href}
            aria-current={active ? "page" : undefined}
          >
            <i className={link.icon} aria-hidden />
            <span>{t(link.key)}</span>
            {count > 0 ? <em>{count}</em> : null}
          </Link>
        );
      })}
    </nav>
  );
}
