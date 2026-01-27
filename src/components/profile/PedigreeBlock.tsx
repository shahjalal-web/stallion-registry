"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import Section from "./Section";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-zinc-400">{children}</p>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-white">{children}</p>;
}

export default function PedigreeBlock({ stallion }: { stallion: Stallion }) {
  const [expanded, setExpanded] = useState(false);
  const p = stallion.pedigree;

  return (
    <Section
      title="Pedigree"
      subtitle="Parentage presented in reference format. Extended lineage may be expanded."
    >
      <div className="space-y-4">

        {/* BASIC */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <Label>Sire</Label>
          <Value>{p.sireName}</Value>

          <div className="mt-3">
            <Label>Dam</Label>
            <Value>{p.damName}</Value>
          </div>
        </div>

        {/* TOGGLE BUTTON */}
        {(p.grandsireSireLine ||
          p.granddamSireLine ||
          p.grandsireDamLine ||
          p.granddamDamLine) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-[#B08D57] hover:underline"
          >
            {expanded ? "Hide extended pedigree" : "View extended pedigree"}
          </button>
        )}

        {/* EXTENDED */}
        {expanded && (
          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white mb-2">Sire Line</p>
              <Label>Grandsire (Sire’s sire)</Label>
              <Value>{p.grandsireSireLine || "—"}</Value>

              <div className="mt-3">
                <Label>Granddam (Sire’s dam)</Label>
                <Value>{p.granddamSireLine || "—"}</Value>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white mb-2">Dam Line</p>
              <Label>Grandsire (Dam’s sire)</Label>
              <Value>{p.grandsireDamLine || "—"}</Value>

              <div className="mt-3">
                <Label>Granddam (Dam’s dam)</Label>
                <Value>{p.granddamDamLine || "—"}</Value>
              </div>
            </div>

          </div>
        )}
      </div>
    </Section>
  );
}
