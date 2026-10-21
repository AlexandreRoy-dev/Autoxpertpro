import { SITE, messagesFor } from "@/lib/seo";
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

const french = messagesFor("fr");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: french.meta.title },
  description: french.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <body className={`${geist.variable} ${news.variable} antialiased`}>{children}</body>
    </html>
  );
}
