/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import { formatHeight } from "../../lib/utils";
import FoundingBadge from "./FoundingBadge";
import { useAuth } from "@/app/auth-context";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium text-zinc-400">{children}</p>;
}
function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-100">{children}</p>;
}

export default function ProfileHeader({ stallion }: { stallion: Stallion }) {
  const { user, toggleFavorite } = useAuth(); // Auth Context থেকে ডেটা নেয়া
  const owner = stallion.owners?.[0];
  const [showPedigree, setShowPedigree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // চেক করবে stallion টি কি ইউজারের ফেভারিট লিস্টে আছে?
  const isFavorited = user?.favorites?.some((f: any) => f.id === stallion.id);

  const handleFavoriteClick = () => {
    if (!user) {
      // ইউজার লগইন না থাকলে মডাল দেখাবে
      setIsModalOpen(true);
    } else {
      // ইউজার লগইন থাকলে ফেভারিট টগল হবে (লোকাল স্টোরেজে সেভ হবে)
      toggleFavorite(stallion);
    }
  };

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        {/* IMAGE + BUTTONS */}
        <div className="space-y-3">
          <div className="aspect-4/5 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
            <img
              src={
                stallion.media?.primaryImageUrl ||
                "https://images.unsplash.com/photo-1517849845537-4d257902454a"
              }
              alt={stallion.registeredName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-zinc-800 pt-3">
            {/* Favourite Toggle Button */}
            <div className="group relative flex-1">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition-all ${
                  isFavorited 
                    ? "border-red-500/50 bg-red-500/10 text-red-500" 
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-500 group-hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {/* Heart Icon Toggle Logic */}
                <svg
                  className={`h-4 w-4 transition-colors ${isFavorited ? "fill-current" : "fill-none"}`}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {isFavorited ? "Saved" : "Save to favourites"}
              </button>

              {/* Tooltip only for non-logged users */}
              {!user && (
                <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 scale-95 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  <div className="rounded bg-[#b08d57] px-2 py-1 text-[10px] font-bold text-black shadow-xl text-center">
                    Login to save favorites!
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#b08d57]" />
                  </div>
                </div>
              )}
            </div>

            {/* Founding Member Badge */}
            {stallion.isFoundingMember && (
              <div className="shrink-0">
                <FoundingBadge />
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {stallion.registeredName}
            </h1>
            <p className="text-sm text-zinc-400">
              Breed: {stallion.breed} · Discipline focus:{" "}
              {stallion.disciplineFocus?.join(" · ") || "—"}
            </p>
          </div>

          {/* CORE INFO */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Year of birth</Label>
                <Value>{stallion.yearOfBirth}</Value>
              </div>

              <div>
                <Label>Brief description</Label>
                <Value>
                  {[stallion.colour, formatHeight(stallion.height)]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </Value>
              </div>

              <div className="sm:col-span-2">
                <Label>Parentage</Label>
                <div className="text-sm">
                  <Value>
                    {stallion.pedigree.sire?.name}
                    <span className="text-xs text-zinc-500">
                      {" "}
                      ({stallion.pedigree.sire?.sire?.name} ×{" "}
                      {stallion.pedigree.sire?.dam?.name})
                    </span>
                    <br />
                    ×
                    <br />
                    {stallion.pedigree.dam?.name}
                    <span className="text-xs text-zinc-500">
                      {" "}
                      ({stallion.pedigree.dam?.sire?.name} ×{" "}
                      {stallion.pedigree.dam?.dam?.name})
                    </span>
                  </Value>
                </div>

                <button
                  onClick={() => setShowPedigree(!showPedigree)}
                  className="mt-2 text-xs text-[#b08d57] hover:underline"
                >
                  {showPedigree
                    ? "Hide extended pedigree"
                    : "View extended pedigree"}
                </button>

                {showPedigree && (
                  <div className="mt-3 grid gap-2 text-xs text-zinc-300 sm:grid-cols-2">
                    <p>
                      <span className="text-zinc-500">Grandsire (Sire line): </span>
                      {stallion.pedigree.sire?.sire?.name || "—"}
                    </p>
                    <p>
                      <span className="text-zinc-500">Granddam (Sire line): </span>
                      {stallion.pedigree.sire?.dam?.name || "—"}
                    </p>
                    <p>
                      <span className="text-zinc-500">Grandsire (Dam line): </span>
                      {stallion.pedigree.dam?.sire?.name || "—"}
                    </p>
                    <p>
                      <span className="text-zinc-500">Granddam (Dam line): </span>
                      {stallion.pedigree.dam?.dam?.name || "—"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Value>{stallion.countryOfStanding}</Value>
              </div>

              <div>
                <Label>Status</Label>
                <Value>{stallion.status || "Standing"}</Value>
              </div>
            </div>
          </div>

          {/* OWNER + REGISTRY */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Owner</p>
              <Value>{owner?.name || "—"}</Value>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">
                Registry Record
              </p>
              <Value>{stallion.registryAssociation}</Value>
              <Value>{stallion.registrationNumber}</Value>
            </div>
          </div>
        </div>
      </div>

      {/* --- COMING SOON MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#b08d57]/10 text-[#b08d57]">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white tracking-tight">Login Required</h3>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                You need to be logged in to save stallions to your personal favorites list.
              </p>
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full rounded-xl bg-[#b08d57] py-3 text-sm font-bold text-black transition-all hover:bg-[#d4af37]"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </section>
  );
}