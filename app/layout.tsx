import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aracon",
  description: "Los mejores productos al mejor precio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Anton+SC&family=Caveat:wght@400..700&family=Fjalla+One&family=Lexend:wght@100..900&family=Monoton&family=Smooch+Sans:wght@100..900&family=Staatliches&display=swap" rel="stylesheet"/>
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}