"use client";

import { PortalShell } from "@/components/PortalShell";
import { VehiclePicker } from "@/components/VehiclePicker";
import { getCategory } from "@/data/categories";
import { productsForVehicle } from "@/data/products";
import { getVehicle } from "@/data/vehicles";
import { Link } from "@/i18n/navigation";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function VehiclesPage() {
  const t = useTranslations("garage");
  const tp = useTranslations("picker");
  const { garage, selectedGarageId, setSelectedGarage, addGarageVehicle, removeGarageVehicle } =
    useStore();
  const [adding, setAdding] = useState(false);
  const selected = garage.find((item) => item.id === selectedGarageId);
  const fitment = selected ? getVehicle(selected.fitmentId) : null;
  const linked = fitment ? productsForVehicle(fitment.id).slice(0, 4) : [];

  return (
    <PortalShell title={t("title")} lead={t("lead")}>
      <div className="ax-portal-toolbar">
        <button type="button" className="thm-btn" onClick={() => setAdding(true)}>
          {t("add")}
          <span className="icon-next" />
        </button>
      </div>

      {garage.length === 0 ? (
        <p className="ax-dash-empty">{t("empty")}</p>
      ) : (
        <>
          <p className="ax-portal-hint">{t("tapToSelect")}</p>
          <ul className="ax-vehicle-list">
            {garage.map((item) => {
              const vehicle = getVehicle(item.fitmentId);
              if (!vehicle) return null;
              const active = item.id === selectedGarageId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedGarage(item.id)}
                    className={`ax-vehicle-row${active ? " is-active" : ""}`}
                    aria-pressed={active}
                  >
                    <img src={withBase(vehicle.image)} alt="" />
                    <span>
                      <strong>
                        {vehicle.make} {vehicle.model}
                      </strong>
                      <small>
                        {vehicle.year} · {vehicle.engine}
                      </small>
                      <small>NIV {item.vin || "—"}</small>
                    </span>
                    {active ? <em>{t("selected")}</em> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {fitment && selected ? (
        <div className="ax-vehicle-detail">
          <div className="ax-vehicle-detail__cutout">
            <img src={withBase(fitment.image)} alt="" />
          </div>
          <p className="ax-vehicle-detail__kicker">{t("primary")}</p>
          <h2>
            {fitment.make} {fitment.model}
          </h2>
          <dl className="ax-spec-list">
            <div>
              <dt>{t("year")}</dt>
              <dd>{fitment.year}</dd>
            </div>
            <div>
              <dt>{t("engine")}</dt>
              <dd>{fitment.engine}</dd>
            </div>
            <div>
              <dt>{t("vin")}</dt>
              <dd>{selected.vin || "—"}</dd>
            </div>
          </dl>
          <div className="ax-dash-panel">
            <h3>{t("parts")}</h3>
            {linked.length ? (
              <ul>
                {linked.map((product) => {
                  const category = getCategory(product.categoryId);
                  if (!category) return null;
                  return (
                    <li key={product.id}>
                      <Link href={`/pieces/${category.slug}/${product.slug}`}>
                        {product.brand} {product.partNumber}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <Link href="/pieces">{t("parts")}</Link>
          </div>
          <button type="button" className="ax-link-quiet" onClick={() => removeGarageVehicle(selected.id)}>
            {t("remove")}
          </button>
        </div>
      ) : null}

      {adding ? (
        <div className="ax-modal">
          <div className="ax-modal__panel hero-form">
            <div className="ax-modal__head">
              <h2>{t("add")}</h2>
              <button type="button" onClick={() => setAdding(false)} aria-label="×">
                ×
              </button>
            </div>
            <VehiclePicker
              dark
              showVin
              submitLabel={tp("add")}
              onSelect={(fitmentId, vin) => {
                addGarageVehicle(fitmentId, vin || "");
                setAdding(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}
