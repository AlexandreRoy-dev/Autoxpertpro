"use client";

import { AnimIn } from "@/components/AnimIn";
import { PageHeader } from "@/components/PageHeader";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { getCategory } from "@/data/categories";
import { bestOffer, similarProducts, type Product } from "@/data/products";
import { getVendor, type VendorId } from "@/data/vendors";
import { getVehicle } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { useChat } from "@/lib/chat";
import { productPrompt } from "@/lib/chatbot";
import { formatCad } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("product");
  const tc = useTranslations("catalog");
  const { addToCart, toggleFavorite, favorites, selectedFitmentId } = useStore();
  const { openChat } = useChat();
  const router = useRouter();
  const cheapest = bestOffer(product);
  const [vendorId, setVendorId] = useState<VendorId>(cheapest.vendorId);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "reviews" | "warranty">("description");
  const offer = product.offers.find((o) => o.vendorId === vendorId) ?? cheapest;
  const category = getCategory(product.categoryId)!;
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const related = similarProducts(product);
  const saved = favorites.includes(product.id);

  const sortedOffers = useMemo(
    () => [...product.offers].sort((a, b) => a.price - b.price),
    [product.offers],
  );

  return (
    <StorefrontChrome>
      <PageHeader
        title={product.name[locale]}
        lead={`${product.brand} · ${t("sku")} ${product.partNumber}`}
        crumbs={[
          { href: "/pieces", label: locale === "fr" ? "Pièces" : "Parts" },
          { href: `/pieces/${category.slug}`, label: category.slug },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <AnimIn className="surface-card flex items-center justify-center rounded-2xl bg-[#f3eee8] p-10">
            <img src={withBase(product.image)} alt="" className="max-h-[360px] w-full object-contain" />
          </AnimIn>
          <AnimIn delay={0.25}>
            <p className="text-sm text-black/50">
              {product.brand} · {t("sku")} {product.partNumber}
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight">{product.name[locale]}</h2>
            {vehicle ? (
              <p className="mt-3 text-sm text-black/55">
                {tc("fitment")} {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            ) : null}
            <p className="mt-6 text-4xl font-semibold">{formatCad(offer.price, locale)}</p>
            <p className="mt-1 text-sm text-black/50">{getVendor(offer.vendorId).name}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label className="text-sm">
                {t("qty")}
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || 1)}
                  className="input ml-2 w-20"
                />
              </label>
              <button
                type="button"
                className="btn btn-orange"
                disabled={offer.stock < 1}
                onClick={() => addToCart(product.id, offer.vendorId, qty)}
              >
                {t("add")}
              </button>
              <button
                type="button"
                className="btn btn-dark"
                disabled={offer.stock < 1}
                onClick={() => {
                  addToCart(product.id, offer.vendorId, qty);
                  router.push("/panier");
                }}
              >
                {t("buy")}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => toggleFavorite(product.id)}>
                {saved ? t("unfavorite") : t("favorite")}
              </button>
            </div>
            <p className="mt-3 text-sm text-black/55">
              {offer.stock > 0 ? t("stock", { count: offer.stock }) : tc("outOfStock")} ·{" "}
              {t("ships", { days: offer.shippingDays })}
            </p>

            <h2 className="mt-8 text-lg font-semibold">{t("vendorsTitle")}</h2>
            <div className="surface-card mt-3 divide-y divide-[#eee] rounded-xl">
              {sortedOffers.map((item) => (
                <button
                  key={item.vendorId}
                  type="button"
                  onClick={() => setVendorId(item.vendorId)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left ${
                    vendorId === item.vendorId ? "bg-orange/5" : ""
                  }`}
                >
                  <span>
                    <span className="font-medium">{getVendor(item.vendorId).name}</span>
                    <span className="ml-2 text-sm text-black/50">
                      {item.stock > 0 ? t("stock", { count: item.stock }) : tc("outOfStock")}
                    </span>
                  </span>
                  <span className="font-semibold">{formatCad(item.price, locale)}</span>
                </button>
              ))}
            </div>
          </AnimIn>
        </div>

        <div className="mt-12">
          <div className="flex gap-6 border-b border-[#ececec] text-sm">
            {(["description", "specs", "reviews", "warranty"] as const).map((id) => (
              <button
                key={id}
                type="button"
                className={`pb-3 ${tab === id ? "border-b-2 border-orange font-semibold" : "text-black/50"}`}
                onClick={() => setTab(id)}
              >
                {t(`tabs.${id}`)}
              </button>
            ))}
          </div>
          <div className="py-6 text-[15px] leading-relaxed text-black/75">
            {tab === "description" ? <p>{product.description[locale]}</p> : null}
            {tab === "specs" ? (
              <table className="w-full max-w-xl text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.key} className="border-b border-[#f0f0f0]">
                      <td className="py-2 text-black/50">{spec.label[locale]}</td>
                      <td className="py-2 font-medium">{spec.value[locale]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {tab === "reviews" ? <p>{t("reviewsEmpty")}</p> : null}
            {tab === "warranty" ? <p>{t("warrantyBody")}</p> : null}
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-6 pb-10">
            <h2 className="text-2xl font-semibold">{t("related")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => {
                const itemCat = getCategory(item.categoryId)!;
                const price = bestOffer(item);
                return (
                  <Link
                    key={item.id}
                    href={`/pieces/${itemCat.slug}/${item.slug}`}
                    className="surface-card rounded-2xl p-4"
                  >
                    <img src={withBase(item.image)} alt="" className="mx-auto h-28 object-contain" />
                    <p className="mt-3 text-sm font-semibold">{item.name[locale]}</p>
                    <p className="text-sm text-black/55">{formatCad(price.price, locale)}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mb-12 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-workshop p-6 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">{t("advisorTitle")}</h2>
            <p className="mt-1 text-white/65">{t("advisorBody")}</p>
          </div>
          <button type="button" className="btn btn-orange" onClick={() => openChat(productPrompt(product, locale))}>
            {t("advisorCta")}
          </button>
        </section>
      </div>
    </StorefrontChrome>
  );
}
