import { Link } from "@/i18n/navigation";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <rect width="32" height="32" rx="7" fill="#F15A22" />
        <path
          d="M7 20h18l-1.6-5.2A3 3 0 0 0 20.5 13h-9a3 3 0 0 0-2.9 1.8L7 20Zm4.2-1.2a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Zm9.6 0a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z"
          fill="#fff"
        />
      </svg>
      <span className={light ? "text-white" : "text-ink"}>AutoXpert</span>
    </Link>
  );
}
