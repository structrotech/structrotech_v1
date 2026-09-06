"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { footerContainer } from "@/lib/layout";

const learningLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/blogs", label: "Blogs" },
  { href: "/interesting-tricks", label: "Interesting Tricks" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About Us" },
  { href: "/about#contact", label: "Contact us" },
];

const productLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/resources?type=Roadmaps", label: "Roadmaps" },
  { href: "/resources?type=Cheatsheets", label: "Cheatsheets" },
  { href: "/resources?type=Notes", label: "Notes" },
  { href: "/resources?type=Guides", label: "Guides" },
  { href: "/resources?type=Tools", label: "Tools" },
];

const socialLinks = [
  { href: "https://www.youtube.com/@Structrotech", icon: Youtube, label: "YouTube" },
  { href: "https://www.linkedin.com/company/structrotech/?viewAsMember=true", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/structrotech", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/structrotech/", icon: Instagram, label: "Instagram" },
  { href: "https://github.com/structrotech", icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-black/[0.06] dark:border-white/[0.06] bg-transparent pt-10 pb-8 md:pt-12 md:pb-8">
      <div className={footerContainer}>
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 xl:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="mb-3 inline-block font-sans text-lg md:text-xl font-bold leading-none">
              <span className="text-foreground dark:text-white">Structro</span>
              <span className="text-primary">Tech</span>
            </Link>
            <p className="mb-4 max-w-xs text-[13px] sm:text-sm font-normal leading-relaxed text-muted-foreground">
              Your trusted learning companion for technology. Learn, build and grow
              with StructroTech.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/40 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                >
                  <link.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-3 text-[14px] font-semibold text-foreground">Learning</h3>
            <ul className="space-y-2">
              {learningLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] sm:text-sm font-normal text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-3 text-[14px] font-semibold text-foreground">Socials</h3>
            <ul className="w-full space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-normal text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-3 text-[14px] font-semibold text-foreground">Our Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] sm:text-sm font-normal text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-black/[0.05] pt-6 text-center dark:border-white/[0.05] md:flex-row md:text-left">
          <p className="text-xs sm:text-[13px] font-normal text-muted-foreground">
            &copy; 2026 StructroTech. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-[13px] font-normal text-muted-foreground md:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="transition-colors hover:text-primary">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
