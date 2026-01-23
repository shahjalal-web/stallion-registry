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
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          No gallery images provided.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imgs.map((img, idx) => (
            <figure
              key={idx}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption || `Gallery image ${idx + 1}`}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="border-t border-zinc-200 p-3 text-xs text-zinc-600">
                {img.caption || "Reference image"}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
