import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import * as C from "./content";
import { LightboxProvider } from "./components/Lightbox";
import { ProductFigure } from "./components/ProductFigure";
import { hasShot } from "./assets";
import { Contribution, Eyebrow, Intro, Pull, Section } from "./components/Layout";
import { Flow, StatFunnel } from "./components/Diagrams";
import type { ShotId } from "./content";

const BASE = import.meta.env.BASE_URL;
const nextProject = projects.find((p) => p.id === "proj-02");

export function OptiApplyCaseStudy() {
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
            <Contribution {...C.contribution} />
            <Problem />
            <V1 />
            <V2 />
            <HuntMode />
            <Experiment />
            <Outcome />
            <Reflection />
          </article>
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  // Spec composition: Daily Job Digest front, Resume Analysis behind left,
  // Dashboard behind right. Missing sources fall back to other real screens.
  const front: ShotId = hasShot("huntDigest") ? "huntDigest" : "huntProfile";
  const right: ShotId = hasShot("dashboard") ? "dashboard" : "verification";

  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-24 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-fade" />
      <div className="mx-auto max-w-page">
        <a
          href={`${BASE}#projects`}
          className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-label uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-cobalt"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All work
        </a>
        <Reveal y={16} blur={false}>
          <p className="mt-6 font-mono text-label uppercase tracking-[0.18em] text-cobalt">
            {C.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-h1 font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:max-w-none">
            <span className="block">{C.hero.title[0]}</span>
            <span className="block text-cobalt">{C.hero.title[1]}</span>
          </h1>
          <p className="mt-5 max-w-read text-read text-ink-soft">{C.hero.lede}</p>
        </Reveal>

        {/* layered composition on large screens; single full screenshot below that */}
        <Reveal delay={0.1} y={24} blur={false} className="mt-10 lg:mt-12">
          <div className="lg:hidden">
            <ProductFigure
              id={front}
              crop={null}
              eager
              annotate={false}
              bare
              sequence={false}
              instance="hero-front"
            />
          </div>
          <div className="relative hidden lg:block" style={{ height: "clamp(24rem, 34vw, 31rem)" }}>
            <div className="absolute left-0 top-10 w-[40%] opacity-95">
              <ProductFigure
                id="analysis"
                crop={{ x: 0, y: 0, w: 100, h: 42 }}
                annotate={false}
                bare
                sequence={false}
                instance="hero-left"
                eager
              />
            </div>
            <div className="absolute right-0 top-10 w-[40%] opacity-95">
              <ProductFigure
                id={right}
                crop={null}
                annotate={false}
                bare
                sequence={false}
                instance="hero-right"
                eager
              />
            </div>
            <div className="absolute left-1/2 top-0 z-10 w-[52%] -translate-x-1/2">
              <ProductFigure
                id={front}
                crop={front === "huntProfile" ? { x: 25, y: 5, w: 55, h: 56 } : null}
                annotate={false}
                bare
                sequence={false}
                instance="hero-front-lg"
                eager
              />
            </div>
          </div>
        </Reveal>

        <dl className="mt-10 grid gap-5 border-t border-line pt-6 sm:grid-cols-3 lg:mt-12">
          {C.hero.facts.map((f) => (
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

/* ─────────────────────── 01 · The problem ─────────────────────── */

function Problem() {
  const d = C.problem;
  return (
    <Section id="problem" label="The job-search problem">
      <Intro n={1} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Flow nodes={d.loop} label="The repeated job-search loop" className="mt-10" />
      <Reveal y={12} blur={false} className="mt-10">
        <p className="max-w-read text-read text-ink-soft">{d.question.lead}</p>
        <Pull className="mt-4">{d.question.q}</Pull>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── V1 · Analyzer + its friction ───────────────────────── */

function V1() {
  const d = C.v1;
  return (
    <Section id="analyzer" label="V1 Resume Analyzer" tone="tint">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Intro compact n={2} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="analysis" maxWidth={720} />
        </div>
      </div>
      <Reveal y={12} blur={false} className="mt-14">
        <h3 className="max-w-[26ch] font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
          {d.frictionTitle[0]} <span className="text-ink-faint">{d.frictionTitle[1]}</span>
        </h3>
      </Reveal>
      <Flow nodes={d.loop} label="The analyze-and-fix loop" className="mt-8" />
      <Pull className="mt-10">{d.close}</Pull>
    </Section>
  );
}

/* ───────────────────────── V2 · Optimizer: three decisions ───────────────────────── */

function V2() {
  const d = C.v2;
  return (
    <Section id="optimizer" label="V2 Optimizer">
      <Intro n={3} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <ol className="mt-12 space-y-14 lg:space-y-20">
        {d.decisions.map((it, i) => (
          <li key={it.k} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <Reveal
              y={12}
              blur={false}
              className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}
            >
              <p className="font-mono text-label text-cobalt">
                Decision {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
                {it.k}
              </h3>
              <p className="mt-3 max-w-read text-read text-ink-soft">{it.v}</p>
              {"pull" in it && it.pull ? <Pull className="mt-6">{it.pull}</Pull> : null}
            </Reveal>
            <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
              <ProductFigure id={it.shot} maxWidth={640} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────────────── V4 · Hunt Mode ─────────────────────── */

function HuntMode() {
  const d = C.v4;
  return (
    <Section id="hunt" label="Hunt Mode" tone="tint">
      <Intro n={4} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Reveal y={12} blur={false} className="mt-10">
        <p className="font-display text-h3 font-semibold leading-[1.05] tracking-[-0.035em]">
          <span className="block">{d.headline[0]}</span>
          <span className="block text-cobalt">{d.headline[1]}</span>
        </p>
      </Reveal>
      <StatFunnel
        stages={d.funnel}
        label="Hunt Mode funnel: 1,963 fetched, 35 new, 1 matched"
        className="mt-10"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <h3 className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
            {d.factorsTitle}
          </h3>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong sm:grid-cols-2">
            {d.factors.map((f) => (
              <li key={f.k} className="bg-paper p-4">
                <p className="font-mono text-label uppercase tracking-[0.14em] text-cobalt">
                  {f.k}
                </p>
                <p className="mt-1.5 text-small leading-snug text-ink">{f.v}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-small leading-relaxed text-ink-soft">{d.factorsNote}</p>
          <div className="mt-8 rounded-xl border border-warn/40 bg-warn-soft p-5">
            <p className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {d.constraint.title}
            </p>
            <p className="mt-2 text-small leading-relaxed text-ink">{d.constraint.body}</p>
            <p className="mt-3 text-small leading-relaxed text-ink">
              <span className="font-semibold">What I would reconsider: </span>
              {d.constraint.next}
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="huntDigest" crop={null} maxWidth={820} />
          <ProductFigure id="huntProfile" maxWidth={620} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── The automation decision ─────────────────────── */

function Experiment() {
  const d = C.experiment;
  return (
    <Section id="experiment" label="The automation experiment" pause>
      <Reveal y={16} blur={false}>
        <Eyebrow n={5} lens={d.lens}>
          {d.eyebrow}
        </Eyebrow>
        <h2 className="mt-5 max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.035em] text-balance">
          {d.title[0]} <span className="text-ink-faint">{d.title[1]}</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {[d.before, d.after].map((col, ci) => (
          <Reveal key={col.title} y={12} blur={false} delay={ci * 0.08}>
            <div
              className={cn(
                "h-full rounded-xl border p-6",
                ci === 0 ? "border-line-strong bg-paper-2" : "border-cobalt bg-paper",
              )}
            >
              <p
                className={cn(
                  "font-mono text-label uppercase tracking-[0.16em]",
                  ci === 0 ? "text-ink-faint" : "text-cobalt",
                )}
              >
                {col.title}
              </p>
              <ol className="mt-4 space-y-2">
                {col.steps.map((st) => {
                  const human = st.startsWith("User");
                  return (
                    <li
                      key={st}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-4 py-2 text-body",
                        ci === 0
                          ? "bg-paper text-ink-soft"
                          : human
                            ? "bg-cobalt text-paper"
                            : "bg-cobalt-soft text-ink",
                      )}
                    >
                      {st}
                      {ci === 1 && human ? (
                        <span className="font-mono text-micro uppercase tracking-[0.14em] text-paper/80">
                          human
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal y={12} blur={false} className="mt-12">
        <p className="font-display text-h3 font-semibold leading-[1.08] tracking-[-0.03em]">
          {C.principle.line[0]}{" "}
          <span className="font-serif font-normal italic highlight">{C.principle.line[1]}</span>
        </p>
        <p className="mt-3 text-read text-ink-soft">{C.principle.sub}</p>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── Outcome ─────────────────────── */

function Outcome() {
  const d = C.outcome;
  return (
    <Section id="today" label="Current product and outcomes" tone="tint">
      <Intro n={6} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <Flow nodes={d.flow} label="The connected OptiApply workflow" className="mt-10" />
      <p className="mt-4 flex items-center gap-2 text-caption text-ink-soft">
        <span aria-hidden className="h-3 w-3 rounded-sm border border-cobalt bg-cobalt-soft" />
        Steps the candidate owns
      </p>
      <ProductFigure id="dashboard" className="mt-12" crop={null} />
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong sm:grid-cols-3 lg:grid-cols-5">
        {d.facts.map((f) => (
          <div key={f.label} className="flex flex-col bg-paper p-5 sm:p-7">
            <dt className="order-2 mt-2 font-mono text-label uppercase tracking-[0.14em] text-ink-soft">
              {f.label}
            </dt>
            <dd className="order-1 font-display text-stat font-semibold leading-none tracking-[-0.04em] text-ink">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-caption text-ink-faint">{d.factsNote}</p>
      <div className="mt-12">
        <h3 className="font-display text-h3 font-semibold tracking-[-0.03em]">
          {d.insights.title}
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {d.insights.items.map((it) => (
            <li key={it.k} className="rounded-xl border border-line-strong bg-paper p-5">
              <p
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 font-mono text-label uppercase tracking-[0.12em]",
                  it.tone === "positive"
                    ? "bg-cobalt-soft text-cobalt"
                    : "bg-sun-soft text-sun-deep",
                )}
              >
                {it.tone === "positive" ? "What they like" : "What they asked for"}
              </p>
              <p className="mt-3 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                {it.k}
              </p>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">{it.v}</p>
            </li>
          ))}
        </ul>
      </div>
      <Reveal y={12} blur={false} className="mt-12">
        <div className="max-w-read border-l-[3px] border-cobalt pl-6">
          <p className="font-display text-h4 font-semibold tracking-[-0.02em]">{d.unknown.title}</p>
          <div className="mt-3 space-y-3 text-read text-ink-soft">
            {d.unknown.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── Final reflection ─────────────────────── */

function Reflection() {
  const d = C.reflection;
  return (
    <Section id="reflection" label="Next iteration and reflection">
      <Intro n={7} eyebrow={C.next.eyebrow} lens={C.next.lens} title={C.next.title} />
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {C.next.items.map((it, i) => (
          <li key={it.k}>
            <p className="font-mono text-label text-cobalt">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-body leading-relaxed text-ink-soft">{it.v}</p>
          </li>
        ))}
      </ol>
      <Reveal y={16} blur={false} className="mt-16">
        <p className="font-mono text-label uppercase tracking-[0.18em] text-cobalt">{d.eyebrow}</p>
        <blockquote className="mt-6 max-w-[26ch] font-display text-h2 font-semibold leading-[1.08] tracking-[-0.035em] text-balance">
          <p className="text-ink-faint">{d.closing[0]}</p>
          <p className="mt-4 text-ink">{d.closing[1]}</p>
        </blockquote>
      </Reveal>
      <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={C.meta.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-glow group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-small font-semibold text-paper transition-colors hover:bg-cobalt"
        >
          Explore OptiApply
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {nextProject?.link ? (
          <a
            href={nextProject.link}
            target={nextProject.link.startsWith("http") ? "_blank" : undefined}
            rel={nextProject.link.startsWith("http") ? "noreferrer noopener" : undefined}
            className="focus-glow group inline-flex items-center gap-3 rounded-full px-2 py-3 text-small text-ink transition-colors hover:text-cobalt"
          >
            <span className="font-mono text-label uppercase tracking-[0.16em] text-ink-soft">
              Next project
            </span>
            <span className="font-semibold">{nextProject.title}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </div>
    </Section>
  );
}
