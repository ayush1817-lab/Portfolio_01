import { ArrowUpRight } from "lucide-react";
import { useDragScroll } from "./use-drag-scroll";
import { SectionTitle } from "./SectionTitle";
import { ShelfControls } from "./ShelfControls";
import { blogs } from "@/content/portfolio";

export function BlogShelf() {
  const { ref, scrollBy } = useDragScroll<HTMLDivElement>();
  return (
    <section id="blog" aria-label="Writing" className="border-b border-[color:var(--color-ink)]/10 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            index="WRITING / 04"
            title="Field notes."
            caption="Half thinking out loud, half documentation. Published on Medium."
          />
          <ShelfControls onPrev={() => scrollBy(-360)} onNext={() => scrollBy(360)} />
        </div>
      </div>

      <div
        ref={ref}
        className="shelf-track mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-10"
      >
        {blogs.map((b, i) => (
          <a
            key={b.id}
            href={b.link}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col gap-4 rounded-[28px] border border-[color:var(--color-ink)]/12 bg-[color:var(--color-paper-2)] p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:w-[360px] md:w-[380px]"
            style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              <span>{b.date}</span>
              <span>{b.readingTime} read</span>
            </div>
            <h3 className="font-display text-3xl leading-[1.05] text-[color:var(--color-ink)]">
              {b.title}
            </h3>
            <p className="text-sm leading-relaxed text-[color:var(--color-ink)]/70">{b.excerpt}</p>
            <div className="mt-4 flex items-center justify-between border-t border-[color:var(--color-ink)]/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/70">
              read on medium
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
        <div className="w-2 shrink-0" />
      </div>
    </section>
  );
}