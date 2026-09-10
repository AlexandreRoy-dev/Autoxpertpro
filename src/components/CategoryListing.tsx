"use client";

import { AnimIn } from "@/components/AnimIn";
import { ProductCard } from "@/components/ProductCard";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import type { Category } from "@/data/categories";
import { productsForCategory } from "@/data/products";
import { getVehicle } from "@/data/vehicles";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function CategoryListing({ category }: { category: Category }) {
  const t = useTranslations("catalog");
  const tc = useTranslations("categories");
  const { selectedFitmentId } = useStore();
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const [brand, setBrand] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const list = useMemo(() => {
    return productsForCategory(category.id, selectedFitmentId).filter((product) => {
      const brandOk = brand === "all" || product.brand === brand;
      const stockOk = !inStockOnly || product.offers.some((o) => o.stock > 0);
      return brandOk && stockOk;
    });
  }, [category.id, selectedFitmentId, brand, inStockOnly]);

  const brands = [
    ...new Set(productsForCategory(category.id, selectedFitmentId).map((p) => p.brand)),
  ];

  return (
    <StorefrontChrome>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <AnimIn>
          <p className="text-sm text-black/45">
            {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : t("allVehicles")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{tc(category.id)}</h1>
        </AnimIn>
        <div className="mt-6 flex flex-wrap gap-3">
          <select className="select max-w-xs" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="all">{t("allBrands")}</option>
            {brands.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            {t("stockFilter")}
          </label>
        </div>
        {list.length === 0 ? (
          <p className="mt-10 text-black/55">{t("empty")}</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product, index) => (
              <AnimIn key={product.id} delay={index * 0.05}>
                <ProductCard product={product} />
              </AnimIn>
            ))}
          </div>
        )}
      </div>
    </StorefrontChrome>
  );
}
