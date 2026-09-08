"use client";

import { useMemo, useState } from "react";
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
const INITIAL_VISIBLE = 12;

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

  const filteredAndSorted = useMemo(() => {
    let result = filterCategories(categories, searchQuery, activeTab);
    result = sortCategories(result, sortBy);
    return result;
  }, [categories, searchQuery, activeTab, sortBy]);

  const visibleCategories = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE);
  }

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

        {hasMore && (
          <motion.div {...fadeUpMountProps(0)} className="mt-10 w-full text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore More
              <span aria-hidden="true">&rarr;</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
