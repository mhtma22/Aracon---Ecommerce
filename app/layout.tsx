import type { Metadata } from "next";
import { Anton, Caveat, Geist, Geist_Mono, Lexend } from "next/font/google";
import GlobalLoadingBar from "./components/GlobalLoadingBar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const anton = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-script", weight: ["400", "700"], subsets: ["latin"] });
const lexend = Lexend({ variable: "--font-script", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aracon.pe | Streetwear & Moda Urbana de Edición Limitada",
  description: "Explora la selección exclusiva de prendas streetwear en Perú. Hoodies, casacas y ropa urbana diseñada para destacar con actitud y calidad superior.",
  keywords: ["streetwear peru", "ropa urbana lima", "aracon", "poleras oversize", "moda urbana peru"],
  authors: [{ name: "Aracon Team" }],
  openGraph: {
    title: "Aracon.pe | Streetwear & Moda Urbana de Edición Limitada",
    description: "Explora la selección exclusiva de prendas streetwear en Perú. Envíos gratis a todo el país.",
    url: "https://aracon.pe",
    siteName: "Aracon",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aracon.pe | Streetwear & Moda Urbana",
    description: "Ropa urbana y streetwear de edición limitada en Perú.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${caveat.variable} h-full antialiased`}>
      <head>
        <link rel="shortcut icon" href="/corona.svg" type="image/x-icon" />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-white selection:bg-[#5ba697] selection:text-black">
        <GlobalLoadingBar />
        {children}
      </body>
    </html>
  );
}
