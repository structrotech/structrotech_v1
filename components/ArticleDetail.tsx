import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { ShareMenu } from "@/components/ShareMenu";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { AdPlaceholderBlock } from "@/components/blocks/AdPlaceholderBlock";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
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
  coverImage?: string | null;
  youtubeUrl?: string | null;
  title: string;
  category?: { label: string; href?: string } | null;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
    socialHandle?: string;
    socialUrl?: string;
  } | null;
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
  youtubeUrl,
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

          {coverImage ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-black/[0.08] dark:border-white/[0.1] shadow-md">
              <Image src={coverImage} alt={title} fill className="object-cover" priority />
            </div>
          ) : null}

          {youtubeUrl ? (
            <div className="mb-8">
              <YouTubeEmbed url={youtubeUrl} title={title} />
            </div>
          ) : null}

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

          {author?.name ? (
            <div className="my-8 py-3.5 px-4 rounded-xl border border-black/[0.08] dark:border-white/[0.09] bg-card/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <a
                  href={author.socialUrl || "https://www.instagram.com/nithin_techie"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] aspect-square rounded-full overflow-hidden shrink-0 block hover:opacity-85 transition-opacity ring-1 ring-black/10 dark:ring-white/10"
                  title="Visit Instagram @nithin_techie"
                >
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      sizes="40px"
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </a>
                <div className="flex flex-col min-w-0">
                  <a
                    href={author.socialUrl || "https://www.instagram.com/nithin_techie"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground text-sm sm:text-base truncate leading-snug hover:text-primary transition-colors"
                  >
                    {author.name}
                  </a>
                  <a
                    href={author.socialUrl || "https://www.instagram.com/nithin_techie"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors truncate font-sans mt-0.5"
                  >
                    {author.socialHandle
                      ? (author.socialHandle.startsWith("@") ? author.socialHandle : `@${author.socialHandle}`)
                      : "@nithin_techie"}
                  </a>
                </div>
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
