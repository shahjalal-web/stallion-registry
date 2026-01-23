/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { stallions } from "../../data/stallions";
import StallionCard from "../../components/stallion/StallionCard";
import StallionDirectoryFilters from "../../components/stallion/StallionDirectoryFilters";
import type { StallionBreed, SemenAvailability } from "@/types/stallion";

export default function StallionDirectoryPage() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState<string>("All");
  const [breed, setBreed] = useState<StallionBreed | "All">("All");
  const [availability, setAvailability] = useState<SemenAvailability | "All">(
    "All",
  );

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return stallions.filter((s: { registeredName: string; owners: any[]; countryOfStanding: string; breed: string; breedingAvailability: string; }) => {
      const keywordHit =
        !k ||
        s.registeredName.toLowerCase().includes(k) ||
        s.owners.some((o: { name: string; }) => o.name.toLowerCase().includes(k));

      const countryHit = country === "All" || s.countryOfStanding === country;
      const breedHit = breed === "All" || s.breed === breed;
      const availabilityHit =
        availability === "All" || s.breedingAvailability === availability;

      return keywordHit && countryHit && breedHit && availabilityHit;
    });
  }, [keyword, country, breed, availability]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">Stallion Directory</h1>
        <p className="text-sm text-zinc-600">
          Structured reference cards linking to full registry-format profiles.
        </p>
      </header>

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

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <StallionCard key={s.id} stallion={s} />
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-700">
          No results found for the selected filters.
        </div>
      )}
    </div>
  );
}
