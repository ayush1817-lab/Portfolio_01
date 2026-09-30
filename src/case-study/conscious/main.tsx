import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConsciousConnectionsCaseStudy } from "./ConsciousConnectionsCaseStudy";
import "../../styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConsciousConnectionsCaseStudy />
  </StrictMode>,
);
