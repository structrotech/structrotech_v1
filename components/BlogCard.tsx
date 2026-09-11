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
  excerpt: string;
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
        <article className="group rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-3.5">
            <h3 className="text-[15px] font-bold text-card-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center gap-2.5 justify-between">
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
                  <p className="text-[11px] text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
              </div>
              {/* Share Button */}
              <button
                className="p-1.5 hover:bg-muted rounded-full transition-colors shrink-0 text-muted-foreground hover:text-primary"
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
