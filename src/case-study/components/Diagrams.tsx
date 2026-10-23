import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/portfolio/motion";

/* Once-only reveal for diagram parts; motion is skipped when reduced. */
function useStagger() {
  const reduce = useReducedMotion();
  return (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, ease: EASE, delay: i * 0.07 },
        };
}

type Node = { k: string; v: string; warn?: boolean; human?: boolean };

/**
 * A left-to-right process. Below `md` it becomes a compact two-column grid
 * (three on small tablets), read left to right, so a six-step flow takes a
 * few rows instead of a full phone screen.
 * `warn` nodes mark friction; `human` nodes mark the candidate's decisions.
 */
export function Flow({
  nodes,
  label,
  dark,
  vertical,
  grid,
  className,
}: {
  nodes: Node[];
  label: string;
  dark?: boolean;
  /** Always stack top-to-bottom (for narrow sidebars). */
  vertical?: boolean;
  /** Stay a grid on wide screens too (for a half-width column). */
  grid?: boolean;
  className?: string;
}) {
  const s = useStagger();
  const arrows = !vertical && !grid;
  return (
    <ol
      aria-label={label}
      className={cn(
        vertical ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2 sm:grid-cols-3",
        arrows && "md:flex md:flex-row md:items-stretch md:gap-0",
        className,
      )}
    >
      {nodes.map((node, i) => (
        <Fragment key={`${node.k}-${i}`}>
          <motion.li
            {...s(i)}
            className={cn(
              "flex flex-1 flex-col justify-center rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3.5",
              arrows && "md:min-w-0",
              node.warn
                ? "border-warn/60 bg-warn-soft"
                : node.human
                  ? "border-cobalt bg-cobalt-soft"
                  : dark
                    ? "border-paper/20 bg-paper/[0.04]"
                    : "border-line-strong bg-paper",
            )}
          >
            <span
              className={cn(
                "font-mono text-label font-medium uppercase tracking-[0.14em]",
                node.warn
                  ? "text-warn"
                  : node.human
                    ? "text-cobalt"
                    : dark
                      ? "text-sun"
                      : "text-ink",
              )}
            >
              {node.k}
            </span>
            <span
              className={cn(
                "mt-1 text-small leading-snug",
                node.warn || node.human ? "text-ink" : dark ? "text-paper/80" : "text-ink-soft",
              )}
            >
              {node.v}
            </span>
          </motion.li>
          {i < nodes.length - 1 && (vertical || arrows) ? (
            <li
              aria-hidden
              className={cn(
                "items-center justify-center",
                vertical ? "flex" : "hidden md:flex md:px-1.5",
              )}
            >
              {vertical ? (
                <ArrowDown className={cn("h-4 w-4", dark ? "text-paper/50" : "text-ink/40")} />
              ) : (
                <ArrowRight className={cn("h-4 w-4", dark ? "text-paper/50" : "text-ink/40")} />
              )}
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}

/** Product evolution V1 → V4: horizontal rail on large screens, vertical rail on small. */
export function EvolutionTimeline({
  stages,
}: {
  stages: { tag: string; k: string; q: string; v: string }[];
}) {
  const s = useStagger();
  return (
    <ol aria-label="Product evolution" className="relative grid gap-0 lg:grid-cols-4 lg:gap-6">
      {/* rails */}
      <span
        aria-hidden
        className="absolute bottom-3 left-[11px] top-3 w-px bg-line-strong lg:hidden"
      />
      <span
        aria-hidden
        className="absolute left-0 right-0 top-[11px] hidden h-px bg-line-strong lg:block"
      />
      {stages.map((st, i) => (
        <motion.li
          key={st.tag}
          {...s(i)}
          className="relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12"
        >
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border-2 bg-paper",
              i === stages.length - 1 ? "border-cobalt" : "border-ink",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                i === stages.length - 1 ? "bg-cobalt" : "bg-ink",
              )}
            />
          </span>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-cobalt">
            {st.tag} · {st.k}
          </p>
          <p className="mt-2 font-display text-h4 font-semibold leading-tight tracking-[-0.02em] text-ink">
            {st.q}
          </p>
          <p className="mt-3 text-small leading-relaxed text-ink-soft">{st.v}</p>
        </motion.li>
      ))}
    </ol>
  );
}

/**
 * Narrowing funnel. Desktop: columns with falling bars. Mobile: stacked rows
 * with shrinking bars. Bars are illustrative steps; the numbers are real.
 */
export function StatFunnel({
  stages,
  label,
  className,
}: {
  stages: { value: string; label: string; note?: string; human?: boolean }[];
  label: string;
  className?: string;
}) {
  const s = useStagger();
  const size = stages.length === 3 ? [100, 55, 18] : [100, 42, 12, 12];
  return (
    <ol
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-6 md:gap-5",
        stages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
        className,
      )}
    >
      {stages.map((st, i) => {
        const fill = st.human ? "bg-cobalt" : i === 0 ? "bg-ink" : "bg-ink/60";
        return (
          <motion.li key={`${st.label}-${i}`} {...s(i)} className="flex flex-col">
            <div aria-hidden className="mb-4 hidden h-24 items-end md:flex">
              <div className={cn("w-full rounded-md", fill)} style={{ height: `${size[i]}%` }} />
            </div>
            <p
              className={cn(
                "font-display text-stat font-semibold leading-none tracking-[-0.04em]",
                st.human ? "text-cobalt" : "text-ink",
              )}
            >
              {st.value}
            </p>
            <p className="mt-2 font-mono text-label uppercase tracking-[0.16em] text-ink">
              {st.label}
            </p>
            <div aria-hidden className="mt-3 h-2 w-full rounded-full bg-paper-3 md:hidden">
              <div className={cn("h-full rounded-full", fill)} style={{ width: `${size[i]}%` }} />
            </div>
            {st.note ? (
              <p className="mt-2 text-small leading-snug text-ink-soft">{st.note}</p>
            ) : null}
          </motion.li>
        );
      })}
    </ol>
  );
}

/** The recurring principle, set large on a solid yellow band. */
export function PrincipleBand({ line, sub }: { line: string[]; sub: string }) {
  return (
    <section
      aria-label="Design principle"
      className="bg-sun px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-page">
        <p className="font-mono text-label uppercase tracking-[0.18em] text-ink/70">
          The principle
        </p>
        <p className="mt-5 font-display text-h1 font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
          {line[0]}
          <br />
          <span className="font-serif font-normal italic tracking-[-0.01em]">{line[1]}</span>
        </p>
        <p className="mt-6 max-w-read text-read text-ink/80">{sub}</p>
      </div>
    </section>
  );
}
