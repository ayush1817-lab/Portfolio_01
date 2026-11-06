import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { MobileCard } from "./MobileCard";
import { SectionHeading } from "./SectionHeading";
import { DotGrid, InView } from "./art";

type Props = {
  id: string;
  items: Project[];
};

/**
 * Selected work: three equal tiles in one row on wide screens, each a cover
 * crop, the title, one line and the three facts. The hero index above already
 * lists them; this row adds the pictures and the facts, and stays one screen.
 */
export function Projects({ id, items }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-x-clip bg-paper-2 py-16 sm:py-24 lg:py-30"
    >
      <DotGrid
        className="right-0 top-0 -z-10 h-96 w-[42rem] text-cobalt/30"
        fade="to-bottom-left"
      />
      {/* a quarter sun at the band's corner */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -bottom-16 -left-16 -z-10 h-64 w-64 text-sun"
      >
        <circle cx="100" cy="100" r="70" fill="currentColor" />
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          className="stroke-cobalt"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          strokeDasharray="3 7"
        />
      </svg>
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading id={`${id}-title`} title="Problems I've worked on" />

        {/* Phones: compact image-led cards, all three in about one screen. */}
        <ul className="mt-8 flex flex-col gap-3 md:hidden">
          {items.map((p, i) => (
            <li key={p.id}>
              <MobileProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>

        <ul className="mt-12 hidden grid-cols-3 gap-6 md:grid lg:gap-8">
          {items.map((p, i) => (
            <InView as="li" key={p.id} i={i} className="min-w-0">
              <ProjectTile project={p} />
            </InView>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectTile({ project: p }: { project: Project }) {
  const Tag = p.link ? "a" : "article";
  const external = p.link?.startsWith("http");

  return (
    <Tag
      href={p.link ?? undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="focus-glow group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-expo)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-soft motion-reduce:hover:translate-y-0"
    >
      {p.cover ? (
        <div className="relative aspect-[4/3] overflow-hidden" style={{ background: p.cover.bg }}>
          <img
            src={p.cover.src}
            alt={p.cover.alt}
            width={p.cover.width}
            height={p.cover.height}
            decoding="async"
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: p.mobile?.focus ?? "50% 30%" }}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="font-display text-h4 font-semibold tracking-[-0.02em] text-ink">
          {p.title}
        </h3>
        <p className="mt-2 text-small text-ink-soft">{p.mobile?.line ?? p.subtitle}</p>

        {p.facts?.length ? (
          <dl className="mt-5 border-t border-line">
            {p.facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2"
              >
                <dt className="shrink-0 text-label text-ink-soft">{f.k}</dt>
                <dd className="text-right text-label text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {p.link ? (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-cobalt">
            {external ? "Open the project" : "Read the case study"}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        ) : null}
      </div>
    </Tag>
  );
}

function MobileProjectCard({ project: p, index: i }: { project: Project; index: number }) {
  const m = p.mobile;
  return (
    <MobileCard
      href={p.link}
      index={String(i + 1)}
      title={p.title}
      line={m?.line ?? p.subtitle ?? p.blurb}
      tags={m ? [m.role, m.scope] : p.tags.slice(0, 2)}
      tagsLabel="Role and scope"
      linkHint="Read the case study."
      media={
        p.cover ? (
          <img
            src={p.cover.src}
            alt=""
            width={p.cover.width}
            height={p.cover.height}
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
            style={{ objectPosition: m?.focus ?? "50% 40%" }}
          />
        ) : null
      }
    />
  );
}
