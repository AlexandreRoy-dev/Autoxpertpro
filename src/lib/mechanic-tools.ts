import { categories, getCategory } from "@/data/categories";
import { entretienTypes } from "@/data/entretien";
import { bestOffer, products, productsForVehicle, type Product } from "@/data/products";
import { getVendor } from "@/data/vendors";
import { getVehicle } from "@/data/vehicles";
import { formatCad, formatKm } from "@/lib/format";

export function searchCatalogue(query: string, locale: "fr" | "en", fitmentId?: string | null) {
  const hay = query.toLowerCase();
  const pool = productsForVehicle(fitmentId);
  const scored = pool
    .map((product) => {
      const blob = `${product.brand} ${product.partNumber} ${product.name[locale]} ${product.description[locale]} ${product.categoryId}`.toLowerCase();
      const score = hay
        .split(/\s+/)
        .filter((word) => word.length > 2)
        .reduce((sum, word) => sum + (blob.includes(word) ? 2 : 0), 0);
      return { product, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.product);

  const category = categories.find(
    (item) => hay.includes(item.id) || hay.includes(item.slug) || item.id.includes(hay),
  );
  const found = scored.length ? scored : category ? pool.filter((p) => p.categoryId === category.id) : [];

  return found.slice(0, 5).map((product) => serializeProduct(product, locale));
}

export function serializeProduct(product: Product, locale: "fr" | "en") {
  const category = getCategory(product.categoryId)!;
  const offer = bestOffer(product);
  return {
    brand: product.brand,
    name: product.name[locale],
    partNumber: product.partNumber,
    href: `/pieces/${category.slug}/${product.slug}`,
    bestPrice: formatCad(offer.price, locale),
    vendor: getVendor(offer.vendorId).name,
    stock: offer.stock,
    offers: [...product.offers]
      .sort((a, b) => a.price - b.price)
      .map((item) => ({
        vendor: getVendor(item.vendorId).name,
        price: formatCad(item.price, locale),
        stock: item.stock,
        shippingDays: item.shippingDays,
      })),
  };
}

export function vehicleSnapshot(fitmentId?: string | null) {
  const vehicle = fitmentId ? getVehicle(fitmentId) : null;
  if (!vehicle) return { selected: false as const };
  return {
    selected: true as const,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    engine: vehicle.engine,
    id: vehicle.id,
  };
}

export function entretienSnapshot(locale: "fr" | "en", typeHint?: string) {
  const hint = typeHint?.toLowerCase() ?? "";
  const match =
    entretienTypes.find((item) => hint && item.id.includes(hint.replace(/\s+/g, "-"))) ??
    entretienTypes.find((item) => item.id === "oil")!;
  return entretienTypes
    .filter((item) => item.km > 0)
    .map((item) => ({
      id: item.id,
      km: formatKm(item.km, locale),
      months: item.months,
      highlighted: item.id === match.id,
    }));
}

export function catalogueCount() {
  return { products: products.length, categories: categories.length };
}
