export interface Category {
  title: string;
  slug: string;
  image: string;
  badge: string;
  description: string;
  articleCount: number;
  tag: string;
}

export interface Author {
  name: string;
  slug: string;
  avatar: string;
  bio: string;
}

export interface Post {
  title: string;
  slug: string;
  coverImage: string;
  author: Author;
  category: string;
  categorySlug: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
  body: string;
  featured: boolean;
  topAd?: boolean;
  middleAd?: boolean;
  bottomAd?: boolean;
  sponsorBanner?: string;
  affiliateBox?: {
    title: string;
    description: string;
    link: string;
  };
  pdfDownload?: string;
}

export interface Resource {
  title: string;
  slug: string;
  type: string;
  image: string;
  description: string;
  downloadUrl?: string;
  author?: Author;
  publishedAt?: string;
}
