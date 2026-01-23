import Link from "next/link";
import type { Stallion } from "@/types/stallion";

export default function StallionCard({ stallion }: { stallion: Stallion }) {
  return (
    <Link
      href={`/stallions/${stallion.slug}`}
      className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300"
    >
      <div className="aspect-16/10 w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            stallion.media?.primaryImageUrl ||
            "https://images.unsplash.com/photo-1517849845537-4d257902454a"
          }
          alt={stallion.registeredName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-sm font-semibold">{stallion.registeredName}</p>

        <p className="text-xs text-zinc-600">
          {stallion.breed} · {stallion.countryOfStanding}
        </p>

        <p className="text-xs text-zinc-600">
          Sire: {stallion.pedigree.sireName} · Dam: {stallion.pedigree.damName}
        </p>

        <p className="text-xs text-zinc-600">
          Availability: {stallion.breedingAvailability}
        </p>
      </div>
    </Link>
  );
}
