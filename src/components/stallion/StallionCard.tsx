/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Stallion } from "@/types/stallion";

export default function StallionCard({ stallion }: { stallion: Stallion }) {
  return (
    <Link
      href={`/stallions/${stallion.slug}`}
      className="group relative rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 transition-all shadow-sm hover:shadow-md"
    >
      {/* ক্লায়েন্ট রিকোয়ারমেন্ট ৬: স্ট্যাটাস ইন্ডিকেটর (Badge) */}
      <div className="absolute right-6 top-6 z-10">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
          stallion.status === 'Standing' ? 'bg-green-600' : 
          stallion.status === 'Deceased' ? 'bg-zinc-800' : 'bg-amber-600'
        }`}>
          {stallion.status}
        </span>
      </div>

      <div className="aspect-16/10 w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
        <img
          src={
            stallion.media?.primaryImageUrl ||
            "https://images.unsplash.com/photo-1517849845537-4d257902454a"
          }
          alt={stallion.registeredName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
        />
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-zinc-900">{stallion.registeredName}</p>
          {/* স্টাড ফি ডিসপ্লে */}
          {stallion.studFee && (
            <p className="text-[11px] font-bold text-[#b08d57]">
              {stallion.studFee.value} {stallion.studFee.currency}
            </p>
          )}
        </div>

        <p className="text-xs text-zinc-600">
          {stallion.breed} · {stallion.countryOfStanding}
        </p>

        {/* ফিক্সড পেডিগ্রি অ্যাক্সেস */}
        <p className="text-[11px] text-zinc-500 italic">
          Sire: {stallion.pedigree.sire?.name || "—"} · Dam: {stallion.pedigree.dam?.name || "—"}
        </p>

        <div className="mt-2 flex items-center gap-2 border-t border-zinc-50 pt-2">
          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-tight">
            Availability: <span className="text-zinc-700">{stallion.breedingAvailability}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}