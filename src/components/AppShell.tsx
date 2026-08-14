"use client";

import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition />
      {children}
    </>
  );
}
