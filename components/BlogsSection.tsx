"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import type { BlogListPost } from "@/lib/sanity-mappers";
import { pageContainer } from "@/lib/layout";
import { fadeUpInViewProps, listStaggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MOBILE_CARD_LIMIT = 4;

export function BlogsSection({ blogs = [] }: { blogs?: BlogListPost[] }) {
  const visibleBlogs = blogs.slice(0, 8);

  if (visibleBlogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-border/60 py-16">
      <div className={pageContainer}>
        <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 shrink-0 rounded-full bg-primary" />
            <h2 className="text-[28px] font-bold text-foreground">Blogs & Articles</h2>
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Explore our latest tutorials, developer guides, and technology deep-dives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleBlogs.map((post, index) => (
            <div
              key={post.slug}
              className={cn(index >= MOBILE_CARD_LIMIT && "hidden sm:block")}
            >
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

        <motion.div {...fadeUpInViewProps(0)} className="mt-10 w-full text-center">
          <Link
            href="/blogs"
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
