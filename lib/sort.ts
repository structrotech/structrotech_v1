import type { Resource } from "@/types/sanity";
import type { BlogListPost } from "@/lib/sanity-mappers";

export function sortPosts(posts: BlogListPost[], sortBy: string): BlogListPost[] {
  const sorted = [...posts];

  switch (sortBy) {
    case "Latest":
      // Default view: preserve the server order, which already applies the
      // manual `displayOrder` (then newest-first as fallback) from Sanity.
      return sorted;
    case "Oldest":
      return sorted.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
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

export function sortTricks<
  T extends { publishedAt: string; question: string; popular?: boolean; readTime?: number }
>(tricks: T[], sortBy: string): T[] {
  const sorted = [...tricks];

  switch (sortBy) {
    case "Oldest":
      return sorted.sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case "A-Z":
      return sorted.sort((a, b) => a.question.localeCompare(b.question));
    case "Most Popular":
      return sorted.sort((a, b) => {
        if (Boolean(a.popular) !== Boolean(b.popular)) {
          return a.popular ? -1 : 1;
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    case "Beginner Friendly":
      return sorted.sort((a, b) => (a.readTime ?? 0) - (b.readTime ?? 0));
    case "Latest":
    default:
      // Default view: preserve the server order, which already applies the
      // manual `displayOrder` (then newest-first as fallback) from Sanity.
      return sorted;
  }
}
