"use client";

import { Link } from "@/i18n/navigation";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-baseline gap-2 tracking-tight">
      <span className={`display text-xl ${light ? "text-white" : "text-ink"}`}>AutoXpert</span>
    </Link>
  );
}
