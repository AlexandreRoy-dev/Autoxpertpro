"use client";

import { AnimIn } from "@/components/AnimIn";
import { PageHeader } from "@/components/PageHeader";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { categories } from "@/data/categories";
import { productsForVehicle } from "@/data/products";
import { getVehicle } from "@/data/vehicles";
import { Link } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function PiecesIndexPage() {
  const t = useTranslations("catalog");
  const tc = useTranslations("categories");
  const { selectedFitmentId } = useStore();
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const available = productsForVehicle(selectedFitmentId);
  const visible = categories.filter((category) =>
    available.some((product) => product.categoryId === category.id),
  );

  return (
    <StorefrontChrome>
      <PageHeader
        title={t("title")}
        lead={vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.engine}` : t("allVehicles")}
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((category, index) => (
            <AnimIn key={category.id} delay={index * 0.06}>
              <Link
                href={`/pieces/${category.slug}`}
                className="surface-card block rounded-2xl p-5 transition hover:-translate-y-0.5 hover:text-orange"
              >
                <h2 className="font-semibold">{tc(category.id)}</h2>
                <p className="mt-1 text-sm text-black/50">
                  {available.filter((p) => p.categoryId === category.id).length}{" "}
                  {available.filter((p) => p.categoryId === category.id).length > 1 ? "pièces" : "pièce"}
                </p>
              </Link>
            </AnimIn>
          ))}
        </div>
      </div>
    </StorefrontChrome>
  );
}
