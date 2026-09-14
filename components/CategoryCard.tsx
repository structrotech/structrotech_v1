"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpInViewProps } from "@/lib/motion";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  badge: string;
  articleCount: number;
  description: string;
  animationDelay?: number;
}

export function CategoryCard({
  title,
  slug,
  image,
  badge,
  articleCount,
  animationDelay = 0,
}: CategoryCardProps) {
  return (
    <motion.div {...fadeUpInViewProps(animationDelay)}>
      <Link href={`/categories/${slug}`}>
        <article className="group rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] dark:bg-[#151820] dark:border-white/10 dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06] dark:hover:border-primary/50 dark:hover:-translate-y-[2px] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.65),0_0_16px_rgba(139,92,246,0.25)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted dark:bg-[#12141c]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Content */}
          <div className="p-3.5">
            <h3 className="text-[15px] font-bold text-card-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {articleCount} articles
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
