import type { Stallion } from "@/types/stallion";
import Section from "./Section";
import { formatCurrency } from "../../lib/utils";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-sm shadow-black/30">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

export default function BreedingStats({ stallion }: { stallion: Stallion }) {
  const s = stallion.breedingStatistics;

  return (
    <Section
      title="Breeding Statistics"
      subtitle="Aggregated from available records and owner-submitted data where provided."
    >
      {!s ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
          No statistics available.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Foal crops recorded" value={s.foalCropsRecorded ?? "—"} />
          <Stat label="Total registered progeny" value={s.totalRegisteredProgeny ?? "—"} />
          <Stat label="Progeny started in competition" value={s.progenyStartedInCompetition ?? "—"} />
          <Stat label="Performance earners" value={s.performanceEarners ?? "—"} />
          <Stat
            label="Total reported earnings"
            value={
              s.totalReportedEarnings
                ? formatCurrency(
                    s.totalReportedEarnings.value,
                    s.totalReportedEarnings.currency
                  )
                : "—"
            }
          />
          <Stat
            label="Average earnings per starter"
            value={
              s.averageEarningsPerStarter
                ? formatCurrency(
                    s.averageEarningsPerStarter.value,
                    s.averageEarningsPerStarter.currency
                  )
                : "—"
            }
          />
        </div>
      )}
    </Section>
  );
}
