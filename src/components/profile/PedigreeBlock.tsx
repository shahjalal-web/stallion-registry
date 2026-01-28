"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
      {children}
    </p>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-zinc-100">{children}</p>;
}

export default function PedigreeBlock({ stallion }: { stallion: Stallion }) {
  const [open, setOpen] = useState(false);
  const p = stallion.pedigree;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
            Pedigree
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Official parentage and family history.
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-xs font-bold text-[#B08D57] border border-[#B08D57]/30 px-3 py-1 rounded hover:bg-[#B08D57] hover:text-black transition-all"
        >
          {open ? "− View Standard" : "+ View Extended (4-5 Gen)"}
        </button>
      </div>

      {/* GENERATION 1 & 2 (Standard View) */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-zinc-900/30 p-4 border border-zinc-800/50">
          <h3 className="text-[#B08D57] text-[10px] font-black uppercase">
            Sire Side
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Sire (Father)</Label>
              <Value>{p.sire?.name || "—"}</Value>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-zinc-800 pt-2">
              <div>
                <Label>Grandsire</Label>
                <Value>{p.sire?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Granddam</Label>
                <Value>{p.sire?.dam?.name || "—"}</Value>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg bg-zinc-900/30 p-4 border border-zinc-800/50">
          <h3 className="text-[#B08D57] text-[10px] font-black uppercase">
            Dam Side
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Dam (Mother)</Label>
              <Value>{p.dam?.name || "—"}</Value>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-zinc-800 pt-2">
              <div>
                <Label>Grandsire</Label>
                <Value>{p.dam?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Granddam</Label>
                <Value>{p.dam?.dam?.name || "—"}</Value>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GENERATION 3: GREAT GRANDPARENTS (Extended View) */}
      {open && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Sire's Great Grandparents */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-dashed border-zinc-800 p-4">
              <div>
                <Label>Great Grandsire</Label>
                <Value>{p.sire?.sire?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Granddam</Label>
                <Value>{p.sire?.sire?.dam?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Grandsire</Label>
                <Value>{p.sire?.dam?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Granddam</Label>
                <Value>{p.sire?.dam?.dam?.name || "—"}</Value>
              </div>
            </div>

            {/* Dam's Great Grandparents */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-dashed border-zinc-800 p-4">
              <div>
                <Label>Great Grandsire</Label>
                <Value>{p.dam?.sire?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Granddam</Label>
                <Value>{p.dam?.sire?.dam?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Grandsire</Label>
                <Value>{p.dam?.dam?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>Great Granddam</Label>
                <Value>{p.dam?.dam?.dam?.name || "—"}</Value>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] text-zinc-600 italic">
            * Extended data verified via official association records.
          </p>
        </div>
      )}
    </section>
  );
}
