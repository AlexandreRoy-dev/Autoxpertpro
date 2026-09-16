import { vendors } from "@/data/vendors";
import { withBase } from "@/lib/paths";

const logos: Record<string, string> = {
  napa: "/brands/napa.svg",
  canadiantire: "/brands/canadian-tire.svg",
  partsource: "/brands/partsource.svg",
  autoxpert: "/brands/autoxpert.svg",
};

export function BrandStrip() {
  const loop = [...vendors, ...vendors, ...vendors];

  return (
    <section className="brand-one" aria-label="Marchands">
      <div className="container">
        <div className="brand-one__inner ax-brands">
          <div className="ax-brands__viewport">
            <ul className="ax-brands__track list-unstyled">
              {loop.map((vendor, index) => (
                <li className="ax-brands__item" key={`${vendor.id}-${index}`}>
                  <img src={withBase(logos[vendor.id])} alt={vendor.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
