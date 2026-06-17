import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { ShelfControls } from "./ShelfControls";
import type { Project } from "@/content/portfolio";

type Props = {
  id: string;
  index: string;
  title: string;
  caption?: string;
  items: Project[];
  badge?: string;
};

export function ProjectsShelf({ id, index, title, caption, items, badge }: Props) {
  const { ref, scrollBy } = useDragScroll<HTMLDivElement>();
  return (
    <section id={id} aria-label={title} className="border-b border-[color:var(--color-ink)]/10 py-20">
      <div className="mx-auto max-w-7xl pl-6 sm:pl-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-12">
          {/* Title column — sits beside the shelf so cards take the rest of the width */}
          <div className="flex flex-col justify-between gap-8 md:w-72 md:shrink-0 md:py-2">
            <SectionTitle index={index} title={title} caption={caption} />
            <div className="hidden md:block">
              <ShelfControls onPrev={() => scrollBy(-560)} onNext={() => scrollBy(560)} />
              <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                // drag · scroll · {items.length} cards
              </div>
            </div>
          </div>

          {/* Horizontal shelf — landscape rectangle cards */}
          <div className="relative min-w-0 flex-1 pr-6 sm:pr-10 md:pr-0">
            <div
              ref={ref}
              className="shelf-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pr-6 sm:pr-10 [perspective:1600px]"
            >
              {items.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group relative flex h-[280px] w-[88vw] max-w-[560px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-[color:var(--color-ink)]/12 bg-[color:var(--color-paper-2)] shadow-[var(--shadow-card)] transition duration-500 will-change-transform hover:-translate-y-1 hover:rotate-[-0.4deg] hover:shadow-[var(--shadow-card-hover)] sm:w-[520px] md:w-[560px]"
                  style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}
                >
                  {/* left — abstract artwork panel */}
                  <div
                    className="relative h-full w-[44%] shrink-0 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}22 0%, ${p.accent}66 100%)`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.55), transparent 40%), radial-gradient(circle at 80% 70%, rgba(13,13,13,0.18), transparent 50%)",
                      }}
                    />
                    <svg aria-hidden viewBox="0 0 240 280" className="absolute inset-0 h-full w-full">
                      <g stroke={p.accent} strokeWidth="1" opacity="0.55" fill="none">
                        <circle cx="50" cy="70" r="4" fill={p.accent} />
                        <circle cx="160" cy="120" r="4" fill={p.accent} />
                        <circle cx="90" cy="200" r="4" fill={p.accent} />
                        <circle cx="200" cy="220" r="4" fill={p.accent} />
                        <path d="M50 70 L160 120 L90 200 L200 220" strokeDasharray="3 5" />
                      </g>
                    </svg>
                    {badge ? (
                      <span className="absolute left-4 top-4 rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80">
                        {badge}
                      </span>
                    ) : null}
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
                      // {p.id}
                    </span>
                  </div>

                  {/* right — content */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                      <span>{p.year}</span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--color-ink)]/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-ink)]" />
                    </div>
                    <h3 className="font-display text-2xl leading-[1.1] text-[color:var(--color-ink)]">
                      {p.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-ink)]/70">
                      {p.blurb}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[color:var(--color-ink)]/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
              <div className="w-2 shrink-0" />
            </div>

            {/* mobile controls */}
            <div className="mt-2 flex items-center justify-between pr-6 md:hidden">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                // drag · scroll
              </span>
              <ShelfControls onPrev={() => scrollBy(-360)} onNext={() => scrollBy(360)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}