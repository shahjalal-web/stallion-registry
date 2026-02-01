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

      <hr className="border-t border-zinc-800" />

      {/* নিচের সেকশনগুলো ইমেজ ২ এবং ৫ এর কন্টেন্ট অনুযায়ী সাজানো হয়েছে */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Pedigree and Historical Records
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            The registry preserves pedigree and lineage information for stallions regardless of current standing status. Deceased stallions and historically significant sires may be included for pedigree reference and research purposes.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            International Scope
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            The Leading Sires Registry support owners and farms across Australia, New Zealand, Canada, North and South America and Europe. Listings are presented in a consistent, non-commercial format.
          </p>
        </div>
      </section>
    </div>
  );
}