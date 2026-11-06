import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EASE } from "./motion";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { ResumeLinks } from "./ResumeLinks";

/** Home page URL for a section, so links also work from other pages. */
const home = (id: string) => `${import.meta.env.BASE_URL}#${id}`;

/** Smooth-scroll when the section is on this page; otherwise follow the link home. */
function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

const links = [
  { id: "projects", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "about", label: "About" },
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
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-cobalt"
        style={{ scaleX: progress }}
      />

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] border-b pt-[env(safe-area-inset-top)] transition-colors duration-200",
          scrolled || open ? "border-line bg-paper" : "border-transparent bg-transparent",
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: hidden ? 0 : 0.05 }}
      >
        <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-5 sm:px-8 lg:h-20 lg:px-10">
          <a
            href={home("hero")}
            onClick={scrollTo("hero")}
            className="focus-glow -ml-1 flex min-h-11 shrink-0 items-center rounded-full px-1"
          >
            <span className="font-display text-body font-semibold tracking-[-0.02em] text-ink">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={home(l.id)}
                  onClick={scrollTo(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-glow relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-cobalt transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-glow hidden min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink sm:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
            <a
              href={home("connect")}
              onClick={scrollTo("connect")}
              className="focus-glow hidden min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-cobalt active:translate-y-px sm:inline-flex"
            >
              Let’s talk
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="focus-glow grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink md:hidden"
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
            className="fixed inset-0 z-[64] flex flex-col bg-paper px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l, i) => (
                <div key={l.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={home(l.id)}
                    onClick={(e) => {
                      setOpen(false);
                      scrollTo(l.id)(e);
                    }}
                    className="focus-glow flex items-center justify-between py-5 font-display text-h2 font-semibold tracking-[-0.03em] text-ink"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                  >
                    {l.label}
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
              <ResumeLinks />
              <a href={`mailto:${profile.email}`} className="focus-glow text-body text-ink-soft">
                {profile.email}
              </a>
              <div className="flex gap-5 text-body font-medium text-ink">
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
