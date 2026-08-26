import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StructroTech - Learn AI, Cybersecurity, Linux & More",
    template: "%s | StructroTech",
  },
  description:
    "Your trusted learning companion for AI, Cybersecurity, Linux, Networking, Web Development and more. Simple, structured learning.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: "StructroTech - Learn AI, Cybersecurity, Linux & More",
    description:
      "Your trusted learning companion for AI, Cybersecurity, Linux, Networking, Web Development and more. Simple, structured learning.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "StructroTech - Learn AI, Cybersecurity, Linux & More",
    description:
      "Your trusted learning companion for AI, Cybersecurity, Linux, Networking, Web Development and more. Simple, structured learning.",
    images: [DEFAULT_OG_IMAGE],
  },
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col w-full m-0 p-0`}
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
