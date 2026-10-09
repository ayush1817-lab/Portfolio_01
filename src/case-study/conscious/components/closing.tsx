import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import * as C from "../content";
import {
  ChapterEyebrow,
  MotionReveal,
  ReadingColumn,
  SectionShell,
  StoryHeading,
} from "./primitives";

const BASE = import.meta.env.BASE_URL;

export function Reflection() {
  const d = C.reflection;
  return (
    <SectionShell id="reflection" label="Reflection" tone="forest" pause>
      <ChapterEyebrow n={8} name={d.eyebrow} labels={[d.label]} onDark />
      <MotionReveal className="mt-6">
        <StoryHeading size="xl" className="max-w-[18ch]">
          {d.title}
        </StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-8 text-cc-cream/90">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <MotionReveal className="rounded-3xl border border-cc-cream/25 p-6 sm:p-8">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-cc-sage">Before</p>
          <p className="mt-3 font-display font-semibold tracking-[-0.02em] text-h3 leading-tight text-cc-cream/80">
            {d.before}
          </p>
        </MotionReveal>
        <div className="flex items-center justify-center" aria-hidden>
          <ArrowRight className="h-6 w-6 rotate-90 text-cc-lilac md:rotate-0" />
        </div>
        <MotionReveal delay={0.15} className="rounded-3xl bg-cc-cream p-6 text-cc-forest sm:p-8">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-cc-lilac-deep">
            After
          </p>
          <p className="mt-3 font-display font-semibold tracking-[-0.02em] text-h3 leading-tight">
            {d.after}
          </p>
        </MotionReveal>
      </div>

      <div className="mt-10 max-w-read">
        <h3 className="font-display font-semibold tracking-[-0.02em] text-h3">{d.nextTitle}</h3>
        <p className="mt-1 text-small text-cc-sage">{d.nextNote}</p>
        <ul className="mt-5 space-y-2">
          {d.next.map((q) => (
            <li key={q} className="flex gap-3 text-read text-cc-cream/90">
              <span
                aria-hidden
                className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-cc-lilac"
              />
              {q}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

/** Closing row, matching the OptiApply and ReelPick case studies. */
export function NextProjectCTA() {
  const next = projects.find((p) => p.id === "proj-01");
  return (
    <section
      aria-label="What's next"
      className="bg-cc-cream px-5 pb-[4.5rem] pt-14 text-cc-forest sm:px-8 sm:pb-24 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto flex max-w-page flex-col gap-3 border-t border-cc-forest/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`${BASE}#connect`}
          className="focus-glow group inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-small font-semibold text-paper transition-colors hover:bg-cc-sage-deep"
        >
          Talk to me about this project
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
        {next?.link ? (
          <a
            href={next.link}
            className="focus-glow group inline-flex min-h-11 items-center gap-3 rounded-full px-2 py-3 text-small text-ink transition-colors hover:text-cc-sage-deep"
          >
            <span className="font-mono text-label uppercase tracking-[0.16em] text-ink-soft">
              Next project
            </span>
            <span className="font-semibold">{next.title}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </div>
    </section>
  );
}
