import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/portfolio/motion";
import * as C from "../content";
import {
  AccessibleDisclosure,
  ChapterEyebrow,
  Figure,
  MotionReveal,
  OwnershipCallout,
  OwnershipLabel,
  ReadingColumn,
  SectionShell,
  StoryHeading,
} from "./primitives";
import { hasAsset } from "../assets";

const BASE = import.meta.env.BASE_URL;

/** Hand-drawn idea sketches, keyed by file stem. */
const sketches = Object.fromEntries(
  Object.entries(
    import.meta.glob("../../../assets/conscious/ideas/*.webp", {
      eager: true,
      import: "default",
    }) as Record<string, string>,
  ).map(([path, url]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.webp$/, ""),
    url,
  ]),
);

/* ───────────────────────────── Hero ───────────────────────────── */

export function ProjectMeta() {
  return (
    <dl className="grid gap-x-8 gap-y-6 border-t border-cc-forest/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {C.hero.meta.map((m) => (
        <div key={m.k}>
          <dt className="font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft">
            {m.k}
          </dt>
          <dd className="mt-2 text-small font-medium leading-snug text-cc-forest">{m.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero() {
  const d = C.hero;
  // The three-image composition appears once the website screenshots exist;
  // until then the box photo sits beside the headline.
  const full = hasAsset("heroDesktop");
  const copy = (
    <MotionReveal>
      <div className="flex flex-wrap items-center gap-3">
        <OwnershipLabel label={d.label} />
        <span className="font-mono text-label uppercase tracking-[0.14em] text-cc-forest-soft">
          Academic concept · Service design
        </span>
      </div>
      <h1 className="mt-5">
        <span className="block font-mono text-label uppercase tracking-[0.2em] text-cc-sage-deep">
          {d.title}
        </span>
        <span className="mt-3 block max-w-lead font-display text-h1 font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
          {d.headline}
        </span>
      </h1>
      <p className="mt-5 max-w-read text-read text-cc-forest-soft">{d.intro}</p>
    </MotionReveal>
  );
  return (
    <header
      id="top"
      className="bg-cc-cream px-5 pb-12 pt-24 text-cc-forest sm:px-8 sm:pt-32 lg:px-10 lg:pb-16"
    >
      <div className="mx-auto max-w-page">
        <a
          href={`${BASE}#projects`}
          className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft transition-colors hover:text-cc-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All work
        </a>

        {full ? (
          <>
            <div className="mt-6">{copy}</div>
            {/* Composition: Community Box, desktop website, Buddy Connect on mobile */}
            <MotionReveal delay={0.1} className="mt-10 lg:mt-12">
              <div className="grid grid-cols-6 gap-4 lg:grid-cols-12 lg:gap-6">
                <Figure
                  assetKey="heroBox"
                  eager
                  compact
                  caption={false}
                  className="col-span-3 self-end lg:col-span-3"
                />
                <Figure
                  assetKey="heroDesktop"
                  eager
                  caption={false}
                  className="order-first col-span-6 lg:order-none lg:col-span-7"
                />
                <Figure
                  assetKey="heroMobile"
                  eager
                  compact
                  caption={false}
                  className="col-span-3 mx-auto w-full max-w-[200px] self-end lg:col-span-2 lg:max-w-none"
                />
              </div>
            </MotionReveal>
          </>
        ) : (
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">{copy}</div>
            <MotionReveal delay={0.1} className="hidden sm:block lg:col-span-5">
              <Figure
                assetKey="heroBox"
                eager
                caption={false}
                className="mx-auto max-w-[420px] lg:mr-0"
              />
            </MotionReveal>
          </div>
        )}

        <div className="mt-10 lg:mt-12">
          <ProjectMeta />
        </div>
      </div>
    </header>
  );
}

export function AtAGlance() {
  return (
    <SectionShell
      id="glance"
      label="Project at a glance"
      tone="paper"
      className="!py-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <h2 className="font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft">
        Project at a glance
      </h2>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-cc-forest/15 bg-cc-forest/15 md:grid-cols-3">
        {C.glance.map((g, i) => (
          <MotionReveal key={g.k} delay={i * 0.06} className="bg-paper p-6 sm:p-8">
            <dt className="font-mono text-label uppercase tracking-[0.16em] text-cc-sage-deep">
              {g.k}
            </dt>
            <dd className="mt-3 font-display font-semibold tracking-[-0.02em] text-h4 leading-[1.3] text-cc-forest">
              {g.v}
            </dd>
          </MotionReveal>
        ))}
      </dl>
    </SectionShell>
  );
}

/* ─────────────────────── My contribution ─────────────────────── */

/** What I did inside the team project; continues the at-a-glance block. */
export function MyContribution() {
  const d = C.contribution;
  return (
    <SectionShell
      id="contribution"
      label="My contribution"
      tone="paper"
      className="!pb-[clamp(3.5rem,6vw,5.5rem)] !pt-0"
    >
      <div className="grid gap-8 border-t border-cc-forest/15 pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12 lg:gap-12">
        <MotionReveal className="lg:col-span-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft">
              My contribution
            </h2>
            <OwnershipLabel label="MY ROLE" />
          </div>
          <StoryHeading as="h3" size="md" className="mt-4">
            {d.title}
          </StoryHeading>
          <p className="mt-4 text-read text-cc-forest-soft">{d.intro}</p>
        </MotionReveal>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-cc-forest/15 bg-cc-forest/15 sm:grid-cols-2 lg:col-span-8">
          {d.items.map((it, i) => (
            <MotionReveal key={it.k} as="li" delay={i * 0.06} className="bg-paper p-6 sm:p-7">
              <p className="font-mono text-label text-cc-coral-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-h4 font-semibold leading-tight tracking-[-0.02em] text-cc-forest">
                {it.k}
              </p>
              <p className="mt-2 text-small leading-relaxed text-cc-forest-soft">{it.v}</p>
            </MotionReveal>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}

/* ─────────────────────── Context + research ─────────────────────── */

const RESEARCH_SLOTS = [
  "researchGuide",
  "researchThemes",
  "researchPersonas",
  "researchSupporting",
] as const;

export function ResearchTensions() {
  const d = C.research;
  return (
    <SectionShell id="research" label="Context and research">
      <ChapterEyebrow n={1} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading>{d.title}</StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-7 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <Figure assetKey="context" className="mt-10" />

      <h3 className="mt-10 font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft">
        {d.tensionsTitle}
      </h3>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {d.tensions.map((t, i) => (
          <MotionReveal as="li" key={t.want} delay={i * 0.08} className="rounded-2xl bg-paper p-5">
            <p className="font-mono text-label text-cc-sage-deep">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em] text-cc-forest">
              {t.want}
            </p>
            <p className="mt-2 text-body leading-relaxed text-cc-forest-soft">{t.but}</p>
          </MotionReveal>
        ))}
      </ol>

      <OwnershipCallout label="MY ROLE" className="mt-10">
        {d.myRole}
      </OwnershipCallout>

      <div className="mt-10">
        <h3 className="font-display text-h4 font-semibold tracking-[-0.02em]">
          {d.readinessTitle}
        </h3>
        <ol className="mt-3 flex flex-wrap gap-2" aria-label="Readiness questions, in order">
          {d.readiness.map((q, i) => (
            <MotionReveal
              as="li"
              key={q}
              delay={i * 0.05}
              className="flex items-center gap-2 rounded-full border border-cc-forest/20 bg-paper px-3.5 py-1.5 text-small"
            >
              <span className="font-mono text-label text-cc-sage-deep">{i + 1}</span>
              {q}
            </MotionReveal>
          ))}
        </ol>
      </div>

      {RESEARCH_SLOTS.some(hasAsset) ? (
        <div className="mt-10">
          <AccessibleDisclosure summary={d.disclosure} note={d.disclosureNote}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Figure assetKey="researchGuide" compact />
              <Figure assetKey="researchThemes" compact />
              <Figure assetKey="researchPersonas" compact />
              <Figure assetKey="researchSupporting" compact />
            </div>
          </AccessibleDisclosure>
        </div>
      ) : null}
    </SectionShell>
  );
}

/* ─────────────────────── Privacy turning point ─────────────────────── */

function Chain({
  title,
  steps,
  variant,
}: {
  title: string;
  steps: string[];
  variant: "initial" | "reframed";
}) {
  const reduce = useReducedMotion();
  const reframed = variant === "reframed";
  // Initial chain appears, then recedes; the reframed chain builds step by step after it.
  const list = reframed
    ? { hidden: {}, shown: { transition: { delayChildren: 0.9, staggerChildren: 0.28 } } }
    : {
        hidden: {},
        shown: {
          opacity: [1, 1, 0.55],
          transition: { staggerChildren: 0.16, duration: 2.2, times: [0, 0.6, 1] },
        },
      };
  const item = {
    hidden: { opacity: 0, y: 14 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
  return (
    <div
      className={cn(
        "rounded-3xl p-6 sm:p-8",
        reframed ? "bg-cc-cream text-cc-forest" : "border border-cc-cream/25 text-cc-cream",
      )}
    >
      <h3
        className={cn(
          "font-mono text-label uppercase tracking-[0.16em]",
          reframed ? "text-cc-lilac-deep" : "text-cc-sage",
        )}
      >
        {title}
      </h3>
      <motion.ol
        className="mt-5 space-y-2"
        initial={reduce ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
        variants={reduce ? undefined : list}
        style={!reframed && reduce ? { opacity: 0.55 } : undefined}
      >
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <motion.li key={s} variants={item} className="flex flex-col items-start">
              <span
                className={cn(
                  "font-display font-semibold tracking-[-0.02em] text-h3 leading-tight",
                  !reframed && last && "line-through decoration-cc-coral decoration-2",
                )}
              >
                {s}
                {!reframed && last ? <span className="sr-only"> (rejected default)</span> : null}
              </span>
              {!last ? (
                <ArrowDown
                  aria-hidden
                  className={cn(
                    "my-1 h-5 w-5",
                    reframed ? "text-cc-sage-deep" : "text-cc-cream/50",
                  )}
                />
              ) : null}
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}

export function PrivacyTurningPoint() {
  const d = C.turningPoint;
  return (
    <SectionShell id="turning-point" label="The privacy turning point" tone="forest" pause>
      <ChapterEyebrow n={2} name={d.eyebrow} labels={[d.label]} onDark />
      <MotionReveal className="mt-6">
        <StoryHeading>{d.title}</StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-6 text-cc-cream/85">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <Figure assetKey="earlyConcepts" className="mt-12 max-w-[980px]" onDark />

      <MotionReveal className="mt-12">
        <p className="max-w-[24ch] font-display text-h2 font-semibold leading-[1.06] tracking-[-0.035em] text-balance text-cc-cream">
          {d.question}
        </p>
      </MotionReveal>

      <OwnershipCallout label="MY ROLE" onDark className="mt-8">
        {d.myRole}
      </OwnershipCallout>

      <div className="mt-10 grid gap-4 md:grid-cols-2" aria-label="How the logic changed">
        <Chain title={d.initial.title} steps={d.initial.steps} variant="initial" />
        <Chain title={d.reframed.title} steps={d.reframed.steps} variant="reframed" />
      </div>
      <p className="sr-only">
        The initial logic went from safety to discretion to invisibility. The reframed logic goes
        from safety to control, confidence and participation.
      </p>

      <OwnershipCallout label="DECISION" onDark className="mt-10">
        {d.decision}
      </OwnershipCallout>
    </SectionShell>
  );
}

/* ─────────────────────── Principles + ideation ─────────────────────── */

export function DesignPrinciples() {
  const d = C.principles;
  return (
    <div>
      <h3 className="font-mono text-label uppercase tracking-[0.16em] text-cc-forest-soft">
        {d.title}
      </h3>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {d.items.map((p, i) => (
          <MotionReveal
            as="li"
            key={p.k}
            delay={i * 0.08}
            className="rounded-2xl border border-cc-forest/15 bg-paper p-5"
          >
            <p className="font-mono text-label text-cc-sage-deep">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em]">
              {p.k}
            </h3>
            <p className="mt-2 text-body leading-relaxed text-cc-forest-soft">{p.v}</p>
          </MotionReveal>
        ))}
      </ol>
    </div>
  );
}

export function IdeationRail() {
  const d = C.ideation;
  const track = useRef<HTMLOListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * ((card?.offsetWidth ?? 260) + 16) * 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-cc-forest/25 bg-paper text-cc-forest transition-colors hover:bg-cc-forest hover:text-cc-cream disabled:opacity-35 disabled:hover:bg-paper disabled:hover:text-cc-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold tracking-[-0.02em] text-h3">{d.railTitle}</h3>
          <p className="mt-2 max-w-read text-small leading-relaxed text-cc-forest-soft">
            {d.railNote}
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" className={btn} onClick={() => step(-1)} disabled={!canPrev}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="sr-only">Previous ideas</span>
          </button>
          <button type="button" className={btn} onClick={() => step(1)} disabled={!canNext}>
            <ArrowRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">Next ideas</span>
          </button>
        </div>
      </div>
      <ol
        ref={track}
        tabIndex={0}
        aria-label="The team's 12 ideas. This list scrolls horizontally: swipe, use the arrow keys, or use the previous and next buttons."
        className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cc-lilac-deep md:gap-4"
      >
        {d.ideas.map((idea, i) => (
          <li
            key={idea.name}
            className="flex w-[min(78vw,18rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-cc-forest/15 md:w-[18rem]"
          >
            {/* Hand-drawn sketch from the team's ideation write-up. */}
            <img
              src={sketches[idea.sketch]}
              alt={idea.alt}
              width={709}
              height={451}
              loading="lazy"
              decoding="async"
              className="aspect-[709/451] w-full bg-[#ebf5f2] object-cover"
            />
            <div className="flex flex-1 flex-col p-5">
              <span className="font-mono text-label text-cc-sage-deep">
                Idea {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em] text-cc-forest">
                {idea.name}
              </h4>
              {idea.summary ? (
                <p className="mt-2 text-small leading-relaxed text-cc-forest-soft">
                  {idea.summary}
                </p>
              ) : null}
              {idea.fate ? (
                <p className="mt-auto pt-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-caption font-medium",
                      idea.fate === "Combined into the final service" &&
                        "bg-cc-sage-soft text-cc-sage-deep",
                      idea.fate === "Early privacy concept" &&
                        "bg-cc-lilac-soft text-cc-lilac-deep",
                    )}
                  >
                    {idea.fate}
                  </span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Ideation() {
  const d = C.ideation;
  return (
    <SectionShell id="ideation" label="Design principles and ideation" tone="sage">
      <ChapterEyebrow n={3} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading>{d.title}</StoryHeading>
      </MotionReveal>
      <OwnershipCallout label="MY ROLE" className="mt-6">
        {d.myRole}
      </OwnershipCallout>
      <div className="mt-10">
        <DesignPrinciples />
      </div>
      <div className="mt-10">
        <IdeationRail />
      </div>
      <p className="mt-6 max-w-read text-read text-cc-forest">{d.boxNote}</p>
      <Figure assetKey="ideationBoard" className="mt-10 max-w-[980px]" />
      <OwnershipCallout label="DECISION" className="mt-10">
        {d.decision}
      </OwnershipCallout>
    </SectionShell>
  );
}
