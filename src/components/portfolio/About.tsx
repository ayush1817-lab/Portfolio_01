import { experience, profile } from "@/content/portfolio";

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="border-b border-[color:var(--color-ink)]/10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 sm:px-10 md:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-3">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            // about
          </div>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-[color:var(--color-ink)] sm:text-6xl">
            A designer<br />running on agents.
          </h2>
        </div>
        <div className="flex flex-col gap-12">
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)]/80">
            I'm {profile.name.split(" ")[0]}. I design products that think, plan, and act —
            agentic SaaS, internal automations, and the small tools I needed for my own work.
            I care about craft, observability, and giving humans the right amount of control.
          </p>

          <ol className="relative border-l border-[color:var(--color-ink)]/15 pl-6">
            {experience.map((e) => (
              <li key={e.year} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 grid h-3 w-3 place-items-center rounded-full border border-[color:var(--color-ink)]/20 bg-[color:var(--color-paper)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-blueprint)]" />
                </span>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                  {e.year}
                </div>
                <div className="mt-1 font-display text-2xl text-[color:var(--color-ink)]">
                  {e.role}
                </div>
                <div className="text-sm text-[color:var(--color-ink)]/60">{e.org}</div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[color:var(--color-ink)]/70">
                  {e.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}