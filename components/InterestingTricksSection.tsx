"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import type { TrickListItem } from "@/lib/sanity-mappers";
import { pageContainer } from "@/lib/layout";
import { fadeUpInViewProps, listStaggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MOBILE_CARD_LIMIT = 4;

export function InterestingTricksSection({ tricks = [] }: { tricks?: TrickListItem[] }) {
  const visibleTricks = tricks.slice(0, 8);

  if (visibleTricks.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-border/60 py-16">
      <div className={pageContainer}>
        <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 shrink-0 rounded-full bg-primary" />
            <h2 className="text-[28px] font-bold text-foreground">Interesting Tricks</h2>
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Quick, practical answers to everyday tech problems — each trick links to a full guide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {visibleTricks.map((trick, index) => (
            <div
              key={trick.id}
              className={cn(index >= MOBILE_CARD_LIMIT && "hidden sm:block")}
            >
              <InterestingTrickCard
                index={index + 1}
                question={trick.question}
                slug={trick.slug}
                blogSlug={trick.blogSlug}
                category={trick.category}
                animationDelay={listStaggerDelay(index)}
              />
            </div>
          ))}
        </div>

        <motion.div {...fadeUpInViewProps(0)} className="mt-10 w-full text-center">
          <Link
            href="/interesting-tricks"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Explore More
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
