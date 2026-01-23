export default function PricingPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">Pricing</h1>
        <p className="text-sm text-zinc-600">
          This page presents pricing information only. Billing and subscription
          logic are not implemented in Phase-1.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-semibold">Registry Listing</p>
          <p className="mt-2 text-sm text-zinc-600">
            Paid accounts only. Listing includes a structured stallion profile
            rendered in registry format.
          </p>
          <p className="mt-4 text-lg font-semibold">$—</p>
          <p className="text-xs text-zinc-500">Placeholder (Phase-1)</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-semibold">Founding Preview</p>
          <p className="mt-2 text-sm text-zinc-600">
            Founding badge available to early accounts (boolean flag).
          </p>
          <p className="mt-4 text-lg font-semibold">Included</p>
          <p className="text-xs text-zinc-500">Conditional UI badge</p>
        </div>
      </section>
    </div>
  );
}
