"use client";

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  if (!value || !value.code) return null;

  const label = value.filename?.trim() || "Code";
  const languageLabel = value.language
    ? (LANGUAGE_LABEL[value.language] ?? value.language)
    : null;

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value.code || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API blocked
    }
  }

  return (
    <div className="my-6 not-prose rounded-xl border border-neutral-800 bg-black overflow-hidden shadow-sm">
      {/* Header bar (Black/Dark terminal styling with ChatGPT-style Copy button) */}
      <div className="flex w-full items-center justify-between gap-3 px-4 py-2.5 bg-[#0d0d0d] border-b border-neutral-800/80">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2.5 min-w-0 text-left hover:opacity-85 transition-opacity"
        >
          <span className="truncate font-mono text-[13px] text-neutral-300 font-medium">
            {label}
          </span>
          {languageLabel ? (
            <span className="shrink-0 px-2 py-0.5 text-[11px] font-medium rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60">
              {languageLabel}
            </span>
          ) : null}
          <ChevronDown
            className={cn(
              "w-4 h-4 shrink-0 text-neutral-400 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {/* Copy Code Button (ChatGPT style) */}
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700/60 rounded-md transition-all active:scale-95"
          title={copied ? "Copied!" : "Copy code"}
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[11px]">Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code body (Black background, overrides Shiki default gray to pure black) */}
      {open ? (
        <div className="bg-black overflow-x-auto text-sm [&_pre]:!bg-black [&_pre]:m-0 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-relaxed text-neutral-100">
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
