import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="display text-3xl">Page introuvable</h1>
      <Link href="/" className="btn btn-accent">
        Accueil
      </Link>
    </div>
  );
}
