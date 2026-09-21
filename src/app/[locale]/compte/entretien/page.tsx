"use client";

import { DateField } from "@/components/DateField";
import { PageIntro } from "@/components/PageIntro";
import { PortalGate } from "@/components/PortalGate";
import { VehicleStrip } from "@/components/VehicleStrip";
import { entretienTypes } from "@/data/entretien";
import { Link } from "@/i18n/navigation";
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
    <PortalGate>
      <div className="wrap py-12">
        <PageIntro title={t("title")} lead={t("lead")} />

        {garage.length === 0 ? (
          <div className="card p-6">
            <p>{t("noVehicle")}</p>
            <Link href="/compte/vehicules" className="btn btn-accent mt-4">
              {t("goVehicles")}
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted">{t("select")}</p>
            <VehicleStrip garage={garage} selectedId={selectedGarageId} onSelect={setSelectedGarage} />
          </>
        )}

        {selectedGarageId ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <section>
              <h2 className="display text-2xl">{t("history")}</h2>
              {rows.length === 0 ? (
                <p className="mt-4 text-muted">{t("empty")}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {rows.map((entry) => (
                    <li className="card flex items-start justify-between p-4" key={entry.id}>
                      <div>
                        <strong>{t(`types.${entry.typeId}`)}</strong>
                        <p className="text-sm text-muted">
                          {formatDate(entry.date, locale)} · {formatKm(entry.km, locale)}
                        </p>
                        {entry.note ? <p className="mt-1 text-sm">{entry.note}</p> : null}
                      </div>
                      <button type="button" onClick={() => removeEntretien(entry.id)} aria-label={t("delete")}>
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="display text-2xl">{t("addTitle")}</h2>
              <form
                className="mt-4 grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!selectedGarageId || !date || !km) return;
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
                <label className="text-sm">
                  <span className="mb-1 block text-muted">{t("type")}</span>
                  <select className="select" value={typeId} onChange={(event) => setTypeId(event.target.value)}>
                    {entretienTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {t(`types.${type.id}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">{t("date")}</span>
                  <DateField value={date} onChange={setDate} locale={locale} />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">{t("km")}</span>
                  <input
                    className="input"
                    type="number"
                    inputMode="numeric"
                    value={km}
                    onChange={(event) => setKm(event.target.value)}
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">{t("note")}</span>
                  <input className="input" value={note} onChange={(event) => setNote(event.target.value)} />
                </label>
                <button type="submit" className="btn btn-accent" disabled={!date || !km}>
                  {t("add")}
                </button>
              </form>

              <h2 className="display mt-10 text-2xl">{t("intervals")}</h2>
              <ul className="mt-4 space-y-2">
                {entretienTypes
                  .filter((type) => type.km > 0)
                  .map((type) => (
                    <li key={type.id} className="flex justify-between text-sm">
                      <span>{t(`types.${type.id}`)}</span>
                      <small className="text-muted">
                        {formatKm(type.km, locale)} · {type.months} {locale === "fr" ? "mois" : "months"}
                      </small>
                    </li>
                  ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{t("intervalsNote")}</p>
            </section>
          </div>
        ) : null}
      </div>
    </PortalGate>
  );
}
