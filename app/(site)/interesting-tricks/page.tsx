import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { TRICKS_QUERY } from "@/sanity/queries";
import { mapSanityTrick } from "@/lib/sanity-mappers";
import InterestingTricksPageClient from "./InterestingTricksPageClient";
import { FALLBACK_TRICKS } from "@/lib/fallback-data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Interesting Tricks",
  description:
    "Practical how-tos and bite-sized tech guides for mobile, PC, productivity, networking, and security.",
  path: "/interesting-tricks",
});

export default async function InterestingTricksPage() {
  let initialTricks = [];
  try {
    const fetched = await client.fetch(TRICKS_QUERY);
    initialTricks = fetched.map(mapSanityTrick);
  } catch (err) {
    console.error("Sanity fetch error on interesting-tricks page, loading local fallbacks:", err);
    initialTricks = FALLBACK_TRICKS.map(mapSanityTrick);
  }

  return <InterestingTricksPageClient initialTricks={initialTricks} />;
}
