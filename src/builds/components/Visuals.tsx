import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Box,
  Check,
  FileText,
  ListChecks,
  RotateCw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Waves,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/portfolio/motion";
import { detente, pipeline, type DetenteState, type Step } from "../content";

/** Cycles 0..n-1 while visible; holds `still` under reduced motion. */
function useCycle(n: number, ms: number, still: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(t);
  }, [reduce, inView, n, ms]);
  return { ref, i: reduce ? still : i, reduce };
}

/* ═════════════════════════════ 01 · Pipeline ═════════════════════════════ */

const pipeIcons = [FileText, ListChecks, Search, Sparkles, UserCheck, Send];

/** Card motif: six nodes light up in order; the review node is a human checkpoint. */
export function PipelineMotif({ className }: { className?: string }) {
  const nodes = pipeline.overview;
  const { ref, i } = useCycle(nodes.length + 1, 750, nodes.length);
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative flex h-full w-full flex-col justify-center bg-cobalt-soft p-5",
        className,
      )}
    >
      <div className="relative grid grid-cols-6 gap-1.5">
        <span className="absolute left-[8%] right-[8%] top-5 h-px bg-cobalt/30" />
        {nodes.map((n, k) => {
          const Icon = pipeIcons[k];
          const on = k < i || i === nodes.length;
          const human = "human" in n && n.human;
          return (
            <div key={n.k + k} className="relative flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "relative grid h-10 w-10 place-items-center border transition-colors duration-300",
                  human ? "rotate-45 rounded-lg" : "rounded-full",
                  on
                    ? human
                      ? "border-sun-deep bg-sun text-ink"
                      : "border-cobalt bg-cobalt text-paper"
                    : "border-cobalt/30 bg-paper text-cobalt/60",
                )}
              >
                <Icon className={cn("h-4 w-4", human && "-rotate-45")} />
              </span>
              <span className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink/70">
                {n.k}
              </span>
            </div>
          );
        })}
      </div>
      {/* asset thumbnails produced by the generate step */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {[0, 1, 2, 3].map((k) => (
          <span
            key={k}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border bg-paper transition-all duration-300",
              i >= 4
                ? "border-cobalt/40 text-cobalt opacity-100"
                : "border-line text-ink/30 opacity-60",
            )}
          >
            <Box className="h-4 w-4" />
          </span>
        ))}
        <span
          className={cn(
            "ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-300",
            i >= 5 ? "bg-sun text-ink" : "bg-paper text-ink/50",
          )}
        >
          <UserCheck className="h-3 w-3" /> approved
        </span>
      </div>
    </div>
  );
}

/** Detail page: the eight-step workflow, human checkpoints marked in text and colour. */
export function PipelineSteps({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  return (
    <ol
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="The asset pipeline, step by step"
    >
      {steps.map((s, k) => (
        <motion.li
          key={s.k}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE, delay: (k % 4) * 0.08 }}
          className={cn(
            "flex flex-col rounded-xl border p-4",
            s.gate ? "border-sun-deep/50 bg-sun-soft" : "border-line-strong bg-paper",
          )}
        >
          <span className="flex items-center justify-between font-mono text-[11px] text-ink-soft">
            {String(k + 1).padStart(2, "0")}
            {s.gate ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-sun px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink">
                <UserCheck className="h-3 w-3" aria-hidden /> Human checkpoint
              </span>
            ) : null}
          </span>
          <span className="mt-2 font-display text-[1.1rem] font-semibold leading-tight tracking-[-0.02em]">
            {s.k}
          </span>
          <span className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{s.v}</span>
        </motion.li>
      ))}
    </ol>
  );
}

/* ═════════════════════════════ 02 · Détente ═════════════════════════════ */

const LEDS = 16;
const RED = "#e0483f";
const GREEN = "#2f9e62";
const CALM = "#f3ece0";

