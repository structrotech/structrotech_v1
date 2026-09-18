"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const hasSeen = localStorage.getItem("hasSeenThemeToggleTip_v2");
      if (!hasSeen) {
        const timer = setTimeout(() => setShowTooltip(true), 400);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowTooltip(true);
    }
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    try {
      localStorage.setItem("hasSeenThemeToggleTip_v2", "true");
    } catch {
      // ignore
    }
  };

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-[-6px] sm:right-0 mt-3 z-[9999] w-[260px] sm:w-[280px] max-w-[calc(100vw-32px)] p-4 rounded-[22px] bg-white dark:bg-[#1c1c1e] text-neutral-900 dark:text-white border border-black/15 dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
          >
            {/* Top pointer arrow pointing to toggle icon */}
            <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white dark:bg-[#1c1c1e] border-t border-l border-black/15 dark:border-white/20 rotate-45" />

            <div className="relative z-10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-primary/15 text-primary shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                  Switch Mode Here
                </p>
                <p className="text-[12px] text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                  Click this toggle to switch between dark and light mode.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={dismissTooltip}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
