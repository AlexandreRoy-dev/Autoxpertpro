"use client";

import { PortalChrome } from "@/components/PortalChrome";
import { PortalGate } from "@/components/PortalGate";
import { getCategory } from "@/data/categories";
import { getProduct } from "@/data/products";
import { getVendor } from "@/data/vendors";
import { Link } from "@/i18n/navigation";
import { formatCad, formatDate } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { useStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const locale = useLocale() as "fr" | "en";
  const { orders } = useStore();

  return (
    <PortalChrome>
      <PortalGate>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="mt-2 text-white/60">{t("lead")}</p>
          {orders.length === 0 ? (
            <p className="mt-8 text-white/50">{t("empty")}</p>
          ) : (
            <div className="mt-8 space-y-3">
              {orders.map((order) => {
                const product = getProduct(order.productId);
                if (!product) return null;
                const category = getCategory(product.categoryId);
                return (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 rounded-2xl bg-[#141b2b] p-4 ring-1 ring-white/10 sm:flex-row sm:items-center"
                  >
                    <img src={withBase(product.image)} alt="" className="h-16 w-16 object-contain" />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name[locale]}</p>
                      <p className="text-sm text-white/50">
                        {order.id} · {getVendor(order.vendorId).name} · {formatDate(order.date, locale)}
                      </p>
                    </div>
                    <p className="text-sm text-white/70">{t(`status.${order.status}`)}</p>
                    <p className="font-semibold">{formatCad(order.total, locale)}</p>
                    {category ? (
                      <Link href={`/pieces/${category.slug}/${product.slug}`} className="text-sm text-orange">
                        {t("track")}
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PortalGate>
    </PortalChrome>
  );
}
