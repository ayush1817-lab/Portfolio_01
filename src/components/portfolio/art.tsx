import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The site's vector layer: a "sun and blueprint" motif in the brand colours.
 * Lines draw themselves once as they enter the screen, shapes settle into
 * place, and nothing loops. Under reduced motion every piece shows its end
 * state at once. All of it is decoration, hidden from assistive tech.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Props for a stroke that draws itself once when it scrolls into view. */
function useDraw() {
  const reduce = useReducedMotion();
  return (delay = 0, duration = 1.4) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: {
            pathLength: { duration, ease: EASE, delay },
            opacity: { duration: 0.2, delay },
          },
        };
}

/** Props for a shape that settles into place once. */
function useSettle() {
  const reduce = useReducedMotion();
  return (delay = 0, from: { x?: number; y?: number; scale?: number; rotate?: number } = {}) =>
    reduce
      ? {}
      : {
          initial: {
            opacity: 0,
            x: from.x ?? 0,
            y: from.y ?? 16,
            scale: from.scale ?? 1,
            rotate: from.rotate ?? 0,
          },
          whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.9, ease: EASE, delay },
        };
}

/* ────────────────────────────────────────────────────────────────
 * InView: the one scroll-in used across the site. A fade with a 16px
 * rise, staggered by `i`, once.
 * ──────────────────────────────────────────────────────────────── */
export function InView({
  children,
  i = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.07, 0.35) }}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────
 * DotGrid: a blueprint dot pattern that fades out toward one corner.
 * Colour comes from `currentColor`, so it sits on any paper.
 * ──────────────────────────────────────────────────────────────── */
