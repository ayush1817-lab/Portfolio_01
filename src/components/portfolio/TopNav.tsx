import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EASE, Magnetic } from "./motion";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "ux", label: "Case studies" },
  { id: "connect", label: "Contact" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (open) return;
    setHidden(latest > prev && latest > 160);
  });

  // Track which section is in view.
  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll when the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-ember via-amber to-iris"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-[65] px-4 pt-4 sm:px-6 sm:pt-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: hidden ? 0 : 0.05 }}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-2 py-2 transition-all duration-500",
            scrolled ? "glass shadow-glow" : "border border-transparent",
          )}
        >
          <a
            href="#hero"
            onClick={scrollTo("hero")}
            data-cursor="Top"
            className="focus-glow group flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pl-3 pr-3"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping-soft" />
              <span className="relative h-2 w-2 rounded-full bg-ember" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-cream">
              Ayush
              <span className="text-mist transition-colors group-hover:text-cream"> Ramawat</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={scrollTo(l.id)}
                  className={cn(
                    "focus-glow relative rounded-full px-3.5 py-2 font-sans text-[13px] font-medium tracking-tight transition-colors",
                    isActive ? "text-cream" : "text-mist hover:text-cream",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-cream/8"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#connect"
                onClick={scrollTo("connect")}
                data-cursor="Say hi"
                className="focus-glow group inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2.5 font-sans text-[13px] font-semibold tracking-tight text-night transition-colors hover:bg-amber"
              >
                Let's talk
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="focus-glow grid h-10 w-10 place-items-center rounded-full glass text-cream md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[64] flex flex-col bg-night/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-ember/25 blur-[100px]"
            />
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l, i) => (
                <div key={l.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      setOpen(false);
                      scrollTo(l.id)(e);
                    }}
                    className="flex items-center justify-between py-5 font-display text-4xl font-semibold tracking-[-0.03em] text-cream"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                  >
                    {l.label}
                    <span className="font-mono text-xs text-mist">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs uppercase tracking-[0.2em] text-mist"
              >
                {profile.email}
              </a>
              <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
                <a href={profile.medium} target="_blank" rel="noreferrer noopener">
                  Medium
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
