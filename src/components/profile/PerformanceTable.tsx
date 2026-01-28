"use client";

import { useState } from "react";
import type { PerformanceEntry } from "@/types/stallion";

export default function PerformanceSection({
  records,
}: {
  records?: PerformanceEntry[];
}) {
  // একাধিক রো একসাথে খোলা রাখার জন্য state
  const [openRows, setOpenRows] = useState<number[]>([]);

  if (!records?.length) return null;

  const toggleRow = (idx: number) => {
    setOpenRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

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
        {/* ক্লায়েন্টের গোল্ড কালার টাচ */}
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
                  {/* একটি ছোট এরো আইকন দিলে ইউজার বুঝতে পারবে এটা কলাপ্সিবল */}
                  <svg
                    className={`w-3 h-3 text-[#B08D57] transition-transform ${isOpen ? "rotate-180" : ""}`}
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

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="h-px bg-zinc-800 mb-3" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    {rec.notes && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Notes
                        </p>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {rec.notes}
                        </p>
                      </div>
                    )}

                    {rec.judges && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Judges / Officials
                        </p>
                        <p className="text-xs text-zinc-300">{rec.judges}</p>
                      </div>
                    )}

                    {rec.levelEarnings && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Earnings
                        </p>
                        <p className="text-sm font-bold text-green-500/80">
                          {rec.levelEarnings.currency}{" "}
                          {rec.levelEarnings.value.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {rec.reference && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Verification
                        </p>
                        <a
                          href={rec.reference.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#B08D57] hover:underline"
                        >
                          Official Result Page
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              strokeWidth={2}
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
