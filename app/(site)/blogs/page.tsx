import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { mapSanityPostForCard } from "@/lib/sanity-mappers";
import BlogsPageClient from "./BlogsPageClient";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Blogs & Articles",
  description:
    "Discover tutorials, guides, and insights from our experts on AI, cybersecurity, Linux, web development, and more.",
  path: "/blogs",
});

export default async function BlogsPage() {
  let initialPosts = [];
  try {
    const fetched = await client.fetch(POSTS_QUERY);
    initialPosts = fetched
      .filter((post: { slug?: { current?: string } }) => post.slug?.current)
      .map(mapSanityPostForCard);
  } catch (err) {
    console.error("Sanity fetch error on blogs page:", err);
  }

  return <BlogsPageClient initialPosts={initialPosts} />;
}
