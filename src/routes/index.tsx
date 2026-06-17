import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { TopNav } from "@/components/portfolio/TopNav";
import { About } from "@/components/portfolio/About";
import { TechStrip } from "@/components/portfolio/TechStrip";
import { ProjectsShelf } from "@/components/portfolio/ProjectsShelf";
import { UxShelf } from "@/components/portfolio/UxShelf";
import { BlogShelf } from "@/components/portfolio/BlogShelf";
import { ConnectBanner } from "@/components/portfolio/ConnectBanner";
import { Footer } from "@/components/portfolio/Footer";
import { projects } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Ramawat — Product Designer · Agentic AI" },
      { name: "description", content: "Portfolio of Ayush Ramawat — a product designer shipping agentic-AI products, automations, and SaaS tools." },
      { property: "og:title", content: "Ayush Ramawat — Product Designer · Agentic AI" },
      { property: "og:description", content: "Selected work, case studies, and writing on designing for agents." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[color:var(--color-paper)] font-sans text-[color:var(--color-ink)] antialiased">
      <TopNav />
      <Hero />
      <About />
      <ProjectsShelf
        id="projects"
        index="WORK / 01"
        title="Selected projects."
        caption="A folder of recent work — drag, scroll, or click an arrow to flip through."
        items={projects}
      />
      <UxShelf />
      <BlogShelf />
      <TechStrip />
      <ConnectBanner />
      <Footer />
    </main>
  );
}
