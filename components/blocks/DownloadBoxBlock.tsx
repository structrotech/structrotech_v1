import { Download, FileText } from "lucide-react";

export interface DownloadBoxValue {
  enabled?: boolean;
  title?: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
}

export function DownloadBoxBlock({ value }: { value: DownloadBoxValue }) {
  if (!value || value.enabled === false) return null;

  return (
    <div className="my-8 p-6 rounded-[22px] sm:rounded-[24px] border border-black/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] not-prose dark:bg-[#1c1c1e] dark:border-white/[0.08] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-foreground">
            {value.title ?? "Download"}
          </h4>
          {value.description ? (
            <p className="text-sm text-muted-foreground">{value.description}</p>
          ) : null}
        </div>
        {value.fileUrl ? (
          <a
            href={value.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            {value.fileType ? value.fileType.toUpperCase() : "Download"}
          </a>
        ) : null}
      </div>
    </div>
  );
}
