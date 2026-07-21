import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { resolveSanityImageUrl } from "@/sanity/client";
import { AffiliateBoxBlock } from "@/components/blocks/AffiliateBoxBlock";
import { SponsorBannerBlock } from "@/components/blocks/SponsorBannerBlock";
import { DownloadBoxBlock } from "@/components/blocks/DownloadBoxBlock";
import { AdPlaceholderBlock } from "@/components/blocks/AdPlaceholderBlock";

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

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const size = value?.size ?? "full";
      const alignment = value?.alignment ?? "center";
      const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.full;
      // Alignment only matters when the image is narrower than the column.
      const alignClass = size === "full" ? "" : ALIGN_CLASS[alignment] ?? ALIGN_CLASS.center;
      return (
        <figure className={`my-6 ${sizeClass} ${alignClass}`.trim()}>
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
  },
};

/**
 * Reusable Portable Text renderer with Page Builder block support.
 * Renders nothing when there is no content, so existing behavior is preserved.
 */
export function PortableTextRenderer({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
