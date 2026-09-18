import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { ShareMenu } from "@/components/ShareMenu";
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
  author: { name: string; avatar: string; bio?: string };
  formattedDate: string;
  readTime?: number;
  excerpt?: string;
  body: unknown;
  breadcrumb: { items: BreadcrumbItem[]; current: string };
  resourcesContent?: ReactNode;
  tricksContent?: ReactNode;
  relatedBlogsContent?: ReactNode;
  monetization?: Monetization | null;
  lineSpacing?: string;
  letterSpacing?: string;
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
  lineSpacing,
  letterSpacing,
}: ArticleDetailProps) {
  const ads = monetization ?? {};
  return (
    <div className="relative min-h-screen py-12 w-full bg-white dark:bg-black">
      <div
        className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none"
        aria-hidden="true"
      />
      <ReadingProgressBar />
      <div className={pageContainer}>
        <div className="max-w-4xl mx-auto w-full">
          {ads.adTop ? (
            <AdPlaceholderBlock value={{ enabled: true, position: "top" }} />
          ) : null}

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
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

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-primary/40">
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
            <h1 className="text-[clamp(26px,4vw,40px)] font-bold text-foreground mb-4 text-balance font-serif">
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </header>

          <article className="w-full mb-8 font-serif">
            {excerpt ? (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 font-serif">
                {excerpt}
              </p>
            ) : null}
            <PortableTextRenderer
              value={body}
              lineSpacing={lineSpacing}
              letterSpacing={letterSpacing}
            />
          </article>

          {ads.adMiddle ? (
            <AdPlaceholderBlock value={{ enabled: true, position: "middle" }} />
          ) : null}

          {author ? (
            <div className="my-8 py-3 px-4 rounded-xl border border-border bg-card/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={38}
                  height={38}
                  className="rounded-full object-cover shrink-0"
                />
                <span className="font-medium text-foreground text-sm sm:text-base truncate">
                  {author.name}
                </span>
              </div>
              <ShareMenu
                title={title}
                align="right"
                showLabel={false}
                triggerClassName="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary shrink-0"
              />
            </div>
          ) : null}

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
        </div>
      </div>
    </div>
  );
}