/** Positions around an ellipse; rank 0 sits at the front, spreading outwards. */
const leds = Array.from({ length: LEDS }, (_, k) => {
  const t = (k / LEDS) * Math.PI * 2 + Math.PI / 2;
  const x = 160 + 118 * Math.cos(t);
  const y = 104 + 50 * Math.sin(t);
  const d = Math.min(k, LEDS - k);
  return { x, y, back: y < 104, rank: d };
});

/** The bracelet, drawn. Colour is always paired with a text label nearby. */
export function Bracelet({ state, className }: { state: DetenteState; className?: string }) {
  const reduce = useReducedMotion();
  const colour = state === "scroll" ? CALM : state === "recover" ? GREEN : RED;
  const glow = state === "scroll" ? "transparent" : colour;
  return (
    <svg viewBox="0 0 320 210" className={cn("w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="detente-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#efe3cf" />
          <stop offset="0.55" stopColor="#d8c3a1" />
          <stop offset="1" stopColor="#b99c72" />
        </linearGradient>
      </defs>
      {/* back of the band */}
      <ellipse
        cx="160"
        cy="104"
        rx="118"
        ry="50"
        fill="none"
        stroke="#cdb48d"
        strokeWidth="20"
        opacity="0.55"
      />
      {leds
        .filter((l) => l.back)
        .map((l, k) => (
          <circle
            key={`b${k}`}
            cx={l.x}
            cy={l.y}
            r="4.5"
            fill={colour}
            opacity="0.45"
            style={{
              transition: reduce ? undefined : `fill 380ms ease ${l.rank * 70}ms`,
            }}
          />
        ))}
      {/* front of the band */}
      <path
        d="M42 104 A118 50 0 0 0 278 104"
        fill="none"
        stroke="url(#detente-band)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {leds
        .filter((l) => !l.back)
        .map((l, k) => (
          <circle
            key={`f${k}`}
            cx={l.x}
            cy={l.y}
            r="5.5"
            fill={colour}
            stroke="rgba(15,20,36,0.18)"
            strokeWidth="1"
            style={{
              filter: state === "scroll" ? undefined : `drop-shadow(0 0 5px ${glow})`,
              transition: reduce ? undefined : `fill 380ms ease ${l.rank * 70}ms`,
            }}
          />
        ))}
      {/* the face */}
      <rect x="132" y="138" width="56" height="26" rx="13" fill="#1d2232" />
      <rect
        x="140"
        y="146"
        width="40"
        height="10"
        rx="5"
        fill={colour}
        style={{ transition: reduce ? undefined : "fill 380ms ease" }}
      />
      {/* movement cue */}
      {state === "move" ? (
        <g
          fill="none"
          stroke="#1d2232"
          strokeWidth="3"
          strokeLinecap="round"
          className={
            reduce ? undefined : "origin-center animate-[detente-wiggle_1.2s_ease-in-out_infinite]"
          }
          style={{ transformBox: "fill-box" }}
        >
          <path d="M20 70 Q4 104 20 138" />
          <path d="M12 128 L20 138 L30 132" />
          <path d="M300 138 Q316 104 300 70" />
          <path d="M308 80 L300 70 L290 76" />
        </g>
      ) : null}
    </svg>
  );
}

const stateIcon: Record<DetenteState, typeof Smartphone> = {
  scroll: Smartphone,
  signal: Waves,
  move: RotateCw,
  recover: Check,
};

/** Card motif: the bracelet cycling through its four states, each labelled. */
export function DetenteMotif({ className }: { className?: string }) {
  const steps = detente.interaction.steps;
  const { ref, i } = useCycle(steps.length, 1600, 1);
  const s = steps[i];
  const Icon = stateIcon[s.id];
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#fbf6ee_0%,#efe6d8_70%)] p-6",
        className,
      )}
    >
      <Bracelet state={s.id} className="max-w-[300px]" />
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink shadow-soft">
        <Icon className="h-3.5 w-3.5" />
        {String(i + 1).padStart(2, "0")} {s.k} · {s.state}
      </span>
    </div>
  );
}

