import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Numbered annotation marker: white fill, 1px charcoal border. */
export function Pin({
  n,
  size = "md",
  className,
  style,
}: {
  n: number;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full border border-ink bg-paper font-mono font-medium text-ink",
        size === "md" ? "h-[26px] w-[26px] text-[11px]" : "h-5 w-5 text-[10px]",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
