import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { ShelfControls } from "./ShelfControls";
import { cases } from "@/content/portfolio";

export function UxShelf() {
  const { ref, scrollBy } = useDragScroll<HTMLDivElement>();
  return (
    <section id="ux" aria-label="UX case studies" className="border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-2)] py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            index="UX / 03"
            title="Case studies."
            caption="Pulled from the shelf. Drag through, hover a spine to open the cover."
          />
          <ShelfControls onPrev={() => scrollBy(-260)} onNext={() => scrollBy(260)} />
        </div>
      </div>

      {/* shelf board */}
      <div className="relative mt-10">
        <div
          ref={ref}
          className="shelf-track flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-6 pb-10 sm:px-10 [perspective:1800px]"
        >
          {cases.map((c, i) => (
            <a
              key={c.id}
              href={c.link}
              className="group relative h-[420px] w-[160px] shrink-0 snap-start [transform-style:preserve-3d]"
              style={{ transform: `translateZ(0) rotate(${(i % 3) - 1}deg)` }}
            >
              {/* book back / pages */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[10px] rounded-r-[14px] border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] shadow-[var(--shadow-card)]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(13,13,13,0.06) 0 1px, transparent 1px 4px)",
                }}
              />
              {/* cover */}
              <div
                className="absolute inset-0 origin-left rounded-[10px] rounded-r-[14px] transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-32deg)]"
                style={{
                  background: `linear-gradient(180deg, ${c.spineColor} 0%, ${c.spineColor}cc 100%)`,
                  boxShadow:
                    "inset 12px 0 0 rgba(13,13,13,0.18), inset 14px 0 0 rgba(255,255,255,0.08), 0 12px 24px -10px rgba(13,13,13,0.35)",
                }}
              >
                <div className="flex h-full flex-col justify-between p-4 pl-7 text-[color:var(--color-paper)]">
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-80">
                    // case · {c.year}
                  </div>
                  <div>
                    <div className="font-display text-[22px] leading-[1.05] tracking-tight">
                      {c.title}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                      {c.client}
                    </div>
                  </div>
                </div>
              </div>
              {/* revealed inside summary */}
              <div className="absolute inset-0 -z-10 translate-x-3 rounded-[10px] border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] p-4 shadow-[var(--shadow-card)] opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                  // summary
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--color-ink)]/80">
                  {c.summary}
                </p>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-blueprint)]">
                  read →
                </div>
              </div>
            </a>
          ))}
          <div className="w-4 shrink-0" />
        </div>
        {/* shelf board line */}
        <div className="pointer-events-none mx-6 mt-[-8px] h-3 rounded-full bg-[color:var(--color-ink)]/10 sm:mx-10" />
      </div>
    </section>
  );
}