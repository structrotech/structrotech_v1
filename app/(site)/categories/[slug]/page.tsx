import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { client } from "@/sanity/client";
import {
  CATEGORY_QUERY,
  CATEGORY_SLUGS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
} from "@/sanity/queries";
import { mapSanityCategory, mapSanityPostForCard } from "@/lib/sanity-mappers";
import { pageContainer } from "@/lib/layout";
import { FALLBACK_CATEGORIES, FALLBACK_POSTS } from "@/lib/fallback-data";
import { SITE_NAME } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await client.fetch<{ slug?: string }[]>(CATEGORY_SLUGS_QUERY);
  return categories
    .filter((c) => c.slug)
    .map((c) => ({ slug: c.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let categoryRaw = null;
  try {
    categoryRaw = await client.fetch(CATEGORY_QUERY, { slug });
  } catch (err) {
    console.error("Sanity metadata fetch error on category detail:", err);
  }

  if (!categoryRaw) {
    categoryRaw = FALLBACK_CATEGORIES.find((c) => c.slug.current === slug) || null;
  }

  if (!categoryRaw) return {};

  const category = mapSanityCategory(categoryRaw);
  const title = category.title;
  const description =
    category.description ||
    `Browse educational articles, guides, and practical tutorials in ${category.title} on StructroLearn.`;
  const canonicalPath = `/categories/${slug}`;
  const ogImage = category.image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let categoryRaw = null;
  let postsRaw: unknown[] = [];
  try {
    [categoryRaw, postsRaw] = await Promise.all([
      client.fetch(CATEGORY_QUERY, { slug }),
      client.fetch(POSTS_BY_CATEGORY_QUERY, { slug }),
    ]);
  } catch (err) {
    console.error("Sanity fetch error on category detail:", err);
  }

  if (!categoryRaw) {
    categoryRaw = FALLBACK_CATEGORIES.find((c) => c.slug.current === slug) || null;
    if (categoryRaw) {
      postsRaw = FALLBACK_POSTS.filter((p) => p.category?.slug?.current === slug);
    }
  }

  if (!categoryRaw) {
    notFound();
  }

  const category = mapSanityCategory(categoryRaw);
  const categoryPosts = postsRaw.map((post) => mapSanityPostForCard(post as Parameters<typeof mapSanityPostForCard>[0]));

  return (
    <div className="min-h-screen py-12 w-full">
      <div className={pageContainer}>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{category.title}</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full">
              {category.badge}
            </span>
            <span className="text-sm text-muted-foreground">
              {categoryPosts.length || category.articleCount} articles
            </span>
          </div>
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-2">
            {category.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{category.description}</p>
        </div>

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                coverImage={post.coverImage}
                author={post.author}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                excerpt={post.excerpt}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No articles in this category yet.</p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse All Blogs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
