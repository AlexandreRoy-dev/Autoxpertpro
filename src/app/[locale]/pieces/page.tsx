"use client";

import { AnimIn } from "@/components/AnimIn";
import { CatalogCrumbs } from "@/components/CatalogCrumbs";
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
      <section className="ax-store-page">
        <div className="container">
        <CatalogCrumbs items={[{ href: "/pieces", label: t("title") }]} />
        <h1 className="ax-store-title">{t("title")}</h1>
        <p className="ax-store-lead">
          {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.engine}` : t("allVehicles")}
        </p>
        <div className="row">
          {visible.map((category, index) => (
            <div className="col-xl-4 col-md-6" key={category.id} style={{ marginBottom: 24 }}>
            <AnimIn delay={index * 0.06}>
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
            </div>
          ))}
        </div>
        </div>
      </section>
    </StorefrontChrome>
  );
}
