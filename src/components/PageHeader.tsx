"use client";

import { AnimIn } from "@/components/AnimIn";
import { Link } from "@/i18n/navigation";
import { withBase } from "@/lib/paths";

export function PageHeader({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs?: Array<{ href: "/" | "/pieces" | `/pieces/${string}` | "/panier" | "/compte"; label: string }>;
}) {
  return (
    <section className="page-header">
      <img src={withBase("/hero/workshop.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16">
        <AnimIn>
          {crumbs?.length ? (
            <p className="text-sm text-white/55">
              {crumbs.map((crumb, index) => (
                <span key={crumb.href}>
                  {index > 0 ? <span className="px-1.5">/</span> : null}
                  <Link href={crumb.href as "/pieces"} className="hover:text-white">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-white drop-shadow md:text-4xl">{title}</h1>
          {lead ? <p className="mt-3 max-w-2xl text-white/70">{lead}</p> : null}
        </AnimIn>
      </div>
    </section>
  );
}
