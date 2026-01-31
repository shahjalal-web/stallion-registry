/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useAuth } from "@/app/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // ইউজার এবং লগআউট ফাংশন নিলাম
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  // ডপডাউন এর বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-white"
        >
          Leading Sires Registry
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex text-sm">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-[#b08d57] border-b border-[#b08d57] pb-1"
                : "text-zinc-400 hover:text-white"
            }
          >
            Registry
          </Link>

          <Link
            href="/stallions"
            className={
              isActive("/stallions")
                ? "text-[#b08d57] border-b border-[#b08d57] pb-1"
                : "text-zinc-400 hover:text-white"
            }
          >
            Stallion Directory
          </Link>

          <Link
            href="/pricing"
            className={
              isActive("/pricing")
                ? "text-[#b08d57] border-b border-[#b08d57] pb-1"
                : "text-zinc-400 hover:text-white"
            }
          >
            Pricing
          </Link>

          {/* RESOURCES DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className={`flex items-center gap-1 ${
                pathname.startsWith("/resources")
                  ? "text-[#b08d57]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Resources ▾
            </button>

            {resourcesOpen && (
              <div className="absolute top-7 left-0 w-56 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl">
                <Link
                  href="/resources"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Commercial Directory
                </Link>
                <Link
                  href="/resources/associations"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  Associations & Registries
                </Link>
              </div>
            )}
          </div>

          {/* Navbar এর ভেতরে এই অংশটি আপডেট করো */}
          {user && (
            <Link
              href="/submit-stallion"
              className={
                isActive("/submit-stallion")
                  ? "text-[#b08d57] border-b border-[#b08d57] pb-1"
                  : "text-zinc-400 hover:text-white transition"
              }
            >
              Submit Stallion
            </Link>
          )}

          {/* Auth Section: ডেস্কটপ ভিউ */}
          <div className="ml-4 flex items-center gap-4 border-l border-zinc-800 pl-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className={`font-medium ${isActive("/profile") ? "text-[#b08d57]" : "text-zinc-300 hover:text-[#D4AF37]"}`}
                >
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-zinc-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-[#b08d57] px-3 py-1.5 text-xs font-bold text-black hover:bg-[#D4AF37] transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 hover:border-[#b08d57] hover:text-white"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 sm:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1 text-sm">
            <Link href="/" className="text-zinc-300 hover:text-white">
              Registry
            </Link>
            <Link href="/stallions" className="text-zinc-300 hover:text-white">
              Stallion Directory
            </Link>
            <Link href="/pricing" className="text-zinc-300 hover:text-white">
              Pricing
            </Link>

            <p className="mt-2 text-xs text-zinc-500">Resources</p>
            <Link
              href="/resources"
              className="pl-3 text-zinc-400 hover:text-white"
            >
              Commercial Directory
            </Link>
            <Link
              href="/resources/associations"
              className="pl-3 text-zinc-400 hover:text-white"
            >
              Associations & Registries
            </Link>

            {user && (
              <Link
                href="/submit-stallion"
                className="mt-2 text-zinc-300 hover:text-white"
              >
                Submit Stallion
              </Link>
            )}

            {/* Mobile Auth */}
            <div className="mt-4 border-t border-zinc-800 pt-4 pb-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/profile"
                    className="text-[#b08d57] font-semibold"
                  >
                    {user.name} (Profile)
                  </Link>
                  <button onClick={logout} className="text-left text-zinc-400">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="text-zinc-300">
                    Login
                  </Link>
                  <Link href="/signup" className="text-[#b08d57] font-semibold">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
