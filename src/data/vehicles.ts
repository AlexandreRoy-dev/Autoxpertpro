import { cutoutForModel } from "@/data/cutouts";

export type Make = {
  id: string;
  name: string;
};

export type VehicleFitment = {
  id: string;
  makeId: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  image: string;
};

export const makes: Make[] = [
  { id: "honda", name: "Honda" },
  { id: "toyota", name: "Toyota" },
  { id: "ford", name: "Ford" },
  { id: "kia", name: "Kia" },
  { id: "hyundai", name: "Hyundai" },
  { id: "chevrolet", name: "Chevrolet" },
  { id: "volkswagen", name: "Volkswagen" },
  { id: "mazda", name: "Mazda" },
  { id: "nissan", name: "Nissan" },
  { id: "subaru", name: "Subaru" },
  { id: "ram", name: "Ram" },
  { id: "jeep", name: "Jeep" },
];

export const vehicles: VehicleFitment[] = [
  {
    id: "honda-civic-2018-15t",
    makeId: "honda",
    make: "Honda",
    model: "Civic",
    year: 2018,
    engine: "1.5L L4 turbo",
    image: cutoutForModel("Civic"),
  },
  {
    id: "honda-civic-2016-20",
    makeId: "honda",
    make: "Honda",
    model: "Civic",
    year: 2016,
    engine: "2.0L L4",
    image: cutoutForModel("Civic"),
  },
  {
    id: "toyota-rav4-2018-25",
    makeId: "toyota",
    make: "Toyota",
    model: "RAV4",
    year: 2018,
    engine: "2.5L L4",
    image: cutoutForModel("RAV4"),
  },
  {
    id: "toyota-corolla-2021-20",
    makeId: "toyota",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    engine: "2.0L L4",
    image: cutoutForModel("Corolla"),
  },
  {
    id: "ford-f150-2021-35",
    makeId: "ford",
    make: "Ford",
    model: "F-150",
    year: 2021,
    engine: "3.5L V6 EcoBoost",
    image: cutoutForModel("F-150"),
  },
  {
    id: "kia-rio-2009-16",
    makeId: "kia",
    make: "Kia",
    model: "Rio",
    year: 2009,
    engine: "1.6L L4",
    image: cutoutForModel("Rio"),
  },
  {
    id: "kia-sportage-2020-24",
    makeId: "kia",
    make: "Kia",
    model: "Sportage",
    year: 2020,
    engine: "2.4L L4",
    image: cutoutForModel("Sportage"),
  },
  {
    id: "hyundai-tucson-2019-20",
    makeId: "hyundai",
    make: "Hyundai",
    model: "Tucson",
    year: 2019,
    engine: "2.0L L4",
    image: cutoutForModel("Tucson"),
  },
  {
    id: "chevrolet-silverado-2020-53",
    makeId: "chevrolet",
    make: "Chevrolet",
    model: "Silverado",
    year: 2020,
    engine: "5.3L V8",
    image: cutoutForModel("Silverado"),
  },
  {
    id: "volkswagen-jetta-2019-14t",
    makeId: "volkswagen",
    make: "Volkswagen",
    model: "Jetta",
    year: 2019,
    engine: "1.4L L4 turbo",
    image: cutoutForModel("Jetta"),
  },
  {
    id: "mazda-cx5-2021-25",
    makeId: "mazda",
    make: "Mazda",
    model: "CX-5",
    year: 2021,
    engine: "2.5L L4",
    image: cutoutForModel("CX-5"),
  },
  {
    id: "nissan-rogue-2020-25",
    makeId: "nissan",
    make: "Nissan",
    model: "Rogue",
    year: 2020,
    engine: "2.5L L4",
    image: cutoutForModel("Rogue"),
  },
  {
    id: "subaru-outback-2018-25",
    makeId: "subaru",
    make: "Subaru",
    model: "Outback",
    year: 2018,
    engine: "2.5L H4",
    image: cutoutForModel("Outback"),
  },
  {
    id: "ram-1500-2019-57",
    makeId: "ram",
    make: "Ram",
    model: "1500",
    year: 2019,
    engine: "5.7L V8",
    image: cutoutForModel("1500"),
  },
  {
    id: "jeep-wrangler-2018-36",
    makeId: "jeep",
    make: "Jeep",
    model: "Wrangler",
    year: 2018,
    engine: "3.6L V6",
    image: cutoutForModel("Wrangler"),
  },
];

export function getVehicle(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function yearsForMake(makeId: string) {
  return [...new Set(vehicles.filter((v) => v.makeId === makeId).map((v) => v.year))].sort(
    (a, b) => b - a,
  );
}

export function modelsForMakeYear(makeId: string, year: number) {
  return [
    ...new Set(
      vehicles.filter((v) => v.makeId === makeId && v.year === year).map((v) => v.model),
    ),
  ];
}

export function enginesForMakeYearModel(makeId: string, year: number, model: string) {
  return vehicles.filter((v) => v.makeId === makeId && v.year === year && v.model === model);
}
