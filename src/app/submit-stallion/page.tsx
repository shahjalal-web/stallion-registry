/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useMemo, useState } from "react";

// type Breed = "Quarter Horse" | "Paint" | "Appaloosa";
// type SemenAvailability = "Fresh" | "Chilled" | "Frozen" | "Combination";
// type Guarantee = "LFG" | "Colour" | "None";

// type PerformanceRow = {
//   year: string;
//   event: string;
//   discipline: string;
//   result: string;
//   reference: string;
// };

// const gold = "border-[#D4AF37] focus:border-[#FFD700]";

// function FieldLabel({ children }: { children: React.ReactNode }) {
//   return <p className="text-xs font-medium text-zinc-400">{children}</p>;
// }

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className={[
//         "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none",
//         "border " + gold,
//         "placeholder:text-zinc-500",
//         props.className || "",
//       ].join(" ")}
//     />
//   );
// }

// function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
//   return (
//     <textarea
//       {...props}
//       className={[
//         "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none",
//         "border " + gold,
//         "placeholder:text-zinc-500",
//         props.className || "",
//       ].join(" ")}
//     />
//   );
// }

// function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
//   return (
//     <select
//       {...props}
//       className={[
//         "mt-1 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none",
//         "border " + gold,
//         props.className || "",
//       ].join(" ")}
//     />
//   );
// }

// function SectionCard(props: {
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
//       <div className="mb-4 space-y-1">
//         <h2 className="text-sm font-semibold text-white">{props.title}</h2>
//         {props.subtitle ? (
//           <p className="text-xs text-zinc-400">{props.subtitle}</p>
//         ) : null}
//       </div>
//       {props.children}
//     </section>
//   );
// }

// function ErrorText({ children }: { children: React.ReactNode }) {
//   return <p className="mt-1 text-xs text-red-400">{children}</p>;
// }

// export default function SubmitStallionPage() {
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(true);

//   const [registeredName, setRegisteredName] = useState("");
//   const [breed, setBreed] = useState<Breed>("Quarter Horse");
//   const [countryOfStanding, setCountryOfStanding] = useState("United States");
//   const [yearOfBirth, setYearOfBirth] = useState("");
//   const [colour, setColour] = useState("");
//   const [height, setHeight] = useState("");

//   const [registryAssociation, setRegistryAssociation] = useState("AQHA");
//   const [registrationNumber, setRegistrationNumber] = useState("");
//   const [officialRegistryLink, setOfficialRegistryLink] = useState("");

//   const [sireName, setSireName] = useState("");
//   const [damName, setDamName] = useState("");

//   const [ownerName, setOwnerName] = useState("");
//   const [ownerAddress, setOwnerAddress] = useState("");
//   const [ownerPhone, setOwnerPhone] = useState("");
//   const [ownerWebsite, setOwnerWebsite] = useState("");
//   const [ownerFacebook, setOwnerFacebook] = useState("");
//   const [ownerInstagram, setOwnerInstagram] = useState("");

//   const [overview, setOverview] = useState("");

//   const [availability, setAvailability] = useState<SemenAvailability>("Frozen");
//   const [studFee, setStudFee] = useState("");
//   const [breedingManager, setBreedingManager] = useState("");
//   const [serviceProviderName, setServiceProviderName] = useState("");
//   const [serviceProviderUrl, setServiceProviderUrl] = useState("");
//   const [countryAvailability, setCountryAvailability] = useState(
//     "United States, Canada",
//   );
//   const [guarantee, setGuarantee] = useState<Guarantee>("None");
//   const [breedingNotes, setBreedingNotes] = useState("");

//   const [diseaseTesting, setDiseaseTesting] = useState("");
//   const [colourTesting, setColourTesting] = useState("");

//   const [disciplineFocus, setDisciplineFocus] = useState(
//     "Western Pleasure, Ranch Riding, Trail",
//   );

//   const [performanceRows, setPerformanceRows] = useState<PerformanceRow[]>([
//     {
//       year: "2023",
//       event: "AQHA Level 1 Championship",
//       discipline: "Senior Western Pleasure",
//       result: "Top 10",
//       reference: "",
//     },
//   ]);

//   const [primaryImageUrl, setPrimaryImageUrl] = useState("");
//   const [galleryUrls, setGalleryUrls] = useState("");
//   const [videoUrls, setVideoUrls] = useState("");

//   const errors = useMemo(() => {
//     const e: Record<string, string> = {};

//     if (!registeredName.trim())
//       e.registeredName = "Registered name is required.";
//     if (!registrationNumber.trim())
//       e.registrationNumber = "Registration number is required.";
//     if (!yearOfBirth.trim()) e.yearOfBirth = "Year of birth is required.";
//     if (!/^\d{4}$/.test(yearOfBirth.trim()))
//       e.yearOfBirth = "Enter a valid year (e.g. 2016).";

//     if (!sireName.trim()) e.sireName = "Sire name is required.";
//     if (!damName.trim()) e.damName = "Dam name is required.";

//     if (!ownerName.trim()) e.ownerName = "Owner name is required.";
//     if (!countryOfStanding.trim())
//       e.countryOfStanding = "Country of standing is required.";

//     return e;
//   }, [
//     registeredName,
//     registrationNumber,
//     yearOfBirth,
//     sireName,
//     damName,
//     ownerName,
//     countryOfStanding,
//   ]);

//   const canSubmit = hasActiveSubscription && Object.keys(errors).length === 0;

//   const addPerformanceRow = () => {
//     setPerformanceRows((prev) => [
//       ...prev,
//       { year: "", event: "", discipline: "", result: "", reference: "" },
//     ]);
//   };

//   const removePerformanceRow = (idx: number) => {
//     setPerformanceRows((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const updatePerformanceRow = (
//     idx: number,
//     key: keyof PerformanceRow,
//     value: string,
//   ) => {
//     setPerformanceRows((prev) =>
//       prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)),
//     );
//   };

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!hasActiveSubscription) return alert("Subscription required.");
//     if (Object.keys(errors).length > 0)
//       return alert("Complete required fields.");

//     console.log("SUBMISSION PAYLOAD:", {
//       registeredName,
//       breed,
//       countryOfStanding,
//       yearOfBirth,
//       colour,
//       height,
//       registryAssociation,
//       registrationNumber,
//       officialRegistryLink,
//       pedigree: { sireName, damName },
//       owner: {
//         ownerName,
//         ownerAddress,
//         ownerPhone,
//         ownerWebsite,
//         ownerFacebook,
//         ownerInstagram,
//       },
//       overview,
//       breeding: {
//         availability,
//         studFee,
//         breedingManager,
//         serviceProviderName,
//         serviceProviderUrl,
//         countryAvailability,
//         guarantee,
//         breedingNotes,
//       },
//       testing: { diseaseTesting, colourTesting },
//       disciplineFocus,
//       performanceRows,
//       media: { primaryImageUrl, galleryUrls, videoUrls },
//     });

//     alert("Submitted (Phase-1 demo)");
//   };

//   return (
//     <div className="space-y-6 bg-black p-6 text-zinc-100 min-h-screen">
//       <header className="space-y-2">
//         <h1 className="text-xl font-semibold text-white">
//           Registry Submission
//         </h1>
//         <p className="text-sm text-zinc-400">
//           Submit a stallion listing for review. Phase-1 frontend demo.
//         </p>
//       </header>

//       {/* Demo toggle (remove in production) */}
//       <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg shadow-black/30">
//         <p className="text-sm font-semibold text-white">
//           Demo: Subscription state
//         </p>
//         <p className="mt-1 text-sm text-zinc-400">
//           Toggle to preview locked submission behaviour.
//         </p>

//         <div className="mt-3 flex items-center gap-3">
//           <button
//             onClick={() => setHasActiveSubscription(true)}
//             className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
//               hasActiveSubscription
//                 ? "border-[#D4AF37] bg-[#D4AF37] text-black"
//                 : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#D4AF37] hover:text-white"
//             }`}
//           >
//             Active subscription
//           </button>

//           <button
//             onClick={() => setHasActiveSubscription(false)}
//             className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
//               !hasActiveSubscription
//                 ? "border-[#D4AF37] bg-[#D4AF37] text-black"
//                 : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-[#D4AF37] hover:text-white"
//             }`}
//           >
//             No subscription
//           </button>
//         </div>
//       </div>

//       {!hasActiveSubscription ? (
//         <div className="rounded-xl border border-[#D4AF37]/40 bg-zinc-950 p-4 shadow-lg shadow-black/30">
//           <p className="text-sm font-semibold text-[#FFD700]">
//             Submission locked
//           </p>
//           <p className="mt-1 text-sm text-zinc-400">
//             An active subscription is required to submit a stallion listing.
//             (Phase-1 demo lock state)
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={onSubmit} className="space-y-6">
//           {/* CORE */}
//           <SectionCard
//             title="Stallion Details"
//             subtitle="Core identity data (required fields)."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <FieldLabel>Registered Name *</FieldLabel>
//                 <Input
//                   value={registeredName}
//                   onChange={(e) => setRegisteredName(e.target.value)}
//                   placeholder="e.g. Obsidian Knight"
//                 />
//                 {errors.registeredName ? (
//                   <ErrorText>{errors.registeredName}</ErrorText>
//                 ) : null}
//               </div>

//               <div>
//                 <FieldLabel>Breed *</FieldLabel>
//                 <Select
//                   value={breed}
//                   onChange={(e) => setBreed(e.target.value as Breed)}
//                 >
//                   <option>Quarter Horse</option>
//                   <option>Paint</option>
//                   <option>Appaloosa</option>
//                 </Select>
//               </div>

//               <div>
//                 <FieldLabel>Country of Standing *</FieldLabel>
//                 <Input
//                   value={countryOfStanding}
//                   onChange={(e) => setCountryOfStanding(e.target.value)}
//                   placeholder="e.g. United States"
//                 />
//                 {errors.countryOfStanding ? (
//                   <ErrorText>{errors.countryOfStanding}</ErrorText>
//                 ) : null}
//               </div>

//               <div>
//                 <FieldLabel>Year of Birth *</FieldLabel>
//                 <Input
//                   value={yearOfBirth}
//                   onChange={(e) => setYearOfBirth(e.target.value)}
//                   placeholder="e.g. 2016"
//                   inputMode="numeric"
//                 />
//                 {errors.yearOfBirth ? (
//                   <ErrorText>{errors.yearOfBirth}</ErrorText>
//                 ) : null}
//               </div>

//               <div>
//                 <FieldLabel>Colour</FieldLabel>
//                 <Input
//                   value={colour}
//                   onChange={(e) => setColour(e.target.value)}
//                   placeholder="e.g. Black"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Height</FieldLabel>
//                 <Input
//                   value={height}
//                   onChange={(e) => setHeight(e.target.value)}
//                   placeholder="e.g. 15.2 HH"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Discipline focus</FieldLabel>
//                 <Input
//                   value={disciplineFocus}
//                   onChange={(e) => setDisciplineFocus(e.target.value)}
//                   placeholder="e.g. Western Pleasure, Ranch Riding, Trail"
//                 />
//                 <p className="mt-1 text-xs text-zinc-500">
//                   Comma-separated values.
//                 </p>
//               </div>
//             </div>
//           </SectionCard>

//           {/* REGISTRY */}
//           <SectionCard
//             title="Registry Information"
//             subtitle="Association and record references."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <FieldLabel>Registry association</FieldLabel>
//                 <Input
//                   value={registryAssociation}
//                   onChange={(e) => setRegistryAssociation(e.target.value)}
//                   placeholder="e.g. AQHA"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Registration number *</FieldLabel>
//                 <Input
//                   value={registrationNumber}
//                   onChange={(e) => setRegistrationNumber(e.target.value)}
//                   placeholder="e.g. AQHA 1234567"
//                 />
//                 {errors.registrationNumber ? (
//                   <ErrorText>{errors.registrationNumber}</ErrorText>
//                 ) : null}
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Official registry link</FieldLabel>
//                 <Input
//                   value={officialRegistryLink}
//                   onChange={(e) => setOfficialRegistryLink(e.target.value)}
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* PEDIGREE */}
//           <SectionCard title="Pedigree" subtitle="Sire and dam (required).">
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <FieldLabel>Sire name *</FieldLabel>
//                 <Input
//                   value={sireName}
//                   onChange={(e) => setSireName(e.target.value)}
//                   placeholder="e.g. Midnight Resolve"
//                 />
//                 {errors.sireName ? (
//                   <ErrorText>{errors.sireName}</ErrorText>
//                 ) : null}
//               </div>

