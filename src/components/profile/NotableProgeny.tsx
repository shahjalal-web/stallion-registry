import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function NotableProgeny({ stallion }: { stallion: Stallion }) {
  const list = stallion.notableProgeny || [];

  return (
    <Section
      title="Notable Progeny"
      subtitle="Evidence-based. Presented in a factual format with references where possible."
    >
      {list.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          No notable progeny listed.
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((p, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 bg-white p-4"
            >
              <p className="text-sm font-semibold text-zinc-900">{p.name}</p>
              <p className="mt-1 text-sm text-zinc-700">
                {[
                  p.year ? String(p.year) : null,
                  p.association,
                  p.discipline,
                ]
                  .filter(Boolean)
                  .join(" · ") || "—"}
              </p>
              <p className="mt-2 text-sm text-zinc-800">{p.result}</p>
              <p className="mt-2 text-sm">
                {p.reference?.href ? (
                  <a
                    href={p.reference.href}
                    target="_blank"
                    className="text-zinc-800 hover:underline"
                  >
                    {p.reference.label || "Reference"}
                  </a>
                ) : (
                  <span className="text-zinc-500">No reference</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
