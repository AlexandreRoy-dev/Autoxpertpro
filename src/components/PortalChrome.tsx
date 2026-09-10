import { Atmosphere } from "@/components/Atmosphere";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PortalChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal relative isolate min-h-screen bg-portal text-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Atmosphere variant="dark" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader variant="portal" />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
