import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import photoAsset from "@/assets/ayush-photo.jpeg.png";
import { profile } from "@/content/portfolio";
import { EASE, Magnetic, SplitText, Tilt } from "./motion";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

const facts = [
  { k: "Based in", v: "Dublin, IE" },
  { k: "Studying", v: "MSc HCI · UCD" },
  { k: "Focus", v: "Agentic systems" },
];

const chips = [
  { text: "// product designer", cls: "-left-6 top-10 lg:-left-16" },
  { text: "// agent builder", cls: "-right-4 top-1/3 lg:-right-14" },
  { text: "// hci researcher", cls: "-left-2 bottom-16 lg:-left-10" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      {/* ── backdrop: aurora + grid ─────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute -left-[10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-ember/25 blur-[140px] animate-drift-a" />
        <div className="absolute right-[-15%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-iris/22 blur-[140px] animate-drift-b" />
        <div className="absolute bottom-[-25%] left-[30%] h-[45vmax] w-[45vmax] rounded-full bg-mint/12 blur-[140px] animate-drift-c" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-night" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* ── copy ──────────────────────────────────────────── */}
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full glass py-1.5 pl-2 pr-4 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/80 sm:text-[11px] sm:tracking-[0.18em]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
          >
            <span className="relative grid h-4 w-4 place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-mint animate-ping-soft" />
              <span className="relative h-2 w-2 rounded-full bg-mint" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-cream">
            <span className="block text-[clamp(3.4rem,10vw,7.4rem)]">
              <SplitText text={first} delay={1.45} />
            </span>
            <span className="block text-[clamp(3.4rem,10vw,7.4rem)]">
              <SplitText text={last} delay={1.55} wordClassName="text-shimmer" />
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl font-display text-2xl font-normal leading-[1.15] tracking-[-0.02em] text-cream/90 sm:text-3xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.85 }}
          >
            {profile.role} <span className="font-serif italic text-ember-gradient">building</span>{" "}
            agentic-AI products, workflows, and the SaaS tools I needed but couldn't find.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.05 }}
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={scrollTo("projects")}
                data-cursor="View"
                className="focus-glow group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cream px-6 py-3.5 font-sans text-sm font-semibold tracking-tight text-night shadow-ember transition-transform"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-ember to-amber opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">See the work</span>
                <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#connect"
                onClick={scrollTo("connect")}
                data-cursor="Say hi"
                className="focus-glow group inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-sans text-sm font-semibold tracking-tight text-cream transition-colors duration-300 hover:border-cream/40"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.3 }}
          >
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                  {f.k}
                </dt>
                <dd className="font-sans text-sm font-medium text-cream/90">{f.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── portrait ──────────────────────────────────────── */}
        <motion.div
          style={{ y: yPhoto }}
          className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
        >
          <Tilt className="relative" max={6}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-gradient bg-night-3 shadow-glow">
              <img
                src={photoAsset}
                alt="Portrait of Ayush Ramawat"
                className="h-full w-full scale-[1.12] object-cover object-center saturate-[0.85] contrast-[1.05] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.18]"
                draggable={false}
              />
              {/* duotone wash + vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-ember/60 via-transparent to-iris/60" />

              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60">
                    Feature profile
                  </p>
                  <p className="mt-1 max-w-[200px] font-display text-base font-medium leading-tight text-cream">
                    Where LLMs meet human-computer interaction.
                  </p>
                </div>
              </div>
            </div>

            {/* rotating badge */}
            <div
              className="absolute -bottom-8 -right-4 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="absolute inset-0 rounded-full bg-night/80 backdrop-blur-md ring-1 ring-line-strong" />
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full animate-spin-slow"
              >
                <defs>
                  <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <text className="fill-cream/80 font-mono text-[8.5px] uppercase tracking-[0.28em]">
                  <textPath href="#badge-circle">agentic ai · product design · hci ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <ArrowUpRight className="h-5 w-5 text-amber" />
              </div>
            </div>

            {/* floating mono chips */}
            {chips.map((c, i) => (
              <motion.span
                key={c.text}
                className={`absolute hidden rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80 sm:block ${c.cls}`}
                style={{ transform: "translateZ(60px)" }}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 2.2 + i * 0.15, duration: 0.6 },
                  y: {
                    delay: 2.2 + i * 0.15,
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {c.text}
              </motion.span>
            ))}
          </Tilt>
        </motion.div>
      </div>

      {/* ── scroll cue ────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        style={{ opacity: fade }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-0 bg-cream animate-scroll-cue" />
        </span>
      </motion.div>
    </section>
  );
}
