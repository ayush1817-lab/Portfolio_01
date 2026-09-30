import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLightbox } from "../components/Lightbox";
import type { Crop } from "./content";

type Img = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
};

/** Register an image with the page lightbox once. */
function useRegister(img: Img) {
  const lb = useLightbox();
  useEffect(() => {
    lb.register({
      id: img.id,
      src: img.src,
      width: img.width,
      height: img.height,
      alt: img.alt,
      title: img.title,
      caption: img.caption,
    });
  }, [lb, img]);
  return lb;
}

/** Artwork or graphic that opens full size in the lightbox. */
export function ArtFigure({
  img,
  eager,
  className,
  frameClassName,
  maxWidth,
}: {
  img: Img;
  eager?: boolean;
  className?: string;
  frameClassName?: string;
  maxWidth?: number;
}) {
  const lb = useRegister(img);
  return (
    <figure className={cn("mx-auto w-full", className)} style={{ maxWidth }}>
      <button
        type="button"
        data-lightbox-id={img.id}
        data-lightbox-seq=""
        onClick={() => lb.open(img.id)}
        className="group relative block w-full cursor-zoom-in rounded-[20px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-reel-lavender-deep"
      >
        <span className="sr-only">Open full size: {img.title}</span>
        <span className={cn("block overflow-hidden rounded-[20px]", frameClassName)}>
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading={eager ? "eager" : "lazy"}
            decoding={eager ? "sync" : "async"}
            fetchPriority={eager ? "high" : undefined}
            draggable={false}
            className="block h-auto w-full"
          />
        </span>
        <span
          aria-hidden
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-ink opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
    </figure>
  );
}

/**
 * The seven-screen journey graphic. Large screens show it whole. Below `lg`
 * it scrolls sideways at a readable size, with numbered jump buttons and a
 * visible swipe hint, instead of shrinking seven phones to an unreadable strip.
 */
export function JourneyViewer({
  img,
  steps,
}: {
  img: Img;
  steps: { n: string; k: string; x: number; group: boolean }[];
}) {
  const lb = useRegister(img);
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Scroll width used below lg: wide enough that phone UI stays legible.
  const MOBILE_W = 1120;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const jump = (xPct: number) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = (xPct / 100) * el.scrollWidth - el.clientWidth / 2;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <figure className="w-full">
      {/* large screens: the whole graphic */}
      <div className="hidden lg:block">
        <button
          type="button"
          data-lightbox-id={img.id}
          data-lightbox-seq=""
          onClick={() => lb.open(img.id)}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-line bg-reel-cream shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-reel-lavender-deep"
        >
          <span className="sr-only">Open full size: {img.title}</span>
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block h-auto w-full"
          />
          <span
            aria-hidden
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] font-medium text-ink opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 className="h-3.5 w-3.5" /> View full size
          </span>
        </button>
      </div>

      {/* small and medium screens: readable, horizontally scrollable */}
      <div className="lg:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[14px] font-medium text-ink">
            Swipe to see all 7 screens
            <ArrowRight className="h-4 w-4 text-reel-lavender-deep" aria-hidden />
          </p>
          <button
            type="button"
            onClick={() => lb.open(img.id)}
            className="focus-glow inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong px-3 text-[13px] font-medium text-ink"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden /> Full size
          </button>
        </div>
        <div className="relative -mx-5 sm:-mx-8">
          <div
            ref={track}
            role="region"
            aria-label="ReelPick product journey. Scrolls horizontally."
            tabIndex={0}
            className="overflow-x-auto overscroll-x-contain px-5 pb-3 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-reel-lavender-deep sm:px-8"
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="block h-auto max-w-none rounded-2xl border border-line"
              style={{ width: MOBILE_W }}
            />
          </div>
          {/* edge fades signal there is more to scroll */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-reel-cream to-transparent transition-opacity",
              atStart ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-reel-cream to-transparent transition-opacity",
              atEnd ? "opacity-0" : "opacity-100",
            )}
          />
        </div>
        <ol className="mt-4 flex flex-wrap gap-2" aria-label="Jump to a screen">
          {steps.map((s) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => jump(s.x)}
                className={cn(
                  "focus-glow inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-[13px]",
                  s.group
                    ? "border-reel-charcoal bg-reel-charcoal text-paper"
                    : "border-line-strong bg-paper text-ink",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    s.group ? "text-reel-amber" : "text-ink-soft",
                  )}
                >
                  {s.n}
                </span>
                {s.k}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="sr-only">{img.caption}</figcaption>
    </figure>
  );
}

/**
 * A single phone cropped from the journey graphic (CSS only; the source is
 * untouched). Opens the whole journey in the lightbox for context.
 */
export function ScreenCrop({ img, crop, label }: { img: Img; crop: Crop; label: string }) {
  const lb = useLightbox();
  const cropW = (img.width * crop.w) / 100;
  const cropH = (img.height * crop.h) / 100;
  const style: CSSProperties = {
    position: "absolute",
    width: `${(100 / crop.w) * 100}%`,
    maxWidth: "none",
    left: `${(-crop.x / crop.w) * 100}%`,
    top: `${(-crop.y / crop.h) * 100}%`,
  };
  return (
    <figure className="w-full" style={{ maxWidth: Math.round(cropW * 1.5) }}>
      <button
        type="button"
        onClick={() => lb.open(img.id)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-reel-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-reel-lavender-deep"
      >
        <span className="relative block" style={{ aspectRatio: String(cropW / cropH) }}>
          <img
            src={img.src}
            alt={`Screen from the product journey: ${label}. Opens the full journey.`}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={style}
          />
        </span>
      </button>
      <figcaption className="mt-2 text-[13px] leading-snug text-ink-soft">{label}</figcaption>
    </figure>
  );
}
