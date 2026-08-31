import type { ReactNode } from "react";
import Link from "next/link";
import { pageContainer, pageHeaderBlock, pageShell, pageSubtitle, pageTitle } from "@/lib/layout";
import { cn } from "@/lib/utils";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, description, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className={pageShell}>
      <article className={pageContainer}>
        <header className={`${pageHeaderBlock} md:mb-10`}>
          <h1 className={pageTitle}>{title}</h1>
          <p className={pageSubtitle}>{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </header>

        <nav
          aria-label="On this page"
          className="mb-10 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm md:mb-12"
        >
          <p className="mb-3 text-sm font-semibold text-foreground">Contents</p>
          <ol className="grid gap-2 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-b border-border/60 pb-10 last:border-0"
            >
              <h2 className="mb-4 text-xl font-bold text-foreground">{section.title}</h2>
              <div
                className={cn(
                  "space-y-4 text-[15px] leading-relaxed text-muted-foreground",
                  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
                  "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
                  "[&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline",
                  "[&_strong]:font-semibold [&_strong]:text-foreground"
                )}
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card/40 p-6 text-center text-sm text-muted-foreground">
          <p>
            Questions about this document?{" "}
            <Link href="/about" className="font-medium text-primary hover:underline">
              Contact us via About
            </Link>{" "}
            or email{" "}
            <a href="mailto:contactstructrotech@gmail.com" className="font-medium text-primary hover:underline">
              contactstructrotech@gmail.com
            </a>
            .
          </p>
          <p className="mt-3">
            See also:{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {" · "}
            <Link href="/disclaimer" className="text-primary hover:underline">
              Disclaimer
            </Link>
          </p>
        </footer>
      </article>
    </div>
  );
}
