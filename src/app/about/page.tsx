export default function AboutPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">About</h1>
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <p className="text-sm leading-6 text-zinc-700">
          This platform is an informational registry. It presents stallion
          records in a factual and standardised format. Ownership, availability
          and statistics may change over time; historical records can be
          preserved for integrity as the platform evolves.
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Phase-1 delivers the frontend user experience only, using mock data,
          with an architecture intended to integrate Supabase and Stripe in later
          phases.
        </p>
      </div>
    </div>
  );
}
