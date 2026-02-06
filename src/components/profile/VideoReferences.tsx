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
  // আপনার ডেটা মডেলে videoUrl একটি স্ট্রিং। 
  // তাই সরাসরি stallion.media.videoUrl ব্যবহার করতে হবে।
  const videoUrl = stallion.media?.videoUrl;
  const ytId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <Section
      title="Video References"
      subtitle="Informational footage only. Availability varies by record and season."
    >
      {!videoUrl ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-400">
          No video references provided.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="aspect-video bg-zinc-100">
              {ytId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="Video reference"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-sm text-zinc-600 text-center">
                  Video link available but cannot be embedded. <br />
                  Please use the link below.
                </div>
              )}
            </div>
            <div className="border-t border-zinc-200 p-3">
              <p className="text-xs text-zinc-600">
                Reference video
              </p>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-blue-500 hover:underline"
              >
                Open video link
              </a>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}