import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { experience } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { EASE, Reveal } from "./motion";

const journey = ["Mathematics", "Animation", "HCI", "Product design"];

const paragraphs = [
  "I'm Ayush, a master's student in Human-Computer Interaction at University College Dublin. I design and build AI products, with a particular interest in how people understand, guide, and stay in control of automated systems.",
  "My path into product design started with mathematics, moved through animation, and led me to HCI. That background shapes how I approach a product: thinking through its logic, paying attention to interaction, and making ideas tangible through working prototypes.",
  "Many of my projects begin with something I've struggled with myself. My job search led to OptiApply; my design work led to FontPaste. I build, put ideas into use, and learn where the experience needs to change.",
];

export function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" aria-label="About" className="relative py-24 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-1/3 -z-10 h-[50vmax] w-[50vmax] rounded-full bg-iris/10 blur-[160px]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── sticky heading + journey ────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading index="01" label="About" title="A designer who" italic="builds." />

              <Reveal delay={0.3} className="mt-12">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                  The path so far
                </p>
                <ol className="relative flex flex-col gap-0">
                  {journey.map((step, i) => {
                    const last = i === journey.length - 1;
                    return (
                      <li key={step} className="relative flex items-stretch gap-4">
                        <div className="flex w-5 flex-col items-center">
                          <span
                            className={`relative mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                              last
                                ? "bg-ember shadow-ember"
                                : "border border-line-strong bg-night-3"
                            }`}
                          >
                            {last ? (
                              <span className="absolute inset-0 rounded-full bg-ember animate-ping-soft" />
                            ) : null}
                          </span>
                          {!last ? (
                            <motion.span
                              className="my-1 w-px flex-1 origin-top bg-gradient-to-b from-line-strong to-ember/60"
                              initial={reduce ? false : { scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true, amount: 0.8 }}
                              transition={{ duration: 0.9, ease: EASE, delay: 0.15 * i }}
                            />
                          ) : null}
                        </div>
                        <div className="pb-6">
                          <p
                            className={`font-display text-xl font-medium tracking-tight ${last ? "text-cream" : "text-cream/70"}`}
                          >
                            {step}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </Reveal>
            </div>
          </div>

          {/* ── bio + experience ─────────────────────────────── */}
          <div className="flex flex-col gap-16 lg:col-span-7 lg:pt-3">
            <div className="flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p
                    className={`leading-relaxed ${
                      i === 0
                        ? "font-display text-2xl font-normal tracking-[-0.015em] text-cream sm:text-[1.7rem] sm:leading-snug"
                        : "text-base text-mist sm:text-lg"
                    }`}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                    Experience
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                    {String(experience.length).padStart(2, "0")} roles
                  </p>
                </div>
              </Reveal>
              <ul className="flex flex-col gap-4">
                {experience.map((e, i) => (
                  <Reveal key={e.year} delay={0.12 * i} y={20}>
                    <li className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-cream/25 sm:p-7">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-ember/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      />
                      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
                        <div className="sm:col-span-3">
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                            {e.year}
                          </span>
                        </div>
                        <div className="sm:col-span-9">
                          <h3 className="font-display text-2xl font-semibold tracking-tight text-cream">
                            {e.role}
                          </h3>
                          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                            {e.org}
                          </p>
                          <p className="mt-4 text-[15px] leading-relaxed text-cream/75">{e.note}</p>
                        </div>
                      </div>
                      <ArrowRight className="absolute right-6 top-6 h-4 w-4 -translate-x-2 text-cream/0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-cream/60" />
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
