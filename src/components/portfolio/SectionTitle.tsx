type Props = {
  index: string;
  title: string;
  caption?: string;
};

export function SectionTitle({ index, title, caption }: Props) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-4 md:w-72 lg:w-80">
      <div className="flex items-center justify-between border-b border-[color:var(--color-ink)] pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
        <span>{index}</span>
        <span className="text-[color:var(--color-ink)]/50">section</span>
      </div>
      <h2 className="font-display text-2xl font-bold uppercase leading-[0.9] tracking-tight text-[color:var(--color-ink)] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {caption ? (
        <p className="max-w-xs text-sm leading-relaxed text-[color:var(--color-ink)]/70">
          {caption}
        </p>
      ) : null}
    </div>
  );
}