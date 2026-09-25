import { client } from "@/sanity/client";
import {
  TRICKS_BY_BLOG_QUERY,
  RELATED_BLOGS_BY_CATEGORY_QUERY,
  RECENT_TRICKS_QUERY,
  RECENT_BLOGS_QUERY,
} from "@/sanity/queries";
import {
  mapSanityTrick,
  mapSanityPostForCard,
  type TrickListItem,
  type BlogListPost,
} from "@/lib/sanity-mappers";
import { FALLBACK_TRICKS, FALLBACK_POSTS } from "@/lib/fallback-data";

async function fetchTricks(query: string, params: Record<string, unknown>): Promise<TrickListItem[]> {
  try {
    const raw = await client.fetch(query, params);
    return (Array.isArray(raw) ? raw : []).map((t) =>
      mapSanityTrick(t as Parameters<typeof mapSanityTrick>[0])
    );
  } catch (err) {
    console.error("Related tricks fetch error, loading fallback:", err);
    return FALLBACK_TRICKS.map(mapSanityTrick);
  }
}

async function fetchBlogs(query: string, params: Record<string, unknown>): Promise<BlogListPost[]> {
  try {
    const raw = await client.fetch(query, params);
    return (Array.isArray(raw) ? raw : []).map((b) =>
      mapSanityPostForCard(b as Parameters<typeof mapSanityPostForCard>[0])
    );
  } catch (err) {
    console.error("Related blogs fetch error, loading fallback:", err);
    return FALLBACK_POSTS.map(mapSanityPostForCard);
  }
}

function mapManualTricks(items: unknown): TrickListItem[] {
  return (Array.isArray(items) ? items : []).map((t) =>
    mapSanityTrick(t as Parameters<typeof mapSanityTrick>[0])
  );
}

function mapManualBlogs(items: unknown): BlogListPost[] {
  return (Array.isArray(items) ? items : []).map((b) =>
    mapSanityPostForCard(b as Parameters<typeof mapSanityPostForCard>[0])
  );
}

const LIMIT = 3;

function dedupTricks(items: TrickListItem[]): TrickListItem[] {
  const seen = new Set<string>();
  const out: TrickListItem[] = [];
  for (const t of items) {
    if (t.id && !seen.has(t.id)) {
      seen.add(t.id);
      out.push(t);
    }
    if (out.length >= LIMIT) break;
  }
  return out;
}

function dedupBlogs(items: BlogListPost[], excludeSlug = ""): BlogListPost[] {
  const seen = new Set<string>();
  const out: BlogListPost[] = [];
  for (const b of items) {
    if (b.slug && b.slug !== excludeSlug && !seen.has(b.slug)) {
      seen.add(b.slug);
      out.push(b);
    }
    if (out.length >= LIMIT) break;
  }
  return out;
}

/**
 * Resolve the Interesting Tricks + Related Blogs shown on a BLOG page.
 * Manual picks win; otherwise auto-fill (topped up to 3) so the sections are visible by default.
 */
export async function resolveBlogRelations(post: any, slug: string) {
  const manualTricks = mapManualTricks(post.relatedTricks);
  let tricks = dedupTricks(manualTricks);
  if (tricks.length < LIMIT) {
    let combined = await fetchTricks(TRICKS_BY_BLOG_QUERY, { slug });
    if (tricks.length + combined.length < LIMIT) {
      combined = combined.concat(await fetchTricks(RECENT_TRICKS_QUERY, { excludeSlug: "" }));
    }
    tricks = dedupTricks(tricks.concat(combined));
  }

  const manualBlogs = mapManualBlogs(post.relatedBlogs);
  let blogs = dedupBlogs(manualBlogs, slug);
  const category = post.category?.title ?? "";
  if (blogs.length < LIMIT) {
    let extra: BlogListPost[] = [];
    if (category) {
      extra = await fetchBlogs(RELATED_BLOGS_BY_CATEGORY_QUERY, { category, excludeSlug: slug });
    }
    if (blogs.length + extra.length < LIMIT) {
      extra = extra.concat(await fetchBlogs(RECENT_BLOGS_QUERY, { excludeSlug: slug }));
    }
    blogs = dedupBlogs(blogs.concat(extra), slug);
  }

  return { tricks, blogs };
}

/**
 * Resolve the Interesting Tricks + Related Blogs shown on a TRICK page.
 */
export async function resolveTrickRelations(trick: any, slug: string) {
  const manualTricks = mapManualTricks(trick.relatedTricks);
  let tricks = dedupTricks(manualTricks);
  if (tricks.length < LIMIT) {
    const extra = await fetchTricks(RECENT_TRICKS_QUERY, { excludeSlug: slug });
    tricks = dedupTricks(tricks.concat(extra));
  }

  const manualBlogs = mapManualBlogs(trick.relatedBlogs);
  let blogs = dedupBlogs(manualBlogs);
  const category = trick.category ?? "";
  if (blogs.length < LIMIT) {
    let extra: BlogListPost[] = [];
    if (category) {
      extra = await fetchBlogs(RELATED_BLOGS_BY_CATEGORY_QUERY, { category, excludeSlug: "" });
    }
    if (blogs.length + extra.length < LIMIT) {
      extra = extra.concat(await fetchBlogs(RECENT_BLOGS_QUERY, { excludeSlug: "" }));
    }
    blogs = dedupBlogs(blogs.concat(extra));
  }

  return { tricks, blogs };
}
