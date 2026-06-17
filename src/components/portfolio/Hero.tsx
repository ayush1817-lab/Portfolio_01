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
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink)]/70 sm:px-10">
        <span>// ayush.r</span>
        <div className="hidden gap-6 sm:flex">
          <a href="#projects" onClick={scrollTo("projects")} className="hover:text-[color:var(--color-ink)]">Projects</a>
          <a href="#ux" onClick={scrollTo("ux")} className="hover:text-[color:var(--color-ink)]">UX</a>
          <a href="#blog" onClick={scrollTo("blog")} className="hover:text-[color:var(--color-ink)]">Blog</a>
          <a href="#connect" onClick={scrollTo("connect")} className="hover:text-[color:var(--color-ink)]">Connect</a>
        </div>
        <span className="hidden items-center gap-2 md:flex">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-blueprint)]/60" />
            <span className="relative h-2 w-2 rounded-full bg-[color:var(--color-blueprint)]" />
          </span>
          available · 2026
        </span>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-24 sm:px-10 md:grid-cols-[1.2fr_1fr] md:gap-8 md:pt-24 md:pb-32">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            <span className="inline-block h-px w-8 bg-[color:var(--color-ink)]/40" />
            // {profile.status}
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tight text-[color:var(--color-ink)]">
            {profile.name.split(" ")[0]}
            <br />
            <span className="italic text-[color:var(--color-blueprint)]">{profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-[color:var(--color-ink)]/80 sm:text-xl">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm font-medium text-[color:var(--color-paper)] transition hover:-translate-y-0.5"
            >
              View work
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </a>
            <a
              href="#connect"
              onClick={scrollTo("connect")}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink)]/20 px-6 py-3 text-sm font-medium text-[color:var(--color-ink)] transition hover:border-[color:var(--color-ink)]/60"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </div>

          <dl className="grid max-w-md grid-cols-3 gap-4 pt-6 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            <div>
              <dt className="text-[color:var(--color-ink)]/45">// role</dt>
              <dd className="mt-1 text-[color:var(--color-ink)]">Product Designer</dd>
            </div>
            <div>
              <dt className="text-[color:var(--color-ink)]/45">// focus</dt>
              <dd className="mt-1 text-[color:var(--color-ink)]">Agentic AI</dd>
            </div>
            <div>
              <dt className="text-[color:var(--color-ink)]/45">// based</dt>
              <dd className="mt-1 text-[color:var(--color-ink)]">Remote · IN</dd>
            </div>
          </dl>
        </div>

        {/* portrait */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-square">
            {/* paper backing card */}
            <div
              aria-hidden
              className="absolute inset-6 rounded-[36px] border border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper-3)] shadow-[var(--shadow-card)]"
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
            {/* floating tags */}
            <span className="absolute left-0 top-12 z-20 rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80 shadow-sm">
              // designer
            </span>
            <span className="absolute right-0 top-1/3 z-20 rounded-full border border-[color:var(--color-blueprint)]/30 bg-[color:var(--color-paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-blueprint)] shadow-sm">
              // agent-builder
            </span>
            <span className="absolute bottom-8 left-4 z-20 rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80 shadow-sm">
              // 0→1
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}