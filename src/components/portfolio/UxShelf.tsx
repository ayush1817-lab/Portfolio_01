import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { cases } from "@/content/portfolio";

const previewCases = cases.slice(0, 3);

export function UxShelf() {
  const { ref } = useDragScroll<HTMLDivElement>();
  return (
    <section id="ux" aria-label="UX case studies" className="snap-start border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-2)] py-6 md:py-10 lg:py-24">
      <div className="mx-auto max-w-7xl pl-4 lg:pl-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
            <SectionTitle
              index="UX / 03"
              title="Case studies."
              caption="Pulled from the shelf. Three compact reads — swipe to browse."
            />
          </div>

          <div className="relative min-w-0 flex-1 pr-4 lg:pr-10 lg:pr-0">
            <div
              ref={ref}
              className="shelf-track flex gap-4 overflow-x-auto pb-6 pr-6 pt-2 lg:gap-6 lg:pr-10"
            >
              {previewCases.map((c, i) => (
                <a
                  key={c.id}
                  href={c.link}
                  draggable={false}
                  className="group relative flex h-[240px] w-[62vw] max-w-[240px] shrink-0 flex-col border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] transition-transform duration-300 hover:-translate-y-1 lg:h-[420px] lg:w-[340px] lg:max-w-[360px]"
                >
                  <header className="flex items-center justify-between border-b border-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                    <span>Case · {String(i + 1).padStart(2, "0")}</span>
                    <span>{c.year}</span>
                  </header>

                  {/* Cover plate */}
                  <div
                    className="relative flex h-[80px] flex-col justify-between overflow-hidden border-b border-[color:var(--color-ink)] p-3 lg:h-[150px] lg:p-4"
                    style={{ background: c.spineColor }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(245,243,238,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[color:var(--color-paper)] lg:text-[10px]">
                      <span>{c.client}</span>
                      <span className="hidden lg:inline">UX dossier</span>
                    </div>
                    <div className="relative hidden lg:block">
                      <span
                        aria-hidden
                        className="font-display font-bold leading-none tracking-tighter text-[color:var(--color-paper)]/30"
                        style={{ fontSize: "5rem" }}
                      >
                        {c.id.replace("ux-", "")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-3 lg:gap-3 lg:p-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55 lg:text-[10px]">
                      // {c.id}
                    </span>
                    <h3 className="font-display text-base font-bold uppercase leading-[0.95] tracking-tight text-[color:var(--color-ink)] lg:text-2xl">
                      {c.title}
                    </h3>
                    <p className="hidden text-sm leading-snug text-[color:var(--color-ink)]/75 lg:block">
                      {c.summary}
                    </p>
                  </div>

                  <footer className="flex items-center justify-between border-t border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
                    <span>Read case</span>
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
