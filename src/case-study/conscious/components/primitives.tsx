import type { ReactNode } from "react";
import { ChevronDown, Compass, GitFork, ImageIcon, MapPin, User, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/portfolio/motion";
import { assets, type Asset, type AssetKey, type Ownership } from "../content";

/* ────────────────────────────────────────────────────────────────
 * Asset resolution: any file in src/assets/conscious/ whose name matches
 * a manifest entry replaces that slot's placeholder automatically.
 * ──────────────────────────────────────────────────────────────── */
const files = import.meta.glob("../../../assets/conscious/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const byName: Record<string, string> = {};
const stem = (name: string) => name.replace(/\.[^.]+$/, "");
for (const [path, url] of Object.entries(files)) byName[stem(path.split("/").pop()!)] = url;

/** Matches on the file stem, so any supported extension works for a slot. */
function assetSrc(a: Asset): string | undefined {
  return byName[stem(a.file)];
}

/* ────────────────────────────────────────────────────────────────
 * MotionReveal — once-only opacity + 16px lift. Static under reduced motion.
 * ──────────────────────────────────────────────────────────────── */
export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────
 * SectionShell — landmark section with the page's spacing and tones.
 * ──────────────────────────────────────────────────────────────── */
type Tone = "cream" | "paper" | "sage" | "warm" | "forest" | "lilac";

const toneClass: Record<Tone, string> = {
  cream: "bg-cc-cream text-cc-forest",
  paper: "bg-paper text-cc-forest",
  sage: "bg-cc-sage-soft text-cc-forest",
  warm: "bg-cc-coral-soft text-cc-forest",
  lilac: "bg-cc-lilac-soft text-cc-forest",
  forest: "bg-cc-forest text-cc-cream",
};

export function SectionShell({
  id,
  label,
  tone = "cream",
  pause,
  children,
  className,
}: {
  id: string;
  /** Accessible name for the landmark. */
  label: string;
  tone?: Tone;
  /** Extra breathing room for turning points. */
  pause?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative scroll-mt-24 px-5 sm:px-8 lg:px-10",
        pause ? "py-[clamp(5rem,12vw,11rem)]" : "py-[clamp(4rem,9vw,8.5rem)]",
        toneClass[tone],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-page">{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
 * OwnershipLabel — always visible text plus a distinct icon, so the
 * label never depends on colour alone.
 * ──────────────────────────────────────────────────────────────── */
const ownershipStyle: Record<Ownership, { cls: string; icon: typeof User }> = {
  "MY ROLE": { cls: "border-cc-coral-deep bg-cc-coral-soft text-cc-coral-deep", icon: User },
  TEAM: { cls: "border-cc-sage-deep bg-cc-sage-soft text-cc-sage-deep", icon: Users },
  DECISION: { cls: "border-cc-lilac-deep bg-cc-lilac-soft text-cc-lilac-deep", icon: GitFork },
  "TEAM + MY ROLE": { cls: "border-cc-sage-deep bg-paper text-cc-forest", icon: Users },
  "INDEPENDENT EXTENSION": { cls: "border-cc-forest bg-cc-forest text-cc-cream", icon: Compass },
  CONTEXT: { cls: "border-cc-forest-soft bg-paper text-cc-forest-soft", icon: MapPin },
};

export function OwnershipLabel({
  label,
  onDark,
  className,
}: {
  label: Ownership;
  onDark?: boolean;
  className?: string;
}) {
  const s = ownershipStyle[label];
  const Icon = s.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
        onDark && label !== "INDEPENDENT EXTENSION"
          ? "border-cc-cream/40 bg-transparent text-cc-cream"
          : onDark
            ? "border-cc-cream bg-cc-cream text-cc-forest"
            : s.cls,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {label === "TEAM + MY ROLE" ? (
        <>
          TEAM <span aria-hidden>+</span>
          <span className="sr-only">plus</span> MY ROLE
        </>
      ) : (
        label
      )}
    </span>
  );
}

/** Eyebrow row: chapter number, section name and ownership labels. */
export function ChapterEyebrow({
  n,
  name,
  labels,
  onDark,
}: {
  n: number;
  name: string;
  labels?: Ownership[];
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className={cn(
          "font-mono text-[12px] uppercase tracking-[0.16em]",
          onDark ? "text-cc-sage" : "text-cc-forest-soft",
        )}
      >
        <span className={onDark ? "text-cc-lilac" : "text-cc-sage-deep"}>
          {String(n).padStart(2, "0")}
        </span>
        <span aria-hidden className="mx-2">
          /
        </span>
        {name}
      </span>
      {labels?.map((l) => (
        <OwnershipLabel key={l} label={l} onDark={onDark} />
      ))}
    </div>
  );
}

/** Section heading: the same display face and scale as the other case studies. */
export function StoryHeading({
  children,
  as: Tag = "h2",
  size = "lg",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "max-w-lead font-display font-semibold tracking-[-0.03em] text-balance",
        size === "xl" && "text-h1",
        size === "lg" && "text-h2",
        size === "md" && "text-h3",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Reading column: widens and grows with the screen, ~75–85 characters a line. */
export function ReadingColumn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("max-w-read space-y-5 text-read", className)}>{children}</div>;
}

/** A first-person ownership callout (MY ROLE, DECISION…). */
export function OwnershipCallout({
  label,
  children,
  onDark,
  className,
}: {
  label: Ownership;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  const bar: Record<Ownership, string> = {
    "MY ROLE": "border-cc-coral",
    TEAM: "border-cc-sage",
    DECISION: "border-cc-lilac",
    "TEAM + MY ROLE": "border-cc-sage",
    "INDEPENDENT EXTENSION": "border-cc-forest",
    CONTEXT: "border-cc-forest-soft",
  };
  return (
    <MotionReveal className={cn("max-w-read border-l-[3px] pl-5", bar[label], className)}>
      <OwnershipLabel label={label} onDark={onDark} />
      <p className={cn("mt-3 text-read", onDark ? "text-cc-cream/90" : "text-cc-forest")}>
        {children}
      </p>
    </MotionReveal>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Figure + ArtifactCaption — renders the real artifact when present,
 * otherwise a labelled placeholder. Space is reserved by aspect ratio.
 * ──────────────────────────────────────────────────────────────── */
export function ArtifactCaption({ asset, onDark }: { asset: Asset; onDark?: boolean }) {
  return (
    <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
      <OwnershipLabel label={asset.ownership} onDark={onDark} />
      <span
        className={cn("text-[14px] leading-snug", onDark ? "text-cc-cream/85" : "text-cc-forest")}
      >
        {asset.caption}
      </span>
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.1em]",
          onDark ? "text-cc-sage" : "text-cc-forest-soft",
        )}
      >
        Status: {asset.status}
      </span>
    </figcaption>
  );
}

export function Placeholder({
  asset,
  className,
  compact,
}: {
  asset: Asset;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${asset.title}. Image to be added.`}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-cc-sage-deep/45 bg-[repeating-linear-gradient(135deg,var(--color-cc-sage-soft)_0_14px,var(--color-cc-cream)_14px_28px)] p-4 text-center",
        className,
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-cc-sage-deep shadow-soft">
        <ImageIcon className="h-5 w-5" aria-hidden />
      </span>
      <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-cc-sage-deep">
        {asset.slot} · Image to be added
      </span>
      <span
        className={cn(
          "mt-1 font-display font-semibold leading-tight tracking-[-0.02em] text-cc-forest",
          compact ? "text-[1.05rem]" : "text-[1.25rem]",
        )}
      >
        {asset.title}
      </span>
      {!compact ? (
        <span className="mt-1.5 max-w-[26rem] text-[13px] leading-snug text-cc-forest-soft">
          {asset.brief}
        </span>
      ) : null}
    </div>
  );
}

export function Figure({
  assetKey,
  className,
  frameClassName,
  eager,
  caption = true,
  compact,
  onDark,
  children,
}: {
  assetKey: AssetKey;
  className?: string;
  frameClassName?: string;
  eager?: boolean;
  caption?: boolean;
  compact?: boolean;
  onDark?: boolean;
  /** Overlays (e.g. hotspots) positioned over the image. */
  children?: ReactNode;
}) {
  const asset = assets[assetKey] as Asset;
  const src = assetSrc(asset);
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn("relative w-full", frameClassName)}
        style={{ aspectRatio: String(asset.aspectRatio) }}
      >
        {src ? (
          <img
            src={src}
            alt={asset.alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : undefined}
            className="absolute inset-0 h-full w-full rounded-[18px] object-cover"
          />
        ) : (
          <Placeholder asset={asset} compact={compact} className="absolute inset-0" />
        )}
        {children}
      </div>
      {caption ? <ArtifactCaption asset={asset} onDark={onDark} /> : null}
    </figure>
  );
}

/* ────────────────────────────────────────────────────────────────
 * AccessibleDisclosure — native <details>/<summary>: keyboard, screen
 * reader and no-JS friendly by default.
 * ──────────────────────────────────────────────────────────────── */
export function AccessibleDisclosure({
  summary,
  note,
  children,
  onDark,
}: {
  summary: string;
  note?: string;
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <details
      className={cn(
        "group rounded-2xl border",
        onDark ? "border-cc-cream/25" : "border-cc-forest/20 bg-paper",
      )}
    >
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[1.02rem] font-medium [&::-webkit-details-marker]:hidden",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          onDark ? "focus-visible:outline-cc-lilac" : "focus-visible:outline-cc-lilac-deep",
        )}
      >
        <span>
          {summary}
          {note ? (
            <span
              className={cn(
                "mt-0.5 block text-[14px] font-normal",
                onDark ? "text-cc-cream/75" : "text-cc-forest-soft",
              )}
            >
              {note}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="px-5 pb-6 pt-1">{children}</div>
    </details>
  );
}
