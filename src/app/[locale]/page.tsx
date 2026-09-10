"use client";

import { AnimIn } from "@/components/AnimIn";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { VehiclePicker } from "@/components/VehiclePicker";
import { categories } from "@/data/categories";
import { getVehicle } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("categories");
  const tp = useTranslations("picker");
  const { setSelectedFitment, selectedFitmentId } = useStore();
  const router = useRouter();
  const selected = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const shortcuts = categories.filter((c) => c.shortcut);

  return (
    <StorefrontChrome>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14">
        <AnimIn>
          <p className="text-sm font-medium text-orange">{t("kicker")}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-lg text-black/65">{t("lead")}</p>
        </AnimIn>
        <AnimIn delay={0.3} className="mt-10 rounded-2xl border border-[#ececec] bg-white/80 p-6 shadow-sm">
          <VehiclePicker
            submitLabel={tp("continue")}
            onSelect={(id) => {
              setSelectedFitment(id);
              router.push("/pieces");
            }}
          />
          {selected ? (
            <p className="mt-4 text-sm text-black/55">
              {selected.year} {selected.make} {selected.model} · {selected.engine}
            </p>
          ) : (
            <p className="mt-4 text-sm text-black/45">{t("vehicleNeeded")}</p>
          )}
        </AnimIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <AnimIn>
          <h2 className="text-2xl font-semibold">{t("categoriesTitle")}</h2>
        </AnimIn>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((category, index) => (
            <AnimIn key={category.id} delay={index * 0.08}>
              <Link
                href={`/pieces/${category.slug}`}
                className="block rounded-xl border border-[#ececec] bg-white p-5 hover:border-orange"
              >
                <h3 className="font-semibold">{tc(category.id)}</h3>
              </Link>
            </AnimIn>
          ))}
        </div>
      </section>

      <section className="border-t border-[#f0f0f0] bg-[#fafafa] py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <AnimIn>
            <h2 className="text-2xl font-semibold">{t("howTitle")}</h2>
            <p className="mt-3 text-black/65">{t("howBody")}</p>
          </AnimIn>
          <AnimIn delay={0.3}>
            <h2 className="text-2xl font-semibold">{t("trustTitle")}</h2>
            <p className="mt-3 text-black/65">{t("trustBody")}</p>
          </AnimIn>
        </div>
      </section>
    </StorefrontChrome>
  );
}
