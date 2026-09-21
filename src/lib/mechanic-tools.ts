import { entretienTypes } from "@/data/entretien";
import { bestOffer, productsForVehicle, type Product } from "@/data/products";
import { getVendor } from "@/data/vendors";
import { getVehicle } from "@/data/vehicles";

export function vehicleSnapshot(fitmentId?: string | null) {
  const vehicle = fitmentId ? getVehicle(fitmentId) : undefined;
  if (!vehicle) {
    return { selected: false as const };
  }
  return {
    selected: true as const,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    engine: vehicle.engine,
    id: vehicle.id,
  };
}

export function searchCatalogue(query: string, locale: "fr" | "en", fitmentId?: string | null) {
  const hay = query.toLowerCase();
  const pool = productsForVehicle(fitmentId);
  const matches = pool
    .filter((product) => {
      const text = `${product.brand} ${product.partNumber} ${product.name[locale]} ${product.description[locale]} ${product.categoryId}`;
      return hay
        .split(/\s+/)
        .filter((word) => word.length > 2)
        .some((word) => text.toLowerCase().includes(word));
    })
    .slice(0, 6)
    .map((product: Product) => {
      const offer = bestOffer(product);
      return {
        brand: product.brand,
        partNumber: product.partNumber,
        name: product.name[locale],
        price: offer.price,
        vendor: getVendor(offer.vendorId).name,
        stock: offer.stock,
        slug: product.slug,
        categoryId: product.categoryId,
      };
    });
  return { query, count: matches.length, results: matches };
}

export function entretienSnapshot(locale: "fr" | "en", type?: string) {
  const needle = type?.toLowerCase() ?? "";
  const rows = entretienTypes
    .filter((item) => item.km > 0)
    .filter((item) => !needle || item.id.includes(needle) || needle.includes(item.id));
  return {
    locale,
    note:
      locale === "fr"
        ? "Intervalles de référence. Le manuel du propriétaire prime."
        : "Reference intervals. The owner’s manual wins.",
    intervals: rows.map((item) => ({
      type: item.id,
      km: item.km,
      months: item.months,
    })),
  };
}
