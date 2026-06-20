import { ArrowUpRight } from "lucide-react";
import photoAsset from "@/assets/ayush-photo.jpeg.asset.json";
import { profile } from "@/content/portfolio";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="hero" aria-label="Introduction" className="relative flex items-start overflow-hidden bg-[color:var(--color-paper)] lg:min-h-[100svh] lg:items-center">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pt-14 pb-8 lg:px-10 lg:pt-28 lg:pb-20">
        <div className="relative overflow-hidden border border-[color:var(--color-ink)] bg-[color:var(--color-paper)]">
          {/* Masthead meta */}
          <div className="grid grid-cols-2 items-end gap-3 border-b border-[color:var(--color-ink)] p-2.5 lg:flex lg:justify-between lg:px-8 lg:py-6">
            <div className="flex min-w-0 flex-col">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                Portfolio Issue 01
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/60">
                Design & Engineering
              </span>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-ink)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                {profile.status}
              </span>
            </div>
            <div className="flex min-w-0 flex-col text-right">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
                Est. 2024
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/60">
                Dublin, IRE
              </span>
            </div>
          </div>

          {/* Mobile-only status (replaces hidden center pill) */}
          <div className="flex items-center gap-2 border-b border-[color:var(--color-ink)] px-3 py-1.5 lg:hidden">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-ink)]" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
              {profile.status}
            </span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-12">
            {/* Left: type + tagline + CTAs */}
            <div className="col-span-12 z-10 border-b border-[color:var(--color-ink)] p-3 lg:p-12 lg:col-span-7 lg:border-b-0 lg:border-r">
              <h1
                className="mb-3 font-display font-bold uppercase tracking-tight text-[color:var(--color-ink)] lg:mb-12"
                style={{ fontSize: "clamp(2.25rem, 14vw, 8rem)", lineHeight: 0.85 }}
              >
                {first}
                <br />
                <span className="inline-block text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-ink)" }}>
                  {last}
                </span>
              </h1>

              <div className="max-w-md">
                <p className="mb-4 text-sm font-medium leading-snug text-[color:var(--color-ink)] lg:mb-10 lg:text-2xl">
                  {profile.tagline}
                </p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="#projects"
                    onClick={scrollTo("projects")}
                    className="inline-flex items-center gap-2 bg-[color:var(--color-ink)] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-paper)] transition-colors hover:bg-[#2d2d2d] lg:px-8 lg:py-4 lg:text-xs"
                  >
                    View work
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#connect"
                    onClick={scrollTo("connect")}
                    className="inline-flex items-center gap-2 border border-[color:var(--color-ink)] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-paper-3)] lg:px-8 lg:py-4 lg:text-xs"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>

            {/* Right: portrait */}
            <div className="group relative col-span-12 h-[180px] overflow-hidden bg-[color:var(--color-paper-3)] lg:h-[360px] lg:col-span-5 lg:h-auto">
              <img
                src={photoAsset.url}
                alt="Ayush Ramawat"
                className="h-full w-full scale-[1.18] object-cover object-center grayscale transition-transform duration-700 group-hover:scale-[1.26]"
              />
              <div className="absolute inset-x-3 bottom-3 hidden lg:block lg:inset-x-6 lg:bottom-6">
                <div className="mb-2 inline-block bg-[color:var(--color-ink)] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
                  Feature Profile
                </div>
                <p className="max-w-[220px] font-mono text-[10px] uppercase leading-tight tracking-widest text-[color:var(--color-ink)]">
                  Exploring the intersection of LLMs and human–computer interaction.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-2 border-t border-[color:var(--color-ink)] lg:grid-cols-4">
            {[
              ["Specialization", "Agentic Systems"],
              ["Stack Focus", "React · Python"],
              ["Availability", "Contract / FT"],
              ["Catalogue", "Index 042-A"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-col gap-0.5 p-2 lg:gap-1 lg:p-4 ${i < 2 ? "border-b lg:border-b-0" : ""} ${
                  i % 2 === 0 ? "border-r border-[color:var(--color-ink)]" : ""
                } ${i === 1 ? "lg:border-r" : ""} ${i === 2 ? "lg:border-r" : ""}`}
              >
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[color:var(--color-ink)]/40 lg:text-[9px]">
                  {label}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase text-[color:var(--color-ink)] lg:text-xs">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
