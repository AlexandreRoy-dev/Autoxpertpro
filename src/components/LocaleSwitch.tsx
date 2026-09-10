"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitch({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const setLocale = (next: "fr" | "en") => {
    router.replace(pathname, { locale: next });
  };

  const btn = (code: "fr" | "en") => (
    <button
      type="button"
      onClick={() => setLocale(code)}
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
    </button>
  );

  return (
    <div className="flex items-center">
      {btn("fr")}
      <span className={light ? "text-white/25" : "text-black/20"}>|</span>
      {btn("en")}
    </div>
  );
}
