"use client";

import { DateField } from "@/components/DateField";
import { PortalShell } from "@/components/PortalShell";
import { VehicleStrip } from "@/components/VehicleStrip";
import { entretienTypes } from "@/data/entretien";
import { formatDate, formatKm } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Link } from "@/i18n/navigation";
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
    <PortalShell title={t("title")} lead={t("lead")}>
      {garage.length === 0 ? (
        <div className="ax-empty-card">
          <p>{t("noVehicle")}</p>
          <Link href="/compte/vehicules" className="thm-btn">
            {t("goVehicles")}
            <span className="icon-next" />
          </Link>
        </div>
      ) : (
        <>
          <p className="ax-portal-hint">{t("select")}</p>
          <VehicleStrip garage={garage} selectedId={selectedGarageId} onSelect={setSelectedGarage} />
        </>
      )}

      {selectedGarageId ? (
        <>
          <section className="ax-service-block">
            <h2>{t("history")}</h2>
            {rows.length === 0 ? (
              <p className="ax-dash-empty">{t("empty")}</p>
            ) : (
              <ul className="ax-service-list">
                {rows.map((entry) => (
                  <li className="ax-service-card" key={entry.id}>
                    <div>
                      <strong>{t(`types.${entry.typeId}`)}</strong>
                      <p>
                        {formatDate(entry.date, locale)} · {formatKm(entry.km, locale)}
                      </p>
                      {entry.note ? <p>{entry.note}</p> : null}
                    </div>
                    <button type="button" onClick={() => removeEntretien(entry.id)} aria-label={t("delete")}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="ax-service-block">
            <h2>{t("addTitle")}</h2>
            <form
              className="ax-service-form"
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
              <label>
                <span>{t("type")}</span>
                <select className="select ignore" value={typeId} onChange={(event) => setTypeId(event.target.value)}>
                  {entretienTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {t(`types.${type.id}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t("date")}</span>
                <DateField value={date} onChange={setDate} locale={locale} />
              </label>
              <label>
                <span>{t("km")}</span>
                <input className="input" type="number" inputMode="numeric" value={km} onChange={(event) => setKm(event.target.value)} />
              </label>
              <label>
                <span>{t("note")}</span>
                <input className="input" value={note} onChange={(event) => setNote(event.target.value)} />
              </label>
              <button type="submit" className="thm-btn" disabled={!date || !km}>
                {t("add")}
                <span className="icon-next" />
              </button>
            </form>
          </section>

          <section className="ax-service-block">
            <h2>{t("intervals")}</h2>
            <ul className="ax-interval-list">
              {entretienTypes
                .filter((type) => type.km > 0)
                .map((type) => (
                  <li key={type.id}>
                    <span>{t(`types.${type.id}`)}</span>
                    <small>
                      {formatKm(type.km, locale)} · {type.months} {locale === "fr" ? "mois" : "months"}
                    </small>
                  </li>
                ))}
            </ul>
            <p className="ax-dash-empty">{t("intervalsNote")}</p>
          </section>
        </>
      ) : null}
    </PortalShell>
  );
}
