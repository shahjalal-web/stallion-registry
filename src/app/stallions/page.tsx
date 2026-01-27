/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { stallions } from "../../data/stallions";
import StallionDirectoryFilters from "../../components/stallion/StallionDirectoryFilters";
import type { StallionBreed, SemenAvailability } from "@/types/stallion";
import Link from "next/link";

export default function StallionDirectoryPage() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState<string>("All");
  const [breed, setBreed] = useState<StallionBreed | "All">("All");
  const [availability, setAvailability] = useState<SemenAvailability | "All">(
    "All",
  );

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return stallions.filter(
      (s: {
        registeredName: string;
        owners: any[];
        countryOfStanding: string;
        breed: string;
        breedingAvailability: string;
      }) => {
        const keywordHit =
          !k ||
          s.registeredName.toLowerCase().includes(k) ||
          s.owners.some((o: { name: string }) =>
            o.name.toLowerCase().includes(k),
          );

        const countryHit = country === "All" || s.countryOfStanding === country;
        const breedHit = breed === "All" || s.breed === breed;
        const availabilityHit =
          availability === "All" || s.breedingAvailability === availability;

        return keywordHit && countryHit && breedHit && availabilityHit;
      },
    );
  }, [keyword, country, breed, availability]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">Stallion Directory</h1>
        {/* <p className="text-sm text-zinc-400">
          Structured reference cards linking to full registry-format profiles.
        </p> */}
      </header>

      <hr className="border-t border-(--gold-soft)" />

      <StallionDirectoryFilters
        keyword={keyword}
        setKeyword={setKeyword}
        country={country}
        setCountry={setCountry}
        breed={breed}
        setBreed={setBreed}
        availability={availability}
        setAvailability={setAvailability}
        onReset={() => {
          setKeyword("");
          setCountry("All");
          setBreed("All");
          setAvailability("All");
        }}
      />

      <section className="overflow-hidden rounded-lg border border-(--gold-soft)">
        <div className="w-full overflow-x-auto">
          <table className="min-w-225 w-full border-collapse text-sm">
            <thead className="bg-(--bg-surface) text-(--gold)">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Stallion</th>
                <th className="px-4 py-3 text-left">Pedigree</th>
                <th className="px-4 py-3 text-left">Breed</th>
                <th className="px-4 py-3">Country</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-(--gold-soft) hover:bg-(--bg-surface)"
                >
                  <td className="px-4 py-3">
                    <Link href={`/stallions/${s.slug}`}>
                      <img
                        src={s.media?.primaryImageUrl}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </Link>
                  </td>

                  <td className="px-4 py-3 font-medium text-white">
                    <Link
                      href={`/stallions/${s.slug}`}
                      className="hover:text-(--gold)"
                    >
                      {s.registeredName}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-(--text-muted)">
                    {s.pedigree.sireName} × {s.pedigree.damName}
                  </td>

                  <td className="px-4 py-3">{s.breed}</td>

                  <td className="px-4 py-3 text-center">{s.countryOfStanding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-400">
          No results found for the selected filters.
        </div>
      )}
    </div>
  );
}
