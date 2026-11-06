import { Download, FileText } from "lucide-react";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const FILE_NAME = "Ayush-Ramawat-Resume.pdf";

type Tone = "light" | "dark";

/**
 * "View resume" (opens the PDF in a new tab) plus a download button. Both point
 * at profile.resume, so replacing the PDF in public/resume/ updates every link.
 */
export function ResumeLinks({
  tone = "light",
  size = "md",
  className,
}: {
  tone?: Tone;
  size?: "sm" | "md";
  className?: string;
}) {
  const pill = size === "sm" ? "gap-1.5 px-3.5 py-2.5 text-caption" : "gap-2 px-5 text-sm";
  const look =
    tone === "dark"
      ? "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-cobalt"
      : "border border-line-strong text-ink hover:border-ink";
  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          tone === "dark" ? "focus-on-accent" : "focus-glow",
          "inline-flex min-h-11 flex-1 items-center justify-center rounded-full font-sans font-semibold tracking-tight transition-colors duration-200 sm:flex-none",
          pill,
          look,
        )}
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden />
        View resume
        <span className="sr-only">(PDF, opens in a new tab)</span>
      </a>
      <a
        href={profile.resume}
        download={FILE_NAME}
        aria-label="Download resume (PDF)"
        title="Download resume (PDF)"
        className={cn(
          tone === "dark" ? "focus-on-accent" : "focus-glow",
          "inline-grid shrink-0 place-items-center rounded-full transition-colors duration-200",
          size === "sm" ? "h-10 w-10" : "min-h-11 w-11",
          look,
        )}
      >
        <Download className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
