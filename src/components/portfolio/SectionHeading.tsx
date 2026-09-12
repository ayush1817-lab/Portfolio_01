import { Reveal, SplitText } from "./motion";
import { cn } from "@/lib/utils";

type Props = {
  index: string; // "01"
  label: string; // "About"
  title: string; // "A designer who"
  italic?: string; // "builds."
  caption?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Editorial section header: mono index + label eyebrow, a display headline
 * with an italic serif flourish, and an optional caption.
 */
export function SectionHeading({
  index,
  label,
  title,
  italic,
  caption,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-mist">
          <span className="text-ember">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <span>{label}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.03em] text-cream sm:text-6xl lg:text-7xl">
        <SplitText text={title} inView stagger={0.05} />
        {italic ? (
          <>
            {" "}
            <SplitText
              text={italic}
              inView
              delay={0.2}
              stagger={0.05}
              wordClassName="font-serif font-normal italic tracking-normal text-ember-gradient pr-[0.06em]"
            />
          </>
        ) : null}
      </h2>
      {caption ? (
        <Reveal delay={0.25}>
          <p className="max-w-md text-base leading-relaxed text-mist lg:text-lg">{caption}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
