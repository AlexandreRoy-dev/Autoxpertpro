"use client";

import { PortalShell } from "@/components/PortalShell";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const t = useTranslations("favorites");
  const { favorites } = useStore();
  const products = favorites.map((id) => getProduct(id)).filter((product) => product !== undefined);

  return (
    <PortalShell title={t("title")}>
      {products.length === 0 ? (
        <div className="ax-empty-card">
          <p>{t("empty")}</p>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-xl-4 col-md-6" key={product.id} style={{ marginBottom: 24 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
