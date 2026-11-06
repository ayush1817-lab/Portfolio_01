import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { DotGrid, QuoteMark } from "./art";
import { cn } from "@/lib/utils";

/** Initials on a flat tint from the palette. */
const toneClass: Record<Testimonial["tone"], string> = {
  cobalt: "bg-cobalt-soft text-cobalt-deep",
  sun: "bg-sun-soft text-sun-deep",
  sage: "bg-cc-sage-soft text-cc-sage-deep",
  lilac: "bg-cc-lilac-soft text-cc-lilac-deep",
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

function Avatar({ t }: { t: Testimonial }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full text-small font-semibold",
        toneClass[t.tone],
      )}
    >
      {initials(t.name)}
    </span>
  );
}

/**
 * Phones only (the swipeable row, below 640px): advance one card every few
 * seconds, looping back to the first. Pauses while the row is touched or
 * focused and for a while afterwards, while off screen or in a hidden tab,
 * and never runs with reduced motion.
 */
function useAutoAdvance(ref: React.RefObject<HTMLUListElement | null>, held: boolean) {
  useEffect(() => {
    if (held) return;
    const row = ref.current;
    if (!row) return;
    const phone = window.matchMedia("(max-width: 639px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const EVERY = 2500;
    const RESUME_AFTER = 4500;
    let visible = false;
    let pausedUntil = 0;

    const pause = () => {
      pausedUntil = Date.now() + RESUME_AFTER;
    };
    const tick = () => {
      if (!phone.matches || calm.matches || !visible || document.hidden) return;
      if (Date.now() < pausedUntil) return;
      const cards = Array.from(row.children) as HTMLElement[];
      if (cards.length < 2) return;
      const left = row.scrollLeft;
      const pad = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
      // Scroll position that snaps each card into place.
      const stops = cards.map((c) => c.offsetLeft - row.offsetLeft - pad);
      const next = stops.find((x) => x > left + 8);
      const atEnd = left + row.clientWidth >= row.scrollWidth - 8;
      row.scrollTo({ left: next === undefined || atEnd ? 0 : next, behavior: "smooth" });
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    io.observe(row);
    const events = ["pointerdown", "touchstart", "wheel", "focusin"] as const;
    events.forEach((ev) => row.addEventListener(ev, pause, { passive: true }));
    const timer = window.setInterval(tick, EVERY);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      events.forEach((ev) => row.removeEventListener(ev, pause));
    };
  }, [ref, held]);
}

export function Testimonials() {
  const row = useRef<HTMLUListElement>(null);
  const [held, setHeld] = useState(false);
  useAutoAdvance(row, held);
  if (!testimonials.length) return null;
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-x-clip bg-paper-2 py-16 sm:py-24 lg:py-30"
    >
      <DotGrid
        className="bottom-0 left-0 -z-10 h-80 w-[36rem] text-cobalt/25"
        fade="to-bottom-right"
      />
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="testimonials-title"
          title="What people say"
          aside={
            <button
              type="button"
              onClick={() => setHeld((v) => !v)}
              aria-pressed={held}
              className="focus-glow inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink active:translate-y-px sm:hidden motion-reduce:hidden"
            >
              {held ? (
                <Play className="h-4 w-4" aria-hidden />
              ) : (
                <Pause className="h-4 w-4" aria-hidden />
              )}
              {held ? "Play" : "Pause"}
            </button>
          }
        />

        {/* Phones: one swipeable row that advances on its own. Larger screens:
            the first quote set large, the other three stacked beside it. */}
        <ul
          ref={row}
          className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-12"
        >
          {testimonials.map((t, i) => {
            const lead = i === 0;
            return (
              <li
                key={t.name}
                className={cn(
                  "w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-auto sm:max-w-none",
                  lead
                    ? "sm:col-span-2 lg:col-span-7 lg:row-span-3"
                    : "lg:col-span-5 lg:border-t lg:border-line lg:pt-6 lg:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(2)]:pt-0",
                )}
              >
                <figure
                  className={cn(
                    "flex h-full flex-col",
                    "max-lg:rounded-3xl max-lg:border max-lg:border-line max-lg:bg-paper max-lg:p-6",
                    lead && "relative lg:rounded-3xl lg:bg-paper lg:p-12",
                  )}
                >
                  {lead ? <QuoteMark className="-top-6 right-8 hidden h-20 w-28 lg:block" /> : null}
                  <blockquote
                    className={cn(
                      "flex-1 text-ink",
                      lead
                        ? "font-display text-h4 font-medium tracking-[-0.01em] lg:text-pull"
                        : "text-body",
                    )}
                  >
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar t={t} />
                    <span className="min-w-0">
                      <span className="block text-body font-semibold leading-tight text-ink">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-small text-ink-soft">
                        {[t.role, t.org].filter(Boolean).join(", ")}
                      </span>
                      {t.relation ? (
                        <span className="mt-1 block text-label text-ink-soft">{t.relation}</span>
                      ) : null}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
