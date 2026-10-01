import {
  Building2,
  Gamepad2,
  HeartHandshake,
  Quote,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { testimonials, type Testimonial } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./motion";
import { cn } from "@/lib/utils";

/** Soft, lit-from-above gradients so each avatar reads as a small 3D bead. */
const toneStyle: Record<Testimonial["tone"], { ball: string; ink: string }> = {
  cobalt: {
    ball: "radial-gradient(circle at 32% 26%, #8fb0ff 0%, #2f5fe6 42%, #1638a6 100%)",
    ink: "text-paper",
  },
  sun: {
    ball: "radial-gradient(circle at 32% 26%, #fff1b8 0%, #ffc93c 45%, #d99a00 100%)",
    ink: "text-ink",
  },
  sage: {
    ball: "radial-gradient(circle at 32% 26%, #d5ecdc 0%, #6fa585 45%, #3d6450 100%)",
    ink: "text-paper",
  },
  lilac: {
    ball: "radial-gradient(circle at 32% 26%, #efe6ff 0%, #a994d8 45%, #5e4a8c 100%)",
    ink: "text-paper",
  },
};

const orgIcon = (org = ""): LucideIcon => {
  const o = org.toLowerCase();
  if (o.includes("oaks")) return Gamepad2;
  if (o.includes("clinic")) return Stethoscope;
  if (o.includes("conscious")) return HeartHandshake;
  return Building2;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Code-drawn avatar: initials on a shaded bead, with an organisation badge. No photos. */
function Avatar({ t }: { t: Testimonial }) {
  const s = toneStyle[t.tone];
  const Icon = orgIcon(t.org);
  return (
    <span aria-hidden className="relative inline-block h-14 w-14 shrink-0">
      <span
        className={cn(
          "grid h-full w-full place-items-center rounded-full font-display text-[1.15rem] font-semibold tracking-[-0.02em]",
          s.ink,
        )}
        style={{
          background: s.ball,
          boxShadow:
            "inset -4px -6px 10px rgba(15,20,36,0.22), inset 3px 4px 8px rgba(255,255,255,0.35), 0 8px 18px -8px rgba(15,20,36,0.45)",
        }}
      >
        {initials(t.name)}
      </span>
      <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-paper text-ink shadow-soft ring-1 ring-line">
        <Icon className="h-3.5 w-3.5" />
      </span>
    </span>
  );
}

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section
      id="testimonials"
      aria-label="What people say"
      className="relative py-14 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="04"
          label="Kind words"
          title="What people"
          italic="say."
          caption="Feedback from managers, founders and teammates I've worked with."
        />

        {/* Phones: one swipeable row. Larger screens: a two-column grid. */}
        <ul className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className="w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <Reveal delay={(i % 2) * 0.08} y={24} blur={false} className="h-full">
                <figure className="flex h-full flex-col rounded-[1.75rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
                  <Quote aria-hidden className="h-7 w-7 text-sun" />
                  <blockquote className="mt-4 flex-1 font-display text-[1.1rem] font-medium leading-[1.45] tracking-[-0.01em] text-ink sm:text-[1.25rem]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                    <Avatar t={t} />
                    <span className="min-w-0">
                      <span className="block font-display text-[1.05rem] font-semibold leading-tight text-ink">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">
                        {[t.role, t.org].filter(Boolean).join(", ")}
                      </span>
                      {t.relation ? (
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                          {t.relation}
                        </span>
                      ) : null}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
