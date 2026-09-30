import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReelPickCaseStudy } from "./ReelPickCaseStudy";
import "../../styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReelPickCaseStudy />
  </StrictMode>,
);
