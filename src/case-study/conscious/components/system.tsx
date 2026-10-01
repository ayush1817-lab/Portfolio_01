import { useState } from "react";
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
import { hasAsset } from "../assets";

/** Cut-out images of the prototype's components, keyed by file stem. */
const components = Object.fromEntries(
  Object.entries(
    import.meta.glob("../../../assets/conscious/box/*.webp", {
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

/* ─────────────────────── Community in a Box ─────────────────────── */

export function CommunityBoxReveal() {
  const d = C.box;
  return (
    <SectionShell id="community-box" label="Community in a Box" tone="warm" pause>
      <ChapterEyebrow n={4} name={d.eyebrow} labels={[d.label]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <MotionReveal>
            <StoryHeading size="xl">{d.title}</StoryHeading>
            <p className="mt-3 font-display text-pull font-medium tracking-[-0.02em] text-cc-coral-deep">
              {d.sub}
            </p>
          </MotionReveal>
          <ReadingColumn className="mt-6 text-cc-forest-soft">
            {d.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{d.more}</p>
          </ReadingColumn>
        </div>
        <Figure assetKey="boxHero" className="mx-auto max-w-[520px] lg:col-span-5 lg:mr-0" />
      </div>

      <div className="mt-12">
        <h3 className="font-display text-h3 font-semibold tracking-[-0.02em]">{d.insideTitle}</h3>
        <p className="mt-1 text-[15px] text-cc-forest-soft">{d.insideNote}</p>
        {/* Phones: one swipeable row. Larger screens: a grid. */}
        <ul
          className="-mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 xl:grid-cols-7"
          aria-label={d.insideTitle}
        >
          {d.components.map((c, i) => (
            <MotionReveal
              as="li"
              key={c.k}
              delay={(i % 7) * 0.04}
              className="flex w-[62vw] max-w-[16rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-paper sm:w-auto sm:max-w-none"
            >
              <div className="grid aspect-[4/3] place-items-center bg-cc-cream p-3">
                <img
                  src={components[c.image]}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="p-4">
                <h4 className="font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.02em]">
                  {c.k}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-cc-forest-soft">{c.v}</p>
              </div>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

/* ─────────────── A second doorway: critique → website → ecosystem ─────────────── */

export function SecondDoorway() {
  const c = C.critique;
  const w = C.website;
  const e = C.ecosystem;
  return (
    <SectionShell
      id="second-doorway"
      label="A second way in: the website and the service ecosystem"
    >
      <ChapterEyebrow n={5} name={c.eyebrow} labels={c.labels} />
      <MotionReveal className="mt-6">
        <StoryHeading>{c.title}</StoryHeading>
        <p className="mt-4 max-w-[34ch] font-display text-pull font-medium tracking-[-0.02em] text-balance text-cc-coral-deep">
          {c.question}
        </p>
      </MotionReveal>

      <ul
        className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Barriers to receiving a Community Box"
      >
        {c.barriers.map((b) => (
          <li key={b.k} className="flex gap-2.5 text-[15px] leading-snug">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-cc-coral-deep" aria-hidden />
            <span>
              <span className="font-medium text-cc-forest">{b.k}.</span>{" "}
              <span className="text-cc-forest-soft">{b.v}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <OwnershipCallout label="DECISION">{c.decision}</OwnershipCallout>
        <OwnershipCallout label="MY ROLE">{c.myRole}</OwnershipCallout>
      </div>

      {/* The website: four routes into one service */}
      <div className="mt-14 rounded-[28px] bg-cc-lilac-soft p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper text-cc-lilac-deep">
            <Globe className="h-5 w-5" aria-hidden />
          </span>
          <OwnershipLabel label={w.label} />
        </div>
        <h3 className="mt-4 font-display text-h3 font-semibold tracking-[-0.03em]">{w.title}</h3>
        <p className="mt-2 max-w-read text-read text-cc-forest-soft">{w.body[0]}</p>
        <ol
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Four routes into the service"
        >
          {w.routes.map((r, i) => (
            <li key={r.k} className="rounded-2xl bg-paper p-4">
              <p className="font-mono text-[12px] text-cc-lilac-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.02em]">
                {r.k}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-cc-forest-soft">{r.v}</p>
            </li>
          ))}
        </ol>
        <Figure assetKey="academicWebsite" className="mt-8 max-w-[980px]" />
      </div>

      {/* The ecosystem: the same journey, many touchpoints */}
      <div className="mt-14">
        <div className="flex flex-wrap items-center gap-3">
          <OwnershipLabel label={e.label} />
        </div>
        <h3 className="mt-4 font-display text-h3 font-semibold tracking-[-0.03em] text-balance">
          {e.title[0]} <span className="text-cc-sage-deep">{e.title[1]}</span>
        </h3>
        <ol
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="Service journey stages and their touchpoints"
        >
          {e.stages.map((st, i) => (
            <li
              key={st.k}
              className={cn(
                "relative rounded-2xl bg-paper p-4 ring-1 ring-cc-forest/15",
                i === e.stages.length - 1 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <p className="font-mono text-[12px] text-cc-sage-deep">Stage {i + 1}</p>
              <p className="mt-1 font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.02em]">
                {st.k}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${st.k} touchpoints`}>
                {st.touch.map((t) => (
                  <li
                    key={t}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[12px]",
                      t === "Website" || t === "Community Box" || t === "Buddy Connect"
                        ? "bg-cc-forest text-cc-cream"
                        : "bg-cc-sage-soft text-cc-forest",
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {i < e.stages.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-5 z-10 hidden h-5 w-5 rounded-full bg-cc-cream text-cc-sage-deep lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-read font-display text-pull font-semibold tracking-[-0.02em]">
          {e.bridge}
        </p>
        {hasAsset("ecosystem") ? (
          <div className="mt-8">
            <AccessibleDisclosure
              summary="View the original ecosystem diagram"
              note="Source diagram from the academic project."
            >
              <Figure assetKey="ecosystem" />
            </AccessibleDisclosure>
          </div>
        ) : null}
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
      <ChapterEyebrow n={6} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading>{d.title}</StoryHeading>
      </MotionReveal>
      <ReadingColumn className="mt-6 text-cc-forest-soft">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ReadingColumn>

      <div className="mt-8 rounded-[28px] bg-paper p-5 sm:p-8">
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
        <p className="mt-3 max-w-read text-[15px] leading-relaxed text-cc-forest-soft">
          {d.demoNote}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
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

      <Figure assetKey="buddyFlow" className="mt-10 max-w-[980px]" />

      <MotionReveal className="mt-10 max-w-read">
        <p className="font-display text-pull font-semibold tracking-[-0.02em] text-balance">
          {d.keyLine}
        </p>
      </MotionReveal>
    </SectionShell>
  );
}

/* ─────────────────────── Architecture ─────────────────────── */

export function ArchitectureLayers() {
  const d = C.architecture;
  return (
    <SectionShell id="architecture" label="System architecture">
      <ChapterEyebrow n={7} name={d.eyebrow} labels={[d.label]} />
      <MotionReveal className="mt-6">
        <StoryHeading>{d.title}</StoryHeading>
        <p className="mt-3 font-display text-pull font-medium tracking-[-0.02em] text-cc-sage-deep">
          {d.sub}
        </p>
      </MotionReveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <OwnershipCallout label="MY ROLE">{d.myRole}</OwnershipCallout>
        <OwnershipCallout label="DECISION">{d.insight}</OwnershipCallout>
      </div>
      <p className="mt-8 inline-flex rounded-full border border-cc-forest/30 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-cc-forest-soft">
        Status: {d.status}
      </p>
      <div className="mt-6">
        <AccessibleDisclosure
          summary="View the proposed architecture layers"
          note="Experience, core services, data, privacy and security, and external services."
        >
          <ol className="space-y-2" aria-label="Proposed architecture layers, top to bottom">
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
                <ul
                  className="flex flex-wrap gap-1.5 md:col-span-9"
                  aria-label={`${l.k} components`}
                >
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
          {hasAsset("architectureFull") ? (
            <Figure assetKey="architectureFull" className="mt-6" />
          ) : null}
        </AccessibleDisclosure>
      </div>
    </SectionShell>
  );
}
