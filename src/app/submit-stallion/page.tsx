/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { ProgenyRow } from "@/types/stallion";
import { useMemo, useState, useEffect } from "react";

import Link from "next/link";
import { useAuth } from "../auth-context";
import { useRouter } from "next/navigation";

type Breed = "Quarter Horse" | "Paint" | "Appaloosa";
type SemenAvailability = "Fresh" | "Chilled" | "Frozen" | "Combination";
type Guarantee = "LFG" | "Colour" | "None";
type StallionStatus = "Active" | "Deceased";

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

// --- Main Page Component ---
export default function SubmitStallionPage() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [hasActiveSubscription] = useState(true);

  const [progenyRows, setProgenyRows] = useState<ProgenyRow[]>([
    {
      name: "",
      year: "",
      association: "",
      discipline: "",
      result: "",
      reference: "",
    },
  ]);

  const router = useRouter();

  // 1. Core Identity
  const [status, setStatus] = useState<StallionStatus>("Active");
  const [registeredName, setRegisteredName] = useState("");
  const [countryOfStanding, setCountryOfStanding] = useState("United States");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [height, setHeight] = useState("");

  // 2. Registry (Pedigree removed as per client request)
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [officialRegistryLink, setOfficialRegistryLink] = useState("");

  // 3. Breeding & Stats
  const [studFee, setStudFee] = useState("");
  const [guarantee, setGuarantee] = useState<Guarantee>("None");
  const [breedingStats, setBreedingStats] = useState("");

  // 4. Testing
  const [diseaseTesting, setDiseaseTesting] = useState("");
  const [colourTesting, setColourTesting] = useState("");

  // 5. Performance
  const [performanceRows, setPerformanceRows] = useState<PerformanceRow[]>([
    { year: "", event: "", discipline: "", result: "", reference: "" },
  ]);

  // 6. Media (Limited to 1 hero + 3 gallery)
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState(["", "", ""]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
      // মডাল ওপেন থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ রাখবে
      document.body.style.overflow = "hidden";
    } else {
      setShowAuthModal(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [user]);

  const removePerformanceRow = (index: any) => {
    const newRows = performanceRows.filter((_, i) => i !== index);
    setPerformanceRows(newRows);
  };

  // Validation
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!registeredName.trim()) e.registeredName = "Required";
    if (!registrationNumber.trim()) e.registrationNumber = "Required";
    if (!diseaseTesting.trim())
      e.diseaseTesting = "Note & result file required";
    return e;
  }, [registeredName, registrationNumber, diseaseTesting]);

  const canSubmit = hasActiveSubscription && Object.keys(errors).length === 0;

  const updatePerformanceRow = (
    idx: number,
    key: keyof PerformanceRow,
    value: string,
  ) => {
    setPerformanceRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)),
    );
  };

  const addProgenyRow = () => {
    setProgenyRows((prev) => [
      ...prev,
      {
        name: "",
        year: "",
        association: "",
        discipline: "",
        result: "",
        reference: "",
      },
    ]);
  };

  const removeProgenyRow = (idx: number) => {
    setProgenyRows((prev) => prev.filter((_, i) => i !== idx));
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

  // SubmitStallionPage কম্পোনেন্টের ভেতরে এই ফাংশনটি যোগ করো
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      alert("Please complete all required fields.");
      return;
    }

    // ১. নতুন ঘোড়ার অবজেক্ট তৈরি (প্রোফাইল পেজের ফরম্যাটে)
    const newStallion = {
      id: Date.now().toString(), // ইউনিক আইডি জেনারেট করা
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
      media: {
        primaryImageUrl,
        galleryUrls,
        videoUrl,
      },
      submittedAt: new Date().toISOString(),
    };

    // ২. লোকাল স্টোরেজ থেকে সব ইউজারদের ডেটা আনা
    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserIndex = currentUsers.findIndex(
      (u: any) => u.email === user?.email,
    );

    if (currentUserIndex !== -1 && user) {
      // ৩. ইউজারের registeredStallions লিস্ট আপডেট করা
      const updatedUser = {
        ...user,
        registeredStallions: [...(user.registeredStallions || []), newStallion],
      };

      // ৪. Context এবং LocalStorage আপডেট করা
      // এখানে সরাসরি LocalStorage আপডেট করছি যেহেতু Context এর জন্য আলাদা ফাংশন লিখিনি
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      currentUsers[currentUserIndex].registeredStallions =
        updatedUser.registeredStallions;
      localStorage.setItem("users", JSON.stringify(currentUsers));
      // router.push("/payment");
      // alert(
      //   "Stallion submitted successfully! It is now visible in your profile.",
      // );
      window.location.href = "/payment"; // প্রোফাইল পেজে রিডাইরেক্ট
    }
  };

  // পেজ লোড হওয়ার সময় ইউজার ডেটা থাকলে তা ইনপুট ফিল্ডে বসিয়ে দিবে
  useEffect(() => {
    if (user?.name) {
      setRegisteredName(user.name); // ইউজারের নাম অটোমেটিক বসে যাবে
    }
    // // যদি ইউজারের কান্ট্রি বা অন্য তথ্য প্রোফাইলে থাকে তবে সেগুলোও সেট করতে পারেন
    // if (user?.location) {
    //   setCountryOfStanding(user.location);}
  }, [user]);

  return (
    <div className="min-h-screen bg-black p-6 text-zinc-100">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Stallion Registration Request
        </h1>
        <p className="text-zinc-400 text-sm">
          Please fill out the form below to register your stallion.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        {/* BLOCK 1: STATUS & CORE */}
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
                placeholder="Full Name"
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
                  placeholder="YYYY"
                />
              </div>
              <div>
                <FieldLabel>Height</FieldLabel>
                <Input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="HH"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 2: REGISTRY & PAPERS */}
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
                placeholder="https://..."
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
              <FieldLabel>
                Upload Registration Papers * (Pedigree verification)
              </FieldLabel>
              <FileUpload label="Upload PDF or Image" required />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 3: PERFORMANCE RECORD */}
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
                {/* Remove Button - ওপরের ডান কোণায় */}
                <button
                  type="button"
                  onClick={() => removePerformanceRow(idx)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-900/80 text-white text-xs flex items-center justify-center hover:bg-red-700 transition-colors border border-red-500"
                >
                  ✕
                </button>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
              className="text-xs text-[#b08d57] hover:underline flex items-center gap-1"
            >
              + Add Performance Row
            </button>
          </div>
        </SectionCard>

        {/* BLOCK 4: NOTABLE PROGENY */}
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
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Input
                    placeholder="Progeny name"
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
                    placeholder="Reference link"
                    value={row.reference}
                    onChange={(e) =>
                      updateProgenyRow(idx, "reference", e.target.value)
                    }
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeProgenyRow(idx)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProgenyRow}
              className="rounded-md border border-[#D4AF37] px-3 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              + Add progeny row
            </button>
          </div>
        </SectionCard>

        {/* ২. BLOCK 4: BREEDING (এখান থেকে Notable Progeny Textarea বাদ দেওয়া হয়েছে) */}
        <SectionCard
          title="Breeding Information"
          subtitle="Stud fees and basic statistics."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Stud Fee (Reference) $ AUD/USD/EUR</FieldLabel>
              <Input
                value={studFee}
                onChange={(e) => setStudFee(e.target.value)}
                placeholder="e.g. 1750 USD"
              />
            </div>
            <div>
              <FieldLabel>Guarantee</FieldLabel>
              <Select
                value={guarantee}
                onChange={(e) => setGuarantee(e.target.value as Guarantee)}
              >
                <option value="None">None</option>
                <option value="LFG">LFG</option>
                <option value="Colour">Colour</option>
              </Select>
            </div>

            {/* Notable Progeny Textarea টি এখান থেকে সরিয়ে ফেলা হয়েছে */}

            <div className="sm:col-span-2">
              <FieldLabel>Breeding Statistics</FieldLabel>
              <Textarea
                value={breedingStats}
                onChange={(e) => setBreedingStats(e.target.value)}
                placeholder="Foal counts, point earners, etc."
                rows={3}
              />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 5: TESTING */}
        <SectionCard
          title="Health Testing"
          subtitle="Compulsory disease panel results."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Disease Testing (Compulsory) *</FieldLabel>
              <Textarea
                value={diseaseTesting}
                onChange={(e) => setDiseaseTesting(e.target.value)}
                placeholder="e.g. 5-panel N/N"
                rows={2}
              />
              <FileUpload label="Upload Disease Results" required />
            </div>
            <div>
              <FieldLabel>Colour Testing (Optional)</FieldLabel>
              <Textarea
                value={colourTesting}
                onChange={(e) => setColourTesting(e.target.value)}
                placeholder="e.g. E/E, a/a"
                rows={2}
              />
              <FileUpload label="Upload Colour Results" />
            </div>
          </div>
        </SectionCard>

        {/* BLOCK 6: MEDIA */}
        <SectionCard title="Media" subtitle="Maximum 4 photos and 1 video.">
          <div className="space-y-4">
            <div>
              <FieldLabel>Primary Hero Image URL *</FieldLabel>
              <Input
                value={primaryImageUrl}
                onChange={(e) => setPrimaryImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {galleryUrls.map((url, i) => (
                <div key={i}>
                  <FieldLabel>Gallery Image {i + 1}</FieldLabel>
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...galleryUrls];
                      newUrls[i] = e.target.value;
                      setGalleryUrls(newUrls);
                    }}
                    placeholder="Optional"
                  />
                </div>
              ))}
            </div>
            <div>
              <FieldLabel>Video Reference URL</FieldLabel>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube/Vimeo"
              />
            </div>
          </div>
        </SectionCard>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-md border border-[#b08d57] py-4 font-bold text-white transition-all hover:bg-[#b08d57] hover:text-black disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Submit Stallion for Review
        </button>
      </form>

      {/* --- AUTH REQUIRED MODAL --- */}
      {showAuthModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#b08d57]/10 text-[#b08d57]">
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Login Required
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              You must be logged in to access the Stallion Registration form.
              Please sign in to your account to continue.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full rounded-xl bg-[#b08d57] py-3 text-sm font-bold text-black transition-all hover:bg-[#d4af37]"
              >
                Login to My Account
              </Link>
              <Link
                href="/signup"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-sm font-bold text-zinc-300 transition-all hover:bg-zinc-800"
              >
                Create New Account
              </Link>
            </div>

            <Link
              href="/stallions"
              className="mt-6 inline-block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Back to Directory
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
