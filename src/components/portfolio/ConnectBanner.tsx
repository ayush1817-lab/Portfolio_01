import { Linkedin, Mail, BookOpen, Github, X } from "lucide-react";
import { profile } from "@/content/portfolio";

export function ConnectBanner() {
  return (
    <section id="connect" aria-label="Connect" className="px-4 py-14 sm:px-10 sm:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[color:var(--color-ink)]/15 bg-[color:var(--color-ink)] p-6 text-[color:var(--color-paper)] shadow-[var(--shadow-card)] sm:rounded-[36px] sm:p-10 md:p-16">
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
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
              Let's build<br />
              <span className="italic text-[color:var(--color-blueprint-soft)]">something agentic.</span>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-[color:var(--color-paper)]/70 sm:text-base">
              Whether it's a 0→1 product, an internal automation, or just a sharp opinion on
              what your agent UX is missing — drop me a line.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-[color:var(--color-paper)] px-4 py-2.5 text-xs font-medium text-[color:var(--color-ink)] transition hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-sm"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-4 py-2.5 text-xs font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)] sm:px-5 sm:py-3 sm:text-sm"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.medium}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-4 py-2.5 text-xs font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)] sm:px-5 sm:py-3 sm:text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Medium
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-4 py-2.5 text-xs font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)] sm:px-5 sm:py-3 sm:text-sm"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)]/30 px-4 py-2.5 text-xs font-medium text-[color:var(--color-paper)] transition hover:border-[color:var(--color-paper)] sm:px-5 sm:py-3 sm:text-sm"
            >
              <X className="h-4 w-4" />
              X
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}