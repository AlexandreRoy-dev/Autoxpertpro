"use client";

import { PortalShell } from "@/components/PortalShell";
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

  return (
    <PortalShell title={t("title")} lead={t("lead")}>
      {vehicle ? (
        <div className="ax-current-vehicle">
          <img src={withBase(vehicle.image)} alt="" />
          <div>
            <p className="ax-current-vehicle__kicker">{tp("currentVehicle")}</p>
            <p className="ax-current-vehicle__name">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
            <p className="ax-current-vehicle__meta">{vehicle.engine}</p>
          </div>
          <Link href="/compte/vehicules" className="ax-portal-text-btn">
            {tp("chooseVehicle")}
          </Link>
        </div>
      ) : (
        <div className="ax-current-vehicle ax-current-vehicle--empty">
          <div>
            <p className="ax-current-vehicle__kicker">{tp("noVehicle")}</p>
            <p className="ax-current-vehicle__meta">{tp("noVehicleHint")}</p>
          </div>
          <Link href="/compte/vehicules" className="thm-btn">
            {t("open")}
            <span className="icon-next" />
          </Link>
        </div>
      )}

      <nav className="ax-portal-tiles" aria-label={tp("navLabel")}>
        <Link href="/compte/vehicules" className="ax-portal-tile">
          <span className="ax-portal-tile__icon" aria-hidden>
            <i className="fal fa-car" />
          </span>
          <span className="ax-portal-tile__body">
            <strong>{tn("vehicles")}</strong>
            <small>{t("vehiclesHint")}</small>
          </span>
          <em>{garage.length}</em>
        </Link>
        <Link href="/compte/entretien" className="ax-portal-tile">
          <span className="ax-portal-tile__icon" aria-hidden>
            <i className="far fa-clipboard-list-check" />
          </span>
          <span className="ax-portal-tile__body">
            <strong>{tn("service")}</strong>
            <small>{t("serviceHint")}</small>
          </span>
        </Link>
        <Link href="/compte/achats" className="ax-portal-tile">
          <span className="ax-portal-tile__icon" aria-hidden>
            <i className="fal fa-shopping-bag" />
          </span>
          <span className="ax-portal-tile__body">
            <strong>{tn("orders")}</strong>
            <small>{t("ordersHint")}</small>
          </span>
          <em>{orders.length}</em>
        </Link>
        <Link href="/compte/favoris" className="ax-portal-tile">
          <span className="ax-portal-tile__icon" aria-hidden>
            <i className="far fa-heart" />
          </span>
          <span className="ax-portal-tile__body">
            <strong>{tn("favorites")}</strong>
            <small>{t("savedHint")}</small>
          </span>
          <em>{favorites.length}</em>
        </Link>
      </nav>
    </PortalShell>
  );
}
