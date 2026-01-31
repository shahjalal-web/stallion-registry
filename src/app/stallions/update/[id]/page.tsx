/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProgenyRow } from "@/types/stallion";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";

type Guarantee = "LFG" | "Colour" | "None";
type StallionStatus =
  | "Active"
  | "Deceased"
  | "Standing"
  | "Not Standing"
  | "Historical Reference";

type PerformanceRow = {
  year: string;
  event: string;
  discipline: string;
  result: string;
  reference: string;
  notes?: string;
  judges?: string;
  levelEarnings?: string;
};

const gold = "border-[#6b5736] focus:border-[#FFD700]";

// --- Reusable UI Components ---
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium text-zinc-400">{children}</p>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none border",
        gold,
        "placeholder:text-zinc-500",
        props.className || "",
      ].join(" ")}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none border",
        gold,
        "placeholder:text-zinc-500",
        props.className || "",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none border",
        gold,
        props.className || "",
      ].join(" ")}
    />
  );
}

function FileUpload({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="mt-1">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#b08d57] bg-zinc-900/50 py-4 transition hover:bg-zinc-900">
        <span className="text-xs text-zinc-400">
          {label} {required ? "*" : "(Optional)"}
        </span>
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
      <div className="mb-4 space-y-1">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function UpdateStallionPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // --- Form States ---
  const [status, setStatus] = useState<StallionStatus>("Active");
  const [registeredName, setRegisteredName] = useState("");
  const [countryOfStanding, setCountryOfStanding] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [officialRegistryLink, setOfficialRegistryLink] = useState("");
  const [studFee, setStudFee] = useState("");
  const [guarantee, setGuarantee] = useState<Guarantee>("None");
  const [breedingStats, setBreedingStats] = useState("");
  const [diseaseTesting, setDiseaseTesting] = useState("");
  const [colourTesting, setColourTesting] = useState("");
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState(["", "", ""]);
  const [videoUrl, setVideoUrl] = useState("");
  const [performanceRows, setPerformanceRows] = useState<PerformanceRow[]>([]);
  const [progenyRows, setProgenyRows] = useState<ProgenyRow[]>([]);

  // ১. ডেটা লোড করার লজিক
  useEffect(() => {
    if (user && id) {
      const existingData = user.registeredStallions?.find(
        (s: any) => s.id === id,
      );
      if (existingData) {
        setStatus(existingData.status);
        setRegisteredName(existingData.registeredName);
        setCountryOfStanding(existingData.countryOfStanding);
        setYearOfBirth(existingData.yearOfBirth);
        setHeight(existingData.height);
        setRegistrationNumber(existingData.registrationNumber);
        setOfficialRegistryLink(existingData.officialRegistryLink);
        setStudFee(existingData.studFee);
        setGuarantee(existingData.guarantee);
        setBreedingStats(existingData.breedingStats);
        setDiseaseTesting(existingData.diseaseTesting);
        setColourTesting(existingData.colourTesting);
        setPrimaryImageUrl(existingData.media?.primaryImageUrl || "");
        setGalleryUrls(existingData.media?.galleryUrls || ["", "", ""]);
        setVideoUrl(existingData.media?.videoUrl || "");
        setPerformanceRows(existingData.performanceRows || []);
        setProgenyRows(existingData.progenyRows || []);
        setLoading(false);
      } else {
        router.push("/profile");
      }
    }
  }, [id, user]);

  // ২. আপডেট হ্যান্ডলার
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userIdx = currentUsers.findIndex((u: any) => u.email === user.email);

    if (userIdx !== -1) {
      const updatedStallion = {
        id,
        registeredName,
        status,
        countryOfStanding,
        yearOfBirth,
        height,
        registrationNumber,
        officialRegistryLink,
        studFee,
        guarantee,
        breedingStats,
        diseaseTesting,
        colourTesting,
        performanceRows,
        progenyRows,
        media: { primaryImageUrl, galleryUrls, videoUrl },
        updatedAt: new Date().toISOString(),
      };

      const updatedList = user.registeredStallions.map((s: any) =>
        s.id === id ? updatedStallion : s,
      );
      const updatedUser = { ...user, registeredStallions: updatedList };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      currentUsers[userIdx].registeredStallions = updatedList;
      localStorage.setItem("users", JSON.stringify(currentUsers));

      alert("Changes saved successfully!");
      router.push("/profile");
    }
  };

  // --- Row Helpers ---
  const updatePerformanceRow = (
    idx: number,
    key: keyof PerformanceRow,
    value: string,
  ) => {
    setPerformanceRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)),
    );
  };

  const updateProgenyRow = (
    idx: number,
    key: keyof ProgenyRow,
    value: string,
  ) => {
    setProgenyRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)),
    );
  };

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">
        Loading Stallion Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-6 text-zinc-100 pb-20">
      <header className="mb-8 max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Update Stallion Record
          </h1>
          <p className="text-zinc-400 text-sm">Editing: {registeredName}</p>
        </div>
        <Link
          href="/profile"
          className="text-xs font-bold text-zinc-500 hover:text-white transition"
        >
          Cancel & Exit
        </Link>
      </header>

      <form onSubmit={handleUpdate} className="space-y-6 max-w-5xl mx-auto">
        {/* BLOCK 1: IDENTITY */}
        <SectionCard
          title="Stallion Identity"
          subtitle="Basic information and current status."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Status *</FieldLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="Standing">Standing</option>
                <option value="Deceased">Deceased</option>
                <option value="Not Standing">Not Standing</option>
                <option value="Historical Reference">
                  Historical Reference
                </option>
              </Select>
            </div>
            <div>
              <FieldLabel>Registered Name *</FieldLabel>
              <Input
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>Country of Standing *</FieldLabel>
              <Input
                value={countryOfStanding}
                onChange={(e) => setCountryOfStanding(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <FieldLabel>Year of Birth *</FieldLabel>
                <Input
                  value={yearOfBirth}
                  onChange={(e) => setYearOfBirth(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Height</FieldLabel>
                <Input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 2: REGISTRY */}
        <SectionCard
          title="Official Registry"
          subtitle="Verified via registration papers."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Official Registry Record URL</FieldLabel>
              <Input
                value={officialRegistryLink}
                onChange={(e) => setOfficialRegistryLink(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Registration Number *</FieldLabel>
              <Input
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Update Registration Papers (Optional)</FieldLabel>
              <FileUpload label="Upload new PDF or Image if changed" />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 3: PERFORMANCE */}
        <SectionCard
          title="Performance Record"
          subtitle="Include details, judges, and earnings."
        >
          <div className="space-y-4">
            {performanceRows.map((row, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 space-y-3"
              >
                <button
                  type="button"
                  onClick={() =>
                    setPerformanceRows(
                      performanceRows.filter((_, i) => i !== idx),
                    )
                  }
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-900 text-white text-xs border border-red-500"
                >
                  ✕
                </button>
                <div className="grid gap-3 lg:grid-cols-5">
                  <Input
                    value={row.year}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "year", e.target.value)
                    }
                    placeholder="Year"
                  />
                  <Input
                    className="lg:col-span-2"
                    value={row.event}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "event", e.target.value)
                    }
                    placeholder="Event"
                  />
                  <Input
                    value={row.result}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "result", e.target.value)
                    }
                    placeholder="Result"
                  />
                  <Input
                    value={row.reference}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "reference", e.target.value)
                    }
                    placeholder="Ref URL"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Input
                    value={row.notes}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "notes", e.target.value)
                    }
                    placeholder="Notes"
                  />
                  <Input
                    value={row.judges}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "judges", e.target.value)
                    }
                    placeholder="Judges"
                  />
                  <Input
                    value={row.levelEarnings}
                    onChange={(e) =>
                      updatePerformanceRow(idx, "levelEarnings", e.target.value)
                    }
                    placeholder="Earnings"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setPerformanceRows([
                  ...performanceRows,
                  {
                    year: "",
                    event: "",
                    discipline: "",
                    result: "",
                    reference: "",
                    notes: "",
                    judges: "",
                    levelEarnings: "",
                  },
                ])
              }
              className="text-xs text-[#b08d57] hover:underline"
            >
              + Add Row
            </button>
          </div>
        </SectionCard>

        {/* BLOCK 4: PROGENY */}
        <SectionCard
          title="Notable Progeny"
          subtitle="List notable offspring and their achievements."
        >
          <div className="space-y-3">
            {progenyRows.map((row, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-4"
              >
                <button
                  type="button"
                  onClick={() =>
                    setProgenyRows(progenyRows.filter((_, i) => i !== idx))
                  }
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-900 text-white text-xs border border-red-500"
                >
                  ✕
                </button>
                <div className="grid gap-3 lg:grid-cols-3">
                  <Input
                    placeholder="Name"
                    value={row.name}
                    onChange={(e) =>
                      updateProgenyRow(idx, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Year"
                    value={row.year}
                    onChange={(e) =>
                      updateProgenyRow(idx, "year", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Association"
                    value={row.association}
                    onChange={(e) =>
                      updateProgenyRow(idx, "association", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Discipline"
                    value={row.discipline}
                    onChange={(e) =>
                      updateProgenyRow(idx, "discipline", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Result"
                    value={row.result}
                    onChange={(e) =>
                      updateProgenyRow(idx, "result", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Reference"
                    value={row.reference}
                    onChange={(e) =>
                      updateProgenyRow(idx, "reference", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProgenyRows([
                  ...progenyRows,
                  {
                    name: "",
                    year: "",
                    association: "",
                    discipline: "",
                    result: "",
                    reference: "",
                  },
                ])
              }
              className="text-xs text-[#b08d57] hover:underline"
            >
              + Add Progeny Row
            </button>
          </div>
        </SectionCard>

        {/* BLOCK 5: BREEDING */}
        <SectionCard
          title="Breeding Information"
          subtitle="Stud fees and statistics."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              value={studFee}
              onChange={(e) => setStudFee(e.target.value)}
              placeholder="Stud Fee (e.g. 1750 USD)"
            />
            <Select
              value={guarantee}
              onChange={(e) => setGuarantee(e.target.value as any)}
            >
              <option value="None">None</option>
              <option value="LFG">LFG</option>
              <option value="Colour">Colour</option>
            </Select>
            <div className="sm:col-span-2">
              <Textarea
                value={breedingStats}
                onChange={(e) => setBreedingStats(e.target.value)}
                placeholder="Breeding statistics..."
                rows={3}
              />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 6: TESTING */}
        <SectionCard
          title="Health Testing"
          subtitle="Disease and colour testing."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Textarea
                value={diseaseTesting}
                onChange={(e) => setDiseaseTesting(e.target.value)}
                placeholder="Disease Testing"
                rows={2}
              />
              <FileUpload label="Update Disease File" />
            </div>
            <div>
              <Textarea
                value={colourTesting}
                onChange={(e) => setColourTesting(e.target.value)}
                placeholder="Colour Testing"
                rows={2}
              />
              <FileUpload label="Update Colour File" />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 7: MEDIA */}
        <SectionCard title="Media" subtitle="Max 4 photos and 1 video.">
          <Input
            value={primaryImageUrl}
            onChange={(e) => setPrimaryImageUrl(e.target.value)}
            placeholder="Primary Hero URL"
          />
          <div className="grid gap-4 sm:grid-cols-3 mt-4">
            {galleryUrls.map((url, i) => (
              <Input
                key={i}
                value={url}
                onChange={(e) => {
                  const newUrls = [...galleryUrls];
                  newUrls[i] = e.target.value;
                  setGalleryUrls(newUrls);
                }}
                placeholder={`Gallery Image ${i + 1}`}
              />
            ))}
          </div>
          <div className="mt-4">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video URL"
            />
          </div>
        </SectionCard>

        <button
          type="submit"
          className="w-full rounded-md bg-[#b08d57] py-4 font-bold text-black hover:bg-[#d4af37] transition shadow-lg shadow-[#b08d57]/20"
        >
          Save and Update Stallion
        </button>
      </form>
    </div>
  );
}
