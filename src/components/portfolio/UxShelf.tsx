import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { cases } from "@/content/portfolio";

const previewCases = cases.slice(0, 3);

export function UxShelf() {
  const { ref } = useDragScroll<HTMLDivElement>();
  return (
    <section id="ux" aria-label="UX case studies" className="border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-2)] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl pl-4 sm:pl-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-12">
          {/* Title column */}
          <div className="flex flex-col gap-8 md:w-72 md:shrink-0 md:py-2">
            <SectionTitle
              index="UX / 03"
              title="Case studies."
              caption="Pulled from the shelf. Three compact reads — swipe to browse."
            />
          </div>

          {/* Horizontal shelf — compact book cards */}
          <div className="relative min-w-0 flex-1 pr-6 sm:pr-10 md:pr-0">
            <div
              ref={ref}
              className="shelf-track flex snap-x snap-mandatory overflow-x-auto pb-6 pr-6 pt-2 sm:pr-10 [perspective:1600px]"
            >
              {previewCases.map((c, i) => (
                <a
                  key={c.id}
                  href={c.link}
                  draggable={false}
                  className="group relative flex h-[180px] w-[80vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-[color:var(--color-ink)]/12 bg-[color:var(--color-paper)] shadow-[var(--shadow-card)] transition duration-500 will-change-transform hover:z-20 hover:-translate-y-2 hover:rotate-[-0.4deg] hover:shadow-[var(--shadow-card-hover)] sm:h-[200px] sm:w-[300px]"
                  style={{
                    marginLeft: i === 0 ? 0 : "clamp(-90px, -16vw, -50px)",
                    zIndex: previewCases.length - i,
                    transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
                  }}
                >
                  {/* book spine / left cover */}
                  <div
                    className="relative h-full w-[52px] shrink-0"
                    style={{
                      background: `linear-gradient(180deg, ${c.spineColor} 0%, ${c.spineColor}dd 100%)`,
                      boxShadow: "inset -4px 0 0 rgba(0,0,0,0.12), inset 6px 0 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 rotate-180 font-mono text-[9px] uppercase tracking-[0.18em] text-white/90 [writing-mode:vertical-rl]">
                      {c.client}
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 [writing-mode:vertical-rl]">
                      {c.year}
                    </div>
                  </div>

                  {/* pages edge */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-3"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(13,13,13,0.06) 0 1px, transparent 1px 3px)",
                    }}
                  />

                  {/* right — content */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                      <span>// case · {c.id.replace("ux-", "0")}</span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--color-ink)]/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-ink)]" />
                    </div>
                    <h3 className="font-display text-xl leading-[1.1] text-[color:var(--color-ink)] sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-[color:var(--color-ink)]/70 sm:line-clamp-4 sm:text-sm">
                      {c.summary}
                    </p>
                    <div className="mt-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-blueprint)]">
                      read →
                    </div>
                  </div>
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
