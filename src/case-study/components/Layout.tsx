import { useEffect, useRef, useState, type ReactNode } from "react";
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
        "relative scroll-mt-20 px-5 sm:px-8 lg:px-10",
        pause ? "py-12 sm:py-16 lg:py-20" : "py-10 sm:py-14 lg:py-18",
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
        "flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase tracking-[0.18em]",
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
            "rounded-full border px-2 py-0.5 text-micro tracking-[0.14em]",
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
        "mt-4 font-display font-semibold tracking-[-0.03em] text-balance",
        Tag === "h3" ? "text-h3" : compact ? "text-h2 leading-[1.04]" : "text-h2",
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
  return <div className={cn("max-w-read space-y-4 text-read", className)}>{children}</div>;
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
        <Prose className={cn("mt-5", dark ? "text-paper/85" : "text-ink-soft")}>
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

/**
 * "My contribution": what I personally did on the project, as a short list of
 * areas. Sits straight after the hero so a reader sees ownership first.
 */
export function Contribution({
  title,
  intro,
  items,
  note,
  accent = "text-cobalt",
}: {
  title: string;
  intro?: string;
  items: { k: string; v: string }[];
  /** Optional line on what was shared or out of scope. */
  note?: string;
  /** Colour class for the item numbers and eyebrow. */
  accent?: string;
}) {
  return (
    <Section id="contribution" label="My contribution" tone="tint">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal y={16} blur={false} className="lg:col-span-4">
          <p className={cn("font-mono text-label uppercase tracking-[0.18em]", accent)}>
            My contribution
          </p>
          <h2 className="mt-4 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-read text-ink-soft">{intro}</p> : null}
        </Reveal>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong sm:grid-cols-2 lg:col-span-8">
          {items.map((it, i) => (
            <li key={it.k} className="bg-paper p-6 sm:p-7">
              <p className={cn("font-mono text-label", accent)}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                {it.k}
              </p>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">{it.v}</p>
            </li>
          ))}
        </ol>
      </div>
      {note ? <p className="mt-6 text-small text-ink-faint">{note}</p> : null}
    </Section>
  );
}

/**
 * Sticky split for wide screens: the text column stays pinned while the
 * evidence (screenshots, diagrams) scrolls past on the right. Stacks on phones.
 */
export function StickySplit({
  aside,
  children,
  className,
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-14", className)}>
      <div className="lg:sticky lg:top-40 lg:col-span-5 lg:self-start">{aside}</div>
      <div className="min-w-0 lg:col-span-7">{children}</div>
    </div>
  );
}

/**
 * "In 60 seconds": the whole project at a glance, merged with what I owned.
 * Sits straight after the hero so a skimming reader gets the story first.
 */
export function Summary({
  title,
  intro,
  cells,
  items,
  note,
  accent = "text-cobalt",
}: {
  title: string;
  intro?: string;
  cells: { k: string; v: string }[];
  items: { k: string; v: string }[];
  note?: string;
  accent?: string;
}) {
  return (
    <Section id="summary" label="The project in 60 seconds" tone="tint">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <Reveal y={16} blur={false} className="lg:col-span-4">
          <p className={cn("font-mono text-label uppercase tracking-[0.18em]", accent)}>
            In 60 seconds
          </p>
          <h2 className="mt-3 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {intro ? <p className="mt-3 text-small text-ink-soft">{intro}</p> : null}
        </Reveal>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong sm:grid-cols-3 lg:col-span-8">
          {cells.map((c) => (
            <div key={c.k} className="bg-paper px-4 py-3.5 sm:p-5">
              <dt className="font-mono text-label uppercase tracking-[0.16em] text-ink-faint">
                {c.k}
              </dt>
              <dd className="mt-1.5 text-small leading-snug text-ink sm:text-body">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-8 border-t border-line pt-6">
        <p className="font-mono text-label uppercase tracking-[0.18em] text-ink-faint">
          My contribution
        </p>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-4">
          {items.map((it, i) => (
            <li
              key={it.k}
              className="rounded-xl border border-line-strong bg-paper p-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <p className={cn("hidden font-mono text-label sm:block", accent)}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em] sm:mt-2">
                {it.k}
              </p>
              <p className="mt-1.5 hidden text-small leading-relaxed text-ink-soft sm:block">
                {it.v}
              </p>
            </li>
          ))}
        </ol>
        {note ? <p className="mt-5 text-small text-ink-faint">{note}</p> : null}
      </div>
    </Section>
  );
}

/**
 * Chapter bar: a slim strip that appears once the reader is past the hero.
 * It shows where they are in the story and lets them jump between sections.
 * It sits below the site nav while that is showing, and takes its place when
 * the nav hides on scroll down.
 */
export function ChapterBar({
  name,
  chapters,
}: {
  name: string;
  chapters: { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [navShowing, setNavShowing] = useState(true);
  const rowRef = useRef<HTMLDivElement>(null);

  // Appear after the hero; mirror the nav's hide-on-scroll-down behaviour.
  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const first = document.getElementById(chapters[0]?.id ?? "");
      setShow(first ? first.getBoundingClientRect().top < window.innerHeight * 0.5 : y > 600);
      setNavShowing(!(y > prev && y > 160));
      prev = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);

  // Track which chapter is being read.
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  // Keep the current chapter visible in the row on narrow screens.
  useEffect(() => {
    const row = rowRef.current;
    const chip = active ? row?.querySelector<HTMLElement>(`[data-chapter="${active}"]`) : null;
    if (!row || !chip) return;
    row.scrollTo({
      left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label={`${name} chapters`}
      aria-hidden={show ? undefined : true}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] px-4 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] sm:px-6 lg:px-8",
        !show
          ? "pointer-events-none -translate-y-full opacity-0"
          : navShowing
            ? "translate-y-[4.75rem] sm:translate-y-[5.5rem]"
            : "translate-y-3 sm:translate-y-4",
      )}
    >
      <div className="mx-auto flex max-w-page items-center gap-1 rounded-full border border-line bg-paper/90 p-1 shadow-soft backdrop-blur-md">
        <span className="hidden shrink-0 pl-4 pr-2 font-mono text-label uppercase tracking-[0.16em] text-ink-faint md:block">
          {name}
        </span>
        <div
          ref={rowRef}
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c, i) => {
            const on = active === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-chapter={c.id}
                aria-current={on ? "location" : undefined}
                tabIndex={show ? undefined : -1}
                className={cn(
                  "focus-glow inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-caption font-medium transition-colors",
                  on ? "bg-ink text-paper" : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                )}
              >
                <span
                  className={cn("font-mono text-micro", on ? "text-paper/60" : "text-ink-faint")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
