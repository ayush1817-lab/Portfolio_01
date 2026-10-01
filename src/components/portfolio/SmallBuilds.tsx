import { ArrowUpRight } from "lucide-react";
import { buildUrl, cards, section, type BuildSlug } from "@/builds/content";
import { DetenteMotif, PipelineMotif, VoiceMotif } from "@/builds/components/Visuals";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./motion";

const motif: Record<BuildSlug, (p: { className?: string }) => React.ReactElement> = {
  "3d-pipeline": PipelineMotif,
  detente: DetenteMotif,
  "voice-agent": VoiceMotif,
};

/**
 * Small Builds: three experiments in where intelligence belongs — a workflow,
 * an object and an interface. Cards are generated from src/builds/content.ts.
 */
export function SmallBuilds() {
  return (
    <section id="builds" aria-label="Small builds" className="relative py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="03"
          label={section.label}
          title="Three experiments in where"
          italic="intelligence belongs."
          caption={section.body}
        />

        <ul className="mt-8 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((c, i) => {
            const Motif = motif[c.slug];
            return (
              <li
                key={c.slug}
                className={i === cards.length - 1 ? "md:col-span-2 lg:col-span-1" : undefined}
              >
                <Reveal delay={i * 0.08} y={24} blur={false} className="h-full">
                  <a
                    href={buildUrl(c.slug)}
                    data-cursor="Open"
                    className="focus-glow group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-soft transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="aspect-[4/3] overflow-hidden md:aspect-[16/10] lg:aspect-[4/3]">
                      <Motif className="transition-transform duration-[260ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                        <span className="text-cobalt">{c.index}</span>
                        <span aria-hidden className="h-px w-5 bg-line-strong" />
                        {c.where} · {c.name}
                      </p>
                      <h3 className="mt-3 font-display text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                        {c.headline}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                        {c.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                        {c.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/75"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-sans text-sm font-semibold text-ink transition-colors group-hover:text-cobalt">
                        View build
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
