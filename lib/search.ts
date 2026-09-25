import Fuse from "fuse.js";
import { posts, categories } from "@/lib/data";
import type { Post, Resource } from "@/types/sanity";

const fuse = new Fuse(posts, {
  keys: ["title", "excerpt", "category"],
  threshold: 0.3,
  includeScore: true,
});

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return posts;
  const results = fuse.search(query);
  return results.map((result) => result.item);
}

export function filterPostsByCategory(posts: Post[], category: string): Post[] {
  if (category === "All") return posts;

  const matchedCategory = categories.find((c) => c.title === category);
  if (matchedCategory) {
    return posts.filter((post) => post.categorySlug === matchedCategory.slug);
  }

  const slug = category.toLowerCase().replace(/\s+/g, "-");
  return posts.filter(
    (post) => post.category === category || post.categorySlug === slug
  );
}

export function sortPosts(posts: Post[], sortBy: string): Post[] {
  const sorted = [...posts];
  
  switch (sortBy) {
    case "Latest":
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    case "Oldest":
      return sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    case "A-Z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "Most Popular":
      return sorted.sort((a, b) => {
        if (Boolean(a.featured) !== Boolean(b.featured)) {
          return a.featured ? -1 : 1;
        }
        return (b.readTime ?? 0) - (a.readTime ?? 0);
      });
    case "Beginner Friendly":
      return sorted.sort((a, b) => (a.readTime ?? 0) - (b.readTime ?? 0));
    default:
      return sorted;
  }
}

export function sortResources(resources: Resource[], sortBy: string): Resource[] {
  const sorted = [...resources];

  switch (sortBy) {
    case "Z-A":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "By Type":
      return sorted.sort((a, b) => {
        const byType = a.type.localeCompare(b.type);
        return byType !== 0 ? byType : a.title.localeCompare(b.title);
      });
    case "Downloads First":
      return sorted.sort((a, b) => {
        const aHas = Boolean(a.downloadUrl);
        const bHas = Boolean(b.downloadUrl);
        if (aHas !== bHas) return aHas ? -1 : 1;
        return a.title.localeCompare(b.title);
      });
    case "A-Z":
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}
