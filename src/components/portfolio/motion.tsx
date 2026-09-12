import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Shared easing — a long expo ease-out that feels "seamless" rather than snappy. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────
 * Reveal — fades + lifts a block into view the first time it scrolls in.
 * ──────────────────────────────────────────────────────────────── */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = true,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: blur ? "blur(6px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * SplitText — word-by-word mask reveal for headlines.
 * ──────────────────────────────────────────────────────────────── */
type SplitTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean; // animate on scroll-in instead of on mount
};

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  inView = false,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  // The in-view trigger lives on the (unclipped) parent and propagates to the
  // words through variants: a word translated out of its overflow-hidden mask
  // never intersects the viewport on its own, so it could never trigger itself.
  const word = {
    hidden: { y: "110%", rotate: 4, opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger },
    }),
  };
  return (
    <motion.span
      className={cn("inline", className)}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      animate={inView ? undefined : "visible"}
      whileInView={inView ? "visible" : undefined}
      viewport={inView ? { once: true, amount: 0.6 } : undefined}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.24em] -mb-[0.24em] align-bottom"
        >
          <motion.span
            aria-hidden
            custom={i}
            variants={word}
            className={cn(
              // Padding (offset by negative margins) enlarges the background
              // paint box so background-clip:text words keep their descenders.
              "inline-block will-change-transform pt-[0.1em] -mt-[0.1em] pb-[0.22em] -mb-[0.22em]",
              wordClassName,
            )}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span aria-hidden>&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Magnetic — element leans toward the cursor while hovered.
 * ──────────────────────────────────────────────────────────────── */
type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Tilt — subtle 3D tilt that follows the pointer (portrait, cards).
 * ──────────────────────────────────────────────────────────────── */
type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number; // degrees
};

export function Tilt({ children, className, max = 8 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
