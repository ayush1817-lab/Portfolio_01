import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { MobileCard } from "./MobileCard";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  items: Project[];
};

/**
 * Selected work as a bento: the first case study is the lead tile (two rows
 * tall, cover filling the rest of the tile), the other two stack beside it.
 */
export function Projects({ id, items }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative bg-paper-2 py-16 sm:py-24 lg:py-36"
    >
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

        <ul className="mt-14 hidden gap-8 md:grid lg:mt-16 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {items.map((p, i) => (
            <li
              key={p.id}
              className={cn("min-w-0", i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}
            >
              <ProjectTile project={p} lead={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectTile({ project: p, lead }: { project: Project; lead: boolean }) {
  const Tag = p.link ? "a" : "article";
  const external = p.link?.startsWith("http");

  return (
    <Tag
      href={p.link ?? undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="focus-glow group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-colors duration-200 hover:border-line-strong"
    >
      {/* the lead tile puts its text first and lets the cover fill the rest */}
      <div className={cn("flex flex-col p-7 lg:p-9", lead ? "order-1" : "order-2")}>
        <h3 className="font-display text-h3 font-semibold tracking-[-0.03em] text-ink">
          {p.title}
        </h3>
        {p.subtitle ? <p className="mt-3 max-w-[48ch] text-body text-ink">{p.subtitle}</p> : null}
        {lead ? <p className="mt-3 max-w-[60ch] text-body text-ink-soft">{p.blurb}</p> : null}

        {p.facts?.length ? (
          <dl
            className={cn(
              "mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-5",
              lead ? "sm:grid-cols-3" : "grid-cols-1",
            )}
          >
            {p.facts.map((f) => (
              <div key={f.k} className={cn(!lead && "flex items-baseline justify-between gap-4")}>
                <dt className="text-label text-ink-soft">{f.k}</dt>
                <dd className={cn("text-small text-ink", lead ? "mt-1" : "text-right")}>{f.v}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-1 text-micro text-ink-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        {p.link ? (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-cobalt">
            {external ? "Open the project" : "Read the case study"}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>

      {p.cover ? (
        <div
          className={cn(
            "relative overflow-hidden",
            lead ? "order-2 min-h-[22rem] flex-1" : "order-1 aspect-[16/10]",
          )}
          style={{ background: p.cover.bg }}
        >
          <img
            src={p.cover.src}
            alt={p.cover.alt}
            width={p.cover.width}
            height={p.cover.height}
            decoding="async"
            loading={lead ? "eager" : "lazy"}
            fetchPriority={lead ? "high" : undefined}
            draggable={false}
            className={cn(
              "absolute inset-0 h-full w-full",
              lead ? "object-contain object-bottom" : "object-cover object-center",
            )}
          />
        </div>
      ) : null}
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
