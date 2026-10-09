import { TopNav } from "@/components/portfolio/TopNav";
import { Footer } from "@/components/portfolio/Footer";
import {
  AtAGlance,
  Hero,
  Ideation,
  MyContribution,
  PrivacyTurningPoint,
  ResearchTensions,
} from "./components/story";
import {
  ArchitectureLayers,
  BuddyMatchingLogic,
  CommunityBoxReveal,
  SecondDoorway,
} from "./components/system";
import { NextProjectCTA, Reflection } from "./components/closing";

/**
 * Conscious Connections — recruiter-focused case study.
 * Story arc (recruiter cut): my contribution → access is hard → privacy risked becoming invisibility →
 * reframe → 12 ideas → Community in a Box → single-doorway flaw, so the website and
 * ecosystem become a second way in → Buddy Connect → architecture → reflection.
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
          <MyContribution />
          <ResearchTensions />
          <PrivacyTurningPoint />
          <Ideation />
          <CommunityBoxReveal />
          <SecondDoorway />
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
