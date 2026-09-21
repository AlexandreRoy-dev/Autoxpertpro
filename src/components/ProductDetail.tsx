"use client";

import { PageIntro } from "@/components/PageIntro";
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
  const tcat = useTranslations("categories");
  const tn = useTranslations("nav");
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
  const inStock = offer.stock > 0;

  const sortedOffers = useMemo(
    () => [...product.offers].sort((a, b) => a.price - b.price),
    [product.offers],
  );

  return (
    <div className="wrap py-12">
      <PageIntro
        title={product.name[locale]}
        crumbs={[
          { href: "/pieces", label: tn("parts") },
          { href: `/pieces/${category.slug}`, label: tcat(category.id) },
          { href: `/pieces/${category.slug}/${product.slug}`, label: product.name[locale] },
        ]}
      />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="card flex min-h-[280px] items-center justify-center p-8">
          <img src={withBase(product.image)} alt="" className="max-h-80 w-full object-contain" />
        </div>

        <div>
          <p className="text-sm text-muted">
            {product.brand} · {t("sku")} {product.partNumber}
          </p>
          {vehicle ? (
            <p className="mt-2 text-sm">
              {tc("fitment")} {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          ) : null}
          <p className="mt-6 display text-4xl">{formatCad(offer.price, locale)}</p>
          <p className="mt-1 text-muted">{getVendor(offer.vendorId).name}</p>
          <p className={`mt-2 text-sm ${inStock ? "text-ink" : "text-accent"}`}>
            {inStock ? t("stock", { count: offer.stock }) : tc("outOfStock")} · {t("ships", { days: offer.shippingDays })}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <label className="text-sm">
              <span className="mb-1 block text-muted">{t("qty")}</span>
              <input
                type="number"
                min={1}
                className="input w-20"
                value={qty}
                onChange={(event) => setQty(Number(event.target.value) || 1)}
              />
            </label>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={!inStock}
              onClick={() => addToCart(product.id, offer.vendorId, qty)}
            >
              {t("add")}
            </button>
            <button
              type="button"
              className="btn btn-accent"
              disabled={!inStock}
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
        </div>
      </div>

      <section className="mt-12">
        <h2 className="display text-2xl">{t("vendorsTitle")}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {sortedOffers.map((item) => {
            const active = vendorId === item.vendorId;
            return (
              <button
                key={item.vendorId}
                type="button"
                className={`card flex items-center justify-between p-4 text-left ${active ? "border-accent" : ""}`}
                onClick={() => setVendorId(item.vendorId)}
              >
                <span>
                  <strong className="block">{getVendor(item.vendorId).name}</strong>
                  <small className="text-muted">
                    {item.stock > 0 ? t("stock", { count: item.stock }) : tc("outOfStock")}
                  </small>
                </span>
                <em className="not-italic font-semibold">{formatCad(item.price, locale)}</em>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-2 border-b border-line">
          {(["description", "specs", "reviews", "warranty"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className={`px-3 py-2 text-sm ${tab === id ? "border-b-2 border-accent font-semibold" : "text-muted"}`}
              onClick={() => setTab(id)}
            >
              {t(`tabs.${id}`)}
            </button>
          ))}
        </div>
        <div className="mt-5 max-w-3xl text-muted">
          {tab === "description" ? <p>{product.description[locale]}</p> : null}
          {tab === "specs" ? (
            <dl className="grid gap-3">
              {product.specs.map((spec) => (
                <div key={spec.key} className="grid grid-cols-2 gap-4 border-b border-line pb-2">
                  <dt>{spec.label[locale]}</dt>
                  <dd>{spec.value[locale]}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {tab === "reviews" ? <p>{t("reviewsEmpty")}</p> : null}
          {tab === "warranty" ? <p>{t("warrantyBody")}</p> : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="display text-2xl">{t("related")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => {
              const itemCat = getCategory(item.categoryId)!;
              const price = bestOffer(item);
              return (
                <Link key={item.id} href={`/pieces/${itemCat.slug}/${item.slug}`} className="card p-4">
                  <img src={withBase(item.image)} alt="" className="mb-3 h-24 w-full object-contain" />
                  <p className="text-sm font-semibold">{item.name[locale]}</p>
                  <small className="text-muted">{formatCad(price.price, locale)}</small>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="card mt-12 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <h2 className="display text-2xl">{t("advisorTitle")}</h2>
          <p className="mt-2 text-muted">{t("advisorBody")}</p>
        </div>
        <button type="button" className="btn btn-accent" onClick={() => openChat(productPrompt(product, locale))}>
          {t("advisorCta")}
        </button>
      </section>
    </div>
  );
}
