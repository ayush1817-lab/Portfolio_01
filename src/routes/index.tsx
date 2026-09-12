import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/portfolio/Cursor";
import { Intro } from "@/components/portfolio/Intro";
import { TopNav } from "@/components/portfolio/TopNav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { TechStrip } from "@/components/portfolio/TechStrip";
import { ConnectBanner } from "@/components/portfolio/ConnectBanner";
import { Footer } from "@/components/portfolio/Footer";
import { projects } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Ramawat — Product Designer · Agentic AI" },
      {
        name: "description",
        content:
          "Portfolio of Ayush Ramawat — a product designer shipping agentic-AI products, automations, and SaaS tools.",
      },
      { property: "og:title", content: "Ayush Ramawat — Product Designer · Agentic AI" },
      {
        property: "og:description",
        content: "Selected work, case studies, and writing on designing for agents.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="grain min-h-screen bg-night font-sans text-cream antialiased">
      <Intro />
      <Cursor />
      <TopNav />
      <Hero />
      <About />
      <Projects id="projects" items={projects.slice(0, 3)} />
      <CaseStudies />
      <TechStrip />
      <ConnectBanner />
      <Footer />
    </main>
  );
}