/**
 * Detail page centrepiece: four labelled steps as tabs. Plays itself while in
 * view (unless motion is reduced) and stops as soon as the visitor takes over.
 */
export function DetenteSequence() {
  const steps = detente.interaction.steps;
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.5 });
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    if (manual || reduce || !inView) return;
    const t = window.setInterval(() => setActive((v) => (v + 1) % steps.length), 2600);
    return () => window.clearInterval(t);
  }, [manual, reduce, inView, steps.length]);

  const choose = (k: number) => {
    setManual(true);
    setActive(k);
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, k: number) => {
    const n = steps.length;
    const to =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (k + 1) % n
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (k - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (to < 0) return;
    e.preventDefault();
    choose(to);
    tabs.current[to]?.focus();
  };

  const s = steps[active];
  const Icon = stateIcon[s.id];
  return (
    <div ref={wrap} className="grid gap-6 lg:grid-cols-12 lg:items-center">
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex flex-col items-center rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_35%,#fbf6ee_0%,#efe6d8_75%)] p-6 sm:p-10 lg:col-span-7"
      >
        <Bracelet state={s.id} className="max-w-[460px]" />
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink shadow-soft">
          <Icon className="h-4 w-4" aria-hidden />
          State: {s.state}
        </p>
        <p
          className="mt-3 max-w-[30rem] text-center text-[15px] leading-relaxed text-ink-soft"
          aria-live="polite"
        >
          {s.v}
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Détente interaction steps"
        className="grid gap-2 lg:col-span-5"
      >
        {steps.map((st, k) => {
          const StepIcon = stateIcon[st.id];
          const on = k === active;
          return (
            <button
              key={st.id}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${k}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(k)}
              onKeyDown={(e) => onKey(e, k)}
              className={cn(
                "focus-glow flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors duration-200",
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong bg-paper text-ink hover:border-ink/40",
              )}
            >
              <span className="font-mono text-[12px] opacity-70">
                {String(k + 1).padStart(2, "0")}
              </span>
              <StepIcon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block font-display text-[1.15rem] font-semibold leading-tight">
                  {st.k}
                </span>
                <span
                  className={cn(
                    "block text-[13px] leading-snug",
                    on ? "text-paper/75" : "text-ink-soft",
                  )}
                >
                  {st.state}
                </span>
              </span>
            </button>
          );
        })}
        <p className="mt-1 text-[13px] text-ink-faint">
          Use the arrow keys or select a step. Colour is always paired with the state name.
        </p>
      </div>
    </div>
  );
}

/* ═════════════════════════════ 03 · Voice agent ═════════════════════════════ */

const STATUSES = ["Listening", "Transcribing", "Thinking", "Running tool", "Speaking"] as const;

function Waveform({
  live,
  bars = 22,
  className,
}: {
  live: boolean;
  bars?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("flex h-10 items-center gap-[3px]", className)}>
      {Array.from({ length: bars }, (_, k) => (
        <span
          key={k}
          className={cn(
            "w-[3px] rounded-full bg-sun",
            live && "animate-[voice-bar_1s_ease-in-out_infinite]",
          )}
          style={{
            height: `${30 + ((k * 37) % 70)}%`,
            animationDelay: `${(k % 7) * 90}ms`,
          }}
        />
      ))}
    </span>
  );
}

/** Card motif: waveform → transcript → tool call, with the agent's status cycling. */
export function VoiceMotif({ className }: { className?: string }) {
  const { ref, i, reduce } = useCycle(STATUSES.length, 1100, 3);
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative flex h-full w-full flex-col justify-center gap-3 bg-ink p-5 text-paper",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-sun">
          <span className="h-1.5 w-1.5 rounded-full bg-sun" />
          {STATUSES[i]}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
          local
        </span>
      </div>
      <Waveform live={!reduce && i <= 1} />
      <p className="self-start rounded-2xl rounded-bl-md bg-paper/10 px-3.5 py-2 text-[14px]">
        “Do I need a jacket?”
      </p>
      <p
        className={cn(
          "inline-flex items-center gap-1.5 self-start rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300",
          i >= 3 ? "border-sun bg-sun text-ink" : "border-paper/25 text-paper/60",
        )}
      >
        <ArrowRight className="h-3 w-3" /> tool: weather lookup
      </p>
    </div>
  );
}

