export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-white">About</h1>

      <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-6">
        <p className="text-sm leading-6 text-(--text-muted)">
          This platform is an informational registry. It presents stallion
          records in a factual and standardised format. Ownership, availability
          and statistics may change over time; historical records can be
          preserved for integrity as the platform evolves.
        </p>

        <hr className="my-4 border-t border-(--gold-soft)" />

        <p className="text-sm leading-6 text-(--text-muted)">
          Phase-1 delivers the frontend user experience only, using mock data,
          with an architecture intended to integrate Supabase and Stripe in later
          phases.
        </p>
      </div>
    </div>
  );
}
