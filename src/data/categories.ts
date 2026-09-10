export type CategoryId =
  | "brakes"
  | "filters"
  | "oil"
  | "ignition"
  | "battery"
  | "wipers"
  | "cooling"
  | "suspension"
  | "belts"
  | "electrical"
  | "exhaust"
  | "hvac"
  | "steering"
  | "fuel-air";

export type Category = {
  id: CategoryId;
  slug: string;
  group: string;
  shortcut?: boolean;
};

export const categories: Category[] = [
  { id: "brakes", slug: "freins", group: "brake-wheel-hub", shortcut: true },
  { id: "filters", slug: "filtres", group: "engine", shortcut: true },
  { id: "oil", slug: "huile", group: "engine", shortcut: true },
  { id: "ignition", slug: "allumage", group: "ignition", shortcut: true },
  { id: "battery", slug: "batterie", group: "electrical", shortcut: true },
  { id: "wipers", slug: "essuie-glaces", group: "wiper-washer", shortcut: true },
  { id: "cooling", slug: "refroidissement", group: "cooling-system" },
  { id: "suspension", slug: "suspension", group: "suspension" },
  { id: "belts", slug: "courroies", group: "belt-drive" },
  { id: "electrical", slug: "electricite", group: "electrical" },
  { id: "exhaust", slug: "echappement", group: "exhaust-emission" },
  { id: "hvac", slug: "climatisation", group: "heat-ac" },
  { id: "steering", slug: "direction", group: "steering" },
  { id: "fuel-air", slug: "carburant-air", group: "fuel-air" },
];

export function getCategory(idOrSlug: string) {
  return categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
