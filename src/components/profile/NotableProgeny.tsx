"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import Section from "./Section";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";

export default function NotableProgeny({ stallion }: { stallion: Stallion }) {
  const { user } = useAuth(); // ইউজার ডেটা নেয়া
  const progeny = stallion.notableProgeny || [];
  const [expanded, setExpanded] = useState(false);

  // প্রিমিয়াম চেক
  const isPremium = user?.subscription === "paid";

  if (!progeny.length) return null;

  // ক্লায়েন্ট যেহেতু আনলিমিটেড লিস্ট চেয়েছেন,
  // শো-মোর লজিকটি রাখা ভালো যাতে পেজ অনেক লম্বা না হয়ে যায়।
  const visible = expanded ? progeny : progeny.slice(0, 6);

  return (
    <Section
      title="Notable Progeny"
      subtitle="Comprehensive list of performing offspring and their official achievements."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => {
          // লজিক: প্রথম ৩টি আইটেম ফ্রি ইউজারদের জন্য ওপেন থাকবে, বাকিগুলো লক
          const isLockedItem = !isPremium && i >= 3;

          return (
            <div
              key={i}
              className={`group relative flex flex-col justify-between rounded-lg border transition-all duration-300 ${
                isLockedItem
                  ? "border-zinc-900 bg-zinc-950/20 opacity-60"
                  : "border-zinc-800 bg-zinc-900/20 p-5 hover:border-[#B08D57]/50 hover:bg-zinc-900/40"
              } ${!isLockedItem ? "p-5" : "p-5 overflow-hidden"}`}
            >
              <div
                className={
                  isLockedItem
                    ? "blur-[3px] select-none pointer-events-none"
                    : ""
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-bold text-white group-hover:text-[#B08D57] transition-colors">
                    {p.name}
                  </p>
                  {p.year && (
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                      {p.year}
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-1 border-l-2 border-zinc-800 pl-3 text-[11px] text-zinc-400">
                  {p.association && (
                    <p>
                      <span className="text-zinc-600 uppercase text-[9px] font-bold">
                        Assoc:
                      </span>{" "}
                      {p.association}
                    </p>
                  )}
                  {p.discipline && (
                    <p>
                      <span className="text-zinc-600 uppercase text-[9px] font-bold">
                        Disc:
                      </span>{" "}
                      {p.discipline}
                    </p>
                  )}
                </div>

                <p className="mt-3 text-sm font-medium text-zinc-200 italic leading-snug">
                  {p.result}
                </p>
              </div>

              {/* Reference Link - শুধুমাত্র আনলকড আইটেমে দেখাবে */}
              {p.reference?.href && !isLockedItem && (
                <div className="mt-4 pt-3 border-t border-zinc-800/50">
                  <a
                    href={p.reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#B08D57] hover:text-[#FFD700] transition-colors"
                  >
                    Official Reference
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {/* Item Level Lock Overlay */}
              {isLockedItem && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-none">
                  <svg
                    className="w-5 h-5 text-[#B08D57] mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p className="text-[9px] font-bold text-[#B08D57] uppercase tracking-tighter">
                    Premium Only
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show More Button - লজিক: প্রিমিয়াম না হলে এটি 'Upgrade' বাটনে কাজ করবে */}
      <div className="mt-8 flex justify-center">
        {isPremium ? (
          progeny.length > 6 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full border border-[#B08D57] px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#B08D57] transition-all hover:bg-[#B08D57] hover:text-black"
            >
              {expanded
                ? "Show Less"
                : `View All Notable Progeny (${progeny.length})`}
            </button>
          )
        ) : (
          <Link
            href={user ? "/profile" : "/login"}
            className="rounded-full bg-[#B08D57] px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-[#FFD700] shadow-lg shadow-[#B08D57]/20"
          >
            {user ? "Upgrade to View Full List" : "Login to View All Progeny"}
          </Link>
        )}
      </div>
    </Section>
  );
}
