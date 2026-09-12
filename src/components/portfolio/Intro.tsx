import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./motion";
import { profile } from "@/content/portfolio";

/**
 * A short opening curtain: the wordmark rises, then the curtain lifts to
 * reveal the hero. Skipped entirely for reduced-motion users.
 */
export function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 1500);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[90] grid place-items-center bg-night"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden">
              <motion.div
                className="font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-6xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {profile.name.split(" ")[0]}
                <span className="font-serif italic text-ember-gradient">
                  {" "}
                  {profile.name.split(" ").slice(1).join(" ")}
                </span>
              </motion.div>
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-line-strong"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            />
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Portfolio · {new Date().getFullYear()}
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
