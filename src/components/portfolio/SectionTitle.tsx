type Props = {
  index: string;
  title: string;
  caption?: string;
};

export function SectionTitle({ index, title, caption }: Props) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 md:w-64 lg:w-72">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        <span className="inline-block h-px w-6 bg-[color:var(--color-ink)]/40" />
        <span>{index}</span>
      </div>
      <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-[color:var(--color-ink)] sm:text-6xl">
        {title}
      </h2>
      {caption ? (
        <p className="max-w-xs text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          {caption}
        </p>
      ) : null}
    </div>
  );
}