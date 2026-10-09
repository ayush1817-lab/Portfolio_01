import { useEffect, type CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { assetUrl, isDev } from "../assets";
import { crops, shots, type Crop, type ShotId } from "../content";
import { useLightbox } from "./Lightbox";
import { Pin } from "./Pin";

const FULL: Crop = { x: 0, y: 0, w: 100, h: 100 };

type Props = {
  id: ShotId;
  /** Override the default crop. Pass `null` for the full frame. */
  crop?: Crop | null;
  /** Load immediately (hero); everything else lazy-loads. */
  eager?: boolean;
  /** Show numbered pins + legend. */
  annotate?: boolean;
  /** Hide the caption block (used for small evidence crops and the hero). */
  bare?: boolean;
  /** Theme for caption text when placed on a dark section. */
  tone?: "light" | "dark";
  /** Upper bound for the rendered width in px, before the resolution cap. */
  maxWidth?: number;
  className?: string;
  /** Unique id for the lightbox when the same shot appears twice. */
  instance?: string;
  /** Part of the prev/next story sequence. Repeated crops (hero, evidence) open on their own. */
  sequence?: boolean;
};

/**
 * A real product screenshot in a thin browser frame. Crops are CSS-only, so
 * the lightbox always shows the untouched original. Annotation pins sit in
 * the gutters outside the image with a thin leader line; the same notes are
 * always listed underneath, so pins are never the only way to read them.
 */
export function ProductFigure({
  id,
  crop,
  eager,
  annotate = true,
  bare,
  tone = "light",
  maxWidth = 1200,
  className,
  instance,
  sequence = true,
}: Props) {
  const shot = shots[id];
  const src = assetUrl(shot.file);
  const lb = useLightbox();
  const lbId = instance ?? id;

  useEffect(() => {
    if (!src) return;
    lb.register({
      id: lbId,
      src,
      title: shot.title,
      alt: shot.alt,
      caption: shot.caption,
      width: shot.width,
      height: shot.height,
      annotations: shot.annotations,
    });
  }, [lb, lbId, src, shot]);

  // A screenshot that has not been added yet is left out of the live page.
  if (!src) return null;

  const c = crop === null ? FULL : (crop ?? crops[id] ?? FULL);
  const known = Boolean(shot.width && shot.height);
  const notes = annotate ? (shot.annotations ?? []) : [];

  // Never upscale a text-heavy screenshot past ~1.45x its source pixels.
  const cropPxW = known ? (shot.width! * c.w) / 100 : undefined;
  const width = cropPxW ? Math.min(maxWidth, Math.round(cropPxW * 1.45)) : maxWidth;
  const aspect = known ? (shot.width! * c.w) / (shot.height! * c.h) : undefined;

  const pins = notes
    .filter((a) => a.x !== undefined && a.y !== undefined)
    .map((a) => ({
      ...a,
      px: ((a.x! - c.x) / c.w) * 100,
      py: ((a.y! - c.y) / c.h) * 100,
    }))
    .filter((a) => a.px >= 0 && a.px <= 100 && a.py >= 0 && a.py <= 100);
  const hasPins = pins.length > 0;

  const imgStyle: CSSProperties = known
    ? {
        position: "absolute",
        width: `${(100 / c.w) * 100}%`,
        maxWidth: "none",
        left: `${(-c.x / c.w) * 100}%`,
        top: `${(-c.y / c.h) * 100}%`,
      }
    : { width: "100%", height: "auto" };

  return (
    <figure
      className={cn("@container mx-auto w-full", className)}
      style={{ maxWidth: hasPins ? width + 96 : width }}
    >
      <div className={cn(hasPins && "lg:px-12")}>
        <button
          type="button"
          data-lightbox-id={lbId}
          data-lightbox-seq={sequence ? "" : undefined}
          onClick={() => lb.open(lbId)}
          className="group relative block w-full cursor-zoom-in overflow-visible rounded-[14px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
        >
          <span className="sr-only">Open full-size screenshot: {shot.title}</span>
          <span className="block overflow-hidden rounded-[14px] border border-line-strong bg-paper shadow-frame">
            {/* browser chrome */}
            <span
              aria-hidden
              className="flex h-7 items-center gap-1.5 border-b border-line bg-paper-2 px-3"
            >
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
            </span>
            <span
              className="relative block overflow-hidden bg-paper"
              style={aspect ? { aspectRatio: String(aspect) } : undefined}
            >
              <img
                src={src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading={eager ? "eager" : "lazy"}
                decoding={eager ? "sync" : "async"}
                fetchPriority={eager ? "high" : undefined}
                draggable={false}
                style={imgStyle}
              />
            </span>
          </span>

          {/* expand affordance */}
          <span
            aria-hidden
            className="absolute right-3 top-10 grid h-8 w-8 place-items-center rounded-full border border-line bg-paper text-ink opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </span>

          {/* desktop pins in the gutters, leader line to the target */}
          {hasPins ? (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 top-7 hidden lg:block"
            >
              {pins.map((a) => {
                const left = a.side ? a.side === "left" : a.px < 50;
                return (
                  <span key={a.n} className="absolute inset-x-0" style={{ top: `${a.py}%` }}>
                    <span
                      className="absolute h-px -translate-y-1/2 bg-ink/70"
                      style={
                        left
                          ? { left: "-1.75rem", width: `calc(${a.px}% + 1.75rem)` }
                          : { right: "-1.75rem", width: `calc(${100 - a.px}% + 1.75rem)` }
                      }
                    />
                    <span
                      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-sun"
                      style={{ left: `${a.px}%` }}
                    />
                    <Pin
                      n={a.n}
                      className="absolute -translate-y-1/2"
                      style={left ? { left: "-3rem" } : { right: "-3rem" }}
                    />
                  </span>
                );
              })}
            </span>
          ) : null}
        </button>
      </div>

      {!bare ? (
        <figcaption className={cn("mt-5", hasPins && "lg:px-12")}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className={cn(
                "font-mono text-label uppercase tracking-[0.16em]",
                tone === "dark" ? "text-sun" : "text-cobalt",
              )}
            >
              {shot.title}
            </span>
            <span
              className={cn(
                "text-small leading-relaxed",
                tone === "dark" ? "text-paper/75" : "text-ink-soft",
              )}
            >
              {shot.caption}
            </span>
          </div>
          {notes.length ? (
            <ol className="mt-4 grid gap-x-8 gap-y-2.5 @xl:grid-cols-2 @4xl:grid-cols-3">
              {notes.map((a) => (
                <li
                  key={a.n}
                  className={cn(
                    "flex gap-2.5 text-small leading-snug",
                    tone === "dark" ? "text-paper/85" : "text-ink",
                  )}
                >
                  <Pin n={a.n} size="sm" />
                  <span className="pt-px">{a.label}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
