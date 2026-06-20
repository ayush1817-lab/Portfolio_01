import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
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
  const { ref } = useDragScroll<HTMLDivElement>();
  return (
    <section id={id} aria-label={title} className="snap-start border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)] py-4 md:py-6 lg:py-24">
      <div className="mx-auto max-w-7xl pl-4 lg:pl-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
            <SectionTitle index={index} title={title} caption={caption} />
          </div>

          <div className="relative min-w-0 flex-1 pr-4 lg:pr-10 lg:pr-0">
            <div
              ref={ref}
              className="shelf-track flex gap-4 overflow-x-auto pb-6 pr-6 pt-2 lg:gap-6 lg:pr-10"
            >
              {items.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  draggable={false}
                  className="group relative flex h-[240px] w-[62vw] max-w-[220px] shrink-0 flex-col border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] transition-transform duration-300 hover:-translate-y-1 lg:h-[420px] lg:w-[320px] lg:max-w-[340px]"
                >
                  <header className="flex items-center justify-between border-b border-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                    <span>№ {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    <span>{p.year}</span>
                  </header>

                  {/* Editorial plate — large numeral + accent rule */}
                  <div className="relative flex h-[80px] items-end overflow-hidden border-b border-[color:var(--color-ink)] bg-[color:var(--color-paper-2)] px-3 lg:h-[140px] lg:px-4">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, var(--color-ink) 0 1px, transparent 1px 6px)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="hidden font-display font-bold uppercase leading-none tracking-tighter text-transparent lg:inline"
                      style={{
                        fontSize: "9rem",
                        WebkitTextStroke: "1.5px var(--color-ink)",
                        marginBottom: "-1.5rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full lg:right-4 lg:top-4 lg:h-3 lg:w-3"
                      style={{ background: p.accent }}
                    />
                    {badge ? (
                      <span className="absolute left-3 top-3 border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)] lg:left-4 lg:px-2 lg:text-[9px]">
                        {badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-3 lg:gap-3 lg:p-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55 lg:text-[10px]">
                      // {p.id}
                    </span>
                    <h3 className="font-display text-base font-bold uppercase leading-[0.95] tracking-tight text-[color:var(--color-ink)] lg:text-2xl">
                      {p.title}
                    </h3>
                    <p className="hidden text-sm leading-snug text-[color:var(--color-ink)]/75 lg:block">
                      {p.blurb}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1 border-t border-[color:var(--color-ink)]/15 pt-2 lg:gap-1.5 lg:pt-3">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="border border-[color:var(--color-ink)]/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/80 lg:px-2 lg:text-[9px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <footer className="flex items-center justify-between border-t border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
                    <span>Open dossier</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </footer>
                </a>
              ))}
              <div className="w-2 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}