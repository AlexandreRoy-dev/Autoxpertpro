"use client";

import { AnimIn } from "@/components/AnimIn";
import { CatalogCrumbs } from "@/components/CatalogCrumbs";
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
    <StorefrontChrome>
      <section className="ax-product">
        <div className="container">
          <CatalogCrumbs
            items={[
              { href: "/pieces", label: tn("parts") },
              { href: `/pieces/${category.slug}`, label: tcat(category.id) },
              { href: `/pieces/${category.slug}/${product.slug}`, label: product.name[locale] },
            ]}
          />

          <div className="ax-product__grid">
            <AnimIn className="ax-product__media">
              <img src={withBase(product.image)} alt="" />
            </AnimIn>

            <AnimIn delay={0.2} className="ax-product__buy">
              <p className="ax-product__meta">
                {product.brand} · {t("sku")} {product.partNumber}
              </p>
              <h1>{product.name[locale]}</h1>
              {vehicle ? (
                <p className="ax-product__fit">
                  {tc("fitment")} {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
              ) : null}
              <p className="ax-product__price">{formatCad(offer.price, locale)}</p>
              <p className="ax-product__vendor">{getVendor(offer.vendorId).name}</p>
              <p className={`ax-product__stock${inStock ? "" : " is-out"}`}>
                {inStock ? t("stock", { count: offer.stock }) : tc("outOfStock")} ·{" "}
                {t("ships", { days: offer.shippingDays })}
              </p>

              <div className="ax-product__actions">
                <label className="ax-qty">
                  <span>{t("qty")}</span>
                  <span className="ax-qty__ctrl">
                    <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="-">
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(event) => setQty(Number(event.target.value) || 1)}
                    />
                    <button type="button" onClick={() => setQty((n) => n + 1)} aria-label="+">
                      +
                    </button>
                  </span>
                </label>
                <button
                  type="button"
                  className="ax-btn ax-btn--secondary"
                  disabled={!inStock}
                  onClick={() => addToCart(product.id, offer.vendorId, qty)}
                >
                  {t("add")}
                </button>
                <button
                  type="button"
                  className="ax-btn ax-btn--orange"
                  disabled={!inStock}
                  onClick={() => {
                    addToCart(product.id, offer.vendorId, qty);
                    router.push("/panier");
                  }}
                >
                  {t("buy")}
                </button>
                <button type="button" className="ax-btn ax-btn--secondary" onClick={() => toggleFavorite(product.id)}>
                  <i className={saved ? "fas fa-heart" : "far fa-heart"} aria-hidden />
                  {saved ? t("unfavorite") : t("favorite")}
                </button>
              </div>
            </AnimIn>
          </div>

          <section className="ax-product__offers">
            <h2>{t("vendorsTitle")}</h2>
            <div className="ax-offer-list">
              {sortedOffers.map((item) => {
                const active = vendorId === item.vendorId;
                return (
                  <button
                    key={item.vendorId}
                    type="button"
                    className={`ax-offer${active ? " is-active" : ""}`}
                    onClick={() => setVendorId(item.vendorId)}
                  >
                    <span>
                      <strong>{getVendor(item.vendorId).name}</strong>
                      <small>
                        {item.stock > 0 ? t("stock", { count: item.stock }) : tc("outOfStock")}
                      </small>
                    </span>
                    <em>{formatCad(item.price, locale)}</em>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="ax-product__info">
            <div className="ax-tabs" role="tablist">
              {(["description", "specs", "reviews", "warranty"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={`ax-tab${tab === id ? " is-active" : ""}`}
                  onClick={() => setTab(id)}
                >
                  {t(`tabs.${id}`)}
                </button>
              ))}
            </div>
            <div className="ax-tab-panel">
              {tab === "description" ? <p>{product.description[locale]}</p> : null}
              {tab === "specs" ? (
                <dl className="ax-spec-table">
                  {product.specs.map((spec) => (
                    <div key={spec.key}>
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
            <section className="ax-product__related">
              <h2>{t("related")}</h2>
              <div className="row">
                {related.map((item) => {
                  const itemCat = getCategory(item.categoryId)!;
                  const price = bestOffer(item);
                  return (
                    <div className="col-xl-3 col-md-6" key={item.id}>
                      <Link href={`/pieces/${itemCat.slug}/${item.slug}`} className="ax-related-card">
                        <img src={withBase(item.image)} alt="" />
                        <p>{item.name[locale]}</p>
                        <small>{formatCad(price.price, locale)}</small>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="ax-product__marc">
            <div>
              <h2>{t("advisorTitle")}</h2>
              <p>{t("advisorBody")}</p>
            </div>
            <button type="button" className="thm-btn" onClick={() => openChat(productPrompt(product, locale))}>
              {t("advisorCta")}
              <span className="icon-next" />
            </button>
          </section>
        </div>
      </section>
    </StorefrontChrome>
  );
}
