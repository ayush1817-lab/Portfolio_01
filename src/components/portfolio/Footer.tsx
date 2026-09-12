import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Magnetic } from "./motion";

function useDublinTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Dublin",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Footer() {
  const time = useDublinTime();
  const links = [
    { href: `mailto:${profile.email}`, label: "Email" },
    { href: profile.linkedin, label: "LinkedIn" },
    { href: profile.medium, label: "Medium" },
    { href: profile.github, label: "GitHub" },
    { href: profile.x, label: "X" },
  ];

  return (
    <footer className="relative border-t border-line px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-semibold tracking-tight text-cream">
            {profile.name.split(" ")[0]}
            <span className="font-serif italic text-ember-gradient">
              {" "}
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
            © {new Date().getFullYear()} · Designed & built in Dublin
            {time ? (
              <>
                {" "}
                · <span className="tabular-nums text-cream/70">{time}</span> IST
              </>
            ) : null}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="focus-glow group relative font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors hover:text-cream"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
          ))}
          <Magnetic>
            <button
              type="button"
              aria-label="Back to top"
              data-cursor="Top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="focus-glow grid h-11 w-11 place-items-center rounded-full glass text-cream transition-colors duration-300 hover:bg-cream hover:text-night"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
