import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { projects, profile } from "@/content/portfolio";
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
      <ChapterEyebrow n={10} name={d.eyebrow} labels={[d.label]} onDark />
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

      <div className="mt-14 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <MotionReveal className="rounded-3xl border border-cc-cream/25 p-6 sm:p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-sage">Before</p>
          <p className="mt-3 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight text-cc-cream/80">
            {d.before}
          </p>
        </MotionReveal>
        <div className="flex items-center justify-center" aria-hidden>
          <ArrowRight className="h-6 w-6 rotate-90 text-cc-lilac md:rotate-0" />
        </div>
        <MotionReveal delay={0.15} className="rounded-3xl bg-cc-cream p-6 text-cc-forest sm:p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-lilac-deep">
            After
          </p>
          <p className="mt-3 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight">
            {d.after}
          </p>
        </MotionReveal>
      </div>

      <div className="mt-16 max-w-[44rem]">
        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{d.nextTitle}</h3>
        <p className="mt-1 text-[14px] text-cc-sage">{d.nextNote}</p>
        <ul className="mt-5 space-y-2">
          {d.next.map((q) => (
            <li key={q} className="flex gap-3 text-[1.05rem] text-cc-cream/90">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cc-lilac" />
              {q}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

export function NextProjectCTA() {
  const next = projects.find((p) => p.id === "proj-01");
  return (
    <section
      aria-label="What's next"
      className="bg-cc-cream px-5 py-[clamp(4rem,8vw,7rem)] text-cc-forest sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1320px] gap-4 md:grid-cols-2">
        {next?.link ? (
          <a
            href={next.link}
            className="group flex min-h-40 flex-col justify-between rounded-3xl bg-paper p-7 ring-1 ring-cc-forest/15 transition-colors hover:bg-cc-sage-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cc-lilac-deep sm:p-9"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-forest-soft">
              Next case study
            </span>
            <span className="mt-6 flex items-end justify-between gap-4">
              <span className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                {next.title}
              </span>
              <ArrowUpRight
                className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </a>
        ) : null}
        <a
          href={`${BASE}#connect`}
          className="group flex min-h-40 flex-col justify-between rounded-3xl bg-cc-forest p-7 text-cc-cream transition-colors hover:bg-cc-sage-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cc-lilac-deep sm:p-9"
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-sage">
            Get in touch
          </span>
          <span className="mt-6 flex items-end justify-between gap-4">
            <span className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
              Talk to Ayush about this project
            </span>
            <Mail className="h-6 w-6 shrink-0" aria-hidden />
          </span>
          <span className="mt-3 text-[14px] text-cc-cream/80">{profile.email}</span>
        </a>
      </div>
    </section>
  );
}
