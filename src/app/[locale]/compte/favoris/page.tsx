"use client";

import { PageIntro } from "@/components/PageIntro";
import { PortalGate } from "@/components/PortalGate";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const t = useTranslations("favorites");
  const { favorites } = useStore();
  const products = favorites.map((id) => getProduct(id)).filter((product) => product !== undefined);

  return (
    <PortalGate>
      <div className="wrap py-12">
        <PageIntro title={t("title")} />
        {products.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PortalGate>
  );
}
