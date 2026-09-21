import { Link } from "@/i18n/navigation";

type Crumb = { href: string; label: string };

export function PageIntro({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="mb-10">
      {crumbs && crumbs.length > 0 ? (
        <nav className="mb-4 flex flex-wrap gap-2 text-sm text-muted">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              <Link href={crumb.href as "/"} className="hover:text-ink">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      ) : null}
      <h1 className="display text-3xl text-ink md:text-4xl">{title}</h1>
      {lead ? <p className="mt-3 max-w-2xl text-muted">{lead}</p> : null}
    </div>
  );
}
