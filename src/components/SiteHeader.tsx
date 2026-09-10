"use client";

import { Logo } from "@/components/Logo";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { Link, usePathname } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function SiteHeader({ variant }: { variant: "storefront" | "portal" }) {
  const t = useTranslations("nav");
  const { cartCount, favorites } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const light = true;

  const links = [
    { href: "/pieces" as const, label: t("parts") },
    { href: "/compte/vehicules" as const, label: t("vehicles") },
    { href: "/compte/entretien" as const, label: t("service") },
    { href: "/compte/favoris" as const, label: t("favorites") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo light={light} />
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname.startsWith(link.href) ? "text-orange" : "text-white/80 hover:text-white"}
            >
              {link.label}
              {link.href === "/compte/favoris" && favorites.length > 0 ? (
                <span className="ml-1 text-orange">({favorites.length})</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/panier" className="relative hidden sm:inline">
            {t("cart")}
            {cartCount > 0 ? (
              <span className="ml-1 rounded-full bg-orange px-1.5 text-[11px] font-semibold">{cartCount}</span>
            ) : null}
          </Link>
          <Link href="/compte" className="hidden sm:inline">
            {t("account")}
          </Link>
          <LocaleSwitch light />
          <button type="button" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="space-y-3 border-t border-white/10 px-4 py-3 text-sm md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/panier" className="block" onClick={() => setOpen(false)}>
            {t("cart")}
          </Link>
          <Link href="/compte" className="block" onClick={() => setOpen(false)}>
            {t("account")}
          </Link>
        </div>
      ) : null}
      {variant === "portal" ? null : null}
    </header>
  );
}
