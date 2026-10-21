"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitch({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  const btn = (code: "fr" | "en") => (
    <Link
      href={pathname}
      locale={code}
      hrefLang={code === "fr" ? "fr-CA" : "en-CA"}
      className={`px-1.5 text-xs font-semibold ${
        locale === code
          ? light
            ? "text-white"
            : "text-ink"
          : light
            ? "text-white/45"
            : "text-black/35"
      }`}
    >
      {code.toUpperCase()}
    </Link>
  );

  return (
    <div className="flex items-center">
      {btn("fr")}
      <span className={light ? "text-white/25" : "text-black/20"}>|</span>
      {btn("en")}
    </div>
  );
}
