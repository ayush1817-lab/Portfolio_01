import { ArrowUp } from "lucide-react";
import { profile } from "@/content/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-ink)]/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          © {new Date().getFullYear()} {profile.name} · designed & built with care
        </div>
        <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink)]/70">
          <a href={`mailto:${profile.email}`} className="hover:text-[color:var(--color-ink)]">email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-ink)]">linkedin</a>
          <a href={profile.medium} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-ink)]">medium</a>
          <a href={profile.github} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-ink)]">github</a>
          <a href={profile.x} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-ink)]">x</a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-ink)]/20 px-3 py-1.5 hover:border-[color:var(--color-ink)]/60"
          >
            top <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}