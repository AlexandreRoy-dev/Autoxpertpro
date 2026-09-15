import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-orange" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/65">{t("blurb")}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("services")}</p>
          <ul className="space-y-2 text-sm text-white/65">
            <li>
              <Link href="/pieces">{t("parts")}</Link>
            </li>
            <li>
              <Link href="/compte/vehicules">{t("garage")}</Link>
            </li>
            <li>
              <Link href="/compte/entretien">{t("entretien")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("info")}</p>
          <ul className="space-y-2 text-sm text-white/65">
            <li>{t("vendors")}</li>
            <li>{t("shipping")}</li>
            <li>{t("returns")}</li>
            <li>{t("privacy")}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t("contact")}</p>
          <p className="text-sm text-white/65">{t("phone")}</p>
          <p className="text-sm text-white/65">{t("email")}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/45">{t("rights")}</div>
    </footer>
  );
}