/** Detail page: two illustrative turns, a read (no confirmation) and a write (confirmation gate). */
export function VoiceSession() {
  const { ref, i, reduce } = useCycle(STATUSES.length, 1300, STATUSES.length - 1);
  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-[1.5rem] bg-ink p-5 text-paper sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">
          Illustrative · read
        </p>
        <ol className="flex flex-wrap gap-1.5" aria-label="Agent states">
          {STATUSES.map((st, k) => (
            <li
              key={st}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300",
                k === i
                  ? "bg-sun text-ink"
                  : k < i
                    ? "bg-paper/15 text-paper/80"
                    : "bg-paper/5 text-paper/40",
              )}
            >
              {st}
            </li>
          ))}
        </ol>
        <Waveform live={!reduce && i <= 1} bars={30} />
        <p className="self-start rounded-2xl rounded-bl-md bg-paper/10 px-4 py-2.5 text-[15px]">
          “Do I need a jacket?”
        </p>
        <p className="self-start rounded-lg border border-sun bg-sun/10 px-3 py-1.5 font-mono text-[12px] text-sun">
          → tool: weather lookup <span className="text-paper/60">(simulated)</span>
        </p>
        <p className="text-[14px] leading-relaxed text-paper/75">
          The user never said “weather”. The model chose the tool because of how its description
          says when to use it.
        </p>
      </div>
      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-line-strong bg-paper p-5 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Illustrative · write
        </p>
        <p className="self-start rounded-2xl rounded-bl-md bg-paper-3 px-4 py-2.5 text-[15px]">
          “Add that to my notes.”
        </p>
        <div className="rounded-xl border border-sun-deep/50 bg-sun-soft p-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-sun-deep">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Confirmation gate
          </p>
          <p className="mt-2 text-[15px] text-ink">
            The agent asks before writing to the local notes file.
          </p>
          <div className="mt-3 flex gap-2" aria-hidden>
            <span className="rounded-full bg-ink px-3 py-1 text-[13px] text-paper">
              Yes, write it
            </span>
            <span className="rounded-full border border-line-strong px-3 py-1 text-[13px] text-ink">
              Cancel
            </span>
          </div>
        </div>
        <p className="self-start rounded-lg border border-line-strong px-3 py-1.5 font-mono text-[12px] text-ink">
          → tool: write note <span className="text-ink-soft">(after confirmation)</span>
        </p>
        <p className="text-[14px] leading-relaxed text-ink-soft">
          Reading is low risk and runs straight away. Changing something needs a yes first.
        </p>
      </div>
    </div>
  );
}

/** Fixed route versus capabilities inside a boundary. */
export function RoutesCompare({ workflow, agent }: { workflow: string[]; agent: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.5rem] border border-line-strong bg-paper-2 p-5 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Workflow tool · the designer sets the route
        </p>
        <ol
          className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
          aria-label="A fixed route"
        >
          {workflow.map((w, k) => (
            <li key={w} className="flex items-center gap-2">
              <span className="rounded-lg border border-line-strong bg-paper px-3 py-2 text-[15px]">
                {w}
              </span>
              {k < workflow.length - 1 ? (
                <ArrowRight className="h-4 w-4 rotate-90 text-ink/40 sm:rotate-0" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-[1.5rem] border-2 border-dashed border-cobalt/60 bg-cobalt-soft p-5 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt">
          This agent · you set the boundary
        </p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Capabilities the model can choose from"
        >
          {agent.map((a) => (
            <li
              key={a}
              className="rounded-full bg-paper px-3 py-1.5 text-[15px] text-ink shadow-soft"
            >
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-ink-soft">The model picks the route at runtime.</p>
      </div>
    </div>
  );
}
