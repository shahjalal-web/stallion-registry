export default function PricingPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-white">Pricing</h1>
        <p className="text-sm text-(--text-muted)">
          This page presents pricing information only. Billing and subscription
          logic are not implemented in Phase-1.
        </p>
      </header>

      <hr className="border-t border-(--gold-soft)" />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-6">
          <p className="text-sm font-semibold text-white">Registry Listing</p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Paid accounts only. Listing includes a structured stallion profile
            rendered in registry format.
          </p>
          <p className="mt-4 text-lg font-semibold text-(--gold)">$—</p>
          <p className="text-xs text-(--text-muted)">Placeholder (Phase-1)</p>
        </div>

        <div className="rounded-xl border border-(--gold-soft) bg-(--bg-surface) p-6">
          <p className="text-sm font-semibold text-white">Founding Preview</p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Founding badge available to early accounts (boolean flag).
          </p>
          <p className="mt-4 text-lg font-semibold text-(--gold)">Included</p>
          <p className="text-xs text-(--text-muted)">Conditional UI badge</p>
        </div>
      </section>
    </div>
  );
}
