"use client";

import type { Stallion } from "@/types/stallion";
import Section from "./Section";
import { formatCurrency } from "../../lib/utils";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-sm shadow-black/30">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

export default function BreedingStats({ stallion }: { stallion: Stallion }) {
  const { user } = useAuth(); // ইউজার ডেটা নেয়া
  const s = stallion.breedingStatistics;

  // প্রিমিয়াম চেক (লগইন করা পেইড ইউজার)
  const isPremium = user?.subscription === "paid";

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
        <div className="relative">
          {/* STATISTICS GRID - প্রিমিয়াম না হলে ব্লার হবে */}
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${!isPremium ? "blur-md select-none pointer-events-none opacity-30" : ""}`}>
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

          {/* PREMIUM LOCK OVERLAY */}
          {!isPremium && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pb-6">
              <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 text-center backdrop-blur-sm shadow-2xl">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B08D57]/20 text-[#B08D57]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Breeding Stats Locked</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Access detailed foal crop analysis, performance earner rates, and average progeny earnings with a Premium subscription.
                </p>
                <Link 
                  href={user ? "/profile" : "/login"}
                  className="mt-6 inline-block w-full rounded-lg bg-[#B08D57] py-2.5 text-xs font-bold text-black transition-all hover:bg-[#D4AF37] shadow-lg shadow-[#B08D57]/20"
                >
                  {user ? "Upgrade to Unlock Stats" : "Login to View Statistics"}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}