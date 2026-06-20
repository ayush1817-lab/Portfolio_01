import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { blogs } from "@/content/portfolio";

export function BlogShelf() {
  const { ref } = useDragScroll<HTMLDivElement>();
  return (
    <section id="blog" aria-label="Writing" className="snap-start border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)] py-4 md:py-6 lg:py-24">
      <div className="mx-auto max-w-7xl pl-4 lg:pl-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
            <SectionTitle
              index="WRITING / 04"
              title="Field notes."
              caption="Half thinking out loud, half documentation. Published on Medium."
            />
          </div>

          <div className="relative min-w-0 flex-1 pr-4 lg:pr-10 lg:pr-0">
            <div
              ref={ref}
              className="shelf-track flex gap-4 overflow-x-auto pb-6 pr-6 pt-2 lg:gap-6 lg:pr-10"
            >
              {blogs.map((b, i) => (
                <a
                  key={b.id}
                  href={b.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  draggable={false}
                  className="group relative flex h-[240px] w-[62vw] max-w-[220px] shrink-0 flex-col border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] transition-transform duration-300 hover:-translate-y-1 lg:h-[420px] lg:w-[320px] lg:max-w-[340px]"
                >
                  <header className="flex items-center justify-between border-b border-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                    <span>Essay · {String(i + 1).padStart(2, "0")}</span>
                    <span>{b.readingTime}</span>
                  </header>

                  {/* Dateline / pull quote */}
                  <div className="relative flex flex-1 flex-col gap-2 p-3 lg:gap-4 lg:p-5">
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/60 lg:gap-3 lg:text-[10px]">
                      <span>{b.date}</span>
                      <span className="inline-block h-px flex-1 bg-[color:var(--color-ink)]/30" />
                      <span>// {b.id}</span>
                    </div>

                    <h3 className="font-display text-base font-bold uppercase leading-[0.95] tracking-tight text-[color:var(--color-ink)] lg:text-2xl">
                      {b.title}
                    </h3>

                    <p className="hidden text-sm leading-snug text-[color:var(--color-ink)]/75 lg:block">
                      {b.excerpt}
                    </p>

                    <div className="mt-auto hidden border-l-2 border-[color:var(--color-ink)] pl-3 font-display text-sm italic leading-snug text-[color:var(--color-ink)]/70 lg:block">
                      {`"`}{b.excerpt.split(" ").slice(0, 9).join(" ")}…{`"`}
                    </div>
                  </div>

                  <footer className="flex items-center justify-between border-t border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
                    <span>Read on Medium</span>
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
