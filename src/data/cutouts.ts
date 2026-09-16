/** Transparent stock / template car cutouts in /public/cutouts. */
export const cutouts = {
  hero: "/cutouts/hero-car.png",
  hero2: "/cutouts/hero-car-2.png",
  page: "/cutouts/page-car.png",
  sedan: "/cutouts/sedan.png",
  suv: "/cutouts/suv.png",
  truck: "/cutouts/truck.png",
} as const;

const trucks = new Set(["F-150", "Silverado", "1500"]);
const suvs = new Set(["RAV4", "Sportage", "Tucson", "CX-5", "Rogue", "Outback", "Wrangler"]);

export function cutoutForModel(model: string) {
  if (trucks.has(model)) return cutouts.truck;
  if (suvs.has(model)) return cutouts.suv;
  return cutouts.sedan;
}
