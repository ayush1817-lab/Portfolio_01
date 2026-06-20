import { stack } from "@/content/portfolio";

export function TechStrip() {
  const items = [...stack, ...stack];
  return (
    <section
      aria-label="Tools and stack"
      className="snap-start overflow-hidden border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-2)] py-6"
    >
      <div className="group flex w-full">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-3 pl-6 group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-blueprint)]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}