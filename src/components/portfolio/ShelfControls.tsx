import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export function ShelfControls({ onPrev, onNext }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={onPrev}
        className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] text-[color:var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--color-ink)]/40 hover:shadow-md"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={onNext}
        className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] text-[color:var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--color-ink)]/40 hover:shadow-md"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}