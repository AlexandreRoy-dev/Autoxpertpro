"use client";

import { PageIntro } from "@/components/PageIntro";
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
    <PortalGate>
      <div className="wrap py-12">
        <PageIntro title={t("title")} lead={t("lead")} />
        {orders.length === 0 ? (
          <div>
            <p className="text-muted">{t("empty")}</p>
            <Link href="/pieces" className="btn btn-accent mt-4">
              {t("shop")}
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => {
              const product = getProduct(order.productId);
              if (!product) return null;
              const category = getCategory(product.categoryId);
              return (
                <li className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center" key={order.id}>
                  <img src={withBase(product.image)} alt="" className="h-16 w-16 object-contain" />
                  <div className="flex-1">
                    <p className="font-semibold">{product.name[locale]}</p>
                    <p className="text-sm text-muted">
                      {t("placed")} {formatDate(order.date, locale)} · {getVendor(order.vendorId).name}
                    </p>
                    <p className="mt-1 text-sm">{t(`status.${order.status}`)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCad(order.total, locale)}</p>
                    {category ? (
                      <Link href={`/pieces/${category.slug}/${product.slug}`} className="text-sm text-accent">
                        {t("track")}
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </PortalGate>
  );
}
