import { experience, profile } from "@/content/portfolio";

const chapterLabel = (i: number) => `Chapter ${String(i + 1).padStart(2, "0")}`;

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:gap-20 sm:px-10 sm:py-24">
        {/* Section header */}
        <header className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/60">
              // about
            </span>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-[color:var(--color-ink)] sm:text-5xl md:text-6xl">
              A designer running on agents.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-4">
            <p className="text-lg leading-relaxed text-[color:var(--color-ink)]/80 sm:text-xl">
              I'm {profile.name.split(" ")[0]}. I design products that think, plan, and act —
              agentic SaaS, internal automations, and the small tools I needed for my own work.
              I care about craft, observability, and giving humans the right amount of control.
            </p>
          </div>
        </header>

        {/* Story narrative — the acts */}
        <div className="flex flex-col border-t border-[color:var(--color-ink)]">
          {experience.map((e, i) => {
            const tinted = i % 2 === 1;
            return (
              <article
                key={e.year}
                className={`grid grid-cols-1 gap-6 border-b border-[color:var(--color-ink)] py-10 md:grid-cols-12 md:gap-4 md:py-14 ${
                  tinted ? "bg-[color:var(--color-paper-3)]/40" : ""
                }`}
              >
                <div
                  className={`flex flex-col gap-1 md:col-span-3 ${
                    tinted ? "border-l-4 border-[color:var(--color-ink)] pl-4 md:ml-2" : ""
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                    {chapterLabel(i)}
                  </span>
                  <span
                    className={`font-display text-xl font-bold tracking-tight text-[color:var(--color-ink)]/40 ${
                      i === 0 ? "italic underline decoration-1 underline-offset-4" : ""
                    }`}
                  >
                    {e.year}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] sm:text-3xl">
                    {e.role}
                  </h3>
                  <p className="mt-2 font-mono text-sm uppercase tracking-wide text-[color:var(--color-ink)]/60">
                    {e.org}
                  </p>
                </div>
                <div className="flex md:col-span-4 md:items-end">
                  <p className="text-base leading-snug text-[color:var(--color-ink)]/80 sm:text-lg">
                    {e.note}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer meta */}
        <footer className="flex items-center gap-6">
          <div className="h-px flex-grow bg-[color:var(--color-ink)]" />
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/40">
            End of record • Est. 2020
          </span>
        </footer>
      </div>
    </section>
  );
}