import type { Stallion } from "@/types/stallion";
import Section from "./Section";

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    return null;
  } catch {
    return null;
  }
}

export default function VideoReferences({ stallion }: { stallion: Stallion }) {
  const vids = stallion.media?.videos || [];

  return (
    <Section
      title="Video References"
      subtitle="Informational footage only. Availability varies by record and season."
    >
      {vids.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          No video references provided.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {vids.map((v, idx) => {
            const yt = getYouTubeId(v.url);
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white"
              >
                <div className="aspect-video bg-zinc-100">
                  {yt ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${yt}`}
                      title="Video reference"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-sm text-zinc-600">
                      Video link available (non-embed)
                    </div>
                  )}
                </div>
                <div className="border-t border-zinc-200 p-3">
                  <p className="text-xs text-zinc-600">
                    {v.type ? `Type: ${v.type}` : "Reference video"}
                  </p>
                  <a
                    href={v.url}
                    target="_blank"
                    className="mt-1 inline-block text-sm text-zinc-800 hover:underline"
                  >
                    Open link
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
