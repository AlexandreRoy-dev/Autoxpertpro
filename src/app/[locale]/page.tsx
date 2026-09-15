"use client";

import { AnimIn } from "@/components/AnimIn";
import { HeroMechanicChat } from "@/components/HeroMechanicChat";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { VehiclePicker } from "@/components/VehiclePicker";
import { categories } from "@/data/categories";
import { getVehicle } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { useStore } from "@/lib/store";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

const shortcutArt: Record<string, string> = {
  brakes: "/parts/pads.svg",
  filters: "/parts/oil-filter.svg",
  oil: "/parts/oil.svg",
  ignition: "/parts/plugs.svg",
  battery: "/parts/battery.svg",
  wipers: "/parts/wiper.svg",
};

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
      <section className="relative isolate min-h-[100dvh] overflow-hidden bg-workshop text-white">
        <img
          src={withBase("/hero/workshop.jpg")}
          alt=""
          className="hero-wash absolute inset-0 h-full w-full object-cover brightness-[1.55] contrast-110 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111]/88 via-[#111]/45 to-transparent" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-6 px-4 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
          <div>
            <div className="anim-in is-in">
              <p className="text-sm font-medium text-orange">{t("kicker")}</p>
              <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white md:text-[2.75rem]">{t("title")}</h1>
              <p className="mt-4 max-w-xl text-base text-white/80">{t("lead")}</p>
            </div>
            <div className="hero-form anim-in is-in mt-6 rounded-2xl bg-[#111]/70 p-5 ring-1 ring-white/15 backdrop-blur-sm" style={{ animationDelay: "0.3s" }}>
              <VehiclePicker
                dark
                submitLabel={tp("continue")}
                onSelect={(id) => {
                  setSelectedFitment(id);
                  router.push("/pieces");
                }}
              />
              {selected ? (
                <p className="mt-4 text-sm text-white/60">
                  {selected.year} {selected.make} {selected.model} · {selected.engine}
                </p>
              ) : (
                <p className="mt-4 text-sm text-white/45">{t("vehicleNeeded")}</p>
              )}
            </div>
          </div>
          <div className="anim-in is-in" style={{ animationDelay: "0.2s" }}>
            <HeroMechanicChat />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <AnimIn>
          <h2 className="text-2xl font-semibold">{t("categoriesTitle")}</h2>
        </AnimIn>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((category, index) => (
            <AnimIn key={category.id} delay={index * 0.08}>
              <Link
                href={`/pieces/${category.slug}`}
                className="surface-card group flex items-center gap-4 overflow-hidden rounded-2xl p-4 transition hover:-translate-y-0.5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f3eee8]">
                  <img src={withBase(shortcutArt[category.id] ?? "/parts/rotor.svg")} alt="" className="h-10 w-10 object-contain" />
                </div>
                <h3 className="font-semibold group-hover:text-orange">{tc(category.id)}</h3>
              </Link>
            </AnimIn>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-workshop py-16 text-white">
        <img src={withBase("/hero/workshop.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <AnimIn>
            <h2 className="text-2xl font-semibold">{t("howTitle")}</h2>
            <p className="mt-3 text-white/70">{t("howBody")}</p>
          </AnimIn>
          <AnimIn delay={0.3}>
            <h2 className="text-2xl font-semibold">{t("trustTitle")}</h2>
            <p className="mt-3 text-white/70">{t("trustBody")}</p>
          </AnimIn>
        </div>
      </section>
    </StorefrontChrome>
  );
}
