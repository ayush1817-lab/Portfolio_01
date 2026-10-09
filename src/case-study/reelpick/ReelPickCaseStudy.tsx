import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import heroArt from "@/assets/reelpick/reelpick-hero.webp";
import journeyArt from "@/assets/reelpick/reelpick-product-journey.webp";
import { LightboxProvider } from "../components/Lightbox";
import { Contribution, Eyebrow, Intro, Pull, Section } from "../components/Layout";
import { Flow } from "../components/Diagrams";
import { ArtFigure, JourneyViewer, ScreenCrop } from "./components";
import * as C from "./content";

const BASE = import.meta.env.BASE_URL;
const nextProject = projects.find((p) => p.id === "proj-03");

/** Accent classes: lavender on light sections, amber on charcoal. */
const LAV = "text-reel-lavender-deep";
const AMB = "text-reel-amber";

const HERO_IMG = {
  id: "reelpick-hero",
  src: heroArt,
  width: 720,
  height: 405,
  alt: C.hero.art.alt,
  title: "ReelPick hero artwork",
  caption: "Original ReelPick hero artwork.",
};

const JOURNEY_IMG = {
  id: "reelpick-journey",
  src: journeyArt,
  width: 1400,
  height: 788,
  alt: C.journey.image.alt,
  title: C.journey.image.title,
  caption: C.journey.image.caption,
};

