import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function DisciplineCoverage({ stallion }: { stallion: Stallion }) {
  return (
    <Section
      title="Discipline Coverage"
      subtitle="Inclusion indicates recorded participation or registration, not endorsement or ranking."
    >
      <p className="text-sm leading-6 text-zinc-400">
        {stallion.disciplineCoverageDescription ||
          "No discipline coverage description provided."}
      </p>
    </Section>
  );
}
