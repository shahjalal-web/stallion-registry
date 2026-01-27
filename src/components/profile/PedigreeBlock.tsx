/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium text-zinc-400">{children}</p>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-100">{children}</p>;
}

export default function PedigreeBlock({ stallion }: { stallion: Stallion }) {
  const [open, setOpen] = useState(false);
  const p = stallion.pedigree;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <h2 className="text-sm font-semibold text-white">Pedigree</h2>
      <p className="mt-1 text-xs text-zinc-400">
        Parentage information presented in registry format.
      </p>

      {/* CORE PARENTAGE */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Sire</Label>
          <Value>{p.sire.name}</Value>
        </div>
        <div>
          <Label>Dam</Label>
          <Value>{p.dam.name}</Value>
        </div>
      </div>

      {/* EXTENDED TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 text-sm text-[#B08D57] hover:underline"
      >
        {open ? "Hide extended pedigree" : "View extended pedigree"}
      </button>

      {/* EXTENDED GENERATIONS */}
      {open && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 border-t border-zinc-800 pt-4">
          {p.grandsireSireLine && (
            <div>
              <Label>Sire's Sire</Label>
              <Value>{p.grandsireSireLine}</Value>
            </div>
          )}

          {p.granddamSireLine && (
            <div>
              <Label>Sire's Dam</Label>
              <Value>{p.granddamSireLine}</Value>
            </div>
          )}

          {p.grandsireDamLine && (
            <div>
              <Label>Dam's Sire</Label>
              <Value>{p.grandsireDamLine}</Value>
            </div>
          )}

          {p.granddamDamLine && (
            <div>
              <Label>Dam's Dam</Label>
              <Value>{p.granddamDamLine}</Value>
            </div>
          )}

          {/* Future deeper generations can be appended here without UI limits */}
        </div>
      )}
    </section>
  );
}
