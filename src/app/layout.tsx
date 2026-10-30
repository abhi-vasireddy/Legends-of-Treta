import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cinzel, Manrope, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const sanskrit = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-sanskrit-var",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEGENDS OF TRETA — Herinova Game Studios presents | Campus Recruitment",
  description:
    "Official website and campus recruitment portal for LEGENDS OF TRETA — Herinova Game Studios presents. Developing 'Legends of Treta' — Character 02: Parashurama. 7 elite roles in C#, Fullstack, Script Writing, 3D Art & Cinematic Design.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "game studio careers",
    "Herinova Game Studios",
    "Legends of Treta",
    "Ramayana action RPG",
    "Parashurama",
    "MRIIRS",
    "MRU",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${sanskrit.variable} ${manrope.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <div className="cinematic-grade" aria-hidden />
        <div className="vignette-overlay" aria-hidden />
        <div className="anamorphic-flare" aria-hidden />
        <div className="scanlines" aria-hidden />
        <div className="noise-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
