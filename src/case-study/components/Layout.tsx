import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
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
        "font-display font-semibold tracking-[-0.03em] text-balance",
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

/**
 * Heading + intro copy block that reveals once on scroll. The chapter name
 * and number live in the chapter bar, so nothing sits above the heading.
 */
export function Intro({
  title,
  body,
  dark,
  compact,
  children,
}: {
  /** Kept for the chapter list; not shown above the heading. */
  n?: number;
  eyebrow?: string;
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
          <h2 className="font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-read text-ink-soft">{intro}</p> : null}
        </Reveal>
        <ol className="grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
          {items.map((it, i) => (
            <li key={it.k} className="border-b border-line py-5">
              <p className={cn("text-small tabular-nums", accent)}>{i + 1}</p>
              <p className="mt-1 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                {it.k}
              </p>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">{it.v}</p>
            </li>
          ))}
        </ol>
      </div>
      {note ? <p className="mt-6 text-small text-ink-soft">{note}</p> : null}
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
          <h2 className="font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {intro ? <p className="mt-3 text-small text-ink-soft">{intro}</p> : null}
        </Reveal>
        <dl className="grid border-t border-line-strong sm:grid-cols-3 sm:gap-x-8 lg:col-span-8">
          {cells.map((c) => (
            <div key={c.k} className="border-b border-line py-4 sm:border-b-0 sm:py-5">
              <dt className="text-label text-ink-soft">{c.k}</dt>
              <dd className="mt-1.5 text-small leading-snug text-ink sm:text-body">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-8 border-t border-line pt-6">
        <h3 className="text-label text-ink-soft">My contribution</h3>
        <ol className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.k} className="border-t border-line pt-3">
              <p className={cn("hidden text-small tabular-nums sm:block", accent)}>{i + 1}</p>
              <p className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em] sm:mt-2">
                {it.k}
              </p>
              <p className="mt-1.5 hidden text-small leading-relaxed text-ink-soft sm:block">
                {it.v}
              </p>
            </li>
          ))}
        </ol>
        {note ? <p className="mt-5 text-small text-ink-soft">{note}</p> : null}
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
        "fixed inset-x-0 top-0 z-[60] border-b border-line bg-paper pt-[env(safe-area-inset-top)] transition-[transform,opacity] duration-300 ease-[var(--ease-expo)]",
        !show
          ? "pointer-events-none -translate-y-full opacity-0"
          : navShowing
            ? "translate-y-16 lg:translate-y-20"
            : "translate-y-0",
      )}
    >
      <div className="mx-auto flex h-12 max-w-page items-center gap-3 px-5 sm:px-8 lg:px-10">
        <span className="hidden shrink-0 text-label font-semibold text-ink md:block">{name}</span>
        <span aria-hidden className="hidden h-4 w-px bg-line-strong md:block" />
        <div
          ref={rowRef}
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto mask-x [scrollbar-width:none] md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
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
                  "focus-glow relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-3 text-caption font-medium transition-colors duration-200 first:pl-0 md:first:pl-3",
                  on ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {c.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 right-3 h-0.5 bg-ink transition-opacity duration-200",
                    i === 0 ? "left-0 md:left-3" : "left-3",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/**
 * Breadcrumb above a case-study title: the way back to the work list and the
 * page's own name. Replaces the stacked label lines that used to sit there.
 */
export function Breadcrumb({
  name,
  href = `${import.meta.env.BASE_URL}#projects`,
  back = "All work",
  className,
}: {
  name: string;
  href?: string;
  back?: string;
  /** Colour classes for the row, e.g. on a cream or forest hero. */
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-small text-ink-soft", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <a
            href={href}
            className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-1 rounded-full px-1 transition-colors duration-200 hover:text-current hover:underline"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {back}
          </a>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="font-medium text-current">
          {name}
        </li>
      </ol>
    </nav>
  );
}
