/**
 * Canonical site origin used for SEO (sitemap, robots, JSON-LD, canonical/OG URLs).
 * Override via NEXT_PUBLIC_SITE_URL in the environment when the domain changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://structrotech.com"
).replace(/\/$/, "");

export const SITE_NAME = "StructroLearn";
