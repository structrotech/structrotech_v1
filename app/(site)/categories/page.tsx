import { client } from "@/sanity/client";
import { CATEGORIES_QUERY } from "@/sanity/queries";
import { mapSanityCategory } from "@/lib/sanity-mappers";
import CategoriesPageClient from "./CategoriesPageClient";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Categories",
  description:
    "Explore our comprehensive collection of learning resources across AI, cybersecurity, Linux, cloud, DevOps, and more.",
  path: "/categories",
});

export default async function CategoriesPage() {
  let categories = [];
  try {
    const fetched = await client.fetch(CATEGORIES_QUERY);
    categories = fetched.map(mapSanityCategory);
  } catch (err) {
    console.error("Sanity fetch error on categories page:", err);
  }

  return <CategoriesPageClient categories={categories} />;
}
