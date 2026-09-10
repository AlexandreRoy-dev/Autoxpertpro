export type EntretienTypeId =
  | "oil"
  | "oil-filter"
  | "cabin-filter"
  | "air-filter"
  | "plugs"
  | "coolant"
  | "brakes"
  | "tires"
  | "battery"
  | "other";

export type EntretienType = {
  id: EntretienTypeId;
  km: number;
  months: number;
};

export const entretienTypes: EntretienType[] = [
  { id: "oil", km: 8000, months: 6 },
  { id: "oil-filter", km: 8000, months: 6 },
  { id: "cabin-filter", km: 20000, months: 12 },
  { id: "air-filter", km: 24000, months: 18 },
  { id: "plugs", km: 40000, months: 36 },
  { id: "coolant", km: 80000, months: 60 },
  { id: "brakes", km: 30000, months: 24 },
  { id: "tires", km: 10000, months: 6 },
  { id: "battery", km: 60000, months: 48 },
  { id: "other", km: 0, months: 0 },
];

export const demoOrders = [
  {
    id: "AX-10482",
    date: "2026-02-12",
    status: "delivered" as const,
    productId: "wagner-pads-front",
    vendorId: "napa" as const,
    qty: 1,
    total: 72.45,
  },
  {
    id: "AX-10419",
    date: "2026-01-20",
    status: "shipped" as const,
    productId: "fram-oil-filter",
    vendorId: "autoxpert" as const,
    qty: 1,
    total: 14.99,
  },
  {
    id: "AX-10388",
    date: "2025-11-04",
    status: "delivered" as const,
    productId: "wix-air-filter",
    vendorId: "partsource" as const,
    qty: 1,
    total: 22.99,
  },
  {
    id: "AX-10312",
    date: "2025-10-18",
    status: "delivered" as const,
    productId: "pennzoil-0w20",
    vendorId: "canadiantire" as const,
    qty: 1,
    total: 42.99,
  },
  {
    id: "AX-10290",
    date: "2025-09-02",
    status: "delivered" as const,
    productId: "ngk-laser-iridium",
    vendorId: "autoxpert" as const,
    qty: 1,
    total: 69.99,
  },
];
