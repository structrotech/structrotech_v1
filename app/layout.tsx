import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HydrationReady } from "@/components/HydrationReady";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

// Failsafe: if the app hasn't hydrated within a few seconds (JS blocked or
// failed to load), reveal the framer-motion content so the page isn't empty.
const FORCE_REVEAL_SCRIPT = `window.__fmRevealTimer=window.setTimeout(function(){document.documentElement.classList.add('fm-force-reveal')},3500);`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StructroLearn",
    template: "%s | StructroLearn",
  },
  description:
    "We make evolving technologies and complex concepts simple, structured, and organized.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: "StructroLearn",
    description:
      "We make evolving technologies and complex concepts simple, structured, and organized.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "StructroLearn",
    description:
      "We make evolving technologies and complex concepts simple, structured, and organized.",
    images: [DEFAULT_OG_IMAGE],
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="site-canvas w-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID.trim()}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col w-full m-0 p-0"
      >
        <script dangerouslySetInnerHTML={{ __html: FORCE_REVEAL_SCRIPT }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd(), websiteJsonLd()],
          }}
        />
        <ThemeProvider>
          <HydrationReady />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
