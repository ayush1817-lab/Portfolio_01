import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Scribble } from "./art";

function useDublinTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Dublin",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
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
    <footer className="relative border-t border-line px-5 pt-16 pb-10 sm:px-8 lg:px-10 lg:pt-24">
      <div className="mx-auto flex max-w-page flex-col gap-12">
        <p className="max-w-[20ch] font-display text-h2 font-semibold tracking-[-0.03em] text-ink [text-wrap:balance]">
          Designed and built in Dublin by {profile.name}.
        </p>
        <Scribble className="-mt-8 max-w-md" />

        <div className="flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="focus-glow inline-flex min-h-11 items-center text-sm font-medium text-ink-soft underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="text-small text-ink-soft">
              © {new Date().getFullYear()}
              {time ? (
                <>
                  <span
                    aria-hidden
                    className="mx-3 inline-block h-3 w-px translate-y-0.5 bg-line-strong"
                  />
                  Dublin time <span className="tabular-nums text-ink">{time}</span>
                </>
              ) : null}
            </p>
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="focus-glow grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
