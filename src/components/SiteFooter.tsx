"use client";

import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-16 border-t border-line bg-header text-[#f3eee6]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-[#f3eee6]/65">{t("blurb")}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("services")}</p>
          <ul className="space-y-2 text-sm text-[#f3eee6]/65">
            <li>
              <Link href="/pieces">{t("parts")}</Link>
            </li>
            <li>
              <Link href="/compte/vehicules">{t("garage")}</Link>
            </li>
            <li>
              <Link href="/compte/entretien">{t("entretien")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("info")}</p>
          <ul className="space-y-2 text-sm text-[#f3eee6]/65">
            <li>{t("vendors")}</li>
            <li>{t("shipping")}</li>
            <li>{t("returns")}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("contact")}</p>
          <p className="text-sm text-[#f3eee6]/65">{t("phone")}</p>
          <p className="text-sm text-[#f3eee6]/65">{t("email")}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[#f3eee6]/40">{t("rights")}</div>
    </footer>
  );
}
