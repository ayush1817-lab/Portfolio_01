import { Linkedin, Mail, BookOpen, Github, X } from "lucide-react";
import { profile } from "@/content/portfolio";

export function ConnectBanner() {
  return (
    <section id="connect" aria-label="Connect" className="snap-start px-4 py-6 lg:px-10 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <div className="flex items-center justify-between border-b border-[color:var(--color-paper)]/20 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--color-paper)] lg:px-10">
          <span>Connect · 05</span>
          <span className="hidden lg:inline text-[color:var(--color-paper)]/60">End of issue</span>
          <span>Reply ↩</span>
        </div>
        <div className="relative p-6 lg:p-10 lg:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,243,238,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-paper)]/70">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-blueprint)]/60" />
                <span className="relative h-2 w-2 rounded-full bg-[color:var(--color-blueprint)]" />
              </span>
              // {profile.status}
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight lg:text-5xl lg:text-7xl">
              Let's build<br />
              <span className="italic text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-paper)" }}>something agentic.</span>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-[color:var(--color-paper)]/70 lg:text-base">
              Whether it's a 0→1 product, an internal automation, or just a sharp opinion on
              what your agent UX is missing — drop me a line.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex max-w-full items-center gap-2 bg-[color:var(--color-paper)] px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink)] transition hover:-translate-y-0.5 lg:px-5 lg:py-3"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-[color:var(--color-paper)]/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-paper)] transition hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)] lg:px-5 lg:py-3"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.medium}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-[color:var(--color-paper)]/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-paper)] transition hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)] lg:px-5 lg:py-3"
            >
              <BookOpen className="h-4 w-4" />
              Medium
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-[color:var(--color-paper)]/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-paper)] transition hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)] lg:px-5 lg:py-3"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-[color:var(--color-paper)]/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-paper)] transition hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)] lg:px-5 lg:py-3"
            >
              <X className="h-4 w-4" />
              X
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}