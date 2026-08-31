"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpInViewProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

const baseCardClass =
  "group flex h-full flex-col justify-between rounded-2xl border border-border/90 bg-card shadow-[0_6px_28px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-primary/50 hover:shadow-[0_10px_36px_rgba(139,92,246,0.18)] hover:ring-2 hover:ring-primary/15 dark:hover:shadow-[0_12px_40px_rgba(139,92,246,0.22)]";

const sizeClass: Record<NonNullable<InterestingTrickCardProps["size"]>, string> =
  {
    default: "min-h-[112px] p-4",
    sm: "min-h-[96px] p-3.5",
  };

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
  return (
    <motion.div {...fadeUpInViewProps(animationDelay)} className={cn("h-full", className)}>
      <Link
        href={href}
        className={cn(baseCardClass, sizeClass[size])}
      >
        <div className={cn("flex items-start justify-between gap-3", size === "sm" ? "mb-3" : "mb-4")}>
          <div
            className={cn(
              "shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-bold tabular-nums text-primary",
              size === "sm" ? "flex h-9 w-9 text-sm" : "flex h-10 w-10 text-base"
            )}
            aria-hidden="true"
          >
            {index}
          </div>
          <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {category}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p
            className={cn(
              "text-left font-medium leading-snug text-foreground transition-colors group-hover:text-primary",
              size === "sm" ? "text-[14px]" : "text-[15px]"
            )}
          >
            {question}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