export function DotGrid({
  className,
  fade = "to-bottom-left",
  gap = 22,
}: {
  className?: string;
  fade?: "to-bottom-left" | "to-bottom-right" | "radial";
  gap?: number;
}) {
  const mask =
    fade === "radial"
      ? "radial-gradient(ellipse 70% 70% at 50% 40%, black 10%, transparent 75%)"
      : fade === "to-bottom-right"
        ? "linear-gradient(to bottom right, black 0%, transparent 70%)"
        : "linear-gradient(to bottom left, black 0%, transparent 70%)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.3px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────────
 * HeroArt: behind the preview frame. A sun rising behind the frame,
 * orbit arcs drawing round it, a registration square and a triangle
 * that settle into place, and a dashed path that ties them together.
 * ──────────────────────────────────────────────────────────────── */
export function HeroArt({ className }: { className?: string }) {
  const draw = useDraw();
  const settle = useSettle();
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 700"
      fill="none"
      className={cn("pointer-events-none absolute overflow-visible", className)}
    >
      {/* the sun */}
      <motion.circle
        cx="500"
        cy="110"
        r="96"
        className="fill-sun"
        {...settle(0.3, { y: 60, scale: 0.85 })}
      />
      {/* orbits */}
      <motion.path
        d="M500 -40 A150 150 0 1 1 499.9 -40"
        className="stroke-cobalt"
        strokeWidth="1.5"
        strokeOpacity="0.35"
        {...draw(0.5, 1.8)}
      />
      <motion.path
        d="M500 -110 A220 220 0 0 1 720 110"
        className="stroke-cobalt"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        strokeOpacity="0.45"
        {...draw(0.7, 1.6)}
      />
      {/* registration square, offset from the frame's corner */}
      <motion.rect
        x="-34"
        y="420"
        width="120"
        height="120"
        rx="18"
        className="stroke-cobalt"
        strokeWidth="2"
        {...settle(0.6, { x: -24, y: 24, rotate: -8 })}
      />
      {/* a small triangle */}
      <motion.path
        d="M560 610 L600 680 L520 680 Z"
        className="fill-cobalt"
        {...settle(0.8, { y: 30, rotate: 20 })}
      />
      {/* the dashed path from sun to square */}
      <motion.path
        d="M440 190 C 300 260, 620 420, 420 520 S 120 520, 60 600"
        className="stroke-ink"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
        {...draw(0.9, 2)}
      />
      {/* plus marks, like crop marks on a print */}
      {[
        [40, 40],
        [590, 360],
        [-30, 250],
      ].map(([x, y], k) => (
        <motion.path
          key={k}
          d={`M${x - 9} ${y} H${x + 9} M${x} ${y - 9} V${y + 9}`}
          className="stroke-ink"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
          {...draw(1 + k * 0.15, 0.5)}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Stroke: a hand-set sun underline that draws under a heading.
 * ──────────────────────────────────────────────────────────────── */
export function Stroke({
  className,
  tone = "sun",
}: {
  className?: string;
  tone?: "sun" | "cobalt" | "paper";
}) {
  const draw = useDraw();
  return (
    <svg aria-hidden viewBox="0 0 240 18" fill="none" className={cn("h-4 w-40", className)}>
      <motion.path
        d="M3 12 C 50 4, 90 4, 130 9 S 210 16, 237 6"
        className={
          tone === "sun" ? "stroke-sun" : tone === "cobalt" ? "stroke-cobalt" : "stroke-paper"
        }
        strokeWidth="5"
        strokeLinecap="round"
        {...draw(0.15, 0.9)}
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Path glyphs for About: one line drawing per step of the journey.
 * Mathematics (a curve on axes), 3D animation (a wireframe cube),
 * HCI (a pointer meeting an eye), Product design (a layout grid).
 * ──────────────────────────────────────────────────────────────── */
const glyphs: Record<string, string[]> = {
  Mathematics: ["M8 56 H72", "M14 62 V6", "M14 44 C 28 6, 40 6, 48 30 S 64 56, 72 18"],
  "3D animation": [
    "M20 26 L44 14 L68 26 L44 38 Z",
    "M20 26 V54 L44 66 V38",
    "M68 26 V54 L44 66",
    "M20 54 L44 42 L68 54",
  ],
  HCI: [
    "M10 40 C 22 22, 58 22, 70 40 C 58 58, 22 58, 10 40 Z",
    "M40 40 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0",
    "M50 50 L50 68 L55 63 L60 72 L64 70 L59 61 L66 60 Z",
  ],
  "Product design": [
    "M10 10 H70 V70 H10 Z",
    "M10 24 H70",
    "M24 24 V70",
    "M32 34 H62 V48 H32 Z",
    "M32 56 H50",
  ],
};

export function PathGlyph({ step, i, current }: { step: string; i: number; current?: boolean }) {
  const draw = useDraw();
  const lines = glyphs[step] ?? [];
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 80"
      fill="none"
      className={cn(
        "h-16 w-16 rounded-2xl p-2 sm:h-20 sm:w-20",
        current ? "bg-sun" : "bg-cobalt-soft",
      )}
    >
      {lines.map((d, k) => (
        <motion.path
          key={k}
          d={d}
          className={current ? "stroke-ink" : "stroke-cobalt"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw(0.2 + i * 0.25 + k * 0.08, 0.8)}
        />
      ))}
    </svg>
  );
}

/** The dashed line that runs through the four path glyphs. */
export function PathLine({ className }: { className?: string }) {
  const draw = useDraw();
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      fill="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <motion.path
        d="M0 20 C 160 0, 330 40, 500 20 S 840 0, 1000 20"
        className="stroke-cobalt"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeDasharray="3 9"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(0.1, 1.8)}
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
 * QuoteMark: a large drawn quote glyph behind the lead testimonial.
 * ──────────────────────────────────────────────────────────────── */
export function QuoteMark({ className }: { className?: string }) {
  const settle = useSettle();
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 120 90"
      className={cn("pointer-events-none absolute fill-sun", className)}
      {...settle(0.1, { y: 20, rotate: -6 })}
    >
      <path d="M0 90 V52 C0 22 14 6 46 0 L50 14 C34 20 28 30 28 44 H50 V90 Z" />
      <path d="M68 90 V52 C68 22 82 6 114 0 L118 14 C102 20 96 30 96 44 H118 V90 Z" />
    </motion.svg>
  );
}

/* ────────────────────────────────────────────────────────────────
 * SunRise: for the cobalt contact band. A sun climbs from the band's
 * edge while thin rays and two orbit rings draw around it.
 * ──────────────────────────────────────────────────────────────── */
export function SunRise({ className }: { className?: string }) {
  const draw = useDraw();
  const settle = useSettle();
  const rays = Array.from({ length: 12 }, (_, k) => {
    const a = (Math.PI / 11) * k + Math.PI; // a fan over the top half
    const r1 = 190;
    const r2 = 250 + (k % 2) * 30;
    return `M${300 + r1 * Math.cos(a)} ${300 + r1 * Math.sin(a)} L${300 + r2 * Math.cos(a)} ${300 + r2 * Math.sin(a)}`;
  });
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 340"
      fill="none"
      className={cn("pointer-events-none absolute overflow-visible", className)}
    >
      <motion.circle cx="300" cy="300" r="150" className="fill-sun" {...settle(0.1, { y: 120 })} />
      <motion.path
        d="M90 300 A210 210 0 0 1 510 300"
        className="stroke-paper"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        {...draw(0.5, 1.4)}
      />
      <motion.path
        d="M20 300 A280 280 0 0 1 580 300"
        className="stroke-paper"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        {...draw(0.7, 1.6)}
      />
      {rays.map((d, k) => (
        <motion.path
          key={k}
          d={d}
          className="stroke-sun"
          strokeWidth="3"
          strokeLinecap="round"
          {...draw(0.6 + k * 0.05, 0.5)}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Scribble: a looping line drawn under the footer statement.
 * ──────────────────────────────────────────────────────────────── */
export function Scribble({ className }: { className?: string }) {
  const draw = useDraw();
  return (
    <svg aria-hidden viewBox="0 0 520 60" fill="none" className={cn("h-auto w-full", className)}>
      <motion.path
        d="M4 40 C 60 10, 110 10, 120 34 S 90 58, 80 40 S 150 6, 220 30 S 300 50, 340 28 S 420 4, 516 30"
        className="stroke-cobalt"
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(0.2, 1.6)}
      />
    </svg>
  );
}
