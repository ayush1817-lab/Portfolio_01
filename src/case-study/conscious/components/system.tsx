import { useId, useState } from "react";
import { ArrowRight, Check, Globe, Package, X } from "lucide-react";
import { cn } from "@/lib/utils";
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

/* ─────────────────────── Community in a Box ─────────────────────── */

export function CommunityBoxReveal() {
  const d = C.box;
  const [active, setActive] = useState(0);
  const panelId = useId();
  const part = d.parts[active];

  return (
    <SectionShell id="community-box" label="Community in a Box" tone="warm" pause>
      <ChapterEyebrow n={4} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading size="xl">{d.title}</StoryHeading>
        <p className="mt-4 font-serif text-[clamp(1.4rem,2.4vw,2rem)] italic leading-snug text-cc-coral-deep">
          {d.sub}
        </p>
      </MotionReveal>
      <ReadingColumn className="mt-7 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
        <Figure assetKey="boxHero" className="lg:col-span-8">
          {/* Hotspots: buttons, so they work with click, touch, keyboard and focus. */}
          {d.parts.map((p, i) => (
            <button
              key={p.k}
              type="button"
              aria-pressed={active === i}
              aria-controls={panelId}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={cn(
                "absolute hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-mono text-[13px] font-medium shadow-soft transition-colors lg:grid",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep",
                active === i
                  ? "border-cc-forest bg-cc-forest text-cc-cream"
                  : "border-cc-forest bg-paper text-cc-forest hover:bg-cc-cream",
              )}
            >
              {i + 1}
              <span className="sr-only">: {p.k}</span>
            </button>
          ))}
        </Figure>

        {/* Desktop: detail for the selected hotspot. */}
        <div className="hidden lg:col-span-4 lg:block">
          <div id={panelId} aria-live="polite" className="rounded-2xl bg-paper p-7 shadow-soft">
            <p className="font-mono text-[12px] text-cc-coral-deep">
              {String(active + 1).padStart(2, "0")} / {String(d.parts.length).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-[1.8rem] leading-tight">{part.k}</h3>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-cc-forest-soft">{part.v}</p>
            <p className="mt-6 text-[13px] text-cc-forest-soft">
              Select a numbered marker on the image, or use Tab to move between them.
            </p>
          </div>
          <ol className="mt-5 space-y-1.5" aria-label="Box components">
            {d.parts.map((p, i) => (
              <li key={p.k}>
                <button
                  type="button"
                  aria-pressed={active === i}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep",
                    active === i ? "bg-cc-forest text-cc-cream" : "hover:bg-paper",
                  )}
                >
                  <span className="font-mono text-[12px]">{i + 1}</span>
                  {p.k}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile + tablet: every component as numbered text below the image. */}
        <ol className="grid gap-3 sm:grid-cols-2 lg:hidden" aria-label="Box components">
          {d.parts.map((p, i) => (
            <li key={p.k} className="rounded-2xl bg-paper p-5">
              <p className="font-mono text-[12px] text-cc-coral-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-[1.4rem] leading-tight">{p.k}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-cc-forest-soft">{p.v}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 max-w-[40rem]">
        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{d.moreTitle}</h3>
        <p className="mt-3 text-[1.08rem] leading-[1.65] text-cc-forest-soft">{d.more}</p>
      </div>
    </SectionShell>
  );
}

/* ─────────────────────── Physical-only critique ─────────────────────── */

export function PhysicalConstraintScene() {
  const d = C.critique;
  return (
    <SectionShell id="critique" label="Critique of the physical-only solution">
      <ChapterEyebrow n={5} name={d.eyebrow} labels={d.labels} />
      <MotionReveal className="mt-6">
        <StoryHeading className="max-w-[18ch]">{d.title}</StoryHeading>
      </MotionReveal>
      <MotionReveal className="mt-8">
        <p className="max-w-[28ch] font-serif text-[clamp(1.6rem,3vw,2.6rem)] italic leading-[1.2] text-cc-coral-deep">
          {d.question}
        </p>
      </MotionReveal>

      {/* Before: one doorway surrounded by barriers. After: a second doorway. */}
      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <div className="rounded-3xl bg-paper p-6 sm:p-8 lg:col-span-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cc-coral-soft text-cc-coral-deep">
              <Package className="h-6 w-6" aria-hidden />
            </span>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-forest-soft">
              Before: the box as the only doorway
            </p>
          </div>
          <ul
            className="mt-6 grid gap-3 sm:grid-cols-2"
            aria-label="Barriers to receiving a Community Box"
          >
            {d.barriers.map((b, i) => (
              <MotionReveal
                as="li"
                key={b.k}
                delay={i * 0.05}
                className="flex gap-3 rounded-xl border border-cc-forest/15 p-4"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-cc-coral-deep" aria-hidden />
                <span>
                  <span className="block font-medium text-cc-forest">{b.k}</span>
                  <span className="block text-[14px] leading-snug text-cc-forest-soft">{b.v}</span>
                </span>
              </MotionReveal>
            ))}
          </ul>
        </div>
        <MotionReveal
          delay={0.2}
          className="flex flex-col justify-between rounded-3xl bg-cc-forest p-6 text-cc-cream sm:p-8 lg:col-span-4"
        >
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-sage">
              After: a second doorway
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cc-cream/10 text-cc-cream">
                <Package className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-mono text-[14px] text-cc-sage">+</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cc-cream text-cc-forest">
                <Globe className="h-6 w-6" aria-hidden />
              </span>
            </div>
            <p className="mt-6 font-serif text-[1.6rem] leading-tight">
              Box or website: either way in.
            </p>
          </div>
          <p className="mt-8 text-[14px] leading-relaxed text-cc-cream/80">
            The website lets someone reach the service's value without first receiving a physical
            box.
          </p>
        </MotionReveal>
      </div>

      <OwnershipCallout label="DECISION" className="mt-14">
        {d.decision}
      </OwnershipCallout>
      <OwnershipCallout label="MY ROLE" className="mt-8">
        {d.myRole}
      </OwnershipCallout>
    </SectionShell>
  );
}

/* ─────────────────────── Website entry points ─────────────────────── */

export function IndependentExtensionBanner() {
  const d = C.website.extension;
  return (
    <section
      aria-labelledby="extension-title"
      className="rounded-[28px] border-4 border-cc-forest bg-cc-cream p-6 sm:p-10"
    >
      <OwnershipLabel label={d.label} />
      <h3
        id="extension-title"
        className="mt-5 font-mono text-[clamp(1rem,1.6vw,1.35rem)] font-medium uppercase tracking-[0.1em] text-cc-forest"
      >
        {d.title}
      </h3>
      <p className="mt-4 max-w-[40rem] text-[1.08rem] leading-[1.65] text-cc-forest">{d.body}</p>
      <p className="mt-2 text-[14px] text-cc-forest-soft">{d.note}</p>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Redesign artifacts">
        {(
          [
            "redesignConcept",
            "redesignIA",
            "redesignWireframes",
            "redesignVisual",
            "redesignScreens",
          ] as const
        ).map((k, i) => (
          <li key={k}>
            <p className="mb-2 font-mono text-[12px] text-cc-forest-soft">Step {i + 1}</p>
            <Figure assetKey={k} compact />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WebsiteEntryPoints() {
  const d = C.website;
  return (
    <SectionShell id="website" label="Website as an alternative entry point" tone="lilac">
      <ChapterEyebrow n={6} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading className="max-w-[18ch]">{d.title}</StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-7 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <ol
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Four routes into the service"
      >
        {d.routes.map((r, i) => (
          <MotionReveal as="li" key={r.k} delay={i * 0.07} className="rounded-2xl bg-paper p-6">
            <p className="font-mono text-[12px] text-cc-lilac-deep">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight">{r.k}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-cc-forest-soft">{r.v}</p>
          </MotionReveal>
        ))}
      </ol>

      <Figure assetKey="academicWebsite" className="mt-14 max-w-[980px]" />

      <div className="mt-16">
        <IndependentExtensionBanner />
      </div>
    </SectionShell>
  );
}

/* ─────────────────────── Service ecosystem ─────────────────────── */

export function ServiceEcosystem() {
  const d = C.ecosystem;
  return (
    <SectionShell id="ecosystem" label="Service ecosystem">
      <ChapterEyebrow n={7} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading className="max-w-[22ch]">
          {d.title[0]} <span className="text-cc-sage-deep">{d.title[1]}</span>
        </StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-7 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      {/* The diagram is a real ordered list, so it reads the same without sight or JS. */}
      <div className="mt-12">
        <ol
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="Service journey stages and their touchpoints"
        >
          {d.stages.map((s, i) => (
            <MotionReveal
              as="li"
              key={s.k}
              delay={i * 0.08}
              className={cn(
                "relative rounded-2xl bg-paper p-5 ring-1 ring-cc-forest/15",
                i === d.stages.length - 1 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <p className="font-mono text-[12px] text-cc-sage-deep">Stage {i + 1}</p>
              <h3 className="mt-1 font-serif text-[1.55rem] leading-tight">{s.k}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${s.k} touchpoints`}>
                {s.touch.map((t) => (
                  <li
                    key={t}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[13px]",
                      t === "Website" || t === "Community Box" || t === "Buddy Connect"
                        ? "bg-cc-forest text-cc-cream"
                        : "bg-cc-sage-soft text-cc-forest",
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {i < d.stages.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-6 z-10 hidden h-5 w-5 rounded-full bg-cc-cream text-cc-sage-deep lg:block"
                />
              ) : null}
            </MotionReveal>
          ))}
        </ol>
        {/* Website as connective layer spanning every stage. */}
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-cc-forest/35 px-5 py-4">
          <Globe className="h-5 w-5 shrink-0 text-cc-sage-deep" aria-hidden />
          <p className="text-[15px] leading-snug text-cc-forest">{d.layer}</p>
        </div>
      </div>

      <MotionReveal className="mt-14 max-w-[40rem]">
        <p className="font-serif text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.25]">{d.bridge}</p>
      </MotionReveal>

      <div className="mt-12">
        <AccessibleDisclosure
          summary="View the original ecosystem diagram"
          note="Source diagram from the academic project."
        >
          <Figure assetKey="ecosystem" />
        </AccessibleDisclosure>
      </div>
    </SectionShell>
  );
}

/* ─────────────────────── Buddy Connect ─────────────────────── */

export function BuddyMatchingLogic() {
  const d = C.buddy;
  const [on, setOn] = useState<boolean[]>(() => d.prefs.map(() => true));
  const shared = d.prefs.filter((_, i) => on[i]);
  const withheld = d.prefs.filter((_, i) => !on[i]);

  return (
    <SectionShell id="buddy-connect" label="Buddy Connect" tone="sage">
      <ChapterEyebrow n={8} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading className="max-w-[18ch]">{d.title}</StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-7 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <div className="mt-12 rounded-[28px] bg-paper p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center rounded-full border-2 border-dashed border-cc-lilac-deep px-3 py-1 font-mono text-[12px] uppercase tracking-[0.12em] text-cc-lilac-deep">
            {d.demoLabel}
          </p>
          <button
            type="button"
            onClick={() => setOn(d.prefs.map(() => true))}
            className="min-h-11 rounded-full px-3 text-[14px] text-cc-forest-soft underline underline-offset-4 hover:text-cc-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep"
          >
            Reset example
          </button>
        </div>
        <p className="mt-3 max-w-[44rem] text-[14px] leading-relaxed text-cc-forest-soft">
          {d.demoNote}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <fieldset className="lg:col-span-7">
            <legend className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-forest-soft">
              Preferences a person agrees to share
            </legend>
            <ol className="mt-4 space-y-2">
              {d.prefs.map((p, i) => (
                <li key={p.k}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on[i]}
                    onClick={() => setOn((s) => s.map((v, j) => (j === i ? !v : v)))}
                    className={cn(
                      "flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cc-lilac-deep",
                      on[i]
                        ? "border-cc-sage-deep bg-cc-sage-soft"
                        : "border-cc-forest/20 bg-paper",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative h-6 w-10 shrink-0 rounded-full transition-colors",
                        on[i] ? "bg-cc-sage-deep" : "bg-cc-forest/25",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 h-4 w-4 rounded-full bg-paper transition-transform",
                          on[i] ? "translate-x-5" : "translate-x-1",
                        )}
                      />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium text-cc-forest">
                        {i + 1}. {p.k}
                      </span>
                      <span className="block text-[14px] leading-snug text-cc-forest-soft">
                        {p.v}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-cc-forest-soft">
                      {on[i] ? "Shared" : "Not shared"}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </fieldset>

          <div className="lg:col-span-5" aria-live="polite">
            <div className="rounded-2xl bg-cc-forest p-6 text-cc-cream">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-sage">
                What the comparison can use
              </p>
              {shared.length ? (
                <ul className="mt-4 space-y-2">
                  {shared.map((p) => (
                    <li key={p.k} className="flex items-center gap-2 text-[15px]">
                      <Check className="h-4 w-4 text-cc-sage" aria-hidden />
                      {p.k}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[15px] text-cc-cream/85">
                  Nothing. With no agreed preferences, there is nothing to compare.
                </p>
              )}
              {withheld.length ? (
                <>
                  <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-cc-lilac">
                    Never enters the comparison
                  </p>
                  <ul className="mt-3 space-y-2">
                    {withheld.map((p) => (
                      <li
                        key={p.k}
                        className="flex items-center gap-2 text-[15px] text-cc-cream/85"
                      >
                        <X className="h-4 w-4 text-cc-lilac" aria-hidden />
                        {p.k}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Figure assetKey="buddyFlow" className="mt-12 max-w-[980px]" />

      <MotionReveal className="mt-14 max-w-[36rem]">
        <p className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15]">{d.keyLine}</p>
      </MotionReveal>
    </SectionShell>
  );
}

/* ─────────────────────── Architecture ─────────────────────── */

export function ArchitectureLayers() {
  const d = C.architecture;
  return (
    <SectionShell id="architecture" label="System architecture">
      <ChapterEyebrow n={9} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading className="max-w-[18ch]">{d.title}</StoryHeading>
        <p className="mt-4 font-serif text-[clamp(1.3rem,2vw,1.7rem)] italic leading-snug text-cc-sage-deep">
          {d.sub}
        </p>
      </MotionReveal>
      <OwnershipCallout label="MY ROLE" className="mt-8">
        {d.myRole}
      </OwnershipCallout>

      <div className="mt-12">
        <p className="inline-flex rounded-full border border-cc-forest/30 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-cc-forest-soft">
          Status: {d.status}
        </p>
        <ol className="mt-5 space-y-2" aria-label="Proposed architecture layers, top to bottom">
          {d.layers.map((l, i) => (
            <MotionReveal
              as="li"
              key={l.k}
              delay={i * 0.06}
              className={cn(
                "grid gap-3 rounded-2xl p-5 md:grid-cols-12 md:items-center",
                l.k === "Privacy + security"
                  ? "bg-cc-lilac-soft ring-1 ring-cc-lilac-deep/40"
                  : "bg-paper ring-1 ring-cc-forest/15",
              )}
            >
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-cc-forest md:col-span-3">
                {i + 1}. {l.k}
              </h3>
              <ul className="flex flex-wrap gap-1.5 md:col-span-9" aria-label={`${l.k} components`}>
                {l.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full bg-cc-cream px-3 py-1 text-[14px] text-cc-forest"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </ol>
      </div>

      <OwnershipCallout label="DECISION" className="mt-14">
        {d.insight}
      </OwnershipCallout>

      <div className="mt-12">
        <AccessibleDisclosure
          summary={d.disclosure}
          note="The full proposed architecture from the academic project."
        >
          <Figure assetKey="architectureFull" />
        </AccessibleDisclosure>
      </div>
    </SectionShell>
  );
}
