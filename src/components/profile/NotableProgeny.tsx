"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function NotableProgeny({ stallion }: { stallion: Stallion }) {
  const progeny = stallion.notableProgeny || [];
  const [expanded, setExpanded] = useState(false);

  if (!progeny.length) return null;

  // ক্লায়েন্ট যেহেতু আনলিমিটেড লিস্ট চেয়েছেন, 
  // শো-মোর লজিকটি রাখা ভালো যাতে পেজ অনেক লম্বা না হয়ে যায়।
  const visible = expanded ? progeny : progeny.slice(0, 6); // ডিফল্ট ৬টি দেখানো যেতে পারে

  return (
    <Section
      title="Notable Progeny"
      subtitle="Comprehensive list of performing offspring and their official achievements."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <div
            key={i}
            className="group flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900/20 p-5 transition-all hover:border-[#B08D57]/50 hover:bg-zinc-900/40"
          >
            <div>
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
                  <p><span className="text-zinc-600 uppercase text-[9px] font-bold">Assoc:</span> {p.association}</p>
                )}
                {p.discipline && (
                  <p><span className="text-zinc-600 uppercase text-[9px] font-bold">Disc:</span> {p.discipline}</p>
                )}
              </div>

              <p className="mt-3 text-sm font-medium text-zinc-200 italic leading-snug">
                {p.result}
              </p>
            </div>

            {p.reference?.href && (
              <div className="mt-4 pt-3 border-t border-zinc-800/50">
                <a
                  href={p.reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#B08D57] hover:text-[#FFD700] transition-colors"
                >
                  Official Reference
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {progeny.length > 6 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-full border border-[#B08D57] px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#B08D57] transition-all hover:bg-[#B08D57] hover:text-black"
          >
            {expanded ? "Show Less" : `View All Notable Progeny (${progeny.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}