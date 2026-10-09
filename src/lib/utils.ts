import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The type scale from styles.css (see DESIGN-SYSTEM.md). Without this,
// tailwind-merge reads e.g. `text-label` as a colour and drops it next to
// `text-ink-soft`. Add any new size token here too.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "h1",
        "h2",
        "h3",
        "h4",
        "stat",
        "pull",
        "lead",
        "read",
        "body",
        "small",
        "caption",
        "label",
        "micro",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
