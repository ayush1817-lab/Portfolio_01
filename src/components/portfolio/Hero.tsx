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
  { text: "// hci researcher", cls: "-left-4 top-[56%] lg:-left-14" },
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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32"
    >
      {/* ── backdrop: blueprint grid + two crisp shapes ─────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute -right-[12vmax] top-[8%] h-[42vmax] w-[42vmax] rounded-full bg-sun-soft" />
        <div className="absolute -left-[14vmax] bottom-[-18vmax] h-[36vmax] w-[36vmax] rounded-full border border-cobalt/15" />
      </div>

      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-center gap-12 px-5 sm:gap-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* ── copy ──────────────────────────────────────────── */}
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full surface py-1.5 pl-2 pr-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/80 sm:text-[11px] sm:tracking-[0.18em]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
          >
            <span className="relative grid h-4 w-4 place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-cobalt animate-ping-soft" />
              <span className="relative h-2 w-2 rounded-full bg-cobalt" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-ink">
            <span className="block text-[clamp(3.4rem,2rem+6.4vw,9.5rem)]">
              <SplitText text={first} delay={1.45} />
            </span>
            <span className="block text-[clamp(3.4rem,2rem+6.4vw,9.5rem)]">
              <SplitText text={last} delay={1.55} wordClassName="text-cobalt" />
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-[18em] lg:max-w-[16em] xl:max-w-[18em] font-display text-2xl font-normal leading-[1.15] tracking-[-0.02em] text-ink/90 sm:text-3xl xl:text-[clamp(1.875rem,0.6rem+1.6vw,2.4rem)]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.85 }}
          >
            {profile.role} <span className="font-serif italic highlight">building</span> agentic-AI
            products, workflows, and the SaaS tools I needed but couldn't find.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.05 }}
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                onClick={scrollTo("projects")}
                data-cursor="View"
                className="focus-glow group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-4 sm:inline-flex sm:w-auto sm:py-3.5 font-sans text-sm font-semibold tracking-tight text-paper shadow-lift transition-transform"
              >
                <span className="absolute inset-0 bg-cobalt opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">See the work</span>
                <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#connect"
                onClick={scrollTo("connect")}
                data-cursor="Say hi"
                className="focus-glow group flex w-full items-center justify-center gap-2 rounded-full surface px-6 py-4 sm:inline-flex sm:w-auto sm:py-3.5 font-sans text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:border-ink/40"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-line pt-6 sm:mt-12 sm:gap-4 xl:max-w-xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.3 }}
          >
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  {f.k}
                </dt>
                <dd className="font-sans text-[13px] font-medium leading-snug text-ink/90 sm:text-sm">
                  {f.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── portrait ──────────────────────────────────────── */}
        <motion.div
          style={{ y: yPhoto }}
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:col-span-5 lg:max-w-none lg:pr-8"
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
        >
          <Tilt className="relative" max={6}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-paper-3 shadow-soft">
              <img
                src={photoAsset}
                alt="Portrait of Ayush Ramawat"
                className="h-full w-full scale-[1.12] object-cover object-center grayscale-[35%] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.18]"
                draggable={false}
              />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <div className="rounded-2xl bg-paper px-4 py-3 shadow-soft">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                    Feature profile
                  </p>
                  <p className="mt-1 max-w-[200px] font-display text-base font-medium leading-tight text-ink">
                    Where LLMs meet human-computer interaction.
                  </p>
                </div>
              </div>
            </div>

            {/* rotating badge */}
            <div
              className="absolute -bottom-8 -right-2 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="absolute inset-0 rounded-full bg-sun shadow-soft" />
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full animate-spin-slow"
              >
                <defs>
                  <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <text className="fill-ink/80 font-mono text-[8.5px] uppercase tracking-[0.28em]">
                  <textPath href="#badge-circle">agentic ai · product design · hci ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <ArrowUpRight className="h-5 w-5 text-ink" />
              </div>
            </div>

            {/* floating mono chips */}
            {chips.map((c, i) => (
              <motion.span
                key={c.text}
                className={`absolute hidden rounded-full surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/80 sm:block ${c.cls}`}
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
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-0 bg-ink animate-scroll-cue" />
        </span>
      </motion.div>
    </section>
  );
}
