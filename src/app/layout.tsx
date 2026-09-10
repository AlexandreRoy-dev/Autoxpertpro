import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "AutoXpert",
  description: "Pièces d’auto de plusieurs marchands, pour le véhicule que vous conduisez.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <body className={`${dm.variable} antialiased`}>{children}</body>
    </html>
  );
}
