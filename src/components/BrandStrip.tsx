import { vendors } from "@/data/vendors";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

const logos: Record<string, string> = {
  napa: "/brands/napa.svg",
  canadiantire: "/brands/canadian-tire.svg",
  partsource: "/brands/partsource.png",
  autoxpert: "/brands/autoxpert.svg",
};

export function BrandStrip() {
  const t = useTranslations("home");
  const loop = [...vendors, ...vendors, ...vendors];

  return (
    <section className="ax-vendors" aria-label={t("brandsTag")}>
      <ul className="ax-vendors__track list-unstyled">
        {loop.map((vendor, index) => (
          <li className={`ax-vendors__mark is-${vendor.id}`} key={`${vendor.id}-${index}`}>
            <img src={withBase(logos[vendor.id])} alt={index < vendors.length ? vendor.name : ""} />
          </li>
        ))}
      </ul>
    </section>
  );
}
