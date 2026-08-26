"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { navbarContainer } from "@/lib/layout";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/blogs", label: "Blogs" },
  { href: "/interesting-tricks", label: "Interesting Tricks" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 w-full px-4">
        <nav
          className={cn(
            "mx-auto max-w-[1400px] rounded-full border backdrop-blur-xl shadow-lg overflow-hidden",
            "bg-[#f5f0eb]/95 border-black/10",
            "dark:bg-[#0f1117]/80 dark:border-white/10"
          )}
          aria-label="Main navigation"
        >
          <div className={cn(navbarContainer, "h-14 md:h-[4.25rem] gap-3")}>
            <Link
              href="/"
              className="flex shrink-0 items-center gap-0"
              onClick={closeMenu}
            >
              <span className="text-lg font-bold text-foreground md:text-xl dark:text-white">
                Structro
              </span>
              <span className="text-lg font-bold text-primary md:text-xl">Tech</span>
            </Link>

            <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative whitespace-nowrap py-1 text-[15px] font-normal tracking-normal transition-colors",
                      isActive
                        ? "font-medium text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary"
                        : "text-foreground/85 hover:text-foreground dark:text-white/90 dark:hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-lg p-2 text-foreground transition-colors hover:bg-black/10 md:hidden dark:hover:bg-white/10"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile floating card menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99] bg-black/50 md:hidden"
              aria-label="Close menu"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed top-16 left-4 right-4 z-[100] md:hidden",
                "rounded-2xl border p-6 shadow-2xl",
                "bg-white border-black/10",
                "dark:bg-[#0f1117] dark:border-white/10"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-foreground transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <nav className="mt-2 flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "py-3 text-[15px] font-normal transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
