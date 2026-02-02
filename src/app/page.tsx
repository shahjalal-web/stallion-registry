import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-6">
        {/* Banner text from Image 3 */}
        <p className="text-xs font-medium tracking-wide text-zinc-400">
          Now onboarding founding stallions – registry visibility ahead of full launch.
        </p>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Performance Stallion Breeding Registry
          </h1>
          <p className="text-lg font-medium text-zinc-300">
            Pedigree | Performance | Breeding Information
          </p>
        </div>

        {/* Intro text from Image 3 */}
        <div className="max-w-2xl space-y-4 text-sm leading-6 text-zinc-400">
          <p>
            Leading Sires is a performance-focused sire registry created for breeders and horsemen who value proven working genetics.
          </p>
          <p>
            Each stallion is presented on a single reference page that consolidates pedigree, performance and breeding information, supported by official association records and ranch or farm websites, creating a transparent, verifiable resource for serious breeders and programs.
          </p>
        </div>

        {/* Breed tags from Image 3 */}
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Quarter Horses | Paints | Appaloosas
        </p>

        {/* Action buttons from Image 3 & 4 */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/stallions"
            className="flex-1 sm:flex-none text-center rounded-none border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
          >
            Stallion Directory
          </Link>

          <Link
            href="/submit-stallion"
            className="flex-1 sm:flex-none text-center rounded-none border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
          >
            Submit a Stallion Listing
          </Link>
        </div>
      </header>

      {/* ক্লায়েন্টের ইনস্ট্রাকশন অনুযায়ী নিচের সেকশনগুলো হোম পেজ থেকে সরিয়ে শুধুমাত্র একটি ডিভাইডার রাখা হয়েছে */}
      <hr className="border-t border-zinc-800" />
    </div>
  );
}