import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Project } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Magnetic, Reveal } from "./motion";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  items: Project[];
};

/**
 * Selected work: cards stack as you scroll on large screens. Each card sticks
 * near the top and gently scales back as the next one slides over it.
 */
export function Projects({ id, items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id={id} aria-label="Selected projects" className="relative py-14 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:mb-16 sm:gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="01"
            label="Selected work"
            title="Problems I've"
            italic="worked on."
            caption="What each problem was, the part I played, and what happened next."
          />
          <Reveal delay={0.3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
              {String(items.length).padStart(2, "0")} projects · 2025 → 2026
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative flex flex-col gap-4 sm:gap-6 lg:gap-0">
          {items.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              total={items.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index: i,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (total - i - 1) * 0.05]);
  const dim = useTransform(progress, [start, 1], [0, reduce ? 0 : (total - i - 1) * 0.22]);
  const overlay = useTransform(dim, (v) => `rgba(247,248,251,${v})`);

  const Tag = p.link ? "a" : "article";
  const external = p.link?.startsWith("http");

  return (
    // Cards only stack on screens tall enough to show a whole card under the nav.
    <div
      className="lg:[@media(min-height:850px)]:sticky"
      style={{ top: `calc(7rem + ${i * 1.25}rem)` }}
    >
      <motion.div style={{ scale }} className="origin-top will-change-transform">
        <Reveal y={40} amount={0.15} blur={false}>
          <Tag
            href={p.link ?? undefined}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            data-cursor={p.link ? "Open" : undefined}
            className={cn(
              "group relative block overflow-hidden rounded-[2rem] border border-line bg-paper shadow-soft",
              "lg:min-h-[68vh]",
            )}
            style={{ "--accent": plates[i % plates.length].stroke } as React.CSSProperties}
          >
            {/* dimming overlay as the next card slides over */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20"
              style={{ backgroundColor: overlay }}
            />

            <div className="grid grid-cols-1 lg:min-h-[68vh] lg:grid-cols-12">
              {/* ── text ──────────────────────────────────── */}
              <div className="relative z-10 flex flex-col p-5 sm:p-10 lg:col-span-6 lg:p-14">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  <span className="flex items-center gap-3">
                    <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                    {p.year ? (
                      <>
                        <span className="h-px w-6 bg-line-strong" />
                        <span>{p.year}</span>
                      </>
                    ) : null}
                  </span>
                  <span className="hidden sm:inline">// {p.id}</span>
                </div>

                <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:mt-8 sm:text-5xl lg:mt-10 lg:text-6xl">
                  {p.title}
                </h3>
                {p.subtitle ? (
                  <p className="mt-3 max-w-lg font-display text-[1.1rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:mt-5 sm:text-[1.45rem]">
                    {p.subtitle}
                  </p>
                ) : null}
                <p className="mt-3 line-clamp-3 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:mt-5 sm:line-clamp-none sm:text-base lg:text-[1.05rem]">
                  {p.blurb}
                </p>

                {p.facts?.length ? (
                  <dl className="mt-5 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-7 sm:grid-cols-3">
                    {p.facts.map((f) => (
                      <div
                        key={f.k}
                        className="flex items-baseline justify-between gap-3 bg-paper px-4 py-2.5 sm:flex-col sm:justify-start sm:gap-1 sm:py-3"
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                          {f.k}
                        </dt>
                        <dd className="text-right text-[13px] font-medium leading-snug text-ink sm:text-left">
                          {f.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-4 hidden flex-wrap gap-2 sm:mt-6 sm:flex">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 sm:pt-10">
                  <Magnetic>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-semibold tracking-tight transition-all duration-500",
                        p.link
                          ? "bg-ink text-paper group-hover:bg-cobalt"
                          : "surface text-ink-soft",
                      )}
                    >
                      {p.link
                        ? external
                          ? "Open project"
                          : "Read the case study"
                        : "Overview only"}
                      {p.link ? (
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      ) : null}
                    </span>
                  </Magnetic>
                </div>
              </div>

              {/* ── visual plate ──────────────────────────── */}
              <div
                className={cn(
                  "relative order-first overflow-hidden sm:order-none lg:col-span-6 lg:min-h-0",
                  // A cover keeps its own shape on small screens so nothing is cut off.
                  p.cover
                    ? "aspect-[16/9] sm:aspect-[var(--cover-ar)] lg:aspect-auto"
                    : "aspect-[16/9] sm:aspect-auto sm:min-h-[260px]",
                )}
                style={
                  p.cover
                    ? ({
                        "--cover-ar": `${p.cover.width} / ${p.cover.height}`,
                        "--cover-focus": p.cover.mobileFocus ?? "50% 0%",
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: p.cover ? p.cover.bg : plates[i % plates.length].bg }}
                />
                {p.cover ? (
                  <img
                    src={p.cover.src}
                    alt={p.cover.alt}
                    width={p.cover.width}
                    height={p.cover.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={cn(
                      "absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
                      p.cover.fit === "cover"
                        ? "object-cover object-[var(--cover-focus)] sm:object-top"
                        : "object-contain",
                    )}
                  />
                ) : p.coverPlaceholder ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,#e3ece4_0_16px,#f7f2e8_16px_32px)] p-6 text-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#3d6450]">
                      Cover image to be added
                    </span>
                    <span className="max-w-[18rem] font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-[#1d3a31]">
                      {p.coverPlaceholder}
                    </span>
                  </div>
                ) : (
                  <Plate variant={i % 3} />
                )}
                {p.cover || p.coverPlaceholder ? null : (
                  <span
                    aria-hidden
                    className="absolute bottom-6 right-8 select-none font-display text-[5.5rem] font-semibold sm:text-[7rem] leading-none tracking-[-0.06em] text-ink/[0.06] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 lg:text-[11rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>
          </Tag>
        </Reveal>
      </motion.div>
    </div>
  );
}

/** Plate colours cycle through the site palette so every card sits in the theme. */
const plates = [
  { bg: "var(--color-cobalt-soft)", stroke: "var(--color-cobalt)" },
  { bg: "var(--color-sun-soft)", stroke: "var(--color-sun-deep)" },
  { bg: "var(--color-paper-3)", stroke: "var(--color-cobalt)" },
];

/** Abstract generative plates — one shape language per card. */
function Plate({ variant }: { variant: number }) {
  const common =
    "absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]";
  if (variant === 0) {
    // concentric arcs (orbit)
    return (
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className={common}
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 9 }).map((_, k) => (
          <circle
            key={k}
            cx="300"
            cy="120"
            r={40 + k * 34}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.35 - k * 0.03}
            strokeWidth={1}
            strokeDasharray={k % 2 ? "4 8" : undefined}
          />
        ))}
        <circle cx="300" cy="120" r="10" fill="var(--accent)" />
        <circle
          cx="300"
          cy="120"
          r="26"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="animate-ping-soft origin-[300px_120px]"
        />
      </svg>
    );
  }
  if (variant === 1) {
    // node graph
    const nodes = [
      [70, 300],
      [160, 220],
      [250, 260],
      [320, 150],
      [200, 110],
      [110, 130],
    ];
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [4, 3],
    ];
    return (
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className={common}
        preserveAspectRatio="xMidYMid slice"
      >
        {edges.map(([a, b], k) => (
          <line
            key={k}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="var(--accent)"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        ))}
        {nodes.map(([x, y], k) => (
          <g key={k}>
            <circle
              cx={x}
              cy={y}
              r="14"
              fill="var(--color-paper-2)"
              stroke="var(--accent)"
              strokeOpacity="0.7"
            />
            <circle cx={x} cy={y} r="4" fill="var(--accent)" />
          </g>
        ))}
      </svg>
    );
  }
  // dot lattice with a highlighted diagonal
  return (
    <svg aria-hidden viewBox="0 0 400 400" className={common} preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 12 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => {
          const on = Math.abs(r - c) <= 1;
          return (
            <circle
              key={`${r}-${c}`}
              cx={30 + c * 31}
              cy={30 + r * 31}
              r={on ? 3.5 : 1.6}
              fill="var(--accent)"
              fillOpacity={on ? 0.9 : 0.3}
            />
          );
        }),
      )}
    </svg>
  );
}
