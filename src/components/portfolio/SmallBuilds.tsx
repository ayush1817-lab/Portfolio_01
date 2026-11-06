import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { buildUrl, cards, type BuildSlug } from "@/builds/content";
import { DetenteMotif, MotifHold, PipelineMotif, VoiceMotif } from "@/builds/components/Visuals";
import { MobileCard } from "./MobileCard";
import { SectionHeading } from "./SectionHeading";
import { InView } from "./art";

const motif: Record<
  BuildSlug,
  (p: { className?: string; compact?: boolean }) => React.ReactElement
> = {
  "3d-pipeline": PipelineMotif,
  detente: DetenteMotif,
  "voice-agent": VoiceMotif,
};

/**
 * Small Builds: three experiments in where intelligence belongs, a workflow,
 * an object and an interface. Rows parted by hairlines, each with its live
 * motif; one control pauses all three. Cards come from src/builds/content.ts.
 */
export function SmallBuilds() {
  const [paused, setPaused] = useState(false);

  const toggle = (
    <button
      type="button"
      onClick={() => setPaused((v) => !v)}
      aria-pressed={paused}
      className="focus-glow inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink active:translate-y-px"
    >
      {paused ? (
        <Play className="h-4 w-4" aria-hidden />
      ) : (
        <Pause className="h-4 w-4" aria-hidden />
      )}
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );

  return (
    <section
      id="builds"
      aria-labelledby="builds-title"
      className="relative py-16 sm:py-24 lg:py-44"
    >
      <MotifHold.Provider value={paused}>
        <div
          className="mx-auto max-w-page px-5 sm:px-8 lg:px-10"
          data-hold={paused ? "" : undefined}
        >
          <SectionHeading
            id="builds-title"
            title="Three experiments in where intelligence belongs"
            aside={<span className="max-md:hidden">{toggle}</span>}
          />

          {/* Phones: the same compact image-led cards as Selected Work. */}
          <ul className="mt-8 flex flex-col gap-3 md:hidden">
            {cards.map((c, i) => {
              const Motif = motif[c.slug];
              return (
                <li key={c.slug}>
                  <MobileCard
                    href={buildUrl(c.slug)}
                    index={String(i + 1)}
                    title={c.name}
                    line={c.headline}
                    tags={[c.where, c.tags[0]]}
                    tagsLabel="Type and focus"
                    linkHint="View the build."
                    media={<Motif compact />}
                  />
                </li>
              );
            })}
          </ul>
          <div className="mt-5 md:hidden">{toggle}</div>

          <ol className="mt-14 hidden border-t border-line md:block lg:mt-16">
            {cards.map((c, i) => {
              const Motif = motif[c.slug];
              return (
                <InView as="li" key={c.slug} i={i} className="border-b border-line">
                  <a
                    href={buildUrl(c.slug)}
                    className="focus-glow group grid grid-cols-12 items-center gap-8 py-8 lg:py-10"
                  >
                    <div className="col-span-5 aspect-[16/10] overflow-hidden rounded-2xl border border-line lg:col-span-4">
                      <Motif />
                    </div>
                    <div className="col-span-7 lg:col-span-4 lg:col-start-6">
                      <p className="text-small text-ink-soft">
                        {c.where}: {c.name}
                      </p>
                      <h3 className="mt-2 font-display text-h4 font-semibold tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-cobalt">
                        {c.headline}
                      </h3>
                      <p className="mt-3 max-w-[56ch] text-body text-ink-soft lg:hidden">
                        {c.description}
                      </p>
                    </div>
                    <div className="hidden lg:col-span-3 lg:block">
                      <p className="text-small text-ink-soft">{c.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                        {c.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-line px-2.5 py-1 text-micro text-ink-soft"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-cobalt">
                        View the build
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </a>
                </InView>
              );
            })}
          </ol>
        </div>
      </MotifHold.Provider>
    </section>
  );
}
