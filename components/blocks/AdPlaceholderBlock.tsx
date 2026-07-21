import { cn } from "@/lib/utils";

export interface AdPlaceholderValue {
  enabled?: boolean;
  position?: "top" | "middle" | "bottom" | "custom";
  format?: "leaderboard" | "rectangle";
}

export function AdPlaceholderBlock({ value }: { value: AdPlaceholderValue }) {
  if (!value || value.enabled === false) return null;

  const isRectangle = value.format === "rectangle" || value.position === "middle";
  const heightClass = isRectangle ? "h-[250px]" : "h-[90px]";

  const label = value.format
    ? value.format === "rectangle"
      ? "Medium Rectangle (300×250)"
      : "Leaderboard (728×90)"
    : (value.position ?? "custom").charAt(0).toUpperCase() +
      (value.position ?? "custom").slice(1);

  return (
    <div className="w-full my-6 not-prose">
      <p className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wider">
        Advertisement
      </p>
      <div
        className={cn(
          "w-full rounded-lg border border-border bg-card/50 flex items-center justify-center",
          heightClass
        )}
      >
        <p className="text-sm text-muted-foreground">Ad Space - {label}</p>
      </div>
    </div>
  );
}
