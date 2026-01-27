"use client";
import { useState } from "react";
import type { PerformanceEntry } from "@/types/stallion";

export default function PerformanceSection({
  records,
}: {
  records?: PerformanceEntry[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!records?.length) return null;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <h2 className="text-sm font-semibold text-white">Performance Record</h2>

      <div className="mt-4 space-y-3">
        {records.map((rec, i) => {
          const open = openIndex === i;

          return (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
            >
              {/* MAIN ROW */}
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <div className="space-y-1">
                  <p className="text-sm text-white">
                    {rec.year} — {rec.event}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {rec.discipline} · {rec.result}
                  </p>
                </div>

                <span className="text-xs text-[#D4AF37]">
                  {open ? "Hide details" : "View details"}
                </span>
              </div>

              {/* 🔽 EXPANDED METADATA */}
              {open && (
                <div className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs text-zinc-300">
                  {rec.notes && (
                    <p>
                      <span className="text-zinc-500">Notes:</span> {rec.notes}
                    </p>
                  )}

                  {rec.judges && (
                    <p>
                      <span className="text-zinc-500">Judges:</span>{" "}
                      {rec.judges}
                    </p>
                  )}

                  {rec.levelEarnings && (
                    <p>
                      <span className="text-zinc-500">Level earnings:</span>{" "}
                      {rec.levelEarnings.value.toLocaleString()}{" "}
                      {rec.levelEarnings.currency}
                    </p>
                  )}

                  {rec.reference && (
                    <a
                      href={rec.reference.href}
                      target="_blank"
                      className="text-[#D4AF37] hover:underline"
                    >
                      View official reference
                    </a>
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
