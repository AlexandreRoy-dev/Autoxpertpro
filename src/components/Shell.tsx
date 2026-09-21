import { Atmosphere } from "@/components/Atmosphere";
import { SiteHeader } from "@/components/SiteHeader";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex h-dvh flex-col overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Atmosphere variant="light" />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <SiteHeader />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
