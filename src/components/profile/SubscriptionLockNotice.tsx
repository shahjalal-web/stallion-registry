import type { Stallion } from "@/types/stallion";

export default function SubscriptionLockNotice({ stallion }: { stallion: Stallion }) {
  if (stallion.hasActiveSubscription !== false) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Optional: Add a subtle lock icon or dot for visual cue */}
        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        <p className="text-sm font-semibold text-zinc-100">Subscription required</p>
      </div>
      <p className="mt-1 text-sm text-zinc-400">
        This record is viewable in Phase-1 UI. Features like favourites and
        updates are locked without an active subscription.
      </p>
    </div>
  );
}