import { InterestingTricksSection } from "@/components/InterestingTricksSection";
import { pageContainer } from "@/lib/layout";
import { client } from "@/sanity/client";
import { CATEGORIES_QUERY, FEATURED_TRICKS_QUERY } from "@/sanity/queries";
import { mapSanityTrick } from "@/lib/sanity-mappers";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "StructroTech - Learn AI, Cybersecurity, Linux & More",
    description:
      "Your trusted learning companion for AI, Cybersecurity, Linux, Networking, Web Development and more. Simple, structured learning.",
    path: "/",
  }),
  title: {
    absolute: "StructroTech - Learn AI, Cybersecurity, Linux & More",
  },
};

const categoryTabs = ["All", "Tech", "AI", "Cybersecurity", "Cloud", "DevOps"];

export default async function Home() {
  let categories: unknown[] = [];
  let featuredTricks = [];

  try {
    const [fetchedCategories, fetchedTricks] = await Promise.all([
      client.fetch(CATEGORIES_QUERY),
      client.fetch(FEATURED_TRICKS_QUERY),
    ]);
    categories = fetchedCategories;
    featuredTricks = fetchedTricks.map(mapSanityTrick);
  } catch (err) {
    console.error("Sanity fetch error on homepage:", err);
  }

  return (
    <div className="min-h-screen w-full">
      <HeroSection />

      <div className={pageContainer} aria-hidden="true">
        <hr
          className="border-0 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <CategoriesSection categories={categories} categoryTabs={categoryTabs} />

      <InterestingTricksSection tricks={featuredTricks} />
    </div>
  );
}
