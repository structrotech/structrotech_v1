"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpInViewProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface InterestingTrickCardProps {
  question: string;
  slug?: string;
  blogSlug?: string;
  category: string;
  index: number;
  size?: "default" | "sm";
  animationDelay?: number;
  className?: string;
}

/**
 * Minimal, professional horizontal trick card.
 * Short in height/length, wide in width, with the category in the right-side corner.
 */
export function InterestingTrickCard({
  question,
  slug,
  blogSlug,
  category,
  index,
  size = "default",
  animationDelay = 0,
  className,
}: InterestingTrickCardProps) {
  const href = slug ? `/interesting-tricks/${slug}` : `/blogs/${blogSlug ?? ""}`;
  const isSm = size === "sm";

  return (
    <motion.div {...fadeUpInViewProps(animationDelay)} className={cn("w-full", className)}>
      <Link
        href={href}
        className={cn(
          "group relative flex w-full items-center justify-between gap-3 sm:gap-4 overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-200",
          "border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
          "dark:border-white/[0.08] dark:bg-[#18181b] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)] dark:hover:border-primary/40 dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]",
          isSm ? "min-h-[50px] px-3.5 py-2.5" : "min-h-[58px] sm:min-h-[64px] px-4 py-3 sm:py-3.5"
        )}
      >
        {/* Left: Minimal index number */}
        <span
          className={cn(
            "shrink-0 flex items-center justify-center rounded-lg border font-semibold tabular-nums transition-colors",
            "border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
            isSm ? "h-7 w-7 text-xs" : "h-8 w-8 text-xs sm:text-[13px]"
          )}
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* Center: Trick question (clean, minimal, wide) */}
        <p
          className={cn(
            "min-w-0 flex-1 text-left font-medium leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2",
            isSm ? "text-[13.5px] sm:text-[14px]" : "text-[14.5px] sm:text-[15px]"
          )}
        >
          {question}
        </p>

        {/* Right Side Corner: Category */}
        {category ? (
          <span
            className={cn(
              "shrink-0 self-center rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 font-medium tracking-wide text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground",
              isSm ? "text-[10px]" : "text-[11px]"
            )}
          >
            {category}
          </span>
        ) : null}
      </Link>
    </motion.div>
  );
}
