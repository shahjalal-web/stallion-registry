export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black px-6 py-12 text-zinc-200">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* TITLE */}
        <header className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-white">Pricing</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The Leading Sires Registry is an independent global reference, not a
            marketplace. Listings are presented in a consistent, non commercial
            format and are not ranked, promoted, or prioritised.
          </p>
        </header>

        {/* STALLION LISTINGS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            Stallion Listings
          </h2>

          <div className="rounded-xl border border-[#6b5736] bg-zinc-950 p-6 space-y-4">
            <p className="font-medium text-white">
              Farm/Ranch Registry Account – 79 per year
            </p>
            <p className="text-sm text-zinc-400">
              (USD/EUR/AUD/CAD/NZD – billed in your selected country)
            </p>

            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Unlimited stallion profiles under one farm or ranch</li>
              <li>Standardised stallion pages with verified registry links</li>
              <li>
                Genetics, breeding information, media and service provider links
              </li>
              <li>Updates managed annually or as required</li>
              <li>
                No advertising, no featured placements, no performance rankings
              </li>
            </ul>
          </div>
        </section>

        {/* PEDIGREE ONLY */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            Pedigree-Only & Historical Listings
          </h2>

          <p className="text-sm text-zinc-400">
            Pedigree and lineage records may be included at no cost where a
            stallion is:
          </p>

          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>deceased</li>
            <li>no longer standing</li>
            <li>of historical or breeding significance only</li>
          </ul>

          <p className="text-sm text-zinc-400">
            These records are presented for reference and research purposes and
            do not imply current availability or commercial activity.
          </p>
        </section>

        {/* INTERNATIONAL */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            International Listings & Currency
          </h2>

          <p className="text-sm text-zinc-400">
            The Leading Sires Registry supports listings across:
          </p>

          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Australia</li>
            <li>New Zealand</li>
            <li>Canada</li>
            <li>North & South America</li>
            <li>Europe</li>
          </ul>
        </section>

        {/* IMPORTANT NOTES */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            Important Notes
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>
              The Leading Sires Registry is not a stud book, association or
              marketplace.
            </li>
            <li>Listings are factual and reference based.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
