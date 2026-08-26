import type { ReactNode } from "react";
import Link from "next/link";
import { pageContainer } from "@/lib/layout";

export function StatusScreen({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center py-16">
      <div className={`${pageContainer} flex justify-center`}>
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card/50 p-8 text-center backdrop-blur-sm">
          <Link href="/" className="mb-6 inline-flex items-center gap-0">
            <span className="text-2xl font-bold text-foreground">Structro</span>
            <span className="text-2xl font-bold text-primary">Tech</span>
          </Link>
          <h1 className="mb-3 text-2xl font-bold text-foreground">{title}</h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{description}</p>
          {action ?? (
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to homepage
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
