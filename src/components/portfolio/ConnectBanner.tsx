import { Linkedin, Mail, BookOpen } from "lucide-react";
import { profile } from "@/content/portfolio";

export function ConnectBanner() {
  return (
    <section id="connect" aria-label="Connect" className="px-6 py-20 sm:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[color:var(--color-ink)]/15 bg-[color:var(--color-ink)] p-10 text-[color:var(--color-paper)] shadow-[var(--shadow-card)] md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,243,238,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-paper)]/70">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-blueprint)]/60" />
                <span className="relative h-2 w-2 rounded-full bg-[color:var(--color-blueprint)]" />
              </span>
              // {profile.status}
            </div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Let's build<br />
              <span className="italic text-[color:var(--color-blueprint-soft)]">something agentic.</span>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-[color:var(--color-paper)]/70">
              Whether it's a 0→1 product, an internal automation, or just a sharp opinion on
              what your agent UX is missing — drop me a line.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] px-5 py-3 text-sm font-medium text-[color:var(--color-ink)] transition hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-5 py-3 text-sm font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)]"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.medium}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-5 py-3 text-sm font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)]"
            >
              <BookOpen className="h-4 w-4" />
              Medium
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}