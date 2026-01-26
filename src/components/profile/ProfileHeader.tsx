/* eslint-disable @next/next/no-img-element */
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

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
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
              title={
                stallion.hasActiveSubscription === false
                  ? "Subscription required"
                  : "Save to favourites"
              }
              className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#D4AF37] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save to favourites
            </button>

            {stallion.isFoundingMember ? <FoundingBadge /> : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {stallion.registeredName}
            </h1>
            <p className="text-sm text-zinc-400">
              Breed: {stallion.breed} · Discipline focus:{" "}
              {stallion.disciplineFocus?.length
                ? stallion.disciplineFocus.join(" · ")
                : "—"}
            </p>
          </div>

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
                <Value>
                  {stallion.pedigree.sireName} × {stallion.pedigree.damName}
                </Value>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Owner</p>
              <div className="mt-3 space-y-2">
                <div>
                  <Label>Name</Label>
                  <Value>{owner?.name || "—"}</Value>
                </div>
                <div>
                  <Label>Address</Label>
                  <Value>{owner?.addressCityState || "—"}</Value>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Value>{owner?.phone || "—"}</Value>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  {owner?.website && (
                    <a className="text-[#D4AF37] hover:underline" href={owner.website} target="_blank">
                      Farm / ranch website
                    </a>
                  )}
                  {owner?.facebook && (
                    <a className="text-[#D4AF37] hover:underline" href={owner.facebook} target="_blank">
                      Facebook
                    </a>
                  )}
                  {owner?.instagram && (
                    <a className="text-[#D4AF37] hover:underline" href={owner.instagram} target="_blank">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Registry Record</p>
              <div className="mt-3 space-y-2">
                <div>
                  <Label>Registry association</Label>
                  <Value>{stallion.registryAssociation}</Value>
                </div>
                <div>
                  <Label>Registration number</Label>
                  <Value>{stallion.registrationNumber}</Value>
                </div>
                <div>
                  <Label>Record status</Label>
                  <Value>{stallion.recordStatus}</Value>
                </div>
                <div>
                  <Label>Official registry link</Label>
                  <Value>
                    {stallion.officialRegistryLink ? (
                      <a
                        href={stallion.officialRegistryLink}
                        target="_blank"
                        className="text-[#D4AF37] hover:underline"
                      >
                        View official record
                      </a>
                    ) : (
                      "—"
                    )}
                  </Value>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Disease testing results</p>
              <p className="mt-2 text-sm text-zinc-300">
                {stallion.diseaseTestingResults || "—"}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold text-white">Colour testing results</p>
              <p className="mt-2 text-sm text-zinc-300">
                {stallion.colourTestingResults || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
