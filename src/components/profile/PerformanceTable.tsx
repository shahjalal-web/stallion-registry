"use client";

import { useState } from "react";
import type { PerformanceEntry } from "@/types/stallion";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";

export default function PerformanceSection({
  records,
}: {
  records?: PerformanceEntry[];
}) {
  const { user } = useAuth(); // ইউজার ডেটা নেয়া
  const [openRows, setOpenRows] = useState<number[]>([]);

  if (!records?.length) return null;

  const toggleRow = (idx: number) => {
    setOpenRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  // প্রিমিয়াম চেক করার জন্য একটি শর্টকাট
  const isPremium = user?.subscription === "paid";

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Performance Record
          </h2>
          <p className="mt-1 text-[10px] text-zinc-500 uppercase tracking-tighter">
            Unlimited official competition history
          </p>
        </div>
        <div className="h-px flex-1 mx-4 bg-zinc-800" />
      </div>

      <div className="space-y-3">
        {records.map((rec, i) => {
          const isOpen = openRows.includes(i);

          return (
            <div
              key={i}
              className={`rounded-lg border transition-all duration-200 ${
                isOpen
                  ? "border-[#B08D57]/50 bg-zinc-900/50"
                  : "border-zinc-800 bg-zinc-900/20"
              }`}
            >
              {/* MAIN ROW */}
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => toggleRow(i)}
              >
                <div className="grid grid-cols-[60px_1fr] gap-4 items-center">
                  <span className="text-sm font-bold text-[#B08D57]">
                    {rec.year}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-white">
                      {rec.event}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      {rec.discipline} ·{" "}
                      <span className="text-zinc-300 font-semibold">
                        {rec.result}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {isOpen ? "Close" : "Details"}
                  </span>
                  <svg
                    className={`w-3 h-3 text-[#B08D57] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* EXPANDED DETAILS WITH VALIDATION */}
              {isOpen && (
                <div className="relative px-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="h-px bg-zinc-800 mb-3" />

                  {/* লজিক: প্রিমিয়াম না হলে কন্টেন্ট ব্লার থাকবে */}
                  <div className={`grid gap-4 sm:grid-cols-2 ${!isPremium ? "blur-sm select-none pointer-events-none opacity-40" : ""}`}>
                    {rec.notes && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Notes</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">{rec.notes}</p>
                      </div>
                    )}

                    {rec.judges && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Judges / Officials</p>
                        <p className="text-xs text-zinc-300">{rec.judges}</p>
                      </div>
                    )}

                    {rec.levelEarnings && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Earnings</p>
                        <p className="text-sm font-bold text-green-500/80">
                          {rec.levelEarnings.currency} {rec.levelEarnings.value.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {rec.reference && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">Verification</p>
                        <span className="inline-flex items-center gap-1 text-xs text-[#B08D57]">
                          Official Result Page
                        </span>
                      </div>
                    )}
                  </div>

                  {/* প্রিমিয়াম না হলে যে ওভারলে মেসেজটি দেখাবে */}
                  {!isPremium && (
                    <div className="absolute inset-x-0 bottom-4 top-4 z-10 flex flex-col items-center justify-center bg-zinc-950/20 px-6 text-center">
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D57]/20 text-[#B08D57]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Premium Access Only</p>
                      <p className="mt-1 text-[10px] text-zinc-400">Upgrade to view full judging notes and earnings.</p>
                      <Link 
                        href={user ? "/profile" : "/login"}
                        className="mt-3 rounded bg-[#B08D57] px-3 py-1.5 text-[10px] font-bold text-black hover:bg-[#D4AF37] transition"
                      >
                        {user ? "Upgrade Now" : "Login to View"}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}