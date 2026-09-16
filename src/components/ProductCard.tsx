"use client";

import { categories } from "@/data/categories";
import { bestOffer, type Product } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { formatCad } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { useLocale, useTranslations } from "next-intl";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("catalog");
  const offer = bestOffer(product);
  const category = categories.find((c) => c.id === product.categoryId)!;

  return (
    <Link
      href={`/pieces/${category.slug}/${product.slug}`}
      className="surface-card group block overflow-hidden rounded-2xl transition hover:-translate-y-0.5"
    >
      <div className="flex h-44 items-center justify-center bg-[#111] p-6">
        <img src={withBase(product.image)} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-white/45">{product.brand}</p>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-white group-hover:text-orange">
          {product.name[locale]}
        </h3>
        <p className="mt-3 text-lg font-semibold text-orange">
          {t("from")} {formatCad(offer.price, locale)}
        </p>
        <p className="text-sm text-white/50">{t("offers", { count: product.offers.length })}</p>
      </div>
    </Link>
  );
}
