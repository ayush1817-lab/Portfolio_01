import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** One line under the head, at the lead size. */
  lead?: string;
  /** Sits on the right of the head row (a control, a count). */
  aside?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Section head: the heading names what the reader is about to see, set in
 * one face, one weight and one colour. No eyebrow above it.
 */
export function SectionHeading({ title, lead, aside, id, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <div className="min-w-0">
        <h2
          id={id}
          className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.03em] text-ink [overflow-wrap:break-word] [text-wrap:balance]"
        >
          {title}
        </h2>
        {lead ? <p className="mt-5 max-w-[52ch] text-lead text-ink-soft">{lead}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
