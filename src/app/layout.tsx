import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/layout/Navber";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "./auth-context";

export const metadata: Metadata = {
  title: "Leading Sires Registry",
  description: "Performance Stallion Registry (Phase 1 UI)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-(--bg-main) text-(--text-main)">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
