import { client } from "@/sanity/client";
import { RESOURCES_QUERY } from "@/sanity/queries";
import { mapSanityResource } from "@/lib/sanity-mappers";
import ResourcesPageClient from "./ResourcesPageClient";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Download roadmaps, cheatsheets, notes, guides, and tools to accelerate your technology learning journey.",
  path: "/resources",
});

export default async function ResourcesPage() {
  let initialResources = [];
  try {
    const fetched = await client.fetch(RESOURCES_QUERY);
    initialResources = fetched
      .filter((r: { slug?: { current?: string } }) => r.slug?.current)
      .map(mapSanityResource);
  } catch (err) {
    console.error("Sanity fetch error on resources page:", err);
  }

  return <ResourcesPageClient initialResources={initialResources} />;
}
