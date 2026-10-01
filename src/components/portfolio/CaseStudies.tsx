import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cases } from "@/content/portfolio";
import { useDragScroll } from "./use-drag-scroll";
import { SectionHeading } from "./SectionHeading";
import { ShelfControls } from "./ShelfControls";
import { EASE, Reveal } from "./motion";
import { cn } from "@/lib/utils";

const items = cases.slice(0, 3);

/** Cover treatments cycle through the site palette: cobalt, sun, soft grey. */
const covers = [
  {
    bg: "var(--color-cobalt)",
    fg: "text-paper",
    num: "text-paper/25",
    grid: "rgba(255,255,255,0.14)",
  },
  { bg: "var(--color-sun)", fg: "text-ink", num: "text-ink/15", grid: "rgba(15,20,36,0.08)" },
  {
    bg: "var(--color-paper-3)",
    fg: "text-ink",
    num: "text-cobalt/20",
    grid: "rgba(29,78,216,0.1)",
  },
];

/**
 * Case studies: a horizontal, drag-to-scroll shelf of tall cover cards.
 * The section title sits left and stays put while the shelf slides.
 */
export function CaseStudies() {
  const { ref, scrollBy } = useDragScroll<HTMLDivElement>();
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref]);

  const step = () => {
    const el = ref.current;
    if (!el) return 400;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 24 : 400;
  };

  return (
    <section
      id="ux"
      aria-label="Smaller builds"
      className="relative overflow-hidden py-14 sm:py-24 lg:py-40"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            label="Smaller builds"
            title="Smaller"
            italic="builds."
            caption="Small projects built alongside the main case studies. Swipe or drag to browse."
          />
          <Reveal delay={0.3} className="hidden lg:block">
            <ShelfControls
              onPrev={() => scrollBy(-step())}
              onNext={() => scrollBy(step())}
              canPrev={canPrev}
              canNext={canNext}
            />
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.2} y={40} blur={false} className="mt-8 sm:mt-14">
        <div
          ref={ref}
          data-cursor="Drag"
          className="shelf-track shelf-gutter flex snap-x snap-proximity gap-6 overflow-x-auto pb-6 pt-2"
        >
          {items.map((c, i) => {
            const Card = c.link ? "a" : "article";
            return (
              <Card
                key={c.id}
                data-card
                href={c.link ?? undefined}
                target={c.link ? "_blank" : undefined}
                rel={c.link ? "noreferrer noopener" : undefined}
                draggable={false}
                className={cn(
                  "group relative flex aspect-[4/5] w-[66vw] max-w-[380px] sm:aspect-[3/4] sm:w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 shadow-soft transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:w-[360px]",
                )}
                style={{ "--accent": c.spineColor } as React.CSSProperties}
              >
                {/* cover */}
                <div className="relative flex-1 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    style={{ background: covers[i % covers.length].bg }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${covers[i % covers.length].grid} 1px, transparent 1px), linear-gradient(to bottom, ${covers[i % covers.length].grid} 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                      maskImage: "radial-gradient(circle at 30% 20%, black, transparent 70%)",
                      WebkitMaskImage: "radial-gradient(circle at 30% 20%, black, transparent 70%)",
                    }}
                  />
                  <div
                    className={`relative flex items-center justify-between p-5 font-mono text-[10px] uppercase tracking-[0.22em] ${covers[i % covers.length].fg}`}
                  >
                    <span>{c.client}</span>
                    <span>{c.year}</span>
                  </div>
                  <span
                    aria-hidden
                    className={`absolute -bottom-6 -left-2 select-none font-display text-[9rem] font-semibold leading-none tracking-[-0.06em] ${covers[i % covers.length].num}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* body */}
                <div className="relative flex flex-col gap-2 bg-paper p-4 sm:gap-3 sm:p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                    Case · {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-ink-soft line-clamp-2 sm:text-sm sm:line-clamp-3">
                    {c.summary}
                  </p>
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
                    <span>{c.link ? "Read case" : "Overview only"}</span>
                    {c.link ? (
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : (
                      <span className="h-px w-8 bg-line-strong" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
          <div className="w-2 shrink-0 lg:w-10" />
        </div>
      </Reveal>

      {/* progress */}
      <div className="mx-auto mt-2 max-w-page px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <div className="relative h-px flex-1 bg-line-strong">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cobalt to-sun"
              animate={{ width: `${Math.max(12, progress * 100)}%` }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
            {String(Math.min(items.length, Math.round(progress * (items.length - 1)) + 1)).padStart(
              2,
              "0",
            )}{" "}
            / {String(items.length).padStart(2, "0")}
          </span>
          <div className="lg:hidden">
            <ShelfControls
              onPrev={() => scrollBy(-step())}
              onNext={() => scrollBy(step())}
              canPrev={canPrev}
              canNext={canNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
