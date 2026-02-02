"use client";

import type { PerformanceEntry } from "@/types/stallion";

export default function PerformanceSection({
  records,
}: {
  records?: PerformanceEntry[];
}) {
  // যদি কোনো রেকর্ড না থাকে
  if (!records?.length) return null;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Performance Record
          </h2>
          <p className="mt-1 text-[10px] text-zinc-500 uppercase tracking-tighter">
            Full official competition history — No limits
          </p>
        </div>
        <div className="h-px flex-1 mx-4 bg-zinc-800" />
      </div>

      {/* সরাসরি একটি টেবিল বা লিস্টের মতো স্ট্রাকচার যা আনলিমিটেড রেকর্ড দেখাবে */}
      <div className="space-y-6">
        {records.map((rec, i) => (
          <div
            key={i}
            className="group rounded-lg border border-zinc-800 bg-zinc-900/10 p-5 transition-all hover:bg-zinc-900/30"
          >
            {/* TOP INFO */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex gap-4 items-center">
                <span className="text-sm font-bold text-[#B08D57] bg-[#B08D57]/5 px-2 py-1 rounded">
                  {rec.year}
                </span>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">
                    {rec.event}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {rec.discipline} ·{" "}
                    <span className="text-[#B08D57]/80 font-medium">
                      {rec.result}
                    </span>
                  </p>
                </div>
              </div>

              {rec.levelEarnings && (
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">
                    Earnings
                  </p>
                  <p className="text-sm font-bold text-green-500/90">
                    {rec.levelEarnings.currency}{" "}
                    {rec.levelEarnings.value.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* DETAILS - এখন সরাসরি দেখা যাবে, কোনো ক্লিকের প্রয়োজন নেই */}
            <div className="grid gap-6 pt-4 border-t border-zinc-800/50 sm:grid-cols-2 lg:grid-cols-3">
              {rec.notes && (
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">
                    Notes
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    {rec.notes}
                  </p>
                </div>
              )}

              {rec.judges && (
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">
                    Judges / Officials
                  </p>
                  <p className="text-xs text-zinc-400">{rec.judges}</p>
                </div>
              )}

              {rec.reference?.href && (
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">
                    Verification
                  </p>
                  <a
                    href={rec.reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B08D57] hover:text-white transition-colors"
                  >
                    OFFICIAL RESULT PAGE
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
