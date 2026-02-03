import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <header className="space-y-8 pt-10">
        <p className="text-xs font-medium tracking-[0.2em] text-[#B08D57] uppercase">
          Now onboarding founding stallions – registry visibility ahead of full launch.
        </p>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl">
            Performance Stallion Breeding Registry
          </h1>
          <p className="text-xl font-medium text-zinc-400 tracking-wide">
            Pedigree | Performance | Breeding Information
          </p>
        </div>

        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-zinc-400">
          <p>
            Leading Sires is a performance-focused sire registry created for breeders and horsemen who value proven working genetics.
          </p>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Quarter Horses | Paints | Appaloosas
        </p>

        {/* PRIMARY CTA */}
        <div className="flex flex-wrap gap-4 pt-6">
          <Link
            href="/stallions"
            className="flex-1 sm:flex-none text-center rounded-none border border-white bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white"
          >
            Stallion Directory
          </Link>

          <Link
            href="/submit-stallion/before-submit"
            className="flex-1 sm:flex-none text-center rounded-none border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            Submit a Listing
          </Link>
        </div>
      </header>

      {/* 2. VALUE PROPOSITION (Supporting Content) */}
      <section className="grid gap-16 border-t border-zinc-900 pt-16 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
            Transparency & Verification
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Each stallion is presented on a single reference page that consolidates pedigree, performance and breeding information, supported by official association records and ranch or farm websites.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
            Independent Reference
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Leading Sires is an independent reference platform, not a marketplace. We exist to provide clear and accessible information for breeders and horsemen across international borders.
          </p>
        </div>
      </section>

      {/* 3. ADDITIONAL SUPPORTING CONTENT */}
      <section className="space-y-12 border-t border-zinc-900 pt-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-lg font-semibold text-white">Built for the Western Performance Industry</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Our registry supports owners and farms across Australia, New Zealand, Canada, North and South America, and Europe. By centralizing verifiable data, we reduce administrative burden and contribute to industry sustainability.
          </p>
        </div>

        <div className="flex justify-start">
          <Link 
            href="/about" 
            className="text-xs font-bold uppercase tracking-widest text-[#B08D57] hover:text-white transition"
          >
            Learn more about the registry →
          </Link>
        </div>
      </section>
    </div>
  );
}