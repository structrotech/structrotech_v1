import Link from "next/link";
import { pageContainer } from "@/lib/layout";

const shortcuts = [
  { href: "/blogs", label: "Blogs" },
  { href: "/categories", label: "Categories" },
  { href: "/interesting-tricks", label: "Interesting Tricks" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function NotFoundView() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center py-16">
      <div className={`${pageContainer} flex justify-center`}>
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card/50 p-8 text-center backdrop-blur-sm md:p-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Error 404
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] text-foreground">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            This URL does not match any page on StructroTech. It may have been moved,
            unpublished, or typed incorrectly.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to homepage
            </Link>
            <Link
              href="/blogs"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Browse blogs
            </Link>
          </div>

          <div className="mt-10 border-t border-border/60 pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Continue learning
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {shortcuts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
