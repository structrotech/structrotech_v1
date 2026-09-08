"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { InterestingTrickCard } from "@/components/InterestingTrickCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import type { TrickListItem } from "@/lib/sanity-mappers";
import { sortTricks } from "@/lib/sort";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
  pageSearchRow,
  pageFiltersRow,
} from "@/lib/layout";
import { fadeUpMountProps, fadeUpInViewProps, listStaggerDelay } from "@/lib/motion";

const sortOptions = ["Latest", "Oldest", "Most Popular", "Beginner Friendly", "A-Z"];
const INITIAL_VISIBLE = 8;

function filterTricks(tricks: TrickListItem[], searchQuery: string, activeCategory: string) {
  let result = tricks;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (trick) =>
        trick.question.toLowerCase().includes(q) || trick.category.toLowerCase().includes(q)
    );
  }

  if (activeCategory !== "All") {
    result = result.filter((trick) => trick.category === activeCategory);
  }

  return result;
}

export default function InterestingTricksPageClient({
  initialTricks,
}: {
  initialTricks: TrickListItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const trickCategories = useMemo(() => {
    const categories = [...new Set(initialTricks.map((t) => t.category).filter(Boolean))];
    return ["All", ...categories.sort()];
  }, [initialTricks]);

  const filteredTricks = useMemo(() => {
    let result = filterTricks(initialTricks, searchQuery, activeCategory);
    result = sortTricks(result, sortBy);
    return result;
  }, [initialTricks, searchQuery, activeCategory, sortBy]);

  const visibleTricks = filteredTricks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTricks.length;

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>Interesting Tricks</h1>
          <p className={pageSubtitle}>
            Practical how-tos for mobile, PC, productivity, and more — each opens the full blog guide.
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Search tricks..." />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs tabs={trickCategories} active={activeCategory} onChange={setActiveCategory} />
          <SortSelect value={sortBy} options={sortOptions} onChange={setSortBy} label="Sort tricks" />
        </motion.div>

        {visibleTricks.length > 0 ? (
          <div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleTricks.map((trick, index) => (
              <div key={trick.id}>
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
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No tricks found matching your criteria.</p>
          </div>
        )}

        {hasMore && (
          <motion.div {...fadeUpInViewProps(0)} className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="min-h-[44px] rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/50"
            >
              Explore More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