//               <div>
//                 <FieldLabel>Dam name *</FieldLabel>
//                 <Input
//                   value={damName}
//                   onChange={(e) => setDamName(e.target.value)}
//                   placeholder="e.g. Velvet Horizon"
//                 />
//                 {errors.damName ? (
//                   <ErrorText>{errors.damName}</ErrorText>
//                 ) : null}
//               </div>
//             </div>
//           </SectionCard>

//           {/* OWNER */}
//           <SectionCard
//             title="Owner / Contact"
//             subtitle="Who is responsible for this listing."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <FieldLabel>Owner name *</FieldLabel>
//                 <Input
//                   value={ownerName}
//                   onChange={(e) => setOwnerName(e.target.value)}
//                   placeholder="e.g. Blackstone Performance Ranch"
//                 />
//                 {errors.ownerName ? (
//                   <ErrorText>{errors.ownerName}</ErrorText>
//                 ) : null}
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Address</FieldLabel>
//                 <Input
//                   value={ownerAddress}
//                   onChange={(e) => setOwnerAddress(e.target.value)}
//                   placeholder="City, State / Region, Country"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Phone</FieldLabel>
//                 <Input
//                   value={ownerPhone}
//                   onChange={(e) => setOwnerPhone(e.target.value)}
//                   placeholder="+1 ..."
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Website</FieldLabel>
//                 <Input
//                   value={ownerWebsite}
//                   onChange={(e) => setOwnerWebsite(e.target.value)}
//                   placeholder="https://..."
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Facebook</FieldLabel>
//                 <Input
//                   value={ownerFacebook}
//                   onChange={(e) => setOwnerFacebook(e.target.value)}
//                   placeholder="https://facebook.com/..."
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Instagram</FieldLabel>
//                 <Input
//                   value={ownerInstagram}
//                   onChange={(e) => setOwnerInstagram(e.target.value)}
//                   placeholder="https://instagram.com/..."
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* OVERVIEW */}
//           <SectionCard
//             title="Overview"
//             subtitle="Owner-submitted narrative (optional)."
//           >
//             <FieldLabel>Overview text</FieldLabel>
//             <Textarea
//               value={overview}
//               onChange={(e) => setOverview(e.target.value)}
//               rows={6}
//               placeholder="Write a factual overview..."
//             />
//           </SectionCard>

