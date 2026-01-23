import type { Stallion } from "@/types/stallion";

export default function SubscriptionLockNotice({ stallion }: { stallion: Stallion }) {
  if (stallion.hasActiveSubscription !== false) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <p className="text-sm font-semibold">Subscription required</p>
      <p className="mt-1 text-sm text-zinc-600">
        This record is viewable in Phase-1 UI. Features like favourites and
        updates are locked without an active subscription.
      </p>
    </div>
  );
}
