"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { fadeUpInViewProps } from "@/lib/motion";
import { nativeShareOrCopy } from "@/lib/share";
import type { Author } from "@/types/sanity";

interface BlogCardProps {
  title: string;
  slug: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  excerpt?: string;
  category: string;
  animationDelay?: number;
}

export function BlogCard({
  title,
  slug,
  coverImage,
  author,
  publishedAt,
  readTime,
  excerpt,
  category,
  animationDelay = 0,
}: BlogCardProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const result = await nativeShareOrCopy(`/blogs/${slug}`, title);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div {...fadeUpInViewProps(animationDelay)}>
      <Link href={`/blogs/${slug}`}>
        <article className="group flex flex-col h-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09),0_2px_6px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 dark:bg-[#1c1c1e] dark:border-white/[0.08] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-white/20 dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#f5f5f7] dark:bg-[#12141c]">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>
            {excerpt ? (
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                {excerpt}
              </p>
            ) : (
              <div className="flex-1 mb-2" />
            )}

            {/* Author & Meta */}
            <div className="flex items-center gap-2.5 justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
              <a
                href={author.socialUrl || "https://www.instagram.com/nithin_techie"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2.5 flex-1 min-w-0 group/author hover:opacity-85 transition-opacity"
                title="Visit Instagram @nithin_techie"
              >
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={28}
                    height={28}
                    className="rounded-full shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {author.name ? author.name.charAt(0).toUpperCase() : "A"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200 truncate leading-snug group-hover/author:text-primary transition-colors">
                    {author.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {author.socialHandle
                      ? (author.socialHandle.startsWith("@") ? author.socialHandle : `@${author.socialHandle}`)
                      : "@nithin_techie"}
                  </p>
                </div>
              </a>
              {/* Share Button */}
              <button
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors shrink-0 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                onClick={handleShare}
                aria-label={copied ? "Link copied" : "Share this post"}
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
        </article>
      </Link>
    </motion.div>
  );
}