export function ReelPickCaseStudy() {
  return (
    <LightboxProvider>
      <div className="min-h-screen bg-paper font-sans text-ink antialiased">
        <a
          href="#case-study"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to case study
        </a>
        <TopNav />
        <main id="case-study">
          <article>
            <Hero />
            <Contribution {...C.contribution} accent={LAV} />
            <Problem />
            <Hypothesis />
            <Journey />
            <Mechanism />
            <Decisions />
            <Engineering />
            <Verdict />
            <Decision />
            <Practice />
          </article>
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  const d = C.hero;
  return (
    <header className="bg-reel-cream px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-page">
        <a
          href={`${BASE}#projects`}
          className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-label uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All work
        </a>
        <Reveal y={16} blur={false}>
          <p className={cn("mt-8 font-mono text-label uppercase tracking-[0.18em]", LAV)}>
            {d.eyebrow}
          </p>
          <h1 className="mt-5 font-display font-semibold tracking-[-0.04em]">
            <span className="block text-h4 tracking-[-0.01em] text-ink-soft">{d.name}</span>
            <span className="mt-3 block text-h1 text-balance">
              {d.title[0]} <span className={LAV}>{d.title[1]}</span>
            </span>
          </h1>
          <p className="mt-7 max-w-read text-lead text-ink-soft">{d.sub}</p>
        </Reveal>

        <Reveal y={24} blur={false} delay={0.1} className="mt-12 lg:mt-16">
          <ArtFigure
            img={HERO_IMG}
            eager
            maxWidth={1080}
            frameClassName="border border-line shadow-soft"
          />
        </Reveal>

        <dl className="mt-12 grid gap-6 border-t border-line-strong pt-8 sm:grid-cols-3 lg:mt-16">
          {d.facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-label uppercase tracking-[0.16em] text-ink-faint">
                {f.k}
              </dt>
              <dd className="mt-2 text-small font-medium leading-snug text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/* ─────────────────────── The Friday night problem ─────────────────────── */

function Problem() {
  const d = C.problem;
  return (
    <Section id="problem" label="The Friday night problem">
      <Intro n={1} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} accent={LAV} />
      <Flow nodes={d.progression} label="How a movie night stalls" className="mt-14" />
      <ul className="mt-14 grid gap-8 md:grid-cols-3">
        {d.forces.map((f) => (
          <li key={f.k} className="border-t-2 border-ink pt-4">
            <p className="font-display text-h4 font-semibold tracking-[-0.02em]">{f.k}</p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{f.v}</p>
          </li>
        ))}
      </ul>
      <Reveal y={12} blur={false} className="mt-16">
        <p className="max-w-read text-read text-ink-soft">{d.reframe.lead}</p>
        <Pull className="mt-5 border-reel-lavender">{d.reframe.q}</Pull>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── Hypothesis ─────────────────────── */

function Hypothesis() {
  const d = C.hypothesis;
  return (
    <Section id="hypothesis" label="The product hypothesis" tone="tint">
      <Intro n={2} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} accent={LAV} />
      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {d.principles.map((p, i) => (
          <li key={p.k} className="rounded-2xl border border-line-strong bg-paper p-7">
            <p className={cn("font-mono text-label", LAV)}>{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-4 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {p.k}
            </p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{p.v}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────────────── Product journey ─────────────────────── */

function Journey() {
  const d = C.journey;
  return (
    <section
      id="journey"
      aria-label="Product journey"
      className="bg-reel-cream px-5 py-[4.5rem] sm:px-8 sm:py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-page">
        <Intro n={3} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} accent={LAV} />
      </div>
      <div className="mx-auto mt-12 max-w-page lg:mt-16">
        <JourneyViewer img={JOURNEY_IMG} steps={d.steps} />
      </div>
      <div className="mx-auto mt-10 max-w-page">
        <p className="text-small text-ink-soft">{d.image.caption}</p>
        <ol className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-7">
          {d.steps.map((s) => (
            <li
              key={s.n}
              className={cn(
                "border-t-2 pt-3",
                s.group ? "border-reel-charcoal" : "border-line-strong",
              )}
            >
              <p className="flex items-center gap-2 font-mono text-label uppercase tracking-[0.14em]">
                <span className={s.group ? "text-ink" : "text-ink-faint"}>{s.n}</span>
                <span className={s.group ? "text-ink" : "text-ink-soft"}>{s.k}</span>
              </p>
              <p className="mt-1.5 text-small leading-snug text-ink-soft">{s.v}</p>
              <p
                className={cn(
                  "mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-micro uppercase tracking-[0.12em]",
                  s.group
                    ? "bg-reel-charcoal text-reel-amber"
                    : "bg-paper text-ink-soft ring-1 ring-line-strong",
                )}
              >
                {s.group ? "Group room" : "Personal"}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Mechanism() {
  const d = C.journey.mechanism;
  return (
    <Section id="mechanism" label="How the room decides" tone="charcoal">
      <Reveal y={16} blur={false}>
        <p className={cn("font-mono text-label uppercase tracking-[0.18em]", AMB)}>The core flow</p>
        <h2 className="mt-5 font-display text-h2 font-semibold leading-[1.02] tracking-[-0.03em]">
          {d.title}
        </h2>
      </Reveal>
      <Flow nodes={d.flow} label="How a ReelPick room reaches a winner" dark className="mt-12" />
      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {d.notes.map((n) => (
          <li key={n} className="flex gap-3 text-small leading-relaxed text-paper/80">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-reel-amber" />
            {n}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────── Decisions for real groups ─────────────────────── */

function Decisions() {
  const d = C.decisions;
  const withCrop = d.items.filter((i) => i.crop);
  const textOnly = d.items.filter((i) => !i.crop);
  return (
    <Section id="decisions" label="Decisions for real groups">
      <Intro n={4} eyebrow={d.eyebrow} lens={d.lens} title={d.title} accent={LAV} />
      <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {withCrop.map((it) => (
          <li key={it.k}>
            <ScreenCrop img={JOURNEY_IMG} crop={it.crop!} label={it.cropLabel!} />
            <p className="mt-5 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{it.v}</p>
          </li>
        ))}
      </ul>
      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong md:grid-cols-3">
        {textOnly.map((it) => (
          <li key={it.k} className="bg-paper p-7">
            <p className="font-display text-h4 font-semibold tracking-[-0.02em]">{it.k}</p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{it.v}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────── Engineering awareness ─────────────────────── */

function Engineering() {
  const d = C.engineering;
  return (
    <Section id="engineering" label="Engineering awareness" tone="tint">
      <Intro n={5} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} accent={LAV} />
      <Flow nodes={d.pipeline} label="Movie data pipeline" className="mt-12" />
      <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-small font-medium text-ink ring-1 ring-line-strong">
        <Check className={cn("h-4 w-4", LAV)} aria-hidden />
        {d.note}
      </p>

      <div className="mt-16 grid gap-8 rounded-2xl border border-line-strong bg-paper p-7 sm:p-9 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className={cn("font-mono text-label uppercase tracking-[0.16em]", LAV)}>
            {d.second.title}
          </p>
          <p className="mt-3 text-body leading-relaxed text-ink-soft">{d.second.body}</p>
        </div>
        <div className="lg:col-span-7">
          <Flow nodes={d.second.flow} label="Personal recommendation system" />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Beta verdict ─────────────────────── */

function Verdict() {
  const d = C.verdict;
  return (
    <Section id="verdict" label="The beta verdict" pause>
      <Reveal y={16} blur={false}>
        <Eyebrow n={6} lens={d.lens} accent={LAV}>
          {d.eyebrow}
        </Eyebrow>
        <h2 className="mt-6 font-display text-h2 font-semibold leading-[1] tracking-[-0.04em]">
          <span className="block">{d.title[0]}</span>
          <span className="block text-ink-faint">{d.title[1]}</span>
        </h2>
        <p className="mt-6 max-w-[40rem] text-small text-ink-soft">{d.context}</p>
      </Reveal>

      <div className="mt-12 grid overflow-hidden rounded-3xl md:grid-cols-2">
        <div className="bg-reel-lavender-soft p-8 sm:p-10">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-reel-lavender-deep text-paper">
            <Check className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-6 font-display text-h3 font-semibold leading-tight tracking-[-0.02em]">
            {d.worked.k}
          </p>
          <p className="mt-3 text-body leading-relaxed text-ink">{d.worked.v}</p>
        </div>
        <div className="bg-reel-charcoal p-8 text-paper sm:p-10">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-reel-amber text-reel-charcoal">
            <X className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-6 font-display text-h3 font-semibold leading-tight tracking-[-0.02em]">
            {d.failed.k}
          </p>
          <p className="mt-3 text-body leading-relaxed text-paper/85">{d.failed.v}</p>
        </div>
      </div>

      <Reveal y={12} blur={false} className="mt-12">
        <Pull className="border-reel-amber">{d.bottom}</Pull>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── The decision (climax) ─────────────────────── */

function Decision() {
  const d = C.decision;
  return (
    <section
      id="decision"
      aria-label="The product decision"
      className="bg-reel-charcoal px-5 py-28 text-paper sm:px-8 sm:py-36 lg:px-10 lg:py-52"
    >
      <div className="mx-auto max-w-page">
        <Reveal y={20} blur={false}>
          <p className={cn("font-mono text-label uppercase tracking-[0.18em]", AMB)}>
            07 · {d.eyebrow}
          </p>
          <h2 className="mt-8 font-display text-display font-semibold leading-[0.95] tracking-[-0.045em]">
            <span className="block">{d.title[0]}</span>
            <span className={cn("block", AMB)}>{d.title[1]}</span>
          </h2>
        </Reveal>
        <div className="mt-12 max-w-read space-y-5 text-read text-paper/85">
          {d.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Practice + close ─────────────────────── */

function Practice() {
  const d = C.practice;
  return (
    <Section id="practice" label="What changed in my practice" pause>
      <p className={cn("font-mono text-label uppercase tracking-[0.18em]", LAV)}>{d.eyebrow}</p>
      <ol className="mt-10 grid gap-10 md:grid-cols-3">
        {d.items.map((it, i) => (
          <li key={it.k}>
            <p className={cn("font-mono text-label", LAV)}>{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{it.v}</p>
          </li>
        ))}
      </ol>

      <Reveal y={16} blur={false} className="mt-24 lg:mt-32">
        <p className="max-w-[22ch] font-display text-h2 font-semibold leading-[1.06] tracking-[-0.035em] text-balance">
          {d.closing}
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={C.meta.medium}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-glow group inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-small font-semibold text-paper transition-colors hover:bg-reel-lavender-deep"
        >
          Read the original article
          <ArrowUpRight className="h-4 w-4" aria-hidden />
          <span className="sr-only">(Medium, opens in a new tab)</span>
        </a>
        {nextProject?.link ? (
          <a
            href={nextProject.link}
            className="focus-glow group inline-flex min-h-11 items-center gap-3 rounded-full px-2 py-3 text-small text-ink transition-colors hover:text-reel-lavender-deep"
          >
            <span className="font-mono text-label uppercase tracking-[0.16em] text-ink-soft">
              Next project
            </span>
            <span className="font-semibold">{nextProject.title}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </div>
      <p className="mt-8 text-caption text-ink-faint">
        Source: Ayush Ramawat, “ReelPick Product Idea Case Study,” Medium, 18 July 2026.
      </p>
    </Section>
  );
}
