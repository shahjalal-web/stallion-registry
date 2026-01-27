"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function NotableProgeny({ stallion }: { stallion: Stallion }) {
  const progeny = stallion.notableProgeny || [];
  const [expanded, setExpanded] = useState(false);

  if (!progeny.length) return null;

  const visible = expanded ? progeny : progeny.slice(0, 3);

  return (
    <Section
      title="Notable Progeny"
      subtitle="Representative progeny achievements. Inclusion does not imply ranking."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
          >
            <p className="text-sm font-semibold text-white">{p.name}</p>

            <div className="mt-1 space-y-1 text-xs text-zinc-400">
              {p.year && <p>Year: {p.year}</p>}
              {p.association && <p>Association: {p.association}</p>}
              {p.discipline && <p>Discipline: {p.discipline}</p>}
            </div>

            <p className="mt-2 text-sm text-[#B08D57]">{p.result}</p>

            {p.reference?.href && (
              <a
                href={p.reference.href}
                target="_blank"
                className="mt-2 inline-block text-xs text-[#B08D57] hover:underline"
              >
                {p.reference.label || "Reference"}
              </a>
            )}
          </div>
        ))}
      </div>

      {progeny.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 text-sm text-[#B08D57] hover:underline"
        >
          {expanded ? "Show fewer" : `Show ${progeny.length - 3} more`}
        </button>
      )}
    </Section>
  );
}
