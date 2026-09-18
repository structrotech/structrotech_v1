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
        <article className="group flex flex-col h-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09),0_2px_6px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 dark:bg-[#1c1c1e] dark:border-white/[0.08] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-white/20 dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#f5f5f7] dark:bg-[#12141c]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-md">
                {type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed flex-1">
              {description}
            </p>

            {/* Author, Download & Share */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
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
