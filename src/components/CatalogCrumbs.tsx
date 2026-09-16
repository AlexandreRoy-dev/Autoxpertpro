import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function CatalogCrumbs({
  items,
}: {
  items: Array<{ href: string; label: string }>;
}) {
  const t = useTranslations("nav");

  return (
    <nav className="ax-crumbs" aria-label="Breadcrumb">
      <Link href="/">{t("home")}</Link>
      {items.map((item) => (
        <span key={item.href}>
          <span aria-hidden>›</span>
          <Link href={item.href as "/pieces"}>{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}
