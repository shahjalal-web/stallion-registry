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
    <div className="rounded-xl border border-(--gold) bg-(--bg-surface) p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-(--text-muted)">
            Keyword
          </label>
          <input
            value={props.keyword}
            onChange={(e) => props.setKeyword(e.target.value)}
            placeholder="Search by stallion name or owner"
            className="mt-1 w-full rounded-md border border-(--gold-soft) bg-(--bg-main) px-3 py-2 text-sm text-white outline-none focus:border-(--gold)"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-(--text-muted)">
            Country
          </label>
          <select
            value={props.country}
            onChange={(e) => props.setCountry(e.target.value)}
            className="mt-1 w-full rounded-md border border-(--gold-soft) bg-(--bg-main) px-3 py-2 text-sm text-white outline-none focus:border-(--gold)"
          >
            <option>All</option>
            <option>United States</option>
            <option>Australia</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-(--text-muted)">
            Semen availability
          </label>
          <select
            value={props.availability}
            onChange={(e) =>
              props.setAvailability(e.target.value as SemenAvailability | "All")
            }
            className="mt-1 w-full rounded-md border border-(--gold-soft) bg-(--bg-main) px-3 py-2 text-sm text-white outline-none focus:border-(--gold)"
          >
            <option value="All">All</option>
            <option value="Fresh">Fresh</option>
            <option value="Chilled">Chilled</option>
            <option value="Frozen">Frozen</option>
            <option value="Combination">Combination</option>
          </select>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <div>
          <label className="text-xs font-medium text-(--text-muted)">
            Breed
          </label>
          <select
            value={props.breed}
            onChange={(e) =>
              props.setBreed(e.target.value as StallionBreed | "All")
            }
            className="mt-1 w-full rounded-md border border-(--gold-soft) bg-(--bg-main) px-3 py-2 text-sm text-white outline-none focus:border-(--gold)"
          >
            <option value="All">All</option>
            <option value="Quarter Horse">Quarter Horse</option>
            <option value="Paint">Paint</option>
            <option value="Appaloosa">Appaloosa</option>
          </select>
        </div>

        <div className="md:col-span-3 flex items-end justify-end">
          <button
            onClick={props.onReset}
            className="rounded-md border border-(--gold) px-3 py-2 text-sm font-medium text-(--gold) hover:bg-(--gold)/10"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
