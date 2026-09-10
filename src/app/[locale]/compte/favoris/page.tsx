"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const t = useTranslations("favorites");
  const { favorites } = useStore();
  const products = favorites.map((id) => getProduct(id)).filter((p) => p !== undefined);

  return (
    <PortalChrome>
      <PortalGate>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          {products.length === 0 ? (
            <p className="mt-6 text-white/60">{t("empty")}</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </PortalGate>
    </PortalChrome>
  );
}
