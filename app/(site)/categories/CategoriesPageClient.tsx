"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterTabs } from "@/components/FilterTabs";
import { SearchField } from "@/components/SearchField";
import { SortSelect } from "@/components/SortSelect";
import type { CategoryListItem } from "@/lib/sanity-mappers";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
  pageSearchRow,
  pageFiltersRow,
} from "@/lib/layout";
import { fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];
const sortOptions = ["Default", "Most Articles", "A-Z", "Z-A"];
const INITIAL_VISIBLE = 6;
const STEP = 3;

function filterCategories(categories: CategoryListItem[], searchQuery: string, activeTab: string) {
  let result = categories;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (cat) =>
        cat.title.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
    );
  }

  if (activeTab !== "All") {
    result = result.filter((cat) => cat.tag === activeTab || cat.badge === activeTab);
  }

  return result;
}

function sortCategories(categories: CategoryListItem[], sortBy: string) {
  const sorted = [...categories];
  switch (sortBy) {
    case "A-Z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "Z-A":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "Most Articles":
      return sorted.sort((a, b) => b.articleCount - a.articleCount);
    case "Default":
    default:
      return sorted;
  }
}

export default function CategoriesPageClient({
  categories,
}: {
  categories: CategoryListItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [hasExploredAll, setHasExploredAll] = useState(false);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
    setHasExploredAll(false);
  }, [searchQuery, activeTab, sortBy]);

  const filteredAndSorted = useMemo(() => {
    let result = filterCategories(categories, searchQuery, activeTab);
    result = sortCategories(result, sortBy);
    return result;
  }, [categories, searchQuery, activeTab, sortBy]);

  const visibleCategories = filteredAndSorted.slice(0, visibleCount);
  const canToggle = filteredAndSorted.length > INITIAL_VISIBLE;
  const hasMore = visibleCount < filteredAndSorted.length;
  const showExploreLess = hasExploredAll && visibleCount > INITIAL_VISIBLE;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
  }

  const handleExploreMore = () => {
    const next = visibleCount + STEP;
    if (next >= filteredAndSorted.length) {
      setVisibleCount(filteredAndSorted.length);
      setHasExploredAll(true);
    } else {
      setVisibleCount(next);
    }
  };

  const handleExploreLess = () => {
    const next = visibleCount - STEP;
    if (next <= INITIAL_VISIBLE) {
      setVisibleCount(INITIAL_VISIBLE);
      setHasExploredAll(false);
    } else {
      setVisibleCount(next);
    }
  };

  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.div {...fadeUpMountProps(0)} className={pageHeaderBlock}>
          <h1 className={pageTitle}>All Categories</h1>
          <p className={pageSubtitle}>
            Explore our comprehensive collection of learning resources
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search categories..."
          />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs
            tabs={categoryTabs}
            active={activeTab}
            onChange={handleTabChange}
          />
          <SortSelect
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            label="Sort categories"
          />
        </motion.div>

        {visibleCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
            {visibleCategories.map((category, index) => (
              <div key={category._id}>
                <CategoryCard
                  title={category.title}
                  slug={category.slug}
                  image={category.image}
                  badge={category.badge}
                  articleCount={category.articleCount}
                  description={category.description}
                  animationDelay={listStaggerDelay(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No categories found matching your criteria.</p>
          </div>
        )}

        {canToggle && (
          <motion.div {...fadeUpMountProps(0)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              disabled={!hasMore}
              onClick={handleExploreMore}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
            >
              Explore More
              <span aria-hidden="true">&rarr;</span>
            </button>

            {showExploreLess && (
              <button
                type="button"
                onClick={handleExploreLess}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore Less
                <span aria-hidden="true">&uarr;</span>
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
