"use client";

import { LocaleSwitch } from "@/components/LocaleSwitch";
import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";
import { getVehicle } from "@/data/vehicles";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations("nav");
  const { cartCount, hydrated, selectedFitmentId } = useStore();
  const items = hydrated ? cartCount : 0;
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) : null;

  return (
    <header className="z-40 shrink-0 bg-header text-[#f3eee6]">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <Logo light />
          {vehicle ? (
            <p className="hidden truncate text-sm text-[#f3eee6]/70 sm:block">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/compte/vehicules">{t("vehicles")}</Link>
          <Link href="/compte/entretien" className="hidden sm:inline">
            {t("service")}
          </Link>
          <Link href="/panier">
            {t("cart")}
            {items > 0 ? <span className="ml-1 text-accent">{items}</span> : null}
          </Link>
          <LocaleSwitch light />
        </div>
      </div>
    </header>
  );
}
