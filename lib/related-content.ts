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
  let tricks: TrickListItem[];
  if (manualTricks.length > 0) {
    tricks = dedupTricks(manualTricks);
  } else {
    let combined = await fetchTricks(TRICKS_BY_BLOG_QUERY, { slug });
    if (combined.length < LIMIT) {
      combined = combined.concat(await fetchTricks(RECENT_TRICKS_QUERY, { excludeSlug: "" }));
    }
    tricks = dedupTricks(combined);
  }

  const manualBlogs = mapManualBlogs(post.relatedBlogs);
  let blogs: BlogListPost[];
  const category = post.category?.title ?? "";
  if (manualBlogs.length > 0) {
    blogs = dedupBlogs(manualBlogs, slug);
  } else {
    let combined: BlogListPost[] = [];
    if (category) {
      combined = await fetchBlogs(RELATED_BLOGS_BY_CATEGORY_QUERY, { category, excludeSlug: slug });
    }
    if (combined.length < LIMIT) {
      combined = combined.concat(await fetchBlogs(RECENT_BLOGS_QUERY, { excludeSlug: slug }));
    }
    blogs = dedupBlogs(combined, slug);
  }

  return { tricks, blogs };
}

/**
 * Resolve the Interesting Tricks + Related Blogs shown on a TRICK page.
 */
export async function resolveTrickRelations(trick: any, slug: string) {
  const manualTricks = mapManualTricks(trick.relatedTricks);
  let tricks: TrickListItem[];
  if (manualTricks.length > 0) {
    tricks = dedupTricks(manualTricks);
  } else {
    tricks = dedupTricks(await fetchTricks(RECENT_TRICKS_QUERY, { excludeSlug: slug }));
  }

  const manualBlogs = mapManualBlogs(trick.relatedBlogs);
  let blogs: BlogListPost[];
  const category = trick.category ?? "";
  if (manualBlogs.length > 0) {
    blogs = dedupBlogs(manualBlogs);
  } else {
    let combined: BlogListPost[] = [];
    if (category) {
      combined = await fetchBlogs(RELATED_BLOGS_BY_CATEGORY_QUERY, { category, excludeSlug: "" });
    }
    if (combined.length < LIMIT) {
      combined = combined.concat(await fetchBlogs(RECENT_BLOGS_QUERY, { excludeSlug: "" }));
    }
    blogs = dedupBlogs(combined);
  }

  return { tricks, blogs };
}
