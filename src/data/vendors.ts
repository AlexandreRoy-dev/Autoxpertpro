export type VendorId = "autoxpert" | "napa" | "canadiantire" | "partsource";

export type Vendor = {
  id: VendorId;
  name: string;
  shortName: string;
};

export const vendors: Vendor[] = [
  { id: "autoxpert", name: "AutoXpert", shortName: "AX" },
  { id: "napa", name: "NAPA", shortName: "NAPA" },
  { id: "canadiantire", name: "Canadian Tire", shortName: "CT" },
  { id: "partsource", name: "PartSource", shortName: "PS" },
];

export function getVendor(id: VendorId) {
  return vendors.find((vendor) => vendor.id === id)!;
}
