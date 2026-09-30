import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OptiApplyCaseStudy } from "./OptiApplyCaseStudy";
import "../styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OptiApplyCaseStudy />
  </StrictMode>,
);
