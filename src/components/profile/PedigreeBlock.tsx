import type { Stallion } from "@/types/stallion";
import Section from "./Section";

function Node(props: { title: string; value?: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-sm shadow-black/30">
      <p className="text-xs font-medium text-zinc-400">{props.title}</p>
      <p className="mt-1 text-sm font-medium text-zinc-100">
        {props.value || "—"}
      </p>
    </div>
  );
}

export default function PedigreeBlock({ stallion }: { stallion: Stallion }) {
  const p = stallion.pedigree;

  return (
    <Section
      title="Pedigree"
      subtitle="Structured lineage presentation. Deeper pedigree may be incomplete."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Node title="Sire" value={p.sireName} />
        <Node title="Dam" value={p.damName} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Node title="Grandsire (sire line)" value={p.grandsireSireLine} />
        <Node title="Granddam (sire line)" value={p.granddamSireLine} />
        <Node title="Grandsire (dam line)" value={p.grandsireDamLine} />
        <Node title="Granddam (dam line)" value={p.granddamDamLine} />
      </div>
    </Section>
  );
}
