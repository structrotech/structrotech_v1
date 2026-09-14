/**
 * Canonical site origin used for SEO (sitemap, robots, JSON-LD, canonical/OG URLs).
 * Default canonical domain is StructroLearn (https://structrolearn.vercel.app).
 * Override via NEXT_PUBLIC_SITE_URL in the environment when the domain changes.
 */
function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    // Sanitize any legacy structrotech domain references if still configured in env variables
    const sanitized = envUrl
      .replace(/https?:\/\/structrotech\.vercel\.app/i, "https://structrolearn.vercel.app")
      .replace(/https?:\/\/structrotech\.com/i, "https://structrolearn.vercel.app");
    return sanitized.replace(/\/$/, "");
  }
  return "https://structrolearn.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "StructroLearn";
