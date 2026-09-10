"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { entretienTypes } from "@/data/entretien";
import { getVehicle } from "@/data/vehicles";
import { formatDate, formatKm } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export default function EntretienPage() {
  const t = useTranslations("entretien");
  const locale = useLocale() as "fr" | "en";
  const { garage, selectedGarageId, setSelectedGarage, entretien, addEntretien, removeEntretien } =
    useStore();
  const [typeId, setTypeId] = useState("oil");
  const [date, setDate] = useState("");
  const [km, setKm] = useState("");
  const [note, setNote] = useState("");

  const rows = useMemo(
    () => entretien.filter((entry) => entry.vehicleId === selectedGarageId),
    [entretien, selectedGarageId],
  );

  return (
    <PortalChrome>
      <PortalGate>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="mt-2 text-white/60">{t("lead")}</p>

          <p className="mt-8 text-sm text-white/50">{t("select")}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {garage.map((item) => {
              const vehicle = getVehicle(item.fitmentId);
              if (!vehicle) return null;
              const active = item.id === selectedGarageId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedGarage(item.id)}
                  className={`rounded-2xl bg-[#141b2b] p-4 text-left ${
                    active ? "ring-2 ring-orange" : "ring-1 ring-white/10"
                  }`}
                >
                  <img src={vehicle.image} alt="" className="mx-auto h-20 object-contain" />
                  <p className="mt-2 font-semibold">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </p>
                  <p className="truncate text-xs text-white/40">NIV {item.vin || "—"}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl bg-[#141b2b] ring-1 ring-white/10">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-white/50">
                <tr>
                  <th className="px-4 py-3">{t("type")}</th>
                  <th className="px-4 py-3">{t("date")}</th>
                  <th className="px-4 py-3">{t("km")}</th>
                  <th className="px-4 py-3">{t("note")}</th>
                  <th className="px-4 py-3">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-white/50">
                      {t("empty")}
                    </td>
                  </tr>
                ) : (
                  rows.map((entry) => (
                    <tr key={entry.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{t(`types.${entry.typeId}`)}</td>
                      <td className="px-4 py-3">{formatDate(entry.date, locale)}</td>
                      <td className="px-4 py-3">{formatKm(entry.km, locale)}</td>
                      <td className="px-4 py-3 text-white/60">{entry.note}</td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => removeEntretien(entry.id)} aria-label="Supprimer">
                          ×
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <select className="select" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
                      {entretienTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {t(`types.${type.id}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="input"
                      type="number"
                      value={km}
                      onChange={(e) => setKm(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input className="input" value={note} onChange={(e) => setNote(e.target.value)} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="btn btn-orange"
                      disabled={!selectedGarageId || !date || !km}
                      onClick={() => {
                        if (!selectedGarageId) return;
                        addEntretien({
                          vehicleId: selectedGarageId,
                          typeId,
                          date,
                          km: Number(km),
                          note,
                        });
                        setDate("");
                        setKm("");
                        setNote("");
                      }}
                    >
                      {t("add")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t("intervals")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entretienTypes
                .filter((type) => type.km > 0)
                .map((type) => (
                  <div key={type.id} className="rounded-xl bg-[#141b2b] p-4 ring-1 ring-white/10">
                    <p className="font-medium">{t(`types.${type.id}`)}</p>
                    <p className="mt-1 text-sm text-white/55">
                      {formatKm(type.km, locale)} · {type.months} {locale === "fr" ? "mois" : "months"}
                    </p>
                  </div>
                ))}
            </div>
            <p className="mt-4 text-sm text-white/45">{t("intervalsNote")}</p>
          </section>
        </div>
      </PortalGate>
    </PortalChrome>
  );
}
