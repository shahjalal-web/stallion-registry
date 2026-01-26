/* eslint-disable @next/next/no-img-element */
import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function PhotoGallery({ stallion }: { stallion: Stallion }) {
  const imgs = stallion.media?.gallery || [];

  return (
    <Section
      title="Photo Gallery"
      subtitle="Reference images presented without promotional overlays."
    >
      {imgs.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
          No gallery images provided.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imgs.map((img, idx) => (
            <figure
              key={idx}
              className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm shadow-black/30"
            >
              <img
                src={img.url}
                alt={img.caption || `Gallery image ${idx + 1}`}
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="border-t border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-400">
                {img.caption || "Reference image"}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
