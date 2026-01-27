/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Stallion } from "@/types/stallion";
import { formatHeight } from "../../lib/utils";
import FoundingBadge from "./FoundingBadge";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium text-zinc-400">{children}</p>;
}
function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-100">{children}</p>;
}

export default function ProfileHeader({ stallion }: { stallion: Stallion }) {
  const owner = stallion.owners?.[0];
  const [showPedigree, setShowPedigree] = useState(false);

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

          <div className="flex items-center justify-between">
            <button
              disabled={stallion.hasActiveSubscription === false}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#b08d57] hover:text-white disabled:opacity-60"
            >
              Save to favourites
            </button>

            {stallion.isFoundingMember ? <FoundingBadge /> : null}
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
                    <span className="text-xs text-gray-500">
                      {" "}
                      ({stallion.pedigree.sire?.sire?.name} ×{" "}
                      {stallion.pedigree.sire?.dam?.name})
                    </span>
                    <br />
                    ×
                    <br />
                    {stallion.pedigree.dam?.name}
                    <span className="text-xs text-gray-500">
                      {" "}
                      ({stallion.pedigree.dam?.sire?.name} ×{" "}
                      {stallion.pedigree.dam?.dam?.name})
                    </span>
                  </Value>
                </div>

                {/* 🔽 EXTENDED PEDIGREE TOGGLE */}
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
                    {/* Sire Line - দাদাকুল */}
                    <p>
                      <span className="text-zinc-500">
                        Grandsire (Sire line):{" "}
                      </span>
                      {stallion.pedigree.sire?.sire?.name || "—"}
                    </p>
                    <p>
                      <span className="text-zinc-500">
                        Granddam (Sire line):{" "}
                      </span>
                      {stallion.pedigree.sire?.dam?.name || "—"}
                    </p>

                    {/* Dam Line - নানাকুল */}
                    <p>
                      <span className="text-zinc-500">
                        Grandsire (Dam line):{" "}
                      </span>
                      {stallion.pedigree.dam?.sire?.name || "—"}
                    </p>
                    <p>
                      <span className="text-zinc-500">
                        Granddam (Dam line):{" "}
                      </span>
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
    </section>
  );
}
