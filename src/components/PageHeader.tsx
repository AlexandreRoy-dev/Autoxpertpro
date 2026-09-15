import { Link } from "@/i18n/navigation";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

export function PageHeader({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs?: Array<{ href: "/" | "/pieces" | `/pieces/${string}` | "/panier" | "/compte"; label: string }>;
}) {
  const t = useTranslations("nav");

  return (
    <section className="page-header">
      <div
        className="page-header__bg"
        style={{ backgroundImage: `url(${withBase("/hero/workshop.jpg")})` }}
      />
      <div className="container">
        <div className="page-header__inner">
          <div className="page-header__img-1">
            <img src={withBase("/hero/mechanic.png")} alt="" />
          </div>
          <h1>{title}</h1>
          {lead ? <p className="page-header__text" style={{ marginTop: 12 }}>{lead}</p> : null}
          <div className="thm-breadcrumb__inner">
            <ul className="thm-breadcrumb list-unstyled">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              {crumbs?.map((crumb) => (
                <li key={crumb.href}>
                  <span className="fas fa-angle-right" />
                  <Link href={crumb.href as "/pieces"}>{crumb.label}</Link>
                </li>
              ))}
              <li>
                <span className="fas fa-angle-right" />
                {title}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
