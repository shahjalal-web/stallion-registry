/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useAuth } from "@/app/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncAdmin = () => {
      const storedAdmin = localStorage.getItem("adminUser");
      setAdminUser(storedAdmin ? JSON.parse(storedAdmin) : null);
    };

    syncAdmin(); // initial load

    window.addEventListener("adminAuthChanged", syncAdmin);
    return () => window.removeEventListener("adminAuthChanged", syncAdmin);
  }, []);

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

  const handleLogout = () => {
    logout(); // user logout
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setAdminUser(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-white"
        >
          Leading Sires Registry
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 sm:flex text-sm">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-[#b08d57]"
                : "text-zinc-400 hover:text-white"
            }
          >
            Registry
          </Link>
          <Link
            href="/stallions"
            className={
              isActive("/stallions")
                ? "text-[#b08d57]"
                : "text-zinc-400 hover:text-white"
            }
          >
            Stallion Directory
          </Link>
          <Link
            href="/pricing"
            className={
              isActive("/pricing")
                ? "text-[#b08d57]"
                : "text-zinc-400 hover:text-white"
            }
          >
            Pricing
          </Link>

          {/* Resources Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className="text-zinc-400 hover:text-white"
            >
              Resources ▾
            </button>
            {resourcesOpen && (
              <div className="absolute top-7 left-0 w-56 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl">
                <Link
                  href="/resources"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900"
                >
                  Commercial Directory
                </Link>
                <Link
                  href="/resources/associations"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900"
                >
                  Associations & Registries
                </Link>
              </div>
            )}
          </div>

          {user && (
            <Link
              href="/submit-stallion/before-submit"
              className="text-zinc-400 hover:text-white"
            >
              Submit Stallion
            </Link>
          )}

          <Link href="/about" className="text-zinc-400 hover:text-white">
            About
          </Link>

          {/* Auth Section */}
          <div className="ml-4 flex items-center gap-4 border-l border-zinc-800 pl-4">
            {user || adminUser ? (
              <>
                {user && (
                  <Link
                    href="/profile"
                    className="text-zinc-300 hover:text-[#D4AF37]"
                  >
                    {user.name}
                  </Link>
                )}

                {adminUser && (
                  <Link
                    href="/admin/dashboard"
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-xs text-zinc-500 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-zinc-400 hover:text-white">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-[#b08d57] px-3 py-1.5 text-xs font-bold text-black"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden text-zinc-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 sm:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 text-sm">
            <Link href="/">Registry</Link>
            <Link href="/stallions">Stallion Directory</Link>
            <Link href="/pricing">Pricing</Link>

            {user && (
              <Link href="/submit-stallion/before-submit">Submit Stallion</Link>
            )}
            <Link href="/about">About</Link>

            {adminUser && (
              <Link
                href="/admin/dashboard"
                className="text-red-400 font-semibold"
              >
                Admin Dashboard
              </Link>
            )}

            {user || adminUser ? (
              <button
                onClick={handleLogout}
                className="text-left text-zinc-400"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
