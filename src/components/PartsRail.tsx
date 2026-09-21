"use client";

import { VehiclePicker } from "@/components/VehiclePicker";
import { getCategory } from "@/data/categories";
import { bestOffer, type Product } from "@/data/products";
import { getVendor, type VendorId } from "@/data/vendors";
import { getVehicle } from "@/data/vehicles";
import { Link } from "@/i18n/navigation";
import { useChat } from "@/lib/chat";
import { formatCad } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function PartsRail() {
  const t = useTranslations("rail");
  const tp = useTranslations("picker");
  const locale = useLocale() as "fr" | "en";
  const { railProducts, selectedProductId, setSelectedProductId } = useChat();
  const { selectedFitmentId, setSelectedFitment, garage, cartCount } = useStore();
  const vehicle = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const [changing, setChanging] = useState(false);
  const selected = railProducts.find((item) => item.id === selectedProductId) ?? railProducts[0];

  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-l border-line bg-card">
      <div className="border-b border-line px-4 py-4">
        <p className="text-xs uppercase tracking-wide text-muted">{t("kicker")}</p>
        <h2 className="mt-1 font-semibold">{t("title")}</h2>
        {vehicle ? (
          <p className="mt-2 text-sm">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">{t("noVehicle")}</p>
        )}
        <button type="button" className="mt-2 text-sm text-accent" onClick={() => setChanging((v) => !v)}>
          {t("changeVehicle")}
        </button>
        {changing ? (
          <div className="mt-3">
            <VehiclePicker
              initialFitmentId={selectedFitmentId}
              presets={garage}
              submitLabel={tp("continue")}
              onSelect={(id) => {
                setSelectedFitment(id);
                setChanging(false);
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {railProducts.length === 0 ? (
          <p className="px-1 text-sm text-muted">{t("empty")}</p>
        ) : (
          <ul className="space-y-2">
            {railProducts.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  className={`card flex w-full items-center gap-3 p-3 text-left ${
                    selected?.id === product.id ? "border-accent" : ""
                  }`}
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <img src={withBase(product.image)} alt="" className="h-12 w-12 object-contain" />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{product.name[locale]}</strong>
                    <small className="text-muted">
                      {product.brand} · {formatCad(bestOffer(product).price, locale)}
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {selected ? <OfferBlock key={selected.id} product={selected} /> : null}
      </div>

      <div className="border-t border-line px-4 py-3 text-sm">
        <p>{t("cartCount", { count: cartCount })}</p>
        <Link href="/panier" className="mt-2 inline-block text-accent">
          {t("openCart")}
        </Link>
      </div>
    </aside>
  );
}

function OfferBlock({ product }: { product: Product }) {
  const t = useTranslations("rail");
  const tp = useTranslations("product");
  const tc = useTranslations("catalog");
  const locale = useLocale() as "fr" | "en";
  const { addToCart } = useStore();
  const cheapest = bestOffer(product);
  const [vendorId, setVendorId] = useState<VendorId>(cheapest.vendorId);
  const [added, setAdded] = useState(false);
  const offer = product.offers.find((item) => item.vendorId === vendorId) ?? cheapest;
  const category = getCategory(product.categoryId);
  const inStock = offer.stock > 0;
  const sorted = useMemo(
    () => [...product.offers].sort((a, b) => a.price - b.price),
    [product.offers],
  );

  return (
    <div className="mt-4 border-t border-line pt-4">
      <p className="px-1 text-xs uppercase tracking-wide text-muted">{t("buy")}</p>
      <p className="mt-1 px-1 font-semibold">{product.name[locale]}</p>
      <p className="px-1 text-sm text-muted">
        {product.brand} · {product.partNumber}
      </p>
      <div className="mt-3 space-y-2">
        {sorted.map((item) => (
          <button
            key={item.vendorId}
            type="button"
            className={`card flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
              vendorId === item.vendorId ? "border-accent" : ""
            }`}
            onClick={() => {
              setVendorId(item.vendorId);
              setAdded(false);
            }}
          >
            <span>
              {getVendor(item.vendorId).name}
              <small className="block text-muted">
                {item.stock > 0 ? tp("stock", { count: item.stock }) : tc("outOfStock")}
              </small>
            </span>
            <strong>{formatCad(item.price, locale)}</strong>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-accent mt-3 w-full"
        disabled={!inStock}
        onClick={() => {
          addToCart(product.id, offer.vendorId, 1);
          setAdded(true);
        }}
      >
        {added ? t("added") : t("add")}
      </button>
      {category ? (
        <Link href={`/pieces/${category.slug}/${product.slug}`} className="mt-2 block text-center text-sm text-muted">
          {t("details")}
        </Link>
      ) : null}
    </div>
  );
}
