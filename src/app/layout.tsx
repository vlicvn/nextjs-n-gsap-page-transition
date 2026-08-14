import type { Metadata } from "next";
import { Boldonse, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-boldonse",
  adjustFontFallback: false,
});

const plexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Next.js & GSAP Page Transition",
  description: "A simple page transition implementation with GSAP and Next.js",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${boldonse.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <PageTransition />

        {children}
      </body>
    </html>
  );
}