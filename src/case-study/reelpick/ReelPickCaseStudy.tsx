import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import heroArt from "@/assets/reelpick/reelpick-hero.webp";
import journeyArt from "@/assets/reelpick/reelpick-product-journey.webp";
import { LightboxProvider } from "../components/Lightbox";
import { ChapterBar, Eyebrow, Intro, Pull, Section, Summary } from "../components/Layout";
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
      <div className="case-scale min-h-screen bg-paper font-sans text-ink antialiased">
        <a
          href="#case-study"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to case study
        </a>
        <TopNav />
        <ChapterBar name="ReelPick" chapters={C.chapters} />
        <main id="case-study">
          <article>
            <Hero />
            <Summary {...C.summary} accent={LAV} />
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
    <header className="bg-reel-cream px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pb-14 lg:pt-32">
      <div className="mx-auto max-w-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal y={16} blur={false} className="lg:col-span-6">
            <a
              href={`${BASE}#projects`}
              className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-label uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All work
            </a>
            <p className={cn("mt-4 font-mono text-label uppercase tracking-[0.18em]", LAV)}>
              {d.eyebrow}
            </p>
            <h1 className="mt-3 font-display font-semibold tracking-[-0.04em]">
              <span className="block text-h4 tracking-[-0.01em] text-ink-soft">{d.name}</span>
              <span className="mt-2 block text-h1 text-balance">
                {d.title[0]} <span className={LAV}>{d.title[1]}</span>
              </span>
            </h1>
            <p className="mt-4 max-w-read text-read text-ink-soft">{d.sub}</p>
          </Reveal>
          <Reveal y={24} blur={false} delay={0.1} className="lg:col-span-6">
            <ArtFigure
              img={HERO_IMG}
              eager
              maxWidth={760}
              frameClassName="border border-line shadow-soft"
            />
          </Reveal>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-strong pt-5 sm:grid-cols-3 lg:mt-12">
          {d.facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-label uppercase tracking-[0.16em] text-ink-faint">
                {f.k}
              </dt>
              <dd className="mt-1.5 text-small font-medium leading-snug text-ink">{f.v}</dd>
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
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Intro
            n={1}
            eyebrow={d.eyebrow}
            lens={d.lens}
            title={d.title}
            body={d.body}
            accent={LAV}
          />
        </div>
        <Reveal y={12} blur={false} className="lg:col-span-6 lg:pt-12">
          <Flow nodes={d.progression} label="How a movie night stalls" />
          <p className="mt-8 text-read text-ink-soft">{d.reframe.lead}</p>
          <Pull className="mt-3 border-reel-lavender">{d.reframe.q}</Pull>
        </Reveal>
      </div>
      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-8">
        {d.forces.map((f) => (
          <li key={f.k} className="border-t-2 border-ink pt-4">
            <p className="font-display text-h4 font-semibold tracking-[-0.02em]">{f.k}</p>
            <p className="mt-2 text-small leading-relaxed text-ink-soft sm:text-body">{f.v}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────── Hypothesis ─────────────────────── */

function Hypothesis() {
  const d = C.hypothesis;
  return (
    <Section id="hypothesis" label="The product hypothesis" tone="tint">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <Intro
            n={2}
            eyebrow={d.eyebrow}
            lens={d.lens}
            title={d.title}
            body={d.body}
            accent={LAV}
          />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong lg:col-span-7">
          {d.principles.map((p, i) => (
            <li key={p.k} className="flex gap-4 bg-paper p-4 sm:p-5">
              <p className={cn("pt-1 font-mono text-label", LAV)}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                  {p.k}
                </p>
                <p className="mt-1 text-small leading-relaxed text-ink-soft sm:text-body">{p.v}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
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
      className="scroll-mt-20 bg-reel-cream px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-18"
    >
      <div className="mx-auto max-w-page">
        <Intro n={3} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} accent={LAV} />
      </div>
      <div className="mx-auto mt-8 max-w-page lg:mt-10">
        <JourneyViewer img={JOURNEY_IMG} steps={d.steps} />
      </div>
      <div className="mx-auto mt-6 max-w-page">
        <p className="text-small text-ink-soft">{d.image.caption}</p>
        <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 lg:grid-cols-7">
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
        <h2 className="mt-4 font-display text-h2 font-semibold tracking-[-0.03em]">{d.title}</h2>
      </Reveal>
      <Flow nodes={d.flow} label="How a ReelPick room reaches a winner" dark className="mt-8" />
      <ul className="mt-8 grid gap-3 md:grid-cols-3">
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
  return (
    <Section id="decisions" label="Decisions for real groups">
      <Intro n={4} eyebrow={d.eyebrow} lens={d.lens} title={d.title} accent={LAV} />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        {/* the three screens sit side by side, even on phones */}
        <ul className="grid grid-cols-3 gap-2 sm:gap-4 lg:col-span-6">
          {withCrop.map((it) => (
            <li key={it.k}>
              <ScreenCrop img={JOURNEY_IMG} crop={it.crop!} label={it.cropLabel!} />
            </li>
          ))}
        </ul>
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-6">
          {d.items.map((it, i) => (
            <li key={it.k} className="border-t border-line-strong pt-3">
              <p className={cn("font-mono text-label", LAV)}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                {it.k}
              </p>
              <p className="mt-1.5 text-small leading-relaxed text-ink-soft">{it.v}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ─────────────────────── Engineering awareness ─────────────────────── */

function Engineering() {
  const d = C.engineering;
  return (
    <Section id="engineering" label="Engineering awareness" tone="tint">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Intro
            n={5}
            eyebrow={d.eyebrow}
            lens={d.lens}
            title={d.title}
            body={d.body}
            accent={LAV}
          />
        </div>
        <div className="lg:col-span-7 lg:pt-12">
          <Flow nodes={d.pipeline} label="Movie data pipeline" grid />
          <p className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-paper px-4 py-2 text-small font-medium text-ink ring-1 ring-line-strong sm:rounded-full">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", LAV)} aria-hidden />
            {d.note}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 rounded-2xl border border-line-strong bg-paper p-5 sm:p-7 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className={cn("font-mono text-label uppercase tracking-[0.16em]", LAV)}>
            {d.second.title}
          </p>
          <p className="mt-2 text-small leading-relaxed text-ink-soft sm:text-body">
            {d.second.body}
          </p>
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
    <Section id="verdict" label="The beta verdict">
      <Reveal y={16} blur={false}>
        <Eyebrow n={6} lens={d.lens} accent={LAV}>
          {d.eyebrow}
        </Eyebrow>
        <h2 className="mt-4 font-display text-h2 font-semibold tracking-[-0.04em]">
          <span className="block">{d.title[0]}</span>
          <span className="block text-ink-faint">{d.title[1]}</span>
        </h2>
        <p className="mt-4 max-w-[40rem] text-small text-ink-soft">{d.context}</p>
      </Reveal>

      <div className="mt-8 grid overflow-hidden rounded-3xl md:grid-cols-2">
        <div className="bg-reel-lavender-soft p-5 sm:p-8">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-reel-lavender-deep text-paper">
            <Check className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-4 font-display text-h3 font-semibold leading-tight tracking-[-0.02em]">
            {d.worked.k}
          </p>
          <p className="mt-2 text-small leading-relaxed text-ink sm:text-body">{d.worked.v}</p>
        </div>
        <div className="bg-reel-charcoal p-5 text-paper sm:p-8">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-reel-amber text-reel-charcoal">
            <X className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-4 font-display text-h3 font-semibold leading-tight tracking-[-0.02em]">
            {d.failed.k}
          </p>
          <p className="mt-2 text-small leading-relaxed text-paper/85 sm:text-body">{d.failed.v}</p>
        </div>
      </div>

      <Reveal y={12} blur={false} className="mt-8">
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
      className="scroll-mt-20 bg-reel-charcoal px-5 py-14 text-paper sm:px-8 sm:py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-page">
        <Reveal y={20} blur={false}>
          <p className={cn("font-mono text-label uppercase tracking-[0.18em]", AMB)}>
            07 · {d.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-h1 font-semibold tracking-[-0.045em]">
            <span className="block">{d.title[0]}</span>
            <span className={cn("block", AMB)}>{d.title[1]}</span>
          </h2>
        </Reveal>
        <div className="mt-6 max-w-read space-y-4 text-read text-paper/85">
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
    <Section id="practice" label="What changed in my practice">
      <p className={cn("font-mono text-label uppercase tracking-[0.18em]", LAV)}>{d.eyebrow}</p>
      <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
        {d.items.map((it, i) => (
          <li key={it.k}>
            <p className={cn("font-mono text-label", LAV)}>{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-small leading-relaxed text-ink-soft sm:text-body">{it.v}</p>
          </li>
        ))}
      </ol>

      <Reveal y={16} blur={false} className="mt-12 lg:mt-16">
        <p className="max-w-[26ch] font-display text-h2 font-semibold tracking-[-0.035em] text-balance">
          {d.closing}
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
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
