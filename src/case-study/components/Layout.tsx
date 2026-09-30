import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/portfolio/motion";
import type { Lens } from "../content";

type Tone = "plain" | "tint" | "dark" | "charcoal" | "cream";

/** A narrative section. The frame and the text measures scale with the viewport. */
export function Section({
  id,
  tone = "plain",
  pause,
  children,
  label,
}: {
  id?: string;
  tone?: Tone;
  /** Extra breathing room before key turns in the story. */
  pause?: boolean;
  children: ReactNode;
  label: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative px-5 sm:px-8 lg:px-10",
        pause ? "py-24 sm:py-32 lg:py-48" : "py-[4.5rem] sm:py-24 lg:py-32",
        tone === "tint" && "bg-paper-2",
        tone === "dark" && "bg-ink text-paper",
        tone === "charcoal" && "bg-reel-charcoal text-paper",
        tone === "cream" && "bg-reel-cream",
      )}
    >
      <div className="mx-auto w-full max-w-page">{children}</div>
    </section>
  );
}

/** Eyebrow row: running number, section name, and the question it answers. */
export function Eyebrow({
  n,
  children,
  lens,
  dark,
  accent,
}: {
  n: number;
  children: ReactNode;
  lens?: Lens;
  dark?: boolean;
  /** Colour class for the running number (defaults to the site accent). */
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]",
        dark ? "text-paper/70" : "text-ink-soft",
      )}
    >
      <span className={accent ?? (dark ? "text-sun" : "text-cobalt")}>
        {String(n).padStart(2, "0")}
      </span>
      <span aria-hidden className={cn("h-px w-6", dark ? "bg-paper/30" : "bg-line-strong")} />
      <span>{children}</span>
      {lens ? (
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] tracking-[0.14em]",
            dark ? "border-paper/25 text-paper/80" : "border-line-strong text-ink-soft",
          )}
        >
          {lens}
        </span>
      ) : null}
    </div>
  );
}

/** Section heading. Array titles render one sentence per line. */
export function Heading({
  children,
  as: Tag = "h2",
  compact,
  className,
}: {
  children: ReactNode | string[];
  as?: "h2" | "h3";
  /** Smaller h2 for split layouts where the heading shares the row with a screenshot. */
  compact?: boolean;
  className?: string;
}) {
  const lines = Array.isArray(children) ? children : [children];
  return (
    <Tag
      className={cn(
        "mt-5 font-display font-semibold tracking-[-0.03em] text-balance",
        Tag === "h3"
          ? "text-h3"
          : compact
            ? "text-[clamp(2.1rem,1.2rem+2.4vw,4.25rem)] leading-[1.04]"
            : "text-h2",
        className,
      )}
    >
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </Tag>
  );
}

/** Reading column: widens and grows with the screen, ~75–85 characters a line. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-read space-y-5 text-read", className)}>{children}</div>;
}

/** Heading + intro copy block that reveals once on scroll. */
export function Intro({
  n,
  eyebrow,
  lens,
  title,
  body,
  dark,
  compact,
  accent,
  children,
}: {
  n: number;
  eyebrow: string;
  lens?: Lens;
  title: string | string[];
  body?: string[];
  dark?: boolean;
  compact?: boolean;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal y={16} blur={false}>
      <div className="max-w-lead">
        <Eyebrow n={n} lens={lens} dark={dark} accent={accent}>
          {eyebrow}
        </Eyebrow>
        <Heading compact={compact}>{title}</Heading>
      </div>
      {body?.length ? (
        <Prose className={cn("mt-7", dark ? "text-paper/85" : "text-ink-soft")}>
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      ) : null}
      {children}
    </Reveal>
  );
}

/** Large pull statement inside the reading column. */
export function Pull({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "max-w-read border-l-[3px] border-sun pl-5 font-display text-pull font-medium tracking-[-0.02em] text-ink",
        className,
      )}
    >
      {children}
    </p>
  );
}
