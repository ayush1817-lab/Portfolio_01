import { ArrowLeft, ArrowUpRight, Check, TriangleAlert } from "lucide-react";
import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import * as C from "./content";
import { LightboxProvider } from "./components/Lightbox";
import { ProductFigure } from "./components/ProductFigure";
import { hasShot } from "./assets";
import { Eyebrow, Heading, Intro, Prose, Pull, Section } from "./components/Layout";
import { EvolutionTimeline, Flow, PrincipleBand, StatFunnel } from "./components/Diagrams";
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
            <Problem />
            <Analyzer />
            <Friction />
            <Evolution />
            <Optimizer />
            <Truth />
            <PrincipleBand line={C.principle.line} sub={C.principle.sub} />
            <Rewrites />
            <Process />
            <Verification />
            <Journey />
            <Hunt />
            <Explainable />
            <HuntProfile />
            <Constraint />
            <Experiment />
            <Connected />
            <Today />
            <Next />
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
    <header className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-fade" />
      <div className="mx-auto max-w-[1280px]">
        <a
          href={`${BASE}#projects`}
          className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-cobalt"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All work
        </a>
        <Reveal y={16} blur={false}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">
            {C.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:max-w-none">
            <span className="block">{C.hero.title[0]}</span>
            <span className="block text-cobalt">{C.hero.title[1]}</span>
          </h1>
          <p className="mt-7 max-w-[44rem] text-[1.15rem] leading-[1.65] text-ink-soft sm:text-[1.25rem]">
            {C.hero.lede}
          </p>
        </Reveal>

        {/* layered composition on large screens; single full screenshot below that */}
        <Reveal delay={0.1} y={24} blur={false} className="mt-14 lg:mt-20">
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
          <div className="relative hidden lg:block" style={{ height: "clamp(30rem, 44vw, 38rem)" }}>
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

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3 lg:mt-16">
          {C.hero.facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {f.k}
              </dt>
              <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/* ─────────────────────── Starting point ─────────────────────── */

function Problem() {
  const d = C.problem;
  return (
    <Section id="problem" label="The job-search problem">
      <Intro n={1} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Flow nodes={d.loop} label="The repeated job-search loop" className="mt-14" />
      <Reveal y={12} blur={false} className="mt-16">
        <p className="max-w-[46rem] text-[1.15rem] leading-relaxed text-ink-soft">
          {d.question.lead}
        </p>
        <Pull className="mt-5">{d.question.q}</Pull>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── V1 Analyzer ───────────────────────── */

function Analyzer() {
  const d = C.analyzer;
  return (
    <Section id="analyzer" label="V1 Resume Analyzer" tone="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Intro compact n={2} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            <Flow nodes={d.flow} label="Analyzer inputs and output" vertical className="mt-10" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <ProductFigure id="jdInput" maxWidth={900} />
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <Reveal y={12} blur={false}>
          <Heading as="h3">{d.baselineTitle}</Heading>
          <Prose className="mt-4 text-ink-soft">
            <p>{d.baselineBody}</p>
          </Prose>
        </Reveal>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-10">
          <ProductFigure id="resumeInput" />
          <ProductFigure id="baseline" />
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <Reveal y={12} blur={false}>
          <Heading as="h3">{d.diagnosticTitle}</Heading>
          <Prose className="mt-4 text-ink-soft">
            <p>{d.diagnosticBody}</p>
          </Prose>
        </Reveal>
        <ProductFigure id="analysis" className="mt-10" maxWidth={1040} />
      </div>
    </Section>
  );
}

/* ───────────────────────── First friction ───────────────────────── */

function Friction() {
  const d = C.friction;
  return (
    <Section id="friction" label="Analyzer friction" pause>
      <Reveal y={16} blur={false}>
        <Eyebrow n={3} lens={d.lens}>
          {d.eyebrow}
        </Eyebrow>
        <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
          {d.title[0]} <span className="text-ink-faint">{d.title[1]}</span>
        </h2>
      </Reveal>
      <Flow nodes={d.loop} label="The analyze-and-fix loop" className="mt-14" />
      <Reveal y={12} blur={false} className="mt-14">
        <p className="max-w-[46rem] text-[1.15rem] leading-relaxed text-ink-soft">{d.close[0]}</p>
        <Pull className="mt-5">{d.close[1]}</Pull>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── Product evolution ─────────────────────── */

function Evolution() {
  const d = C.evolution;
  return (
    <Section id="evolution" label="Product evolution" tone="tint">
      <Intro n={4} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <div className="mt-14 lg:mt-20">
        <EvolutionTimeline stages={d.stages} />
      </div>
      <p className="mt-14 max-w-[46rem] text-[15px] leading-relaxed text-ink-soft">{d.note}</p>
    </Section>
  );
}

/* ───────────────────────── V2 Optimizer ───────────────────────── */

function Optimizer() {
  const o = C.optimizer;
  const d = C.roleUnderstanding;
  return (
    <Section id="optimizer" label="V2 Optimizer and job requirement extraction">
      <Intro n={5} eyebrow={o.eyebrow} lens={o.lens} title={o.title} body={o.body} />
      <div id="role" className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Intro compact n={6} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="roleUnderstanding" maxWidth={820} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── AI truth checkpoint ─────────────────────── */

function Truth() {
  const d = C.truth;
  return (
    <Section id="truth" label="Factual-metrics checkpoint" tone="tint" pause>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Intro compact n={7} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            <Pull className="mt-10">{d.pull}</Pull>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="metrics" maxWidth={820} />
        </div>
      </div>

      <div className="mt-20">
        <Reveal y={12} blur={false}>
          <Heading as="h3">{d.flowTitle}</Heading>
        </Reveal>
        <Flow nodes={d.flow} label="How the metrics checkpoint works" className="mt-10" />
        <p className="mt-8 max-w-[46rem] text-[15px] leading-relaxed text-ink-soft">{d.skipNote}</p>
      </div>
    </Section>
  );
}

/* ─────────────────────── Suggested rewrites ─────────────────────── */

function Rewrites() {
  const d = C.rewrites;
  return (
    <Section id="rewrites" label="Suggested rewrites">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:order-2 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Intro compact n={8} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-4 py-2 text-[14px] font-medium text-cobalt">
              <Check className="h-4 w-4" aria-hidden />
              {d.principle}
            </p>
          </div>
        </div>
        <div className="lg:order-1 lg:col-span-7">
          <ProductFigure id="rewrites" maxWidth={820} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Process visibility ─────────────────────── */

function Process() {
  const d = C.process;
  return (
    <Section id="process" label="Optimization process visibility" tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Intro
            compact
            n={9}
            eyebrow={d.eyebrow}
            lens={d.lens}
            title={d.title}
            body={d.body}
            dark
          />
          <ol className="mt-10 space-y-3">
            {d.steps.map((st, i) => (
              <li key={st} className="flex items-baseline gap-4 border-b border-paper/15 pb-3">
                <span className="font-mono text-[12px] text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.05rem] text-paper/90">{st}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <ProductFigure id="process" tone="dark" maxWidth={620} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Final verification ─────────────────────── */

function Verification() {
  const d = C.verification;
  return (
    <Section id="verification" label="Final candidate verification">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Intro compact n={10} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            <Reveal y={12} blur={false}>
              <p className="mt-10 flex gap-3 rounded-xl border border-warn/40 bg-warn-soft p-5 font-display text-[1.35rem] font-medium leading-snug text-ink">
                <TriangleAlert className="mt-1 h-5 w-5 shrink-0 text-warn" aria-hidden />
                {d.warning}
              </p>
              <ol
                className="mt-6 flex flex-wrap items-center gap-2 text-[14px]"
                aria-label="Before export"
              >
                {d.chain.map((c, i) => (
                  <li key={c} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1.5",
                        i === d.chain.length - 1
                          ? "bg-ink text-paper"
                          : "border border-cobalt bg-cobalt-soft text-ink",
                      )}
                    >
                      {c}
                    </span>
                    {i < d.chain.length - 1 ? (
                      <span aria-hidden className="text-ink/40">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="verification" maxWidth={820} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Zoom out ─────────────────────── */

function Journey() {
  const d = C.journey;
  return (
    <Section id="journey" label="The broader job-search journey" tone="tint">
      <Intro n={11} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Flow
        nodes={d.steps.map((s) => ({ k: s.k, v: s.v, human: s.covered }))}
        label="Which parts of the journey OptiApply covered"
        className="mt-14"
      />
      <p className="mt-5 flex items-center gap-2 text-[13px] text-ink-soft">
        <span aria-hidden className="h-3 w-3 rounded-sm border border-cobalt bg-cobalt-soft" />
        Covered by OptiApply at this point
      </p>
    </Section>
  );
}

/* ─────────────────────── Hunt Mode ─────────────────────── */

function Hunt() {
  const d = C.hunt;
  return (
    <Section id="hunt" label="Hunt Mode" pause>
      <Intro n={12} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Reveal y={12} blur={false} className="mt-16">
        <p className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          <span className="block">{d.headline[0]}</span>
          <span className="block text-cobalt">{d.headline[1]}</span>
        </p>
      </Reveal>
      <StatFunnel
        stages={d.funnel}
        label="Hunt Mode funnel: 1,963 fetched, 35 new, 1 matched"
        className="mt-14"
      />
      <ProductFigure id="huntDigest" className="mt-20" crop={null} />
    </Section>
  );
}

function Explainable() {
  const d = C.explainable;
  return (
    <Section id="matching" label="Explainable job matching" tone="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Intro compact n={13} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
          <p className="mt-8 max-w-[34rem] text-[15px] leading-relaxed text-ink-soft">
            <span className="mr-2 rounded-md bg-ink px-2 py-0.5 font-mono text-[13px] text-paper">
              {d.actions.score}
            </span>
            {d.actions.note}
          </p>
        </div>
        <ul className="grid gap-px self-start overflow-hidden rounded-xl border border-line-strong bg-line-strong sm:grid-cols-2 lg:col-span-7">
          {d.factors.map((f) => (
            <li key={f.k} className="bg-paper p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">{f.k}</p>
              <p className="mt-2 text-[1.05rem] leading-snug text-ink">{f.v}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Second instance of the digest; add a crop once the source file is in place. */}
      <ProductFigure
        id="huntDigest"
        sequence={false}
        instance="huntDigest-reasoning"
        className="mt-16"
        crop={null}
      />
    </Section>
  );
}

function HuntProfile() {
  const d = C.huntProfile;
  return (
    <Section id="hunt-profile" label="Hunt Mode profile and company selection">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Intro compact n={14} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProductFigure id="huntProfile" maxWidth={820} />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Constraint ─────────────────────── */

function Constraint() {
  const d = C.constraint;
  return (
    <Section id="constraint" label="The 20-company constraint" tone="tint">
      <Intro n={15} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <StatFunnel
        stages={d.stages}
        label="Company sources: 1,000+ discovered, about 200 curated, 20 per user"
        className="mt-14"
      />
      <ul className="mt-16 grid gap-6 md:grid-cols-3">
        {d.reasons.map((r) => (
          <li key={r.k} className="border-t-2 border-ink pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">{r.k}</p>
            <p className="mt-2 text-[1.05rem] leading-snug text-ink-soft">{r.v}</p>
          </li>
        ))}
      </ul>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal y={12} blur={false}>
          <div className="h-full rounded-xl border border-warn/40 bg-warn-soft p-7">
            <p className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {d.cost.title}
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">{d.cost.body}</p>
          </div>
        </Reveal>
        <Reveal y={12} blur={false} delay={0.08}>
          <div className="h-full rounded-xl border border-line-strong bg-paper p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">
              {d.reconsider.title}
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">{d.reconsider.body}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ─────────────────────── Automation experiment ─────────────────────── */

function Experiment() {
  const d = C.experiment;
  const shown = C.evidence.filter((e) => hasShot(e.shot));
  return (
    <Section id="experiment" label="The automation experiment" pause>
      <Reveal y={16} blur={false}>
        <Eyebrow n={16} lens={d.lens}>
          {d.eyebrow}
        </Eyebrow>
        <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
          {d.title[0]} <span className="text-ink-faint">{d.title[1]}</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {[d.before, d.after].map((col, ci) => (
          <Reveal key={col.title} y={12} blur={false} delay={ci * 0.08}>
            <div
              className={cn(
                "h-full rounded-xl border p-7",
                ci === 0 ? "border-line-strong bg-paper-2" : "border-cobalt bg-paper",
              )}
            >
              <p
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.16em]",
                  ci === 0 ? "text-ink-faint" : "text-cobalt",
                )}
              >
                {col.title}
              </p>
              <ol className="mt-5 space-y-2.5">
                {col.steps.map((st) => {
                  const human = st.startsWith("User");
                  return (
                    <li
                      key={st}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-[1.05rem]",
                        ci === 0
                          ? "bg-paper text-ink-soft"
                          : human
                            ? "bg-cobalt text-paper"
                            : "bg-cobalt-soft text-ink",
                      )}
                    >
                      {st}
                      {ci === 1 && human ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/80">
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

      <Reveal y={12} blur={false} className="mt-16">
        <p className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {C.principle.line[0]}{" "}
          <span className="font-serif font-normal italic highlight">{C.principle.line[1]}</span>
        </p>
        <p className="mt-3 text-[1.05rem] text-ink-soft">{C.principle.sub}</p>
      </Reveal>

      {shown.length ? (
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            {d.evidenceTitle}
          </p>
          <ul
            className={cn(
              "mt-5 grid gap-6",
              shown.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3",
            )}
          >
            {shown.map((e) => (
              <li key={e.label}>
                <p className="mb-3 flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                    {e.label}
                  </span>
                  <span className="text-[13px] text-cobalt">{e.note}</span>
                </p>
                <ProductFigure
                  id={e.shot}
                  crop={e.crop ?? null}
                  annotate={false}
                  bare
                  sequence={false}
                  instance={`evidence-${e.shot}`}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}

/* ─────────────────────── Connected product ─────────────────────── */

function Connected() {
  const d = C.connected;
  return (
    <Section id="connected" label="Connected workflow and dashboard" tone="tint">
      <Intro n={17} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
      <Flow nodes={d.flow} label="The connected OptiApply workflow" className="mt-14" />
      <p className="mt-5 flex items-center gap-2 text-[13px] text-ink-soft">
        <span aria-hidden className="h-3 w-3 rounded-sm border border-cobalt bg-cobalt-soft" />
        Steps the candidate owns
      </p>
      <ProductFigure id="dashboard" className="mt-16" crop={null} />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {d.panels.map((p) => (
          <li key={p.k} className="border-t-2 border-ink pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">{p.k}</p>
            <p className="mt-2 text-[1.05rem] leading-snug text-ink-soft">{p.v}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────────────── Today ─────────────────────── */

function Today() {
  const d = C.today;
  return (
    <Section id="today" label="Current product and outcomes">
      <Intro n={18} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong lg:grid-cols-4">
        {d.facts.map((f) => (
          <div key={f.label} className="flex flex-col bg-paper p-6 sm:p-8">
            <dt className="order-2 mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              {f.label}
            </dt>
            <dd className="order-1 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] text-ink-faint">{d.factsNote}</p>

      <Reveal y={12} blur={false} className="mt-16">
        <div className="max-w-[46rem] border-l-[3px] border-cobalt pl-6">
          <p className="font-display text-[1.6rem] font-semibold tracking-[-0.02em]">
            {d.unknown.title}
          </p>
          <div className="mt-4 space-y-4 text-[1.1rem] leading-[1.68] text-ink-soft">
            {d.unknown.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────── Next iteration ─────────────────────── */

function Next() {
  const d = C.next;
  return (
    <Section id="next" label="Next iteration" tone="tint">
      <Intro n={19} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {d.items.map((it, i) => (
          <li key={it.k}>
            <p className="font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-soft">{it.v}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────────────── Final reflection ─────────────────────── */

function Reflection() {
  const d = C.reflection;
  return (
    <Section id="reflection" label="Final reflection" pause>
      <Reveal y={16} blur={false}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">{d.eyebrow}</p>
        <blockquote className="mt-8 max-w-[24ch] font-display text-[clamp(2rem,4.8vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-balance">
          <p className="text-ink-faint">{d.closing[0]}</p>
          <p className="mt-4 text-ink">{d.closing[1]}</p>
        </blockquote>
      </Reveal>
      <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={C.meta.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-glow group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-cobalt"
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
            className="focus-glow group inline-flex items-center gap-3 rounded-full px-2 py-3 text-[15px] text-ink transition-colors hover:text-cobalt"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
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
