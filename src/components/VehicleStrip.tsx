"use client";

import { getVehicle } from "@/data/vehicles";
import { withBase } from "@/lib/paths";
import type { GarageVehicle } from "@/lib/store";

export function VehicleStrip({
  garage,
  selectedId,
  onSelect,
}: {
  garage: GarageVehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {garage.map((item) => {
        const vehicle = getVehicle(item.fitmentId);
        if (!vehicle) return null;
        const active = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`card flex min-w-[220px] items-center gap-3 p-3 text-left ${
              active ? "border-accent" : ""
            }`}
          >
            <img src={withBase(vehicle.image)} alt="" className="h-12 w-16 object-contain" />
            <span>
              <strong className="block text-sm">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </strong>
              <small className="text-muted">{vehicle.engine}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}
