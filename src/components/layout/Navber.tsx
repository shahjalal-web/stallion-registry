/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Registry" },
  { href: "/stallions", label: "Stallion Directory" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/submit-stallion", label: "Submit Stallion" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-zinc-900"
        >
          Leading Sires Registry
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 sm:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm hover:text-zinc-950 ${
                  active ? "font-medium text-zinc-950" : "text-zinc-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white p-2 text-zinc-800 hover:bg-zinc-50 sm:hidden"
        >
          {/* Simple hamburger icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div className="border-t border-zinc-200 bg-white sm:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      active
                        ? "bg-zinc-100 font-medium text-zinc-950"
                        : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
