import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-medium tracking-wide text-(--gold)">
          WESTERN PERFORMANCE HORSE REGISTRY
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Leading Sires Registry
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-(--text-muted)">
          A data-driven reference platform presenting stallion records in a
          structured, factual and standardised format. Designed to support
          trust, comparison, and long-term extensibility.
        </p>

        <div className="flex flex-wrap gap-3 pt-3">
          <Link
            href="/stallions"
            className="rounded-md border border-[#b08d57] px-4 py-2 text-sm font-medium text-[#b08d57] transition hover:bg-[#b08d57] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Browse Stallion Directory
          </Link>

          <Link
            href="/about"
            className="rounded-md border border-[#b08d57] px-4 py-2 text-sm font-medium text-[#b08d57] transition hover:bg-[#b08d57] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            About the Registry
          </Link>
        </div>
      </header>

      <hr className="border-t border-(--gold-soft)" />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-5">
          <p className="text-sm font-semibold text-white">
            Registry-grade presentation
          </p>
          <p className="mt-2 text-sm text-(--text-muted)">
            No marketing visuals. Strong hierarchy, readability and consistent
            formatting.
          </p>
        </div>

        <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-5">
          <p className="text-sm font-semibold text-white">
            Structured data blocks
          </p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Profiles are rendered from structured data using reusable
            components.
          </p>
        </div>

        <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-5">
          <p className="text-sm font-semibold text-white">
            Extensible architecture
          </p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Supabase auth/database and Stripe billing assumed later (not part of
            Phase-1).
          </p>
        </div>
      </section>
    </div>
  );
}
