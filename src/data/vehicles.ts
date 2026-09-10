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
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "honda-civic-2016-20",
    makeId: "honda",
    make: "Honda",
    model: "Civic",
    year: 2016,
    engine: "2.0L L4",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "toyota-rav4-2018-25",
    makeId: "toyota",
    make: "Toyota",
    model: "RAV4",
    year: 2018,
    engine: "2.5L L4",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "toyota-corolla-2021-20",
    makeId: "toyota",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    engine: "2.0L L4",
    image:
      "https://images.unsplash.com/photo-1623869675781-80daad0b0b5d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ford-f150-2021-35",
    makeId: "ford",
    make: "Ford",
    model: "F-150",
    year: 2021,
    engine: "3.5L V6 EcoBoost",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "kia-rio-2009-16",
    makeId: "kia",
    make: "Kia",
    model: "Rio",
    year: 2009,
    engine: "1.6L L4",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "kia-sportage-2020-24",
    makeId: "kia",
    make: "Kia",
    model: "Sportage",
    year: 2020,
    engine: "2.4L L4",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hyundai-tucson-2019-20",
    makeId: "hyundai",
    make: "Hyundai",
    model: "Tucson",
    year: 2019,
    engine: "2.0L L4",
    image:
      "https://images.unsplash.com/photo-1617531657526-561df529073e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chevrolet-silverado-2020-53",
    makeId: "chevrolet",
    make: "Chevrolet",
    model: "Silverado",
    year: 2020,
    engine: "5.3L V8",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "volkswagen-jetta-2019-14t",
    makeId: "volkswagen",
    make: "Volkswagen",
    model: "Jetta",
    year: 2019,
    engine: "1.4L L4 turbo",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mazda-cx5-2021-25",
    makeId: "mazda",
    make: "Mazda",
    model: "CX-5",
    year: 2021,
    engine: "2.5L L4",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "nissan-rogue-2020-25",
    makeId: "nissan",
    make: "Nissan",
    model: "Rogue",
    year: 2020,
    engine: "2.5L L4",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "subaru-outback-2018-25",
    makeId: "subaru",
    make: "Subaru",
    model: "Outback",
    year: 2018,
    engine: "2.5L H4",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ram-1500-2019-57",
    makeId: "ram",
    make: "Ram",
    model: "1500",
    year: 2019,
    engine: "5.7L V8",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jeep-wrangler-2018-36",
    makeId: "jeep",
    make: "Jeep",
    model: "Wrangler",
    year: 2018,
    engine: "3.6L V6",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80",
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
