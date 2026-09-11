"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
}

export function SortSelect({
  value,
  options,
  onChange,
  label = "Sort by",
}: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${value}`}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold text-foreground transition-all duration-200",
          "bg-card border-border shadow-sm backdrop-blur-xl",
          "hover:border-primary/50 hover:shadow-md",
          open && "border-primary/60 ring-2 ring-primary/20 shadow-md"
        )}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
          <ArrowUpDown className="h-3.5 w-3.5" />
        </span>
        <span className="max-w-[120px] truncate sm:max-w-none">{value}</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180 text-primary"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <div className="absolute left-0 sm:left-auto sm:right-0 bottom-full mb-2 z-50 w-[212px]">
            <motion.div
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "bottom center" }}
              className="relative overflow-hidden rounded-xl border border-border bg-popover shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
              <div className="relative border-b border-border/60 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
              </div>

              <ul className="relative p-1.5 space-y-0.5">
                {options.map((option) => {
                  const isActive = option === value;
                  return (
                    <li key={option} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => handleSelect(option)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-all duration-150",
                          isActive
                            ? "bg-primary/20 text-primary font-semibold"
                            : "text-foreground hover:bg-muted/70"
                        )}
                      >
                        <span className="truncate">{option}</span>
                        {isActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Small arrow pointing down toward trigger button */}
              <div
                className="absolute -bottom-1.5 right-7 h-2.5 w-2.5 rotate-45 border-r border-b border-border bg-popover"
                aria-hidden
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
