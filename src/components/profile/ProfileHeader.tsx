/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import { formatHeight } from "../../lib/utils";
import FoundingBadge from "./FoundingBadge";
import { useAuth } from "@/app/auth-context";
import Link from "next/link";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium text-zinc-400">{children}</p>;
}
function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-100">{children}</p>;
}

export default function ProfileHeader({ stallion }: { stallion: any }) {
  const { user, toggleFavorite } = useAuth();
  
  // ডাটা মডেল অনুযায়ী Destructuring
  // আপনার মডেলে 'owners' অ্যারে নেই, সরাসরি 'owner' অবজেক্ট আছে।
  const owner = stallion?.owner; 
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // MongoDB ID চেক (_id.$oid অথবা সরাসরি _id)
  const stallionId = stallion?._id?.$oid || stallion?._id;
  const isFavorited = user?.favorites?.some((f: any) => f.id === stallionId);

  const handleFavoriteClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
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
                stallion?.media?.primaryImageUrl ||
                "/placeholder-stallion.jpg"
              }
              alt={stallion?.registeredName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-zinc-800 pt-3">
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

              {!user && (
                <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 scale-95 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  <div className="rounded bg-[#b08d57] px-2 py-1 text-[10px] font-bold text-black shadow-xl text-center">
                    Login to save favorites!
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#b08d57]" />
                  </div>
                </div>
              )}
            </div>

            {/* Founding Member Badge Logic (যদি ডাটাতে না থাকে তবে হাইড থাকবে) */}
            {stallion?.isFoundingMember && (
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
              {stallion?.registeredName || "Unnamed Stallion"}
            </h1>
            <p className="text-sm text-zinc-400">
              Status: {stallion?.status} · Country: {stallion?.countryOfStanding}
            </p>
          </div>

          {/* CORE INFO */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Year of birth</Label>
                <Value>{stallion?.yearOfBirth || "—"}</Value>
              </div>

              <div>
                <Label>Height & Registration</Label>
                <Value>
                  {[formatHeight(stallion?.height), stallion?.registrationNumber]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </Value>
              </div>

              <div className="sm:col-span-2">
                <Label>Official Registry Link</Label>
                {stallion?.officialRegistryLink ? (
                  <a 
                    href={stallion.officialRegistryLink} 
                    target="_blank" 
                    className="text-sm text-[#b08d57] hover:underline block truncate"
                  >
                    View Document
                  </a>
                ) : (
                  <Value>No document attached</Value>
                )}
              </div>

              <div>
                <Label>Stud Fee</Label>
                <Value>{stallion?.studFee || "Private Treaty"}</Value>
              </div>

              <div>
                <Label>Guarantee</Label>
                <Value>{stallion?.guarantee || "—"}</Value>
              </div>
            </div>
          </div>

          {/* OWNER + DISEASE TESTING */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Owner Information</p>
              <Value>{owner?.name || "—"}</Value>
              <p className="text-[10px] text-zinc-500">{owner?.email}</p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">
                Disease Testing
              </p>
              {stallion?.diseaseTesting ? (
                <a href={stallion.diseaseTesting} target="_blank" className="text-xs text-[#b08d57] hover:underline">
                  View Results
                </a>
              ) : (
                <Value>Not Provided</Value>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- AUTH MODAL (Same as before) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-5 top-5 text-zinc-500 hover:text-white">✕</button>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#b08d57]/10 text-[#b08d57]">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Save to Favorites</h3>
              <p className="mt-4 text-sm text-zinc-400">Login to save your favorite stallions.</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/login" className="rounded-xl bg-[#b08d57] py-3 text-sm font-bold text-black text-center hover:bg-[#d4af37]">Login / Sign Up</Link>
                <button onClick={() => setIsModalOpen(false)} className="rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-sm font-bold text-zinc-300">Not Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}