//           {/* BREEDING */}
//           <SectionCard
//             title="Breeding Details"
//             subtitle="Availability, fees and provider information."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <FieldLabel>Semen availability</FieldLabel>
//                 <Select
//                   value={availability}
//                   onChange={(e) =>
//                     setAvailability(e.target.value as SemenAvailability)
//                   }
//                 >
//                   <option>Fresh</option>
//                   <option>Chilled</option>
//                   <option>Frozen</option>
//                   <option>Combination</option>
//                 </Select>
//               </div>

//               <div>
//                 <FieldLabel>Stud fee</FieldLabel>
//                 <Input
//                   value={studFee}
//                   onChange={(e) => setStudFee(e.target.value)}
//                   placeholder="e.g. 1750 USD"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Breeding manager</FieldLabel>
//                 <Input
//                   value={breedingManager}
//                   onChange={(e) => setBreedingManager(e.target.value)}
//                   placeholder="Breeding office contact"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Guarantee</FieldLabel>
//                 <Select
//                   value={guarantee}
//                   onChange={(e) => setGuarantee(e.target.value as Guarantee)}
//                 >
//                   <option value="None">None</option>
//                   <option value="LFG">LFG</option>
//                   <option value="Colour">Colour</option>
//                 </Select>
//               </div>

//               <div>
//                 <FieldLabel>Breeding service provider</FieldLabel>
//                 <Input
//                   value={serviceProviderName}
//                   onChange={(e) => setServiceProviderName(e.target.value)}
//                   placeholder="Provider name"
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Provider URL</FieldLabel>
//                 <Input
//                   value={serviceProviderUrl}
//                   onChange={(e) => setServiceProviderUrl(e.target.value)}
//                   placeholder="https://..."
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Country availability</FieldLabel>
//                 <Input
//                   value={countryAvailability}
//                   onChange={(e) => setCountryAvailability(e.target.value)}
//                   placeholder="e.g. United States, Canada"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Additional breeding notes</FieldLabel>
//                 <Textarea
//                   value={breedingNotes}
//                   onChange={(e) => setBreedingNotes(e.target.value)}
//                   rows={4}
//                   placeholder="Add factual notes..."
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* TESTING */}
//           <SectionCard
//             title="Testing Results"
//             subtitle="Testing summaries (optional)."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <FieldLabel>Disease testing results</FieldLabel>
//                 <Textarea
//                   value={diseaseTesting}
//                   onChange={(e) => setDiseaseTesting(e.target.value)}
//                   rows={3}
//                   placeholder="e.g. 6-panel N/N..."
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Colour testing results</FieldLabel>
//                 <Textarea
//                   value={colourTesting}
//                   onChange={(e) => setColourTesting(e.target.value)}
//                   rows={3}
//                   placeholder="e.g. E/E, a/a..."
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* PERFORMANCE */}
//           <SectionCard
//             title="Performance Record"
//             subtitle="Enter performance entries (optional)."
//           >
//             <div className="space-y-3">
//               {performanceRows.map((row, idx) => (
//                 <div
//                   key={idx}
//                   className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-md shadow-black/30"
//                 >
//                   <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
//                     <div>
//                       <FieldLabel>Year</FieldLabel>
//                       <Input
//                         value={row.year}
//                         onChange={(e) =>
//                           updatePerformanceRow(idx, "year", e.target.value)
//                         }
//                       />
//                     </div>

