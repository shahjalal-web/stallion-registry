import type { Stallion } from "@/types/stallion";
import Section from "./Section";
import { formatCurrency } from "../../lib/utils";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-3 sm:py-2">
      <p className="text-xs font-medium text-zinc-500">{label}</p>

      {/* ✅ makes long text / urls wrap nicely */}
      <div className="text-sm text-zinc-800 break-words">
        {value}
      </div>
    </div>
  );
}

export default function BreedingDetails({ stallion }: { stallion: Stallion }) {
  return (
    <Section title="Breeding Details">
      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <div className="divide-y divide-zinc-200">
          <div className="p-4">
            <Row
              label="Breeding availability"
              value={stallion.breedingAvailability}
            />

            <Row
              label="Stud fee"
              value={
                stallion.studFee
                  ? formatCurrency(
                      stallion.studFee.value,
                      stallion.studFee.currency,
                    )
                  : "—"
              }
            />

            <Row
              label="Breeding manager"
              value={stallion.breedingManagerName || "—"}
            />

            <Row
              label="Breeding service provider"
              value={
                stallion.breedingServiceProviderUrl ? (
                  <a
                    href={stallion.breedingServiceProviderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-800 hover:underline"
                  >
                    {stallion.breedingServiceProvider || "View link"}
                  </a>
                ) : (
                  stallion.breedingServiceProvider || "—"
                )
              }
            />

            <Row
              label="Country availability"
              value={
                stallion.countryAvailability?.length
                  ? stallion.countryAvailability.join(", ")
                  : "—"
              }
            />

            <Row
              label="Breeding guarantees"
              value={stallion.breedingGuarantees || "—"}
            />

            <Row
              label="Additional notes"
              value={
                stallion.additionalBreedingNotes ? (
                  <p className="leading-6">{stallion.additionalBreedingNotes}</p>
                ) : (
                  "—"
                )
              }
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
