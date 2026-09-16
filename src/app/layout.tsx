import { ServixaAssets } from "@/components/ServixaAssets";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoXpert",
  description: "Pièces d’auto de plusieurs marchands, pour le véhicule que vous conduisez.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <head>
        <ServixaAssets />
      </head>
      <body>{children}</body>
    </html>
  );
}
