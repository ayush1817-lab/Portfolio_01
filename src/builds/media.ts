/*
 * Real media for the Small Builds pages. Drop a file into src/assets/builds/
 * named after a slot below (any of .png, .jpg, .jpeg, .webp, .avif) and it
 * renders in that spot. Until then the slot is left out of the page; the
 * code-drawn diagrams carry the story on their own.
 */
const files = import.meta.glob("../assets/builds/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const byStem: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  byStem[
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
  ] = url;
}

export type MediaSlot = {
  /** File stem expected in src/assets/builds/. */
  file: string;
  alt: string;
  caption: string;
};

export const mediaSlots = {
  pipelineReview: {
    file: "pipeline-review-page",
    alt: "The internal web page where generated 3D models wait for approval.",
    caption: "Internal review: generated models wait for human approval.",
  },
  pipelineSheet: {
    file: "pipeline-asset-sheet",
    alt: "The Excel asset inventory the extraction agent produced from a scene script.",
    caption: "The asset inventory, paused for approval before the search step.",
  },
  detenteProduct: {
    file: "detente-product",
    alt: "The Détente bracelet.",
    caption: "Détente: an intelligent bracelet designed to be worn, not prescribed.",
  },
  detenteStates: {
    file: "detente-states",
    alt: "Close-up of the bracelet moving from calm, to red, to green.",
    caption: "The state transition: calm, red signal, back to green.",
  },
  voiceDemo: {
    file: "voice-agent-demo",
    alt: "The voice agent prototype running locally.",
    caption: "The prototype running locally.",
  },
} satisfies Record<string, MediaSlot>;

export const mediaSrc = (slot: MediaSlot): string | undefined => byStem[slot.file];
