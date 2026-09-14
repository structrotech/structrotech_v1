"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BlogCard } from "@/components/BlogCard";
import type { BlogListPost } from "@/lib/sanity-mappers";
import { pageContainer } from "@/lib/layout";
import { fadeUpInViewProps } from "@/lib/motion";

interface RecentBlogsSectionProps {
  blogs?: BlogListPost[];
}

export function RecentBlogsSection({ blogs = [] }: RecentBlogsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;

    updateScrollState(api);
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api, updateScrollState]);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-border/60 py-16">
      <div className={pageContainer}>
        {/* Section Header */}
        <motion.div {...fadeUpInViewProps(0)} className="mb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 shrink-0 rounded-full bg-primary" />
            <h2 className="text-[28px] font-bold text-foreground">Recent Blogs</h2>
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Discover our newest and recently updated guides, tutorials, and tech deep-dives.
          </p>
        </motion.div>

        {/* Cards Carousel with Left and Right side navigation arrows */}
        <div className="relative w-full">
          {/* Left Arrow (on the left of the cards) */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous blogs"
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Carousel Track: matches home page blog section sizing (1 on mobile, 2 on tablet, 4 on PC) */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-5">
              {blogs.map((post) => (
                <CarouselItem
                  key={post.slug}
                  className="pl-5 basis-full sm:basis-1/2 lg:basis-1/4"
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
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Right Arrow (on the right of the cards) */}
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next blogs"
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Explore More Button */}
        <motion.div {...fadeUpInViewProps(0.2)} className="mt-10 w-full text-center">
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
