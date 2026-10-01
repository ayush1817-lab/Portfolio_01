import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { BuildSlug } from "./content";
import { PipelineBuild } from "./pages/PipelineBuild";
import { DetenteBuild } from "./pages/DetenteBuild";
import { VoiceBuild } from "./pages/VoiceBuild";
import "../styles.css";

/** One entry for all three build pages; each HTML file names its build on #root. */
const pages: Record<BuildSlug, () => React.ReactElement> = {
  "3d-pipeline": PipelineBuild,
  detente: DetenteBuild,
  "voice-agent": VoiceBuild,
};

const root = document.getElementById("root")!;
const Page = pages[root.dataset.build as BuildSlug] ?? PipelineBuild;

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
