import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string | null;
  /** Number shown in the badge, e.g. "01". */
  index: string;
  title: string;
  /** One short line; clamped to two lines (three on very narrow phones). */
  line: string;
  tags: string[];
  /** Accessible name for the tag list, e.g. "Role and scope". */
  tagsLabel: string;
  /** Screen-reader hint for where the link goes, e.g. "Read the case study." */
  linkHint: string;
  /** Visual that fills the card: a cover image or a drawn motif. */
  media: ReactNode;
};

/**
 * Phone-only image-led card (below 768px), shared by Selected Work and Small
 * Builds. The visual fills the card, a navy gradient carries the title, one
 * line, two tags and an arrow. The whole card is one link.
 */
export function MobileCard({ href, index, title, line, tags, tagsLabel, linkHint, media }: Props) {
  const external = href?.startsWith("http");
  const Tag = href ? "a" : "article";

  return (
    <Tag
      href={href ?? undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="focus-glow relative isolate flex min-h-[188px] flex-col justify-between overflow-hidden rounded-[18px] bg-ink p-4 text-paper shadow-soft transition-transform duration-200 active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        {media}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,18,35,0) 6%, rgba(8,18,35,0.3) 34%, rgba(8,18,35,0.86) 66%, rgba(8,18,35,0.97) 100%)",
        }}
      />

      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-full bg-paper font-mono text-label font-medium text-ink"
      >
        {index}
      </span>

      <div className="mt-8">
        <div className="flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-h4 font-semibold leading-tight tracking-[-0.02em] text-paper">
              {title}
            </h3>
            <p className="mt-1 line-clamp-3 text-caption leading-snug text-paper/80 min-[360px]:line-clamp-2">
              {line}
            </p>
            {href ? <span className="sr-only">{linkHint}</span> : null}
          </div>
          {href ? (
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label={tagsLabel}>
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-paper/20 bg-paper/15 px-2 py-1 font-mono text-micro uppercase leading-none tracking-[0.08em] text-paper backdrop-blur-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}
