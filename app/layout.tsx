import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Anton+SC&family=Caveat:wght@400..700&family=Fjalla+One&family=Lexend:wght@100..900&family=Monoton&family=Smooch+Sans:wght@100..900&family=Staatliches&display=swap" 
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/corona.svg" type="image/x-icon" />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-white selection:bg-[#5ba697] selection:text-black">
        {children}
      </body>
    </html>
  );
}