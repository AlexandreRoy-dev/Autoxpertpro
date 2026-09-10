import { Atmosphere } from "@/components/Atmosphere";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function StorefrontChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Atmosphere variant="light" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader variant="storefront" />
        <main className="flex-1 text-[#111111]">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
