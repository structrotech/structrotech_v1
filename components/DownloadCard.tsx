import { Download, FileText } from "lucide-react";

interface DownloadCardProps {
  title: string;
  description?: string;
  fileUrl?: string;
  fileExt?: string;
}

export function DownloadCard({ title, description, fileUrl, fileExt }: DownloadCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 dark:bg-[#151820] dark:border-white/10 dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06]">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </div>

      {description ? (
        <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
      ) : (
        <div className="flex-1" />
      )}

      {fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download{fileExt ? ` ${fileExt.toUpperCase()}` : ""}
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/40 text-primary-foreground/70 text-sm font-medium rounded-lg cursor-not-allowed pointer-events-none"
        >
          <Download className="w-4 h-4" />
          Upload a file in Studio
        </span>
      )}
    </div>
  );
}
