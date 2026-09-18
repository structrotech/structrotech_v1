"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGE_LABEL: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  bash: "Bash",
  json: "JSON",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  go: "Go",
};

export interface CodeAccordionValue {
  language?: string;
  filename?: string;
  code?: string;
  defaultOpen?: boolean;
  highlightedHtml?: string;
}

export function CodeAccordionBlock({ value }: { value: CodeAccordionValue }) {
  const [open, setOpen] = useState(Boolean(value?.defaultOpen));

  if (!value || !value.code) return null;

  const label = value.filename?.trim() || "Code";
  const languageLabel = value.language
    ? (LANGUAGE_LABEL[value.language] ?? value.language)
    : null;

  return (
    <div className="my-6 not-prose rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="flex-1 truncate">{label}</span>
        {languageLabel ? (
          <span className="shrink-0 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary/20 text-primary">
            {languageLabel}
          </span>
        ) : null}
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-border overflow-x-auto text-sm [&_pre]:m-0 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-relaxed">
          {value.highlightedHtml ? (
            <div dangerouslySetInnerHTML={{ __html: value.highlightedHtml }} />
          ) : (
            <pre className="m-0 p-4 overflow-x-auto">
              <code className="font-mono text-[13px] leading-relaxed">{value.code}</code>
            </pre>
          )}
        </div>
      ) : null}
    </div>
  );
}
