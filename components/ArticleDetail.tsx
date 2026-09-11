import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { ArticleActions } from "@/components/ArticleActions";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { AdPlaceholderBlock } from "@/components/blocks/AdPlaceholderBlock";
import { pageContainer } from "@/lib/layout";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Monetization {
  adTop?: boolean;
  adMiddle?: boolean;
  adBottom?: boolean;
}

interface ArticleDetailProps {
  coverImage: string;
  title: string;
  category?: { label: string; href?: string } | null;
  author: { name: string; avatar: string };
  formattedDate: string;
  readTime: number;
  excerpt?: string;
  body: unknown;
  breadcrumb: { items: BreadcrumbItem[]; current: string };
  resourcesContent?: ReactNode;
  tricksContent?: ReactNode;
  relatedBlogsContent?: ReactNode;
  monetization?: Monetization | null;
}

/**
 * Shared detail layout for Blog posts and Interesting Tricks.
 * Renders an identical structure/UX for both content types.
 */
export function ArticleDetail({
  coverImage,
  title,
  category,
  author,
  formattedDate,
  readTime,
  excerpt,
  body,
  breadcrumb,
  resourcesContent,
  tricksContent,
  relatedBlogsContent,
  monetization,
}: ArticleDetailProps) {
  const ads = monetization ?? {};
  return (
    <div className="min-h-screen py-12 w-full">
      <ReadingProgressBar />
      <div className={pageContainer}>
        <div className="max-w-4xl mx-auto w-full">
          {ads.adTop ? (
            <AdPlaceholderBlock value={{ enabled: true, position: "top" }} />
          ) : null}

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
            <Image src={coverImage} alt={title} fill className="object-cover" priority />
          </div>

          <header className="mb-8">
            {category ? (
              <div className="flex items-center gap-3 mb-4">
                {category.href ? (
                  <Link
                    href={category.href}
                    className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
                  >
                    {category.label}
                  </Link>
                ) : (
                  <span className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full">
                    {category.label}
                  </span>
                )}
              </div>
            ) : null}
            <h1 className="text-[clamp(24px,4vw,36px)] font-extrabold text-foreground mb-4 text-balance">
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={author.avatar}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formattedDate} · {readTime} min read
                </p>
              </div>
            </div>
          </header>

          <article className="prose prose-invert max-w-none mb-8">
            {excerpt ? (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{excerpt}</p>
            ) : null}
            <PortableTextRenderer value={body} />
          </article>

          {ads.adMiddle ? (
            <AdPlaceholderBlock value={{ enabled: true, position: "middle" }} />
          ) : null}

          <ArticleActions title={title} />

          {resourcesContent ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Resources</h2>
              {resourcesContent}
            </section>
          ) : null}

          {tricksContent ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Interesting Tricks</h2>
              {tricksContent}
            </section>
          ) : null}

          {relatedBlogsContent ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Blogs</h2>
              {relatedBlogsContent}
            </section>
          ) : null}

          {ads.adBottom ? (
            <div className="mt-12">
              <AdPlaceholderBlock value={{ enabled: true, position: "bottom" }} />
            </div>
          ) : null}

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mt-12 pt-8 border-t border-border">
            {breadcrumb.items.map((item) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </span>
            ))}
            <span className="text-foreground truncate max-w-[200px]">{breadcrumb.current}</span>
          </nav>
        </div>
      </div>
    </div>
  );
}
