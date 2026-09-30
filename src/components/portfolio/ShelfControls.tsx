import { ArrowLeft, ArrowRight } from "lucide-react";
import { Magnetic } from "./motion";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
};

export function ShelfControls({ onPrev, onNext, canPrev = true, canNext = true }: Props) {
  const base =
    "focus-glow grid h-12 w-12 place-items-center rounded-full surface text-ink transition-all duration-300 hover:border-ink/40 hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className="flex items-center gap-2">
      <Magnetic>
        <button
          type="button"
          aria-label="Scroll left"
          onClick={onPrev}
          disabled={!canPrev}
          className={base}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      </Magnetic>
      <Magnetic>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={onNext}
          disabled={!canNext}
          className={base}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </Magnetic>
    </div>
  );
}
