"use client";

import { useMemo, useState } from "react";
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
  const [visibleCount, setVisibleCount] = useState(6);

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
  const hasMore = visibleCount < filteredPosts.length;

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

        {hasMore && (
          <motion.div {...fadeUpInViewProps(0)} className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 bg-card border border-border text-foreground font-medium rounded-full hover:border-primary/50 transition-colors min-h-[44px]"
            >
              Explore More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
