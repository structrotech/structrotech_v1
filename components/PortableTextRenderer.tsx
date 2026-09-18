import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { codeToHtml } from "shiki";
import { resolveSanityImageUrl } from "@/sanity/client";
import { AffiliateBoxBlock } from "@/components/blocks/AffiliateBoxBlock";
import { SponsorBannerBlock } from "@/components/blocks/SponsorBannerBlock";
import { DownloadBoxBlock } from "@/components/blocks/DownloadBoxBlock";
import { AdPlaceholderBlock } from "@/components/blocks/AdPlaceholderBlock";
import { CodeAccordionBlock } from "@/components/blocks/CodeAccordionBlock";

const HEADING_STYLES = {
  h2: "text-[28px] sm:text-[30px] font-bold leading-tight mt-10 mb-4 text-foreground font-serif",
  h3: "text-[22px] sm:text-[24px] font-bold leading-snug mt-8 mb-3 text-foreground font-serif",
  h4: "text-[18px] sm:text-[19px] font-bold leading-snug mt-6 mb-2 text-foreground font-serif",
} as const;

export const LINE_SPACING_CLASSES: Record<string, string> = {
  tight: "leading-[1.6]",
  normal: "leading-[1.75]",
  relaxed: "leading-[1.9]",
  loose: "leading-[2.1]",
};

export const LETTER_SPACING_CLASSES: Record<string, string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
};

const MARK_STYLES = {
  strong: "font-bold text-foreground",
  em: "italic",
  code: "rounded-md bg-muted/80 dark:bg-muted/60 px-1.5 py-0.5 font-mono text-[0.88em] text-rose-600 dark:text-rose-400 border border-border/40",
  link: "text-primary underline underline-offset-4 hover:text-primary/80",
} as const;

const SHIKI_LANGS = new Set([
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "bash",
  "json",
  "html",
  "css",
  "sql",
  "go",
]);

// Optional size/alignment controls set in Sanity Studio.
// Images without these fields fall back to full-width (previous behavior).
const SIZE_CLASS: Record<string, string> = {
  full: "w-full",
  large: "max-w-3xl",
  medium: "max-w-md",
  small: "max-w-xs",
};

const ALIGN_CLASS: Record<string, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

async function withHighlightedCode(value: unknown[]): Promise<unknown[]> {
  return Promise.all(
    value.map(async (block) => {
      if (
        !block ||
        typeof block !== "object" ||
        !("_type" in block) ||
        (block as { _type?: string })._type !== "codeBlock"
      ) {
        return block;
      }

      const item = block as { code?: string; language?: string };
      const code = typeof item.code === "string" ? item.code : "";
      if (!code) return block;

      const lang = item.language && SHIKI_LANGS.has(item.language) ? item.language : "text";
      try {
        const highlightedHtml = await codeToHtml(code, {
          lang,
          theme: "github-dark",
        });
        return { ...item, highlightedHtml };
      } catch {
        return block;
      }
    })
  );
}

function getPortableTextComponents(
  lineClass: string,
  trackClass: string
): PortableTextComponents {
  return {
    types: {
      image: ({ value }: { value: any }) => {
        const size = value?.size ?? "full";
        const alignment = value?.alignment ?? "center";
        const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.full;
        // Alignment only matters when the image is narrower than the column.
        const alignClass = size === "full" ? "" : ALIGN_CLASS[alignment] ?? ALIGN_CLASS.center;
        return (
          <figure
            className={`my-6 ${sizeClass} ${alignClass} border border-primary/40 rounded-xl overflow-hidden`.trim()}
          >
            <Image
              src={resolveSanityImageUrl(value)}
              alt={value?.alt || ""}
              width={1200}
              height={675}
              className="rounded-xl w-full h-auto"
            />
          </figure>
        );
      },
      affiliateBox: ({ value }: { value: any }) => <AffiliateBoxBlock value={value} />,
      sponsorBanner: ({ value }: { value: any }) => <SponsorBannerBlock value={value} />,
      downloadBox: ({ value }: { value: any }) => <DownloadBoxBlock value={value} />,
      adSensePlaceholder: ({ value }: { value: any }) => <AdPlaceholderBlock value={value} />,
      adPlaceholder: ({ value }: { value: any }) => <AdPlaceholderBlock value={value} />,
      codeBlock: ({ value }: { value: any }) => <CodeAccordionBlock value={value} />,
      divider: ({ value }: { value?: { style?: string } }) => {
        const style = value?.style || "solid";
        const borderStyle =
          style === "dashed"
            ? "border-dashed"
            : style === "dotted"
            ? "border-dotted"
            : "border-solid";
        return (
          <hr
            className={`my-8 sm:my-10 border-0 border-t border-border/70 ${borderStyle}`}
          />
        );
      },
      break: () => <hr className="my-8 sm:my-10 border-0 border-t border-border/70 border-solid" />,
      hr: () => <hr className="my-8 sm:my-10 border-0 border-t border-border/70 border-solid" />,
    },
    block: {
      h2: ({ children }) => <h2 className={HEADING_STYLES.h2}>{children}</h2>,
      h3: ({ children }) => <h3 className={HEADING_STYLES.h3}>{children}</h3>,
      h4: ({ children }) => <h4 className={HEADING_STYLES.h4}>{children}</h4>,
      normal: ({ children }) => (
        <p className={`text-[17px] sm:text-[18px] ${lineClass} ${trackClass} mb-5 text-foreground font-serif`}>
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote
          className={`border-l-2 border-primary/40 pl-4 my-6 text-[17px] sm:text-[18px] ${lineClass} ${trackClass} text-muted-foreground italic font-serif`}
        >
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`list-disc pl-6 mb-5 space-y-2 text-[17px] sm:text-[18px] ${lineClass} ${trackClass} text-foreground font-serif`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`list-decimal pl-6 mb-5 space-y-2 text-[17px] sm:text-[18px] ${lineClass} ${trackClass} text-foreground font-serif`}>
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className={MARK_STYLES.strong}>{children}</strong>,
      em: ({ children }) => <em className={MARK_STYLES.em}>{children}</em>,
      code: ({ children }) => <code className={MARK_STYLES.code}>{children}</code>,
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "";
        if (!href) return <>{children}</>;
        if (isInternalHref(href)) {
          return (
            <Link href={href} className={MARK_STYLES.link}>
              {children}
            </Link>
          );
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={MARK_STYLES.link}>
            {children}
          </a>
        );
      },
    },
  };
}

/**
 * Reusable Portable Text renderer with Page Builder block support.
 * Renders nothing when there is no content, so existing behavior is preserved.
 */
export async function PortableTextRenderer({
  value,
  lineSpacing,
  letterSpacing,
}: {
  value: unknown;
  lineSpacing?: string;
  letterSpacing?: string;
}) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const blocks = await withHighlightedCode(value);
  const lineClass = (lineSpacing && LINE_SPACING_CLASSES[lineSpacing]) || LINE_SPACING_CLASSES.normal;
  const trackClass = (letterSpacing && LETTER_SPACING_CLASSES[letterSpacing]) || LETTER_SPACING_CLASSES.normal;
  const components = getPortableTextComponents(lineClass, trackClass);
  return <PortableText value={blocks} components={components} />;
}
