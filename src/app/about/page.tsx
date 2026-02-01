/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      {/* --- HERO SECTION --- */}
      <header className="text-center space-y-6 pt-10">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          About the Leading Sires Registry
        </h1>
        
        {/* Main description from Image 5 */}
        <div className="max-w-3xl mx-auto space-y-6 text-base leading-relaxed text-zinc-400">
          <p>
            Leading Sires Registry is an independent, performance-focused reference created for breeders and horsemen 
            who value proven working genetics over marketing, built to function across international borders.
          </p>
          <p>
            The registry provides a single, seasonally updated reference page per stallion, consolidating publicly available 
            performance, pedigree, and breeding information, alongside stud-provided details. Each listing links directly 
            back to the official breed association and the stallion's home stud or ranch, ensuring the information remains 
            transparent and verifiable.
          </p>
          <p>
            Leading Sires is not a stud book, association or marketplace. It does not replace any existing breed or discipline 
            registers. Instead, it exists to reduce administrative burden for stallion owners, provide clear and accessible 
            information for breeders, and contribute positively to the sustainability and transparency of the western 
            performance horse industry.
          </p>
        </div>
      </header>

      <hr className="border-t border-zinc-800" />

      {/* --- GRID SECTIONS (Content from Image 2 & 5) --- */}
      <div className="grid gap-12 md:grid-cols-2">
        
        {/* Pedigree & Historical */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Pedigree and Historical Records
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              The registry preserves pedigree and lineage information for stallions regardless of current standing status.
            </p>
            <p>
              Deceased stallions and historically significant sires may be included for pedigree reference and research purposes, 
              without any implication of current availability or commercial activity.
            </p>
            <p>
              Where a stallion is no longer standing or ownership information is incomplete, records are presented in a factual, 
              non-speculative manner.
            </p>
          </div>
        </div>

        {/* International Scope */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            International Scope
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              The Leading Sires Registry support owners and farms across Australia, New Zealand, Canada, North and South America 
              and Europe.
            </p>
            <p>
              Listings are presented in a consistent, non-commercial format and link back to official association records and 
              stud or distributor websites in their original language, allowing breeders to access reliable information 
              across jurisdictions.
            </p>
          </div>
        </div>

        {/* Independence */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Independence of the Registry
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Inclusion of an owner or stallion profile does not imply endorsement, recommendation, or commercial partnership.
            </p>
            <p>
              The Leading Sires Registry functions as an independent reference platform, not a marketing service.
            </p>
          </div>
        </div>

        {/* Updates and Changes */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Updates and Changes
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Ownership, standing status, and service arrangements may change over time.
            </p>
            <p>
              Where possible, historical changes are recorded to maintain the integrity of the registry.
            </p>
            <p>
              Owners and authorised representatives are encouraged to keep information current for active records.
            </p>
          </div>
        </div>
      </div>

      {/* --- FOOTER CTA (Neutral buttons as per Image 4) --- */}
      <footer className="pt-10 flex flex-wrap justify-center gap-6">
        <Link 
          href="/stallions" 
          className="rounded-none border border-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition"
        >
          Stallion Directory
        </Link>
        <Link 
          href="/submit-stallion" 
          className="rounded-none border border-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition"
        >
          Submit a Stallion Listing
        </Link>
      </footer>
    </div>
  );
}