import { Hero } from "@/components/portfolio/Hero";
import { TopNav } from "@/components/portfolio/TopNav";
import { About } from "@/components/portfolio/About";
import { TechStrip } from "@/components/portfolio/TechStrip";
import { ProjectsShelf } from "@/components/portfolio/ProjectsShelf";
import { UxShelf } from "@/components/portfolio/UxShelf";
import { ConnectBanner } from "@/components/portfolio/ConnectBanner";
import { Footer } from "@/components/portfolio/Footer";
import { projects } from "@/content/portfolio";

export default function App() {
  return (
    <main className="min-h-screen snap-y snap-proximity bg-[color:var(--color-paper)] font-sans text-[color:var(--color-ink)] antialiased">
      <TopNav />
      <Hero />
      <About />

      <ProjectsShelf
        id="projects"
        index="WORK / 01"
        title="Selected projects."
        caption="A folder of recent work — drag, scroll, or click an arrow to flip through."
        items={projects.slice(0, 3)}
      />

      <UxShelf />
      <TechStrip />
      <ConnectBanner />
      <Footer />
    </main>
  );
}
