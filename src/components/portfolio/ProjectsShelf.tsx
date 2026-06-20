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
    <section id={id} aria-label={title} className="snap-start border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)] py-6 sm:py-24">
      <div className="mx-auto max-w-7xl pl-4 sm:pl-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-14">
          <div className="md:sticky md:top-24 md:w-80 md:shrink-0">
            <SectionTitle index={index} title={title} caption={caption} />
          </div>

          <div className="relative min-w-0 flex-1 pr-4 sm:pr-10 md:pr-0">
            <div
              ref={ref}
              className="shelf-track flex gap-4 overflow-x-auto pb-6 pr-6 pt-2 sm:gap-6 sm:pr-10"
            >
              {items.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  draggable={false}
                  className="group relative flex h-[240px] w-[62vw] max-w-[220px] shrink-0 flex-col border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] transition-transform duration-300 hover:-translate-y-1 sm:h-[420px] sm:w-[320px] sm:max-w-[340px]"
                >
                  <header className="flex items-center justify-between border-b border-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                    <span>№ {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    <span>{p.year}</span>
                  </header>

                  {/* Editorial plate — large numeral + accent rule */}
                  <div className="relative flex h-[80px] items-end overflow-hidden border-b border-[color:var(--color-ink)] bg-[color:var(--color-paper-2)] px-3 sm:h-[140px] sm:px-4">
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
                      className="hidden font-display font-bold uppercase leading-none tracking-tighter text-transparent sm:inline"
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
                      className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full sm:right-4 sm:top-4 sm:h-3 sm:w-3"
                      style={{ background: p.accent }}
                    />
                    {badge ? (
                      <span className="absolute left-3 top-3 border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)] sm:left-4 sm:px-2 sm:text-[9px]">
                        {badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55 sm:text-[10px]">
                      // {p.id}
                    </span>
                    <h3 className="font-display text-base font-bold uppercase leading-[0.95] tracking-tight text-[color:var(--color-ink)] sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="hidden text-sm leading-snug text-[color:var(--color-ink)]/75 sm:block">
                      {p.blurb}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1 border-t border-[color:var(--color-ink)]/15 pt-2 sm:gap-1.5 sm:pt-3">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="border border-[color:var(--color-ink)]/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/80 sm:px-2 sm:text-[9px]"
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