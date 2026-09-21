"use client";

import { PageIntro } from "@/components/PageIntro";
import { PortalGate } from "@/components/PortalGate";
import { getVehicle } from "@/data/vehicles";
import { Link } from "@/i18n/navigation";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("account");
  const tp = useTranslations("portal");
  const tn = useTranslations("nav");
  const { garage, favorites, orders, selectedGarageId } = useStore();
  const selected = garage.find((item) => item.id === selectedGarageId);
  const vehicle = selected ? getVehicle(selected.fitmentId) : null;

  const tiles = [
    { href: "/compte/vehicules" as const, title: tn("vehicles"), hint: t("vehiclesHint"), count: garage.length },
    { href: "/compte/entretien" as const, title: tn("service"), hint: t("serviceHint") },
    { href: "/compte/achats" as const, title: tn("orders"), hint: t("ordersHint"), count: orders.length },
    { href: "/compte/favoris" as const, title: tn("favorites"), hint: t("savedHint"), count: favorites.length },
  ];

  return (
    <PortalGate>
      <div className="wrap py-12">
        <PageIntro title={t("title")} lead={t("lead")} />
        {vehicle ? (
          <div className="card mb-8 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
            <img src={withBase(vehicle.image)} alt="" className="h-16 w-24 object-contain" />
            <div className="flex-1">
              <p className="text-sm text-muted">{tp("currentVehicle")}</p>
              <p className="font-semibold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-sm text-muted">{vehicle.engine}</p>
            </div>
            <Link href="/compte/vehicules" className="text-sm text-accent">
              {tp("chooseVehicle")}
            </Link>
          </div>
        ) : (
          <div className="card mb-8 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold">{tp("noVehicle")}</p>
              <p className="text-sm text-muted">{tp("noVehicleHint")}</p>
            </div>
            <Link href="/compte/vehicules" className="btn btn-accent">
              {t("open")}
            </Link>
          </div>
        )}

        <nav className="grid gap-4 sm:grid-cols-2" aria-label={tp("navLabel")}>
          {tiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className="card flex items-center justify-between p-5">
              <span>
                <strong className="block">{tile.title}</strong>
                <small className="text-muted">{tile.hint}</small>
              </span>
              {tile.count !== undefined ? <em className="not-italic text-lg font-semibold">{tile.count}</em> : null}
            </Link>
          ))}
        </nav>
      </div>
    </PortalGate>
  );
}
