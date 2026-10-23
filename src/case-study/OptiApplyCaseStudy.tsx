import { useEffect, useRef, useState } from "react";
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
import {
  ChapterBar,
  Eyebrow,
  Heading,
  Intro,
  Prose,
  Pull,
  Section,
  StickySplit,
  Summary,
} from "./components/Layout";
import { Flow, StatFunnel } from "./components/Diagrams";
import type { ShotId } from "./content";

const BASE = import.meta.env.BASE_URL;
const nextProject = projects.find((p) => p.id === "proj-02");

export function OptiApplyCaseStudy() {
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
        <ChapterBar name="OptiApply" chapters={C.chapters} />
        <main id="case-study">
          <article>
            <Hero />
            <Summary {...C.summary} />
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
  // One product screen beside the title: the Daily Job Digest, or the Hunt
  // Mode profile if the digest has not been added yet.
  const front: ShotId = hasShot("huntDigest") ? "huntDigest" : "huntProfile";

  return (
    <header className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pb-14 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-fade" />
      <div className="mx-auto max-w-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal y={16} blur={false} className="lg:col-span-6">
            <a
              href={`${BASE}#projects`}
              className="focus-glow -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-label uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-cobalt"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All work
            </a>
            <p className="mt-4 font-mono text-label uppercase tracking-[0.18em] text-cobalt">
              {C.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-h1 font-semibold tracking-[-0.035em] text-balance">
              <span className="block">{C.hero.title[0]}</span>
              <span className="block text-cobalt">{C.hero.title[1]}</span>
            </h1>
            <p className="mt-4 max-w-read text-read text-ink-soft">{C.hero.lede}</p>
          </Reveal>
          <Reveal delay={0.1} y={24} blur={false} className="lg:col-span-6">
            <ProductFigure
              id={front}
              crop={front === "huntProfile" ? { x: 25, y: 5, w: 55, h: 56 } : null}
              eager
              annotate={false}
              bare
              sequence={false}
              instance="hero"
              maxWidth={760}
            />
          </Reveal>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-3 lg:mt-12">
          {C.hero.facts.map((f) => (
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

/* ─────────────────────── 01 · The problem ─────────────────────── */

function Problem() {
  const d = C.problem;
  return (
    <Section id="problem" label="The job-search problem">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Intro n={1} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
        </div>
        <Reveal y={12} blur={false} className="lg:col-span-6 lg:pt-12">
          <Flow nodes={d.loop} label="The repeated job-search loop" />
          <p className="mt-8 text-read text-ink-soft">{d.question.lead}</p>
          <Pull className="mt-3">{d.question.q}</Pull>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────────────────────── V1 · Analyzer + its friction ───────────────────────── */

function V1() {
  const d = C.v1;
  return (
    <Section id="analyzer" label="V1 Resume Analyzer" tone="tint">
      <StickySplit
        aside={
          <>
            <Intro n={2} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            <h3 className="mt-8 border-t border-line pt-6 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
              {d.frictionTitle[0]} <span className="text-ink-faint">{d.frictionTitle[1]}</span>
            </h3>
          </>
        }
      >
        <ProductFigure id="analysis" maxWidth={640} />
        <Flow nodes={d.loop} label="The analyze-and-fix loop" grid className="mt-10" />
        <Pull className="mt-8">{d.close}</Pull>
      </StickySplit>
    </Section>
  );
}

/* ───────────────────────── V2 · Optimizer: three decisions ───────────────────────── */

function V2() {
  const d = C.v2;
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // Highlight the decision whose screen is in the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section id="optimizer" label="V2 Optimizer">
      <StickySplit
        aside={
          <>
            <Intro n={3} eyebrow={d.eyebrow} lens={d.lens} title={d.title} body={d.body} />
            {/* wide screens: an index of the decisions, following the screens on the right */}
            <ol className="mt-8 hidden border-b border-line lg:block">
              {d.decisions.map((it, i) => (
                <li key={it.k}>
                  <a
                    href={`#decision-${i + 1}`}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "focus-glow block border-l-[3px] border-t border-t-line py-4 pl-4 pr-3 transition-colors",
                      i === active
                        ? "border-l-cobalt bg-cobalt-soft/60"
                        : "border-l-transparent hover:bg-paper-2",
                    )}
                  >
                    <span className="font-mono text-label uppercase tracking-[0.16em] text-cobalt">
                      Decision {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                      {it.k}
                    </span>
                    {i === active ? (
                      <span className="mt-2 block text-small leading-relaxed text-ink-soft">
                        {it.v}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ol>
          </>
        }
      >
        <ol className="space-y-12 lg:space-y-14">
          {d.decisions.map((it, i) => (
            <li
              key={it.k}
              id={`decision-${i + 1}`}
              data-i={i}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="scroll-mt-40"
            >
              {/* phones read the decision here; wide screens read it in the index */}
              <div className="mb-5 lg:sr-only">
                <p className="font-mono text-label text-cobalt">
                  Decision {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
                  {it.k}
                </h3>
                <p className="mt-2 max-w-read text-read text-ink-soft">{it.v}</p>
              </div>
              <ProductFigure id={it.shot} maxWidth={600} />
              {"pull" in it && it.pull ? <Pull className="mt-6">{it.pull}</Pull> : null}
            </li>
          ))}
        </ol>
      </StickySplit>
    </Section>
  );
}

/* ─────────────────────── V4 · Hunt Mode ─────────────────────── */

function HuntMode() {
  const d = C.v4;
  return (
    <Section id="hunt" label="Hunt Mode" tone="tint">
      <Reveal y={16} blur={false} className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="lg:col-span-7">
          <Eyebrow n={4} lens={d.lens}>
            {d.eyebrow}
          </Eyebrow>
          <Heading>{d.title}</Heading>
        </div>
        <Prose className="text-ink-soft lg:col-span-5">
          {d.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      </Reveal>

      <div className="mt-10 border-y border-line py-6">
        <p className="font-display text-h3 font-semibold tracking-[-0.03em]">
          {d.headline[0]} <span className="text-cobalt">{d.headline[1]}</span>
        </p>
        <StatFunnel
          stages={d.funnel}
          label="Hunt Mode funnel: 1,963 fetched, 35 new, 1 matched"
          className="mt-6"
        />
      </div>

      <StickySplit
        className="mt-10"
        aside={
          <>
            <h3 className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {d.factorsTitle}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong">
              {d.factors.map((f) => (
                <li key={f.k} className="bg-paper p-3.5 sm:p-4">
                  <p className="font-mono text-label uppercase tracking-[0.14em] text-cobalt">
                    {f.k}
                  </p>
                  <p className="mt-1.5 text-small leading-snug text-ink">{f.v}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-small leading-relaxed text-ink-soft">{d.factorsNote}</p>
            <div className="mt-6 rounded-xl border border-warn/40 bg-warn-soft p-4 sm:p-5">
              <p className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
                {d.constraint.title}
              </p>
              <p className="mt-2 text-small leading-relaxed text-ink">{d.constraint.body}</p>
              <p className="mt-3 text-small leading-relaxed text-ink">
                <span className="font-semibold">What I would reconsider: </span>
                {d.constraint.next}
              </p>
            </div>
          </>
        }
      >
        <ProductFigure id="huntDigest" crop={null} maxWidth={820} />
        <ProductFigure id="huntProfile" maxWidth={620} className="mt-10" />
      </StickySplit>
    </Section>
  );
}

/* ─────────────────────── The automation decision ─────────────────────── */

function Experiment() {
  const d = C.experiment;
  return (
    <Section id="experiment" label="The automation experiment">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        <Reveal y={16} blur={false} className="lg:col-span-5">
          <Eyebrow n={5} lens={d.lens}>
            {d.eyebrow}
          </Eyebrow>
          <h2 className="mt-4 font-display text-h2 font-semibold tracking-[-0.035em] text-balance">
            {d.title[0]} <span className="text-ink-faint">{d.title[1]}</span>
          </h2>
          <p className="mt-8 border-t border-line pt-6 font-display text-h3 font-semibold tracking-[-0.03em]">
            {C.principle.line[0]}{" "}
            <span className="font-serif font-normal italic highlight">{C.principle.line[1]}</span>
          </p>
          <p className="mt-2 text-read text-ink-soft">{C.principle.sub}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7">
          {[d.before, d.after].map((col, ci) => (
            <Reveal key={col.title} y={12} blur={false} delay={ci * 0.08}>
              <div
                className={cn(
                  "h-full rounded-xl border p-3.5 sm:p-6",
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
                <ol className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                  {col.steps.map((st) => {
                    const human = st.startsWith("User");
                    return (
                      <li
                        key={st}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-small sm:px-4 sm:text-body",
                          ci === 0
                            ? "bg-paper text-ink-soft"
                            : human
                              ? "bg-cobalt text-paper"
                              : "bg-cobalt-soft text-ink",
                        )}
                      >
                        {st}
                        {ci === 1 && human ? (
                          <span className="hidden font-mono text-micro uppercase tracking-[0.14em] text-paper/80 sm:inline">
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
      </div>
    </Section>
  );
}

/* ─────────────────────── Outcome ─────────────────────── */

function Outcome() {
  const d = C.outcome;
  return (
    <Section id="today" label="Current product and outcomes" tone="tint">
      <Intro n={6} eyebrow={d.eyebrow} lens={d.lens} title={d.title} />
      <Flow nodes={d.flow} label="The connected OptiApply workflow" className="mt-8" />
      <p className="mt-4 flex items-center gap-2 text-caption text-ink-soft">
        <span aria-hidden className="h-3 w-3 rounded-sm border border-cobalt bg-cobalt-soft" />
        Steps the candidate owns
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <ProductFigure id="dashboard" crop={null} />
        </div>
        <div className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong">
            {d.facts.map((f, i) => (
              <div
                key={f.label}
                className={cn("flex flex-col bg-paper p-4 sm:p-5", i === 0 && "col-span-2")}
              >
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
        </div>
      </div>
      <div className="mt-10">
        <h3 className="font-display text-h3 font-semibold tracking-[-0.03em]">
          {d.insights.title}
        </h3>
        <ul className="mt-5 grid gap-3 md:grid-cols-3 md:gap-4">
          {d.insights.items.map((it) => (
            <li key={it.k} className="rounded-xl border border-line-strong bg-paper p-4 sm:p-5">
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
      <Reveal y={12} blur={false} className="mt-10">
        <div className="max-w-read border-l-[3px] border-cobalt pl-5 sm:pl-6">
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
      <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
        {C.next.items.map((it, i) => (
          <li key={it.k}>
            <p className="font-mono text-label text-cobalt">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {it.k}
            </p>
            <p className="mt-2 text-small leading-relaxed text-ink-soft sm:text-body">{it.v}</p>
          </li>
        ))}
      </ol>
      <Reveal y={16} blur={false} className="mt-12">
        <p className="font-mono text-label uppercase tracking-[0.18em] text-cobalt">{d.eyebrow}</p>
        <blockquote className="mt-4 max-w-[30ch] font-display text-h2 font-semibold tracking-[-0.035em] text-balance">
          <p className="text-ink-faint">{d.closing[0]}</p>
          <p className="mt-3 text-ink">{d.closing[1]}</p>
        </blockquote>
      </Reveal>
      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
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
