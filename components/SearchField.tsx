"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const inputCardClass =
  "group relative w-full rounded-full border border-border bg-card shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-md hover:ring-2 hover:ring-primary/15 focus-within:border-primary focus-within:bg-card focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/30";

export function SearchField({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchFieldProps) {
  return (
    <div className={cn(inputCardClass, "max-w-md", className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-transparent py-3.5 pl-12 pr-5 text-[15px] font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}

export { inputCardClass };
