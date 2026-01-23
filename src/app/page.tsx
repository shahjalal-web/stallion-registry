import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium tracking-wide text-zinc-500">
          WESTERN PERFORMANCE HORSE REGISTRY
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Leading Sires Registry
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600">
          A data-driven reference platform presenting stallion records in a
          structured, factual and standardised format. Designed to support
          trust, comparison, and long-term extensibility.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/stallions"
            className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Browse Stallion Directory
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-transparent px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            About the Registry
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold">Registry-grade presentation</p>
          <p className="mt-2 text-sm text-zinc-600">
            No marketing visuals. Strong hierarchy, readability and consistent
            formatting.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold">Structured data blocks</p>
          <p className="mt-2 text-sm text-zinc-600">
            Profiles are rendered from structured data using reusable
            components.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold">Extensible architecture</p>
          <p className="mt-2 text-sm text-zinc-600">
            Supabase auth/database and Stripe billing assumed later (not part of
            Phase-1).
          </p>
        </div>
      </section>
    </div>
  );
}
