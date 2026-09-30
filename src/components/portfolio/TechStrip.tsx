import { stack } from "@/content/portfolio";

const palette = ["bg-cobalt", "bg-sun", "bg-cobalt", "bg-cobalt"];

/**
 * One row of tools drifting left to right, straight after the hero.
 * Six copies keep the loop seamless on very wide screens; the -50% → 0
 * animation moves exactly three copies before it repeats.
 */
export function TechStrip() {
  const items = Array.from({ length: 6 }, () => stack).flat();
  return (
    <section aria-label="Tools I work with" className="relative overflow-hidden py-6 sm:py-10">
      <p className="sr-only">Tools I work with: {stack.join(", ")}.</p>
      <div aria-hidden className="group flex w-full mask-x">
        <div className="flex shrink-0 items-center gap-3 pr-3 animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full surface px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80 sm:px-5 sm:py-2.5"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${palette[i % palette.length]}`} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
