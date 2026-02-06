/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required for state
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Footer() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="bg-black text-zinc-400 text-sm border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand Section */}
        <div className="space-y-4">
          <div>
            <p className="text-white font-semibold">Leading Sires Registry</p>
            <p className="text-xs">Performance stallion reference platform</p>
          </div>
          <div className="text-[11px] text-zinc-500 leading-relaxed uppercase tracking-wider">
            <p>Quarter Horses | Paints | Appaloosas</p>
            <p>
              Australia | New Zealand | Europe | Canada | North & South America
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col space-y-2 text-xs uppercase tracking-widest text-center md:text-left">
          <Link href="/" className="hover:text-white transition-colors">
            Registry
          </Link>
          <Link
            href="/stallions"
            className="hover:text-white transition-colors"
          >
            Stallion Directory
          </Link>

          {/* Resources Dropdown Added Here */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              Resources {resourcesOpen ? "▴" : "▾"}
            </button>
            {resourcesOpen && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-56 rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl z-50 py-2">
                <Link
                  onClick={() => setResourcesOpen((v) => !v)}
                  href="/resources"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900 normal-case tracking-normal"
                >
                  Commercial Directory
                </Link>
                <Link
                  onClick={() => setResourcesOpen((v) => !v)}
                  href="/resources/associations"
                  className="block px-4 py-2 text-zinc-300 hover:bg-zinc-900 normal-case tracking-normal"
                >
                  Associations & Registries
                </Link>
              </div>
            )}
          </div>

          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/submit-stallion/before-submit"
            className="hover:text-white transition-colors"
          >
            Submit a Listing
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>

        {/* Contact Section */}
        <div className="md:text-right space-y-4">
          <a
            href="mailto:info@leadingsiresregistry.com"
            className="text-xs hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            info@leadingsiresregistry.com
          </a>
          <div className="flex justify-center md:justify-end">
            <svg
              className="w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="border-t border-zinc-900 px-6 py-6 text-center">
        <div className="mx-auto max-w-6xl flex flex-col gap-4">
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            © 2026 Leading Sires Registry | All rights reserved |
            <Link
              href="/"
              className="hover:text-zinc-400 mx-1 underline underline-offset-2"
            >
              Terms of Use
            </Link>{" "}
            |
            <Link
              href="/"
              className="hover:text-zinc-400 mx-1 underline underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            | Records may include active, historical, or deceased stallions for
            pedigree and reference purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