//                     <div className="lg:col-span-2">
//                       <FieldLabel>Association / Event</FieldLabel>
//                       <Input
//                         value={row.event}
//                         onChange={(e) =>
//                           updatePerformanceRow(idx, "event", e.target.value)
//                         }
//                       />
//                     </div>

//                     <div>
//                       <FieldLabel>Discipline / Class</FieldLabel>
//                       <Input
//                         value={row.discipline}
//                         onChange={(e) =>
//                           updatePerformanceRow(
//                             idx,
//                             "discipline",
//                             e.target.value,
//                           )
//                         }
//                       />
//                     </div>

//                     <div>
//                       <FieldLabel>Result</FieldLabel>
//                       <Input
//                         value={row.result}
//                         onChange={(e) =>
//                           updatePerformanceRow(idx, "result", e.target.value)
//                         }
//                       />
//                     </div>

//                     <div className="sm:col-span-2 lg:col-span-5">
//                       <FieldLabel>Reference link</FieldLabel>
//                       <Input
//                         value={row.reference}
//                         onChange={(e) =>
//                           updatePerformanceRow(idx, "reference", e.target.value)
//                         }
//                         placeholder="https://..."
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-3 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removePerformanceRow(idx)}
//                       className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#D4AF37] hover:text-white"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={addPerformanceRow}
//                 className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#D4AF37] hover:text-white"
//               >
//                 Add performance entry
//               </button>
//             </div>
//           </SectionCard>

