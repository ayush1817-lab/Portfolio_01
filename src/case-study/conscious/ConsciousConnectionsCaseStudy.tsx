import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import {
  AtAGlance,
  Hero,
  Ideation,
  PrivacyTurningPoint,
  ResearchTensions,
} from "./components/story";
import {
  ArchitectureLayers,
  BuddyMatchingLogic,
  CommunityBoxReveal,
  PhysicalConstraintScene,
  ServiceEcosystem,
  WebsiteEntryPoints,
} from "./components/system";
import { NextProjectCTA, Reflection } from "./components/closing";

/**
 * Conscious Connections — recruiter-focused case study.
 * Story arc: access is hard → people need control → privacy risked becoming
 * invisibility → reframe → Community in a Box → single-doorway flaw → website
 * as a second way in → privacy shapes Buddy Connect and the architecture → reflection.
 */
export function ConsciousConnectionsCaseStudy() {
  return (
    <div className="min-h-screen bg-cc-cream font-sans text-cc-forest antialiased">
      <a
        href="#case-study"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cc-forest focus:px-4 focus:py-3 focus:text-cc-cream"
      >
        Skip to case study
      </a>
      <TopNav />
      <main id="case-study">
        <article>
          <Hero />
          <AtAGlance />
          <ResearchTensions />
          <PrivacyTurningPoint />
          <Ideation />
          <CommunityBoxReveal />
          <PhysicalConstraintScene />
          <WebsiteEntryPoints />
          <ServiceEcosystem />
          <BuddyMatchingLogic />
          <ArchitectureLayers />
          <Reflection />
        </article>
        <NextProjectCTA />
      </main>
      <Footer />
    </div>
  );
}
