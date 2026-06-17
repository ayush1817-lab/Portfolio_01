import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { blogs } from "@/content/portfolio";

const accentPalette = ["#3b6fa0", "#9a6b3f", "#4a7c59", "#6b4a8a"];

export function BlogShelf() {
  const { ref } = useDragScroll<HTMLDivElement>();
  return (
    <section id="blog" aria-label="Writing" className="border-b border-[color:var(--color-ink)]/10 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl pl-4 sm:pl-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-12">
          {/* Title column */}
          <div className="flex flex-col gap-8 md:w-72 md:shrink-0 md:py-2">
            <SectionTitle
              index="WRITING / 04"
              title="Field notes."
              caption="Half thinking out loud, half documentation. Published on Medium."
            />
          </div>

          {/* Horizontal shelf — landscape rectangle cards */}
          <div className="relative min-w-0 flex-1 pr-6 sm:pr-10 md:pr-0">
            <div
              ref={ref}
              className="shelf-track flex snap-x snap-mandatory overflow-x-auto pb-6 pr-6 pt-2 sm:pr-10 [perspective:1600px]"
            >
              {blogs.map((b, i) => {
                const accent = accentPalette[i % accentPalette.length];
                return (
                  <a
                    key={b.id}
                    href={b.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    draggable={false}
                    className="group relative flex h-[220px] w-[80vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-[color:var(--color-ink)]/12 bg-[color:var(--color-paper-2)] shadow-[var(--shadow-card)] transition duration-500 will-change-transform hover:z-20 hover:-translate-y-2 hover:rotate-[-0.4deg] hover:shadow-[var(--shadow-card-hover)] sm:h-[240px] sm:w-[280px] md:w-[300px]"
                    style={{
                      marginLeft: i === 0 ? 0 : "clamp(-80px, -14vw, -40px)",
                      zIndex: blogs.length - i,
                      transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)`,
                    }}
                  >
                    {/* left — abstract artwork panel */}
                    <div
                      className="relative h-full w-[38%] shrink-0 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${accent}22 0%, ${accent}66 100%)`,
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
                        <g stroke={accent} strokeWidth="1" opacity="0.55" fill="none">
                          <circle cx="50" cy="70" r="4" fill={accent} />
                          <circle cx="160" cy="120" r="4" fill={accent} />
                          <circle cx="90" cy="200" r="4" fill={accent} />
                          <circle cx="200" cy="220" r="4" fill={accent} />
                          <path d="M50 70 L160 120 L90 200 L200 220" strokeDasharray="3 5" />
                        </g>
                      </svg>
                      <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
                        // {b.id}
                      </span>
                    </div>

                    {/* right — content */}
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                        <span>{b.date}</span>
                        <span>{b.readingTime}</span>
                      </div>
                      <h3 className="font-display text-lg leading-[1.1] text-[color:var(--color-ink)]">
                        {b.title}
                      </h3>
                      <p className="line-clamp-3 text-xs leading-relaxed text-[color:var(--color-ink)]/70">
                        {b.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-ink)]/10 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/70">
                        read on medium
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                );
              })}
              <div className="w-2 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
