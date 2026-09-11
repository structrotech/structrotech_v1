"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { SearchField } from "@/components/SearchField";
import { FilterTabs } from "@/components/FilterTabs";
import { SortSelect } from "@/components/SortSelect";
import type { BlogListPost } from "@/lib/sanity-mappers";
import { sortPosts } from "@/lib/sort";
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
const STEP = 3;

function filterPosts(posts: BlogListPost[], searchQuery: string, activeCategory: string) {
  let result = posts;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );
  }

  if (activeCategory !== "All") {
    result = result.filter((post) => post.category === activeCategory);
  }

  return result;
}

export default function BlogsPageClient({ initialPosts }: { initialPosts: BlogListPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [hasExploredAll, setHasExploredAll] = useState(false);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
    setHasExploredAll(false);
  }, [searchQuery, activeCategory, sortBy]);

  const categoryTabs = useMemo(() => {
    const titles = [...new Set(initialPosts.map((p) => p.category).filter(Boolean))];
    return ["All", ...titles.slice(0, 5)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    let result = filterPosts(initialPosts, searchQuery, activeCategory);
    result = sortPosts(result, sortBy);
    return result;
  }, [initialPosts, searchQuery, activeCategory, sortBy]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const canToggle = filteredPosts.length > INITIAL_VISIBLE;
  const hasMore = visibleCount < filteredPosts.length;
  const showExploreLess = hasExploredAll && visibleCount > INITIAL_VISIBLE;

  const handleExploreMore = () => {
    const next = visibleCount + STEP;
    if (next >= filteredPosts.length) {
      setVisibleCount(filteredPosts.length);
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
          <h1 className={pageTitle}>Blogs & Articles</h1>
          <p className={pageSubtitle}>
            Discover tutorials, guides, and insights from our experts
          </p>
        </motion.div>

        <motion.div {...fadeUpMountProps(0.1)} className={pageSearchRow}>
          <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Search articles..." />
        </motion.div>

        <motion.div {...fadeUpMountProps(0.2)} className={pageFiltersRow}>
          <FilterTabs tabs={categoryTabs} active={activeCategory} onChange={setActiveCategory} />
          <SortSelect value={sortBy} options={sortOptions} onChange={setSortBy} label="Sort articles" />
        </motion.div>

        {visiblePosts.length > 0 ? (
          <div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visiblePosts.map((post, index) => (
              <div key={post.slug}>
                <BlogCard
                  title={post.title}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  author={post.author}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  excerpt={post.excerpt}
                  category={post.category}
                  animationDelay={listStaggerDelay(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
          </div>
        )}

        {canToggle && (
          <motion.div {...fadeUpInViewProps(0)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
