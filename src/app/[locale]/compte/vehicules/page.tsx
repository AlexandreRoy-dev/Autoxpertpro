"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { VehiclePicker } from "@/components/VehiclePicker";
import { getCategory } from "@/data/categories";
import { productsForVehicle } from "@/data/products";
import { getVehicle } from "@/data/vehicles";
import { Link } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function VehiclesPage() {
  const t = useTranslations("garage");
  const tp = useTranslations("picker");
  const { garage, selectedGarageId, setSelectedGarage, addGarageVehicle, removeGarageVehicle } =
    useStore();
  const [adding, setAdding] = useState(false);
  const selected = garage.find((v) => v.id === selectedGarageId);
  const fitment = selected ? getVehicle(selected.fitmentId) : null;
  const linked = fitment ? productsForVehicle(fitment.id).slice(0, 4) : [];

  return (
    <PortalChrome>
      <PortalGate>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{t("title")}</h1>
              <p className="mt-2 text-white/60">{t("lead")}</p>
            </div>
            <button type="button" className="btn btn-orange" onClick={() => setAdding(true)}>
              {t("add")}
            </button>
          </div>

          {garage.length === 0 ? (
            <p className="mt-10 text-white/60">{t("empty")}</p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {garage.map((item) => {
                const vehicle = getVehicle(item.fitmentId);
                if (!vehicle) return null;
                const active = item.id === selectedGarageId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedGarage(item.id)}
                    className={`rounded-2xl bg-portal-card p-4 text-left ${
                      active ? "ring-2 ring-orange" : "ring-1 ring-white/10"
                    }`}
                  >
                    <img
                      src={vehicle.image}
                      alt=""
                      className="mx-auto h-24 w-full object-contain"
                    />
                    <p className="mt-3 font-semibold">
                      {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-sm text-white/55">
                      {vehicle.year} · {vehicle.engine}
                    </p>
                    <p className="mt-1 truncate text-xs text-white/35">NIV {item.vin || "—"}</p>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-white/50"
              >
                + {t("add")}
              </button>
            </div>
          )}

          {fitment && selected ? (
            <div className="mt-10 rounded-2xl bg-[#141b2b] p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-orange">{t("primary")}</p>
              <h2 className="mt-2 text-2xl font-semibold">
                {fitment.make} {fitment.model} · {fitment.engine}
              </h2>
              <div className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-4">
                <p>
                  {t("year")}: {fitment.year}
                </p>
                <p>
                  {t("model")}: {fitment.model}
                </p>
                <p>
                  {t("engine")}: {fitment.engine}
                </p>
                <p>
                  {t("vin")}: {selected.vin || "—"}
                </p>
              </div>
              <button
                type="button"
                className="mt-4 text-sm text-white/45 underline"
                onClick={() => removeGarageVehicle(selected.id)}
              >
                {t("remove")}
              </button>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl bg-black/20 p-4">
                  <h3 className="font-semibold">{t("parts")}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
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
                  <Link href="/pieces" className="mt-3 inline-block text-sm text-orange">
                    {t("parts")}
                  </Link>
                </div>
                <div className="rounded-xl bg-black/20 p-4">
                  <h3 className="font-semibold">{t("diy")}</h3>
                  <p className="mt-3 text-sm text-white/55">{t("diyEmpty")}</p>
                </div>
                <div className="rounded-xl bg-black/20 p-4">
                  <h3 className="font-semibold">{t("activity")}</h3>
                  <p className="mt-3 text-sm text-white/55">{t("activityEmpty")}</p>
                </div>
              </div>
            </div>
          ) : null}

          {adding ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-xl rounded-2xl bg-[#141b2b] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t("add")}</h2>
                  <button type="button" onClick={() => setAdding(false)}>
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
        </div>
      </PortalGate>
    </PortalChrome>
  );
}
