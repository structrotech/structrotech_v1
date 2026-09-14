import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import {
  POST_SLUGS_QUERY,
  TRICK_SLUGS_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "@/sanity/queries";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const STATIC_ROUTES = [
  "",
  "/blogs",
  "/categories",
  "/interesting-tricks",
  "/resources",
  "/about",
  "/privacy",
  "/terms",
  "/disclaimer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let posts: { slug?: string }[] = [];
  let tricks: { slug?: string }[] = [];
  let categories: { slug?: string }[] = [];

  try {
    [posts, tricks, categories] = await Promise.all([
      client.fetch(POST_SLUGS_QUERY),
      client.fetch(TRICK_SLUGS_QUERY),
      client.fetch(CATEGORY_SLUGS_QUERY),
    ]);
  } catch (err) {
    console.error("Sitemap fetch error:", err);
  }

  const blogEntries: MetadataRoute.Sitemap = (posts ?? [])
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/blogs/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const trickEntries: MetadataRoute.Sitemap = (tricks ?? [])
    .filter((t) => t.slug)
    .map((t) => ({
      url: `${SITE_URL}/interesting-tricks/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const categoryEntries: MetadataRoute.Sitemap = (categories ?? [])
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/categories/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries, ...trickEntries, ...categoryEntries];
}
