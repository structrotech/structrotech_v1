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
        <article className="group flex flex-col h-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09),0_2px_6px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 dark:bg-[#1c1c1e] dark:border-white/[0.08] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-white/20 dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#f5f5f7] dark:bg-[#12141c]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {articleCount} articles
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
