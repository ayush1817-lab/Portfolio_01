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

export default function App() {
  return (
    <main className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Intro />
      <Cursor />
      <TopNav />
      <Hero />
      <TechStrip />
      <About />
      <Projects id="projects" items={projects.slice(0, 3)} />
      <CaseStudies />
      <ConnectBanner />
      <Footer />
    </main>
  );
}
