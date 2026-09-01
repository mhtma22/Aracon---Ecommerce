
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { use } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aracon",
  description: "Los mejores productos al mejor precio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
  );
}
