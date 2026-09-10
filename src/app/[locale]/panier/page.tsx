"use client";

import { StorefrontChrome } from "@/components/StorefrontChrome";
import { getCategory } from "@/data/categories";
import { getProduct } from "@/data/products";
import { getVendor } from "@/data/vendors";
import { Link } from "@/i18n/navigation";
import { formatCad } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale() as "fr" | "en";
  const { cart, updateCartQty, removeFromCart, hydrated } = useStore();

  if (!hydrated) {
    return (
      <StorefrontChrome>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
        </div>
      </StorefrontChrome>
    );
  }

  const rows = cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const offer = product.offers.find((o) => o.vendorId === item.vendorId);
      if (!offer) return null;
      return { item, product, offer };
    })
    .filter((row) => row !== null);

  const subtotal = rows.reduce((sum, row) => sum + row.offer.price * row.item.qty, 0);

  return (
    <StorefrontChrome>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        {rows.length === 0 ? (
          <p className="mt-6 text-black/60">
            {t("empty")}{" "}
            <Link href="/pieces" className="text-orange">
              {t("continue")}
            </Link>
          </p>
        ) : (
          <div className="mt-8 space-y-4">
            {rows.map(({ item, product, offer }) => {
              const category = getCategory(product.categoryId)!;
              return (
                <div
                  key={`${item.productId}-${item.vendorId}`}
                  className="flex flex-col gap-4 rounded-xl border border-[#ececec] p-4 sm:flex-row sm:items-center"
                >
                  <img src={withBase(product.image)} alt="" className="h-20 w-20 object-contain" />
                  <div className="flex-1">
                    <Link href={`/pieces/${category.slug}/${product.slug}`} className="font-semibold">
                      {product.name[locale]}
                    </Link>
                    <p className="text-sm text-black/50">
                      {t("vendor")}: {getVendor(item.vendorId).name}
                    </p>
                  </div>
                  <label className="text-sm">
                    {t("qty")}
                    <input
                      type="number"
                      min={1}
                      className="input ml-2 w-16"
                      value={item.qty}
                      onChange={(e) =>
                        updateCartQty(item.productId, item.vendorId, Number(e.target.value) || 1)
                      }
                    />
                  </label>
                  <p className="font-semibold">{formatCad(offer.price * item.qty, locale)}</p>
                  <button
                    type="button"
                    className="text-sm text-black/50"
                    onClick={() => removeFromCart(item.productId, item.vendorId)}
                  >
                    {t("remove")}
                  </button>
                </div>
              );
            })}
            <div className="flex items-center justify-between border-t border-[#ececec] pt-6">
              <p className="text-lg font-semibold">
                {t("subtotal")} {formatCad(subtotal, locale)}
              </p>
              <Link href="/pieces" className="btn btn-ghost">
                {t("continue")}
              </Link>
            </div>
            <p className="text-sm text-black/50">{t("note")}</p>
          </div>
        )}
      </div>
    </StorefrontChrome>
  );
}
