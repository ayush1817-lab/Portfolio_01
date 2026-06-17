import { ArrowDown, Mail } from "lucide-react";
import photoAsset from "@/assets/ayush-photo.jpeg.asset.json";
import { profile } from "@/content/portfolio";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-[color:var(--color-ink)]/10"
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,13,13,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,13,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* top nav */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-end px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/70 sm:px-10 sm:text-xs sm:tracking-[0.2em]">
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-6">
          <a href="#projects" onClick={scrollTo("projects")} className="hover:text-[color:var(--color-ink)]">Projects</a>
          <a href="#ux" onClick={scrollTo("ux")} className="hover:text-[color:var(--color-ink)]">UX</a>
          <a href="#blog" onClick={scrollTo("blog")} className="hover:text-[color:var(--color-ink)]">Blog</a>
          <a href="#connect" onClick={scrollTo("connect")} className="hover:text-[color:var(--color-ink)]">Connect</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-16 sm:gap-12 sm:px-10 sm:pt-16 sm:pb-24 md:grid-cols-[1.2fr_1fr] md:gap-8 md:pt-24 md:pb-32">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            <span className="inline-block h-px w-8 bg-[color:var(--color-ink)]/40" />
            // {profile.status}
          </div>

          <h1 className="font-display text-[clamp(2.75rem,11vw,7rem)] leading-[0.92] tracking-tight text-[color:var(--color-ink)]">
            {profile.name.split(" ")[0]}
            <br />
            <span className="italic text-[color:var(--color-blueprint)]">{profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[color:var(--color-ink)]/80 sm:text-lg md:text-xl">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-paper)] transition hover:-translate-y-0.5 sm:px-6 sm:py-3"
            >
              View work
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </a>
            <a
              href="#connect"
              onClick={scrollTo("connect")}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink)]/20 px-5 py-2.5 text-sm font-medium text-[color:var(--color-ink)] transition hover:border-[color:var(--color-ink)]/60 sm:px-6 sm:py-3"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </div>

        </div>

        {/* portrait */}
        <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-none">
          <div className="relative aspect-square">
            {/* paper backing card */}
            <div
              aria-hidden
              className="absolute inset-3 rounded-[28px] border border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-3)] shadow-[var(--shadow-card)] sm:inset-6 sm:rounded-[36px]"
            />
            {/* dotted graph */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full text-[color:var(--color-blueprint)]/40"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="60" cy="80" r="3" fill="currentColor" />
              <circle cx="340" cy="120" r="3" fill="currentColor" />
              <circle cx="320" cy="320" r="3" fill="currentColor" />
              <circle cx="80" cy="340" r="3" fill="currentColor" />
              <path
                d="M60 80 C 150 60 250 100 340 120"
                stroke="currentColor"
                strokeDasharray="2 6"
                strokeWidth="1"
              />
              <path
                d="M340 120 C 360 200 340 280 320 320"
                stroke="currentColor"
                strokeDasharray="2 6"
                strokeWidth="1"
              />
              <path
                d="M320 320 C 220 360 140 360 80 340"
                stroke="currentColor"
                strokeDasharray="2 6"
                strokeWidth="1"
              />
            </svg>
            <div className="relative z-10 mx-auto flex h-full w-full items-center justify-center p-8 md:p-10">
              <div className="relative aspect-square h-full max-h-[300px] overflow-hidden rounded-full border-[6px] border-[color:var(--color-paper)] shadow-[0_24px_60px_rgba(13,13,13,0.22)] md:max-h-[360px]">
                <img
                  src={photoAsset.url}
                  alt="Ayush Ramawat"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}