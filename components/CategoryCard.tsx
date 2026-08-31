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
        <div className="group relative h-[220px] rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,22,0.95) 0%, rgba(5,8,22,0.4) 50%, transparent 100%)",
            }}
          />

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-base font-bold text-white mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">
              {articleCount} articles
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
