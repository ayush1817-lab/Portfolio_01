import { TopNav } from "@/components/portfolio/TopNav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { SmallBuilds } from "@/components/portfolio/SmallBuilds";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { ConnectBanner } from "@/components/portfolio/ConnectBanner";
import { Footer } from "@/components/portfolio/Footer";
import { projects } from "@/content/portfolio";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="focus-glow fixed left-4 top-0 z-[80] -translate-y-full rounded-b-xl bg-ink px-4 py-2 text-sm font-semibold text-paper focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <TopNav />
      <main id="main" className="min-h-screen bg-paper font-sans text-ink antialiased">
        <Hero />
        <Projects id="projects" items={projects.slice(0, 3)} />
        <SmallBuilds />
        <About />
        <Testimonials />
        <ConnectBanner />
      </main>
      <Footer />
    </>
  );
}
