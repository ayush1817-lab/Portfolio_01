import { stack } from "@/content/portfolio";
import { Reveal } from "./motion";

const palette = ["bg-ember", "bg-amber", "bg-iris", "bg-mint"];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...stack, ...stack, ...stack];
  return (
    <div className="group flex w-full mask-x">
      <div
        className={`flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full glass px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-colors duration-300 hover:border-cream/30 hover:text-cream"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${palette[i % palette.length]}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStrip() {
  return (
    <section aria-label="Tools and stack" className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
            <span className="text-ember">04</span> &nbsp;·&nbsp; Tools I reach for
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-mist sm:block">
            Hover to pause
          </p>
        </Reveal>
      </div>
      <div className="flex flex-col gap-3">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
