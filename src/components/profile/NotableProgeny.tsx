"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function NotableProgeny({ stallion }: { stallion: Stallion }) {
  const progeny = stallion.notableProgeny || [];
  const [showAll, setShowAll] = useState(false);

  if (progeny.length === 0) return null;

  const visible = showAll ? progeny : progeny.slice(0, 3);
  const hasMore = progeny.length > 3;

  return (
    <Section
      title="Notable Progeny"
      subtitle="Representative progeny results. Inclusion does not imply ranking or endorsement."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition hover:border-[#B08D57]"
          >
            {/* Name */}
            <p className="text-sm font-semibold text-white">{p.name}</p>

            {/* Meta */}
            <div className="mt-2 text-xs text-zinc-400 space-y-1">
              {p.year && <p>Year: {p.year}</p>}
              {p.association && <p>Association: {p.association}</p>}
              {p.discipline && <p>Discipline: {p.discipline}</p>}
            </div>

            {/* Result */}
            <p className="mt-3 text-sm font-medium text-[#B08D57]">
              {p.result}
            </p>

            {/* Reference */}
            {p.reference?.href && (
              <a
                href={p.reference.href}
                target="_blank"
                className="mt-2 inline-block text-xs text-zinc-400 hover:text-[#B08D57] hover:underline"
              >
                {p.reference.label || "Reference"}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* SHOW MORE SYSTEM */}
      {hasMore && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-md border border-[#B08D57] px-4 py-2 text-sm text-[#B08D57] transition hover:bg-[#B08D57] hover:text-black"
          >
            {showAll ? "Show fewer" : `Show all progeny (${progeny.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}
