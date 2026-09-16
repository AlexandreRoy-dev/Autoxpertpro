"use client";

import { PortalShell } from "@/components/PortalShell";
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
    <PortalShell title={t("title")} lead={t("lead")}>
      {orders.length === 0 ? (
        <div className="ax-empty-card">
          <p>{t("empty")}</p>
          <Link href="/pieces" className="thm-btn">
            {t("shop")}
            <span className="icon-next" />
          </Link>
        </div>
      ) : (
        <ul className="ax-order-list">
          {orders.map((order) => {
            const product = getProduct(order.productId);
            if (!product) return null;
            const category = getCategory(product.categoryId);
            return (
              <li className="ax-order-card" key={order.id}>
                <img src={withBase(product.image)} alt="" />
                <div className="ax-order-card__body">
                  <p className="ax-order-card__name">{product.name[locale]}</p>
                  <p className="ax-order-card__meta">
                    {t("placed")} {formatDate(order.date, locale)} · {getVendor(order.vendorId).name}
                  </p>
                  <p className={`ax-order-status is-${order.status}`}>{t(`status.${order.status}`)}</p>
                </div>
                <div className="ax-order-card__aside">
                  <p className="ax-order-card__price">{formatCad(order.total, locale)}</p>
                  {category ? (
                    <Link href={`/pieces/${category.slug}/${product.slug}`}>{t("track")}</Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </PortalShell>
  );
}
