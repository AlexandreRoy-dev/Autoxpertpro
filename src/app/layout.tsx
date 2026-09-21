import { Geist, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const news = Newsreader({
  subsets: ["latin"],
  variable: "--font-news",
});

export const metadata: Metadata = {
  title: "AutoXpert",
  description: "Pièces d’auto de plusieurs marchands, pour le véhicule que vous conduisez.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <body className={`${geist.variable} ${news.variable} antialiased`}>{children}</body>
    </html>
  );
}
