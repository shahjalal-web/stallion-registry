/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

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

export default function PedigreeBlock({ stallion }: { stallion: any }) {
  const [open, setOpen] = useState(false);
  
  // আপনার ডাটা মডেলে pedigree নেই, তাই এটি খালি অবজেক্ট হিসেবে ডিফাইন করা হয়েছে যাতে এরর না আসে
  const p = stallion?.pedigree || {}; 

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
            Pedigree
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Official parentage information (up to 4 generations).
          </p>
        </div>
        
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-[#B08D57]/40 px-4 py-1.5 text-xs font-bold text-[#B08D57] transition-all hover:bg-[#B08D57] hover:text-black"
        >
          {open ? "− View Standard" : "+ View Extended (4 Gen)"}
        </button>
      </div>

      {/* যদি ডাটা না থাকে তার জন্য একটি নোটিশ */}
      {!stallion?.pedigree && (
        <div className="mt-4 rounded-lg bg-zinc-900/50 p-4 border border-zinc-800">
            <p className="text-xs text-zinc-400 italic text-center">
                Pedigree data is not available for this stallion yet.
            </p>
        </div>
      )}

      <div className={`mt-6 grid gap-6 sm:grid-cols-2 ${!stallion?.pedigree ? 'opacity-20 pointer-events-none' : ''}`}>
        {/* Sire's Side */}
        <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4">
          <h3 className="mb-3 text-[10px] font-black uppercase text-[#B08D57]">Sire Line</h3>
          <div className="space-y-4">
            <div>
              <Label>Sire (Father)</Label>
              <Value>{p.sire?.name || "—"}</Value>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-3">
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

        {/* Dam's Side */}
        <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4">
          <h3 className="mb-3 text-[10px] font-black uppercase text-[#B08D57]">Dam Line</h3>
          <div className="space-y-4">
            <div>
              <Label>Dam (Mother)</Label>
              <Value>{p.dam?.name || "—"}</Value>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-3">
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

      {/* Extended View */}
      {open && stallion?.pedigree && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-dashed border-zinc-800 p-4 bg-zinc-900/10">
              <div className="col-span-2 mb-1">
                <p className="text-[9px] font-bold text-zinc-600 uppercase">Sire's G-Parents</p>
              </div>
              <div>
                <Label>G-Grandsire</Label>
                <Value>{p.sire?.sire?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Granddam</Label>
                <Value>{p.sire?.sire?.dam?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Grandsire</Label>
                <Value>{p.sire?.dam?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Granddam</Label>
                <Value>{p.sire?.dam?.dam?.name || "—"}</Value>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-dashed border-zinc-800 p-4 bg-zinc-900/10">
              <div className="col-span-2 mb-1">
                <p className="text-[9px] font-bold text-zinc-600 uppercase">Dam's G-Parents</p>
              </div>
              <div>
                <Label>G-Grandsire</Label>
                <Value>{p.dam?.sire?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Granddam</Label>
                <Value>{p.dam?.sire?.dam?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Grandsire</Label>
                <Value>{p.dam?.dam?.sire?.name || "—"}</Value>
              </div>
              <div>
                <Label>G-Granddam</Label>
                <Value>{p.dam?.dam?.dam?.name || "—"}</Value>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}