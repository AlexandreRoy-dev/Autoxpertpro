/** Unsplash stock photos, stored in /public/stock. */
export const texture = {
  darkGray: "/textures/dark-gray.svg",
} as const;

export const stock = {
  garage: "/stock/garage.jpg",
  mechanic: "/stock/mechanic.jpg",
  sedan: "/stock/sedan.jpg",
  engine: "/stock/engine.jpg",
  winter: "/stock/winter.jpg",
  brakes: "/stock/brakes.jpg",
  wheels: "/stock/wheels.jpg",
  nightCar: "/stock/night-car.jpg",
  battery: "/stock/battery.jpg",
} as const;

export const categoryStock: Record<string, string> = {
  brakes: stock.brakes,
  filters: stock.engine,
  oil: stock.engine,
  ignition: stock.wheels,
  battery: stock.battery,
  wipers: stock.winter,
  cooling: stock.engine,
  suspension: stock.wheels,
  belts: stock.engine,
  electrical: stock.battery,
  exhaust: stock.nightCar,
  hvac: stock.sedan,
  steering: stock.wheels,
  "fuel-air": stock.engine,
};
