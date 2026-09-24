"use client";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  url?: string | null;
  title?: string;
  caption?: string;
  className?: string;
}

/**
 * Extracts a YouTube 11-character video ID from various link formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - Raw 11-char ID
 */
export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Check if it's already an 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=|shorts\/))([a-zA-Z0-9_-]{11})/i
  );
  return match ? match[1] : null;
}

export function YouTubeEmbed({ url, title, caption, className }: YouTubeEmbedProps) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return (
    <figure className={cn("my-6 w-full", className)}>
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-black shadow-md">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title || caption || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground font-serif">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
