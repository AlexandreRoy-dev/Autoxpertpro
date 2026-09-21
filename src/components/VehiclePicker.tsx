"use client";

import { getVehicle, makes, modelsForMakeYear, vehicles, yearsForMake } from "@/data/vehicles";
import { withBase } from "@/lib/paths";
import type { GarageVehicle } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type Fields = {
  makeId: string;
  year: string;
  model: string;
  fitmentId: string;
};

function fieldsFromFitment(id?: string | null): Fields {
  const vehicle = id ? getVehicle(id) : undefined;
  if (!vehicle) {
    return { makeId: "", year: "", model: "", fitmentId: "" };
  }
  return {
    makeId: vehicle.makeId,
    year: String(vehicle.year),
    model: vehicle.model,
    fitmentId: vehicle.id,
  };
}

type Props = {
  onSelect: (fitmentId: string, vin?: string) => void;
  submitLabel: string;
  showVin?: boolean;
  initialFitmentId?: string | null;
  initialVin?: string;
  presets?: GarageVehicle[];
};

export function VehiclePicker({
  onSelect,
  submitLabel,
  showVin = false,
  initialFitmentId = null,
  initialVin = "",
  presets = [],
}: Props) {
  const t = useTranslations("picker");
  const [fields, setFields] = useState<Fields>(() => fieldsFromFitment(initialFitmentId));
  const [vin, setVin] = useState(initialVin);
  const [showAllPresets, setShowAllPresets] = useState(false);
  const { makeId, year, model, fitmentId } = fields;
  const visiblePresets = showAllPresets ? presets : presets.slice(0, 2);
  const extraPresets = Math.max(0, presets.length - 2);

  useEffect(() => {
    setFields(fieldsFromFitment(initialFitmentId));
  }, [initialFitmentId]);

  useEffect(() => {
    setVin(initialVin);
  }, [initialVin]);

  const years = useMemo(() => (makeId ? yearsForMake(makeId) : []), [makeId]);
  const models = useMemo(
    () => (makeId && year ? modelsForMakeYear(makeId, Number(year)) : []),
    [makeId, year],
  );
  const engines = useMemo(
    () => vehicles.filter((v) => v.makeId === makeId && v.year === Number(year) && v.model === model),
    [makeId, year, model],
  );

  const applyFitment = (id: string, nextVin = "") => {
    setFields(fieldsFromFitment(id));
    setVin(nextVin);
  };

  return (
    <form
      className="grid gap-3 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (fitmentId) onSelect(fitmentId, vin);
      }}
    >
      {presets.length > 0 ? (
        <div className="md:col-span-2">
          <p className="mb-2 text-sm text-muted">{t("presets")}</p>
          <div className="flex flex-wrap gap-2">
            {visiblePresets.map((item) => {
              const vehicle = getVehicle(item.fitmentId);
              if (!vehicle) return null;
              const active = fitmentId === vehicle.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`card flex items-center gap-2 px-3 py-2 text-left text-sm ${
                    active ? "border-accent" : ""
                  }`}
                  onClick={() => applyFitment(vehicle.id, item.vin || "")}
                >
                  <img src={withBase(vehicle.image)} alt="" className="h-8 w-12 object-contain" />
                  <span>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </span>
                </button>
              );
            })}
            {extraPresets > 0 && !showAllPresets ? (
              <button
                type="button"
                className="text-sm text-muted"
                onClick={() => setShowAllPresets(true)}
                aria-label={t("morePresets", { count: extraPresets })}
              >
                ({extraPresets})+
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      <label className="text-sm">
        <span className="mb-1 block text-muted">{t("make")}</span>
        <select
          className="select"
          value={makeId}
          onChange={(e) => {
            setFields({ makeId: e.target.value, year: "", model: "", fitmentId: "" });
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
        <span className="mb-1 block text-muted">{t("year")}</span>
        <select
          className="select"
          value={year}
          disabled={!makeId}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, year: e.target.value, model: "", fitmentId: "" }));
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
        <span className="mb-1 block text-muted">{t("model")}</span>
        <select
          className="select"
          value={model}
          disabled={!year}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, model: e.target.value, fitmentId: "" }));
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
        <span className="mb-1 block text-muted">{t("engine")}</span>
        <select
          className="select"
          value={fitmentId}
          disabled={!model}
          onChange={(e) => setFields((prev) => ({ ...prev, fitmentId: e.target.value }))}
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
          <span className="mb-1 block text-muted">{t("vin")}</span>
          <input
            className="input"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder={t("vinPlaceholder")}
          />
        </label>
      ) : null}
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-accent w-full md:w-auto" disabled={!fitmentId}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
