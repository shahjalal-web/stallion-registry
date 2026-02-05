/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Section from "./Section";

export default function PhotoGallery({ stallion }: { stallion: any }) {
  // আপনার ডাটা মডেল অনুযায়ী: media.galleryUrls (এটি স্ট্রিংয়ের অ্যারে)
  // এবং খালি স্ট্রিংগুলো ফিল্টার করে বাদ দেওয়া হয়েছে
  const galleryImages = stallion?.media?.galleryUrls?.filter((url: string) => url !== "") || [];

  return (
    <Section
      title="Photo Gallery"
      subtitle="Reference images presented without promotional overlays."
    >
      {galleryImages.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center text-sm text-zinc-500">
          No gallery images provided.
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((url: string, idx: number) => (
            <figure
              key={idx}
              className="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm shadow-black/30 transition-all hover:border-zinc-700"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={url}
                  alt={`${stallion?.registeredName || "Stallion"} gallery ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="border-t border-zinc-800 bg-zinc-900/50 p-3 text-[10px] uppercase tracking-wider text-zinc-500">
                Reference Image {idx + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}