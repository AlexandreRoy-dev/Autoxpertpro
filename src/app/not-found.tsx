import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="text-black/60">Cette adresse n’existe pas dans le prototype.</p>
      <Link href="/fr/" className="btn btn-orange">
        Retour à l’accueil
      </Link>
    </div>
  );
}
