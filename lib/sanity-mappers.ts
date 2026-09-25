import { resolveSanityImageUrl } from "@/sanity/client";
import type { Author, Resource } from "@/types/sanity";

export const defaultAuthor: Author = {
  name: "Nithin",
  slug: "nithin",
  avatar: "/placeholder-user.jpg",
  bio: "",
  socialHandle: "@nithin_techie",
  socialUrl: "https://www.instagram.com/nithin_techie",
};

export type BlogListPost = {
  title: string;
  slug: string;
  coverImage: string;
  author: Author;
  category: string;
  categorySlug: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  excerpt: string;
  featured: boolean;
};

export type CategoryListItem = {
  _id: string;
  title: string;
  slug: string;
  image: string;
  badge: string;
  description: string;
  articleCount: number;
  tag: string;
};

export type TrickListItem = {
  id: string;
  question: string;
  slug: string;
  blogSlug: string;
  category: string;
  featuredOnHome: boolean;
  homeOrder: number;
  publishedAt: string;
  popular: boolean;
  readTime?: number;
};

export type ResourceListItem = Resource;

export function mapSanityAuthor(raw: {
  name?: string;
  slug?: { current?: string };
  avatar?: unknown;
  bio?: string;
  socialHandle?: string;
  socialUrl?: string;
} | null): Author {
  if (!raw?.name) return defaultAuthor;
  return {
    name: raw.name,
    slug: raw.slug?.current ?? "author",
    avatar: resolveSanityImageUrl(raw.avatar, defaultAuthor.avatar),
    bio: raw.bio ?? "",
    socialHandle: raw.socialHandle || "@nithin_techie",
    socialUrl: raw.socialUrl || "https://www.instagram.com/nithin_techie",
  };
}

export function mapSanityPostForCard(raw: {
  _id?: string;
  _updatedAt?: string;
  _createdAt?: string;
  title: string;
  slug?: { current?: string };
  coverImage?: unknown;
  excerpt?: string;
  publishedAt?: string;
  readTime?: number;
  featured?: boolean;
  category?: { title?: string; slug?: { current?: string } };
  author?: { name?: string; slug?: { current?: string }; avatar?: unknown; bio?: string } | null;
}): BlogListPost {
  return {
    title: raw.title,
    slug: raw.slug?.current ?? "",
    coverImage: resolveSanityImageUrl(raw.coverImage),
    author: mapSanityAuthor(raw.author ?? null),
    category: raw.category?.title ?? "",
    categorySlug: raw.category?.slug?.current ?? "",
    publishedAt: raw.publishedAt ?? raw._createdAt ?? "",
    updatedAt: raw._updatedAt ?? raw.publishedAt ?? "",
    readTime: raw.readTime || undefined,
    excerpt: raw.excerpt ?? "",
    featured: raw.featured ?? false,
  };
}

export function mapSanityCategory(raw: {
  _id: string;
  title: string;
  slug?: { current?: string };
  image?: unknown;
  description?: string;
  articleCount?: number;
  tag?: string;
}): CategoryListItem {
  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug?.current ?? "",
    image: resolveSanityImageUrl(raw.image),
    badge: raw.tag ?? raw.title,
    description: raw.description ?? "",
    articleCount: raw.articleCount ?? 0,
    tag: raw.tag ?? "",
  };
}

export function mapSanityTrick(raw: {
  _id: string;
  question: string;
  slug?: { current?: string };
  category?: string | { title?: string; slug?: { current?: string } };
  featuredOnHome?: boolean;
  homeOrder?: number;
  publishedAt?: string;
  popular?: boolean;
  readTime?: number;
  linkedPost?: { slug?: { current?: string } };
}): TrickListItem {
  const categoryTitle =
    typeof raw.category === "string"
      ? raw.category
      : raw.category?.title ?? "";

  return {
    id: raw._id,
    question: raw.question,
    slug: raw.slug?.current ?? "",
    blogSlug: raw.linkedPost?.slug?.current ?? "",
    category: categoryTitle,
    featuredOnHome: raw.featuredOnHome ?? false,
    homeOrder: raw.homeOrder ?? 0,
    publishedAt: raw.publishedAt ?? "",
    popular: raw.popular ?? false,
    readTime: raw.readTime || undefined,
  };
}

export function mapSanityResource(raw: {
  title: string;
  slug?: { current?: string };
  type?: string;
  image?: unknown;
  description?: string;
  downloadUrl?: string;
  publishedAt?: string;
  author?: { name?: string; slug?: { current?: string }; avatar?: unknown; bio?: string } | null;
}): ResourceListItem {
  return {
    title: raw.title,
    slug: raw.slug?.current ?? "",
    type: raw.type ?? "Tools",
    image: resolveSanityImageUrl(raw.image),
    description: raw.description ?? "",
    downloadUrl: raw.downloadUrl,
    publishedAt: raw.publishedAt ?? "",
    author: mapSanityAuthor(raw.author ?? null),
  };
}
