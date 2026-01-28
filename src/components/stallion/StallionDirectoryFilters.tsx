import type { StallionBreed, SemenAvailability } from "@/types/stallion";

export default function StallionDirectoryFilters(props: {
  keyword: string;
  setKeyword: (v: string) => void;

  country: string;
  setCountry: (v: string) => void;

  breed: StallionBreed | "All";
  setBreed: (v: StallionBreed | "All") => void;

  availability: SemenAvailability | "All";
  setAvailability: (v: SemenAvailability | "All") => void;

  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#b08d57]/30 bg-zinc-950 p-5 shadow-2xl">
      <div className="flex flex-col gap-4">
        {/* Row 1: Keyword Search (Stallion + Owner) */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Keyword Search (Stallion or Owner)
          </label>
          <div className="relative mt-1">
            <input
              value={props.keyword}
              onChange={(e) => props.setKeyword(e.target.value)}
              placeholder="Enter stallion name or owner's name..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-10 py-3 text-sm text-white transition-all focus:border-[#b08d57] outline-none"
            />
            {/* Search Icon */}
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Row 2: Select Filters */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Country</label>
            <select
              value={props.country}
              onChange={(e) => props.setCountry(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-[#b08d57] outline-none transition-all cursor-pointer"
            >
              <option value="All">All Countries</option>
              <option>United States</option>
              <option>Australia</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Breed</label>
            <select
              value={props.breed}
              onChange={(e) => props.setBreed(e.target.value as StallionBreed | "All")}
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-[#b08d57] outline-none cursor-pointer"
            >
              <option value="All">All Breeds</option>
              <option value="Quarter Horse">Quarter Horse</option>
              <option value="Paint">Paint</option>
              <option value="Appaloosa">Appaloosa</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Semen Availability</label>
            <select
              value={props.availability}
              onChange={(e) => props.setAvailability(e.target.value as SemenAvailability | "All")}
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-[#b08d57] outline-none cursor-pointer"
            >
              <option value="All">All Options</option>
              <option value="Fresh">Fresh</option>
              <option value="Chilled">Chilled</option>
              <option value="Frozen">Frozen</option>
              <option value="Combination">Combination</option>
            </select>
          </div>
        </div>

        {/* Row 3: Actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={props.onReset}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b08d57] hover:text-white transition-all"
          >
            <svg className="h-3 w-3 transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
}