//           {/* MEDIA */}
//           <SectionCard
//             title="Media"
//             subtitle="Reference images and videos (optional)."
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <FieldLabel>Primary image URL</FieldLabel>
//                 <Input
//                   value={primaryImageUrl}
//                   onChange={(e) => setPrimaryImageUrl(e.target.value)}
//                   placeholder="https://..."
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Gallery image URLs</FieldLabel>
//                 <Textarea
//                   value={galleryUrls}
//                   onChange={(e) => setGalleryUrls(e.target.value)}
//                   rows={3}
//                   placeholder="One URL per line"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FieldLabel>Video reference URLs</FieldLabel>
//                 <Textarea
//                   value={videoUrls}
//                   onChange={(e) => setVideoUrls(e.target.value)}
//                   rows={3}
//                   placeholder="One URL per line"
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* SUBMIT */}
//           <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg shadow-black/30">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm font-semibold text-white">
//                   Submit listing
//                 </p>

//                 <p className="mt-1 text-sm text-zinc-400">
//                   Phase-1 demo: submission prints payload to console.
//                 </p>

//                 {!hasActiveSubscription ? (
//                   <p className="mt-2 text-xs text-zinc-500">
//                     Subscription required to submit.
//                   </p>
//                 ) : null}
//               </div>

//               <button
//                 type="submit"
//                 disabled={!canSubmit}
//                 className="rounded-md border border-[#D4AF37] px-4 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Submit for review
//               </button>
//             </div>
//           </div>
//           <div>
//             {Object.keys(errors).length > 0 ? (
//               <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//                 Please complete the required fields marked with *.
//               </div>
//             ) : null}
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";

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

