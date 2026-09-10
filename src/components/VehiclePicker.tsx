"use client";

import { makes, modelsForMakeYear, vehicles, yearsForMake } from "@/data/vehicles";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type Props = {
  onSelect: (fitmentId: string, vin?: string) => void;
  submitLabel: string;
  showVin?: boolean;
  dark?: boolean;
};

export function VehiclePicker({ onSelect, submitLabel, showVin = false, dark = false }: Props) {
  const t = useTranslations("picker");
  const [makeId, setMakeId] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [fitmentId, setFitmentId] = useState("");
  const [vin, setVin] = useState("");

  const years = useMemo(() => (makeId ? yearsForMake(makeId) : []), [makeId]);
  const models = useMemo(
    () => (makeId && year ? modelsForMakeYear(makeId, Number(year)) : []),
    [makeId, year],
  );
  const engines = useMemo(
    () => vehicles.filter((v) => v.makeId === makeId && v.year === Number(year) && v.model === model),
    [makeId, year, model],
  );

  return (
    <form
      className="grid gap-3 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (fitmentId) onSelect(fitmentId, vin);
      }}
    >
      <label className="text-sm">
        <span className={dark ? "mb-1 block text-white/70" : "mb-1 block text-muted"}>{t("make")}</span>
        <select
          className="select"
          value={makeId}
          onChange={(e) => {
            setMakeId(e.target.value);
            setYear("");
            setModel("");
            setFitmentId("");
          }}
        >
          <option value="">{t("placeholder")}</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className={dark ? "mb-1 block text-white/70" : "mb-1 block text-muted"}>{t("year")}</span>
        <select
          className="select"
          value={year}
          disabled={!makeId}
          onChange={(e) => {
            setYear(e.target.value);
            setModel("");
            setFitmentId("");
          }}
        >
          <option value="">{t("placeholder")}</option>
          {years.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className={dark ? "mb-1 block text-white/70" : "mb-1 block text-muted"}>{t("model")}</span>
        <select
          className="select"
          value={model}
          disabled={!year}
          onChange={(e) => {
            setModel(e.target.value);
            setFitmentId("");
          }}
        >
          <option value="">{t("placeholder")}</option>
          {models.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className={dark ? "mb-1 block text-white/70" : "mb-1 block text-muted"}>{t("engine")}</span>
        <select
          className="select"
          value={fitmentId}
          disabled={!model}
          onChange={(e) => setFitmentId(e.target.value)}
        >
          <option value="">{t("placeholder")}</option>
          {engines.map((engine) => (
            <option key={engine.id} value={engine.id}>
              {engine.engine}
            </option>
          ))}
        </select>
      </label>
      {showVin ? (
        <label className="text-sm md:col-span-2">
          <span className={dark ? "mb-1 block text-white/70" : "mb-1 block text-muted"}>{t("vin")}</span>
          <input
            className="input"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder={t("vinPlaceholder")}
          />
        </label>
      ) : null}
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-orange w-full md:w-auto" disabled={!fitmentId}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
