import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import { cn } from "@/lib/utils";
import { Prose, Section } from "@/case-study/components/Layout";
import { buildUrl, cards, type BuildSlug } from "../content";
import { mediaSrc, type MediaSlot } from "../media";

const BASE = import.meta.env.BASE_URL;

/** Page shell shared by every build: skip link, nav, main landmark, footer. */
export function BuildDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <a
        href="#build"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to build
      </a>
      <TopNav />
      <main id="build">
        <article>{children}</article>
      </main>
      <Footer />
    </div>
  );
}

/** Title, one-line hero, tags and facts, with the build's motif beside them. */
export function BuildHero({
  slug,
  heroLine,
  meta,
  visual,
}: {
  slug: BuildSlug;
  heroLine: string;
  meta: { k: string; v: string }[];
  visual: ReactNode;
}) {
  const c = cards.find((x) => x.slug === slug)!;
  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-24 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-fade" />
      <div className="mx-auto max-w-page">
        <a
          href={`${BASE}#builds`}
          className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-cobalt"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All builds
        </a>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal y={16} blur={false} className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">
              Small build {c.index} · Intelligence inside {articleFor(c.where)}{" "}
              {c.where.toLowerCase()}
            </p>
            <h1 className="mt-4">
              <span className="block font-display text-[clamp(1.1rem,0.9rem+0.6vw,1.4rem)] font-semibold tracking-[-0.01em] text-ink-soft">
                {c.name}
              </span>
              <span className="mt-2 block max-w-[20ch] font-display text-[clamp(2rem,1.1rem+3vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
                {heroLine}
              </span>
            </h1>
            <p className="mt-5 max-w-read text-read text-ink-soft">{c.description}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
              {c.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            y={20}
            blur={false}
            delay={0.1}
            className="overflow-hidden rounded-[1.75rem] border border-line shadow-soft lg:col-span-5"
          >
            <div className="aspect-[4/3]">{visual}</div>
          </Reveal>
        </div>
        <dl className="mt-10 grid gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {m.k}
              </dt>
              <dd className="mt-1.5 text-[15px] font-medium leading-snug text-ink">{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

const articleFor = (w: string) => (w === "Workflow" ? "a" : "an");

/** One step of the story: eyebrow, heading, short copy, then any visual. */
export function BuildStoryBlock({
  id,
  eyebrow,
  title,
  body,
  tone,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body?: string[];
  tone?: "plain" | "tint" | "dark";
  children?: ReactNode;
}) {
  return (
    <Section id={id} label={eyebrow} tone={tone}>
      <Reveal y={16} blur={false}>
        <p
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.18em]",
            tone === "dark" ? "text-sun" : "text-cobalt",
          )}
        >
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-lead font-display text-h2 font-semibold tracking-[-0.035em] text-balance">
          {title}
        </h2>
      </Reveal>
      {body?.length ? (
        <Prose className={cn("mt-6", tone === "dark" ? "text-paper/85" : "text-ink-soft")}>
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      ) : null}
      {children ? <div className="mt-10">{children}</div> : null}
    </Section>
  );
}

/** The build's design principle, set large. */
export function Statement({ line, sub }: { line: string; sub?: string }) {
  return (
    <section aria-label="Design principle" className="bg-sun px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-page">
        <Reveal y={16} blur={false}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
            The principle
          </p>
          <p className="mt-4 max-w-[22ch] font-display text-[clamp(2.2rem,1.2rem+3.6vw,5rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink text-balance">
            {line}
          </p>
          {sub ? <p className="mt-5 max-w-read text-read text-ink/80">{sub}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}

/** Before → after, with the honest caveat directly beside it. */
export function MetricCallout({
  before,
  after,
  note,
}: {
  before: { value: string; label: string };
  after: { value: string; label: string };
  note?: { title: string; body: string };
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong sm:grid-cols-[1fr_auto_1fr] lg:col-span-7">
        <div className="bg-paper p-6 sm:p-8">
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            Before
          </dt>
          <dd className="mt-2 font-display text-[clamp(2.4rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink-faint">
            {before.value}
          </dd>
          <dd className="mt-2 text-[14px] leading-snug text-ink-soft">{before.label}</dd>
        </div>
        <div aria-hidden className="hidden place-items-center bg-paper px-2 sm:grid">
          <ArrowRight className="h-5 w-5 text-cobalt" />
        </div>
        <div className="bg-paper p-6 sm:p-8">
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">After</dt>
          <dd className="mt-2 font-display text-[clamp(2.4rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
            {after.value}
          </dd>
          <dd className="mt-2 text-[14px] leading-snug text-ink-soft">{after.label}</dd>
        </div>
      </dl>
      {note ? (
        <div className="rounded-xl border border-warn/40 bg-warn-soft p-6 lg:col-span-5">
          <p className="font-display text-[1.2rem] font-semibold tracking-[-0.02em]">
            {note.title}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink">{note.body}</p>
        </div>
      ) : null}
    </div>
  );
}

/** A short closing list: what I'd improve, test or measure next. */
export function ReflectionBlock({
  title,
  items,
  tone = "tint",
}: {
  title: string;
  items: (string | { k: string; v: string })[];
  tone?: "plain" | "tint";
}) {
  return (
    <Section label={title} tone={tone}>
      <Reveal y={16} blur={false}>
        <h2 className="font-display text-h3 font-semibold tracking-[-0.03em]">{title}</h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, k) => (
          <li
            key={typeof it === "string" ? it : it.k}
            className="rounded-xl border border-line-strong bg-paper p-5"
          >
            <p className="font-mono text-[12px] text-cobalt">{String(k + 1).padStart(2, "0")}</p>
            {typeof it === "string" ? (
              <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{it}</p>
            ) : (
              <>
                <p className="mt-2 font-display text-[1.15rem] font-semibold leading-tight tracking-[-0.02em]">
                  {it.k}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{it.v}</p>
              </>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** Real media for a slot, once supplied. Renders nothing until then. */
export function BuildMedia({ slot, className }: { slot: MediaSlot; className?: string }) {
  const src = mediaSrc(slot);
  if (!src) return null;
  return (
    <figure className={cn("overflow-hidden rounded-[1.5rem] border border-line", className)}>
      <img src={src} alt={slot.alt} loading="lazy" decoding="async" className="w-full" />
      <figcaption className="border-t border-line bg-paper px-4 py-3 text-[14px] text-ink-soft">
        {slot.caption}
      </figcaption>
    </figure>
  );
}

/** Next build (cyclic) plus a way back to the homepage section. */
export function NextBuildNavigation({ slug }: { slug: BuildSlug }) {
  const k = cards.findIndex((c) => c.slug === slug);
  const next = cards[(k + 1) % cards.length];
  return (
    <section aria-label="Next build" className="px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:px-10">
      <div className="mx-auto flex max-w-page flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`${BASE}#builds`}
          className="focus-glow group inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-cobalt"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All small builds
        </a>
        <a
          href={buildUrl(next.slug)}
          className="focus-glow group inline-flex min-h-11 items-center gap-3 rounded-full px-2 py-3 text-[15px] text-ink transition-colors hover:text-cobalt"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            Next build
          </span>
          <span className="font-semibold">{next.name}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
