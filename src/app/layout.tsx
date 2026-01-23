import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navber";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Leading Sires Registry",
  description: "Performance Stallion Registry (Phase 1 UI)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
