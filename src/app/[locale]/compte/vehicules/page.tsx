"use client";

import { PageIntro } from "@/components/PageIntro";
import { PortalGate } from "@/components/PortalGate";
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
    <PortalGate>
      <div className="wrap py-12">
        <PageIntro title={t("title")} lead={t("lead")} />
        <button type="button" className="btn btn-accent mb-8" onClick={() => setAdding(true)}>
          {t("add")}
        </button>

        {garage.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted">{t("tapToSelect")}</p>
            <ul className="grid gap-3">
              {garage.map((item) => {
                const vehicle = getVehicle(item.fitmentId);
                if (!vehicle) return null;
                const active = item.id === selectedGarageId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedGarage(item.id)}
                      className={`card flex w-full items-center gap-4 p-4 text-left ${active ? "border-accent" : ""}`}
                      aria-pressed={active}
                    >
                      <img src={withBase(vehicle.image)} alt="" className="h-12 w-16 object-contain" />
                      <span className="flex-1">
                        <strong className="block">
                          {vehicle.make} {vehicle.model}
                        </strong>
                        <small className="block text-muted">
                          {vehicle.year} · {vehicle.engine}
                        </small>
                        <small className="text-muted">NIV {item.vin || "—"}</small>
                      </span>
                      {active ? <em className="not-italic text-sm text-accent">{t("selected")}</em> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {fitment && selected ? (
          <div className="card mt-8 p-6">
            <img src={withBase(fitment.image)} alt="" className="mb-4 h-24 w-36 object-contain" />
            <p className="text-sm text-muted">{t("primary")}</p>
            <h2 className="display text-2xl">
              {fitment.make} {fitment.model}
            </h2>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted">{t("year")}</dt>
                <dd>{fitment.year}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("engine")}</dt>
                <dd>{fitment.engine}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("vin")}</dt>
                <dd>{selected.vin || "—"}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <h3 className="font-semibold">{t("parts")}</h3>
              {linked.length ? (
                <ul className="mt-2 space-y-1 text-sm">
                  {linked.map((product) => {
                    const category = getCategory(product.categoryId);
                    if (!category) return null;
                    return (
                      <li key={product.id}>
                        <Link href={`/pieces/${category.slug}/${product.slug}`} className="text-accent">
                          {product.brand} {product.partNumber}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              <Link href="/pieces" className="mt-3 inline-block text-sm">
                {t("parts")}
              </Link>
            </div>
            <button
              type="button"
              className="mt-6 text-sm text-muted"
              onClick={() => removeGarageVehicle(selected.id)}
            >
              {t("remove")}
            </button>
          </div>
        ) : null}

        {adding ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
            <div className="card w-full max-w-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="display text-2xl">{t("add")}</h2>
                <button type="button" onClick={() => setAdding(false)} aria-label="×">
                  ×
                </button>
              </div>
              <VehiclePicker
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
      </div>
    </PortalGate>
  );
}
