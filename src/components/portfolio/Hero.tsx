import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/content/portfolio";
import { buildUrl, cards, type BuildSlug } from "@/builds/content";
import { DetenteMotif, MotifHold, PipelineMotif, VoiceMotif } from "@/builds/components/Visuals";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { DotGrid, HeroArt } from "./art";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

const motif: Record<BuildSlug, (p: { className?: string }) => React.ReactElement> = {
  "3d-pipeline": PipelineMotif,
  detente: DetenteMotif,
  "voice-agent": VoiceMotif,
};

type Entry = {
  key: string;
  name: string;
  kind: string;
  year: string;
  href: string;
  line: string;
  preview: ReactNode;
};

/** Every piece of work on the site, in one list: three case studies, then three builds. */
const entries: Entry[] = [
  ...projects.slice(0, 3).map((p) => ({
    key: p.id,
    name: p.title,
    kind: "Case study",
    year: p.year,
    href: p.link ?? "#projects",
    line: p.mobile?.line ?? p.blurb,
    preview: p.cover ? (
      <img
        src={p.cover.src}
        alt={p.cover.alt}
        width={p.cover.width}
        height={p.cover.height}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover object-top"
      />
    ) : null,
  })),
  ...cards.map((c) => {
    const Motif = motif[c.slug];
    return {
      key: c.slug,
      name: c.name,
      kind: `Build, ${c.where.toLowerCase()}`,
      year: "",
      href: buildUrl(c.slug),
      line: c.headline,
      preview: <Motif />,
    };
  }),
];

/**
 * Hero, Index posture: the name and one line, then the work itself as the
 * lead. Hovering or focusing a row shows that project in the preview frame.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const current = entries[active];
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pt-24 pb-14 sm:pt-28 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pt-28 lg:pb-16"
    >
      {/* blueprint dots behind the name and the index */}
      <DotGrid className="inset-x-0 top-0 -z-10 h-[34rem] text-cobalt/25" fade="to-bottom-right" />
      {/* phones: a small sun and orbit beside the name */}
      <svg
        aria-hidden
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-10 top-14 -z-10 h-24 w-24 lg:hidden"
      >
        <circle cx="70" cy="50" r="30" className="fill-sun" />
        <circle
          cx="70"
          cy="50"
          r="46"
          fill="none"
          className="stroke-cobalt"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
      </svg>
      <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-x-8 gap-y-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:px-10">
        {/* ── name, one line, actions ─────────────────────── */}
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="rise font-display text-h1 font-semibold tracking-[-0.035em] text-ink [overflow-wrap:break-word] [min-width:0]"
          >
            {profile.name}
            {/* the sun as a full stop */}
            <motion.span
              aria-hidden
              className="ml-[0.06em] inline-block h-[0.2em] w-[0.2em] rounded-full bg-sun align-baseline"
              initial={reduce ? false : { scale: 0, y: "-0.6em" }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.55 }}
            />
          </h1>
          <p
            className="rise mt-5 max-w-[34ch] text-lead text-ink-soft [text-wrap:pretty]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Product designer in Dublin, turning research and prototypes into usable AI products.
          </p>
          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <a
              href="#projects"
              onClick={scrollTo("projects")}
              className="focus-glow inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-cobalt active:translate-y-px"
            >
              See the work
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#connect"
              onClick={scrollTo("connect")}
              className="focus-glow inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line-strong px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink active:translate-y-px"
            >
              Get in touch
            </a>
          </div>

          {/* ── the work index ─────────────────────────────── */}
          <ol aria-label="All work" className="mt-12 border-t border-line lg:mt-14">
            {entries.map((e, i) => (
              <li
                key={e.key}
                className="rise border-b border-line"
                style={{ "--i": 3 + i } as React.CSSProperties}
              >
                <a
                  href={e.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "focus-glow group relative grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-3.5 transition-colors duration-200 sm:grid-cols-[2.5rem_minmax(0,1fr)_10rem_3.5rem] sm:py-4",
                    i === active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {/* a cobalt rule grows along the row in focus */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-cobalt transition-transform duration-500 ease-[var(--ease-expo)]",
                      i === active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                  <span
                    className={cn(
                      "text-small tabular-nums transition-colors duration-200",
                      i === active ? "text-cobalt" : "text-ink-faint",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-h4 font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-expo)]",
                      i === active ? "translate-x-2" : "group-hover:translate-x-2",
                    )}
                  >
                    {e.name}
                  </span>
                  <span className="text-small max-sm:hidden">{e.kind}</span>
                  <span className="flex items-center justify-end gap-2 text-small tabular-nums">
                    <span className="max-sm:hidden">{e.year}</span>
                    <ArrowUpRight
                      aria-hidden
                      className={cn(
                        "h-4 w-4 shrink-0 transition-opacity duration-200",
                        i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ── preview of the row in focus ────────────────── */}
        <figure className="relative hidden lg:col-span-5 lg:block lg:pt-6">
          <HeroArt className="-right-16 -top-10 -z-10 h-[115%] w-[115%] xl:-right-24" />
          <div className="relative aspect-[6/7] overflow-hidden rounded-3xl border border-line bg-paper-3 shadow-frame">
            {/* Build motifs hold their still frame here; they animate in the Builds section. */}
            <MotifHold.Provider value={true}>
              {entries.map((e, i) => (
                <div
                  key={e.key}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-expo)]",
                    i === active
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-4 scale-[1.03] opacity-0",
                  )}
                >
                  {e.preview}
                </div>
              ))}
            </MotifHold.Provider>
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6" aria-live="polite">
            <span className="max-w-[40ch] text-body text-ink">{current.line}</span>
            <span className="shrink-0 text-small text-ink-soft">{current.kind}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
