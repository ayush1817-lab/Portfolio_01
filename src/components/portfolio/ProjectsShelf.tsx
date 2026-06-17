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
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle index={index} title={title} caption={caption} />
          <ShelfControls onPrev={() => scrollBy(-380)} onNext={() => scrollBy(380)} />
        </div>
      </div>

      <div
        ref={ref}
        className="shelf-track mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-10 [perspective:1600px]"
      >
        {items.map((p, i) => (
          <a
            key={p.id}
            href={p.link}
            target={p.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="group relative flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-[color:var(--color-ink)]/12 bg-[color:var(--color-paper-2)] shadow-[var(--shadow-card)] transition duration-500 will-change-transform hover:-translate-y-1 hover:rotate-[-0.5deg] hover:shadow-[var(--shadow-card-hover)] sm:w-[360px] md:w-[400px]"
            style={{
              transform: `rotate(${(i % 2 === 0 ? -0.4 : 0.4)}deg)`,
            }}
          >
            {/* card top — abstract artwork */}
            <div
              className="relative h-56 w-full overflow-hidden"
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
              <svg
                aria-hidden
                viewBox="0 0 400 220"
                className="absolute inset-0 h-full w-full"
              >
                <g stroke={p.accent} strokeWidth="1" opacity="0.55" fill="none">
                  <circle cx="80" cy="60" r="4" fill={p.accent} />
                  <circle cx="200" cy="130" r="4" fill={p.accent} />
                  <circle cx="320" cy="80" r="4" fill={p.accent} />
                  <circle cx="140" cy="180" r="4" fill={p.accent} />
                  <circle cx="290" cy="180" r="4" fill={p.accent} />
                  <path d="M80 60 L200 130 L320 80" strokeDasharray="3 5" />
                  <path d="M200 130 L140 180 L290 180" strokeDasharray="3 5" />
                </g>
              </svg>
              {badge ? (
                <span className="absolute left-4 top-4 rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80">
                  {badge}
                </span>
              ) : null}
              <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
                // {p.id}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                <span>{p.year}</span>
                <ArrowUpRight className="h-4 w-4 text-[color:var(--color-ink)]/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-ink)]" />
              </div>
              <h3 className="font-display text-2xl leading-tight text-[color:var(--color-ink)]">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-ink)]/70">{p.blurb}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--color-ink)]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/70"
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

      <div className="mx-auto mt-4 max-w-7xl px-6 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] sm:px-10">
        // drag · scroll · {items.length} cards
      </div>
    </section>
  );
}