"use client";

import { getVehicle } from "@/data/vehicles";
import { withBase } from "@/lib/paths";
import type { GarageVehicle } from "@/lib/store";
import { useTranslations } from "next-intl";

export function VehicleStrip({
  garage,
  selectedId,
  onSelect,
}: {
  garage: GarageVehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("entretien");

  if (garage.length === 0) return null;

  return (
    <div className="ax-vehicle-strip" role="listbox" aria-label={t("select")}>
      {garage.map((item) => {
        const vehicle = getVehicle(item.fitmentId);
        if (!vehicle) return null;
        const active = item.id === selectedId;
        return (
          <button
            type="button"
            role="option"
            aria-selected={active}
            key={item.id}
            className={`ax-vehicle-chip${active ? " is-active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <img src={withBase(vehicle.image)} alt="" />
            <span>
              <strong>
                {vehicle.make} {vehicle.model}
              </strong>
              <small>
                {vehicle.year} · {vehicle.engine}
              </small>
            </span>
          </button>
        );
      })}
    </div>
  );
}
