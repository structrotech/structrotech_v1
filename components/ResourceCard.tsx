"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Share2, Check } from "lucide-react";
import { fadeUpInViewProps } from "@/lib/motion";
import { nativeShareOrCopy } from "@/lib/share";
import type { Author } from "@/types/sanity";

interface ResourceCardProps {
  title: string;
  slug: string;
  type: string;
  image: string;
  description: string;
  downloadUrl?: string;
  author?: Author;
  publishedAt?: string;
  animationDelay?: number;
}

export function ResourceCard({
  title,
  slug,
  type,
  image,
  description,
  downloadUrl,
  author,
  publishedAt,
  animationDelay = 0,
}: ResourceCardProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const result = await nativeShareOrCopy(`/resources/${slug}`, title);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }
  return (
    <motion.div {...fadeUpInViewProps(animationDelay)}>
      <Link href={`/resources/${slug}`}>
        <article className="group rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-accent/80 text-accent-foreground rounded-full backdrop-blur-sm">
                {type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-base font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {description}
            </p>

            {/* Author, Download & Share */}
            <div className="flex items-center justify-between gap-3 pt-1">
              {author ? (
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={28}
                    height={28}
                    className="rounded-full shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-card-foreground truncate">
                      {author.name}
                    </p>
                    {formattedDate && (
                      <p className="text-[11px] text-muted-foreground">
                        {formattedDate}
                      </p>
                    )}
                  </div>
                </div>
              ) : formattedDate ? (
                <p className="text-[11px] text-muted-foreground flex-1 min-w-0">
                  {formattedDate}
                </p>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2 shrink-0">
                {downloadUrl && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(downloadUrl, "_blank");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                )}
                <button
                  className="p-1.5 hover:bg-muted rounded-full transition-colors shrink-0 text-muted-foreground hover:text-primary"
                  onClick={handleShare}
                  aria-label={copied ? "Link copied" : "Share this resource"}
                  title={copied ? "Link copied" : "Share"}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
