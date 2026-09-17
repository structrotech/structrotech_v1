import { InterestingTricksSection } from "@/components/InterestingTricksSection";
import { BlogsSection } from "@/components/BlogsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { pageContainer } from "@/lib/layout";
import { client } from "@/sanity/client";
import { CATEGORIES_QUERY, FEATURED_TRICKS_QUERY, POSTS_QUERY, RESOURCES_QUERY } from "@/sanity/queries";
import { mapSanityTrick, mapSanityPostForCard, mapSanityResource } from "@/lib/sanity-mappers";
import { HeroSection } from "@/components/HeroSection";
import { RecentBlogsSection } from "@/components/RecentBlogsSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FALLBACK_CATEGORIES, FALLBACK_TRICKS, FALLBACK_POSTS, FALLBACK_RESOURCES } from "@/lib/fallback-data";

export const revalidate = 60;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "StructroLearn",
    description:
      "We make evolving technologies and complex concepts simple, structured, and organized.",
    path: "/",
  }),
  title: {
    absolute: "StructroLearn",
  },
};

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default async function Home() {
  let categories: any[] = [];
  let featuredTricks = [];
  let posts = [];
  let resources = [];

  try {
    const [fetchedCategories, fetchedTricks, fetchedPosts, fetchedResources] = await Promise.all([
      client.fetch(CATEGORIES_QUERY),
      client.fetch(FEATURED_TRICKS_QUERY),
      client.fetch(POSTS_QUERY),
      client.fetch(RESOURCES_QUERY),
    ]);
    categories = fetchedCategories;
    featuredTricks = fetchedTricks.map(mapSanityTrick);
    posts = fetchedPosts
      .filter((post: { slug?: { current?: string } }) => post.slug?.current)
      .map(mapSanityPostForCard);
    resources = fetchedResources
      .filter((r: { slug?: { current?: string } }) => r.slug?.current)
      .map(mapSanityResource);
  } catch (err) {
    console.error("Sanity fetch error on homepage, loading local fallbacks:", err);
    categories = FALLBACK_CATEGORIES;
    featuredTricks = FALLBACK_TRICKS.map(mapSanityTrick);
    posts = FALLBACK_POSTS.map(mapSanityPostForCard);
    resources = FALLBACK_RESOURCES.map(mapSanityResource);
  }

  const getEffectiveDate = (post: { updatedAt?: string; publishedAt?: string }) => {
    const updatedTime = post.updatedAt ? new Date(post.updatedAt).getTime() : 0;
    const publishedTime = post.publishedAt ? new Date(post.publishedAt).getTime() : 0;
    return Math.max(
      Number.isNaN(updatedTime) ? 0 : updatedTime,
      Number.isNaN(publishedTime) ? 0 : publishedTime
    );
  };

  const recentBlogs = [...posts].sort(
    (a, b) => getEffectiveDate(b) - getEffectiveDate(a)
  );

  return (
    <div className="min-h-screen w-full">
      <HeroSection />

      <RecentBlogsSection blogs={recentBlogs} />

      <div className={pageContainer} aria-hidden="true">
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <CategoriesSection categories={categories} categoryTabs={categoryTabs} />

      <BlogsSection blogs={posts} />

      <InterestingTricksSection tricks={featuredTricks} />

      <ResourcesSection resources={resources} />
    </div>
  );
}