const gold = "border-[#D4AF37] focus:border-[#FFD700]";

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
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#D4AF37] bg-zinc-900/50 py-4 transition hover:bg-zinc-900">
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
  const [hasActiveSubscription] = useState(true);

  // 1. Core Identity
  const [status, setStatus] = useState<StallionStatus>("Active");
  const [registeredName, setRegisteredName] = useState("");
  const [breed, setBreed] = useState<Breed>("Quarter Horse");
  const [countryOfStanding, setCountryOfStanding] = useState("United States");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [colour, setColour] = useState("");
  const [height, setHeight] = useState("");

  // 2. Registry (Pedigree removed as per client request)
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [officialRegistryLink, setOfficialRegistryLink] = useState("");

  // 3. Breeding & Stats
  const [availability, setAvailability] = useState<SemenAvailability>("Frozen");
  const [studFee, setStudFee] = useState("");
  const [guarantee, setGuarantee] = useState<Guarantee>("None");
  const [breedingNotes, setBreedingNotes] = useState("");
  const [breedingStats, setBreedingStats] = useState("");
  const [notableProgeny, setNotableProgeny] = useState("");

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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 max-w-5xl"
      >
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
                onChange={(e) => setStatus(e.target.value as StallionStatus)}
              >
                <option value="Active">Active</option>
                <option value="Deceased">Deceased</option>
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

        {/* BLOCK 4: PERFORMANCE RECORD */}
        <SectionCard
          title="Performance Record"
          subtitle="Include details, judges, and earnings."
        >
          <div className="space-y-4">
            {performanceRows.map((row, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 space-y-3"
              >
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
                  },
                ])
              }
              className="text-xs text-[#D4AF37]"
            >
              + Add Row
            </button>
          </div>
        </SectionCard>
        {/* BLOCK 3: BREEDING & PERFORMANCE STATS */}
        <SectionCard
          title="Breeding & Progeny"
          subtitle="Stud fees and offspring information."
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
            <div className="sm:col-span-2">
              <FieldLabel>Notable Progeny</FieldLabel>
              <Textarea
                value={notableProgeny}
                onChange={(e) => setNotableProgeny(e.target.value)}
                placeholder="List of performing offspring..."
                rows={3}
              />
            </div>
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
          className="w-full rounded-md border border-[#D4AF37] py-4 font-bold text-[#ffffff] hover:bg-[#ffc401]  transition disabled:opacity-20"
        >
          Submit Stallion for Review
        </button>
      </form>

      {/* FOOTER */}
      {/* <footer className="mt-20 border-t border-zinc-800 py-10 text-center">
        <div className="flex justify-center gap-8 text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Help
          </a>
        </div>
        <p className="text-[10px] text-zinc-600">
          © 2026 Stallion Directory. All Rights Reserved.
        </p>
      </footer> */}
    </div>
  );
}
