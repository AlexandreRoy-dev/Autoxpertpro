"use client";

import { AnimIn } from "@/components/AnimIn";
import { PageIntro } from "@/components/PageIntro";
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
    <div className="wrap py-12">
      <PageIntro
        title={t("title")}
        lead={vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.engine}` : t("allVehicles")}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((category, index) => {
          const count = available.filter((p) => p.categoryId === category.id).length;
          return (
            <AnimIn key={category.id} delay={index * 0.06}>
              <Link href={`/pieces/${category.slug}`} className="card block p-5 hover:border-ink">
                <h2 className="font-semibold">{tc(category.id)}</h2>
                <p className="mt-1 text-sm text-muted">{count}</p>
              </Link>
            </AnimIn>
          );
        })}
      </div>
    </div>
  );
}
