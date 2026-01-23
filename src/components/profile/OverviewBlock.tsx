import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function OverviewBlock({ stallion }: { stallion: Stallion }) {
  return (
    <Section
      title="Overview"
      subtitle="Owner-submitted content. Presented for reference only."
    >
      <p className="text-sm leading-6 text-zinc-700">
        {stallion.overview || "No overview provided."}
      </p>
    </Section>
  );
}
