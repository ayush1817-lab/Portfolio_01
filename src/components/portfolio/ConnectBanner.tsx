import { useState } from "react";
import { BookOpen, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Magnetic, Reveal, SplitText } from "./motion";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.medium, label: "Medium", Icon: BookOpen },
  { href: profile.github, label: "GitHub", Icon: Github },
  { href: profile.x, label: "X", Icon: XIcon },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7l4.9 6.5L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z" />
    </svg>
  );
}

export function ConnectBanner() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section
      id="connect"
      aria-label="Connect"
      className="relative px-4 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-40"
    >
      <Reveal y={40} amount={0.2} blur={false}>
        <div className="relative mx-auto max-w-page overflow-hidden rounded-[2.5rem] bg-cobalt text-paper shadow-soft">
          {/* two crisp shapes — no glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun sm:h-96 sm:w-96" />
            <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full border border-paper/20" />
          </div>

          <div className="relative flex flex-col gap-10 p-6 sm:gap-12 sm:p-12 lg:p-20">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-paper/80">
              <span>
                <span className="text-sun">05</span> &nbsp;·&nbsp; Contact
              </span>
              <span className="relative flex items-center gap-2 rounded-full bg-cobalt-deep px-3 py-1.5">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-sun animate-ping-soft" />
                  <span className="relative h-2 w-2 rounded-full bg-sun" />
                </span>
                <span className="hidden sm:inline">{profile.status}</span>
                <span className="sm:hidden">online</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="font-display text-[3rem] font-semibold leading-[0.92] tracking-[-0.04em] text-paper sm:text-6xl lg:text-[5.5rem]">
                  <SplitText text="Let's build" inView />
                  <br />
                  <SplitText
                    text="something agentic."
                    inView
                    delay={0.15}
                    wordClassName="font-serif font-normal italic tracking-normal text-sun pr-[0.05em]"
                  />
                </h2>
                <Reveal delay={0.4}>
                  <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/80 sm:text-lg">
                    Whether it's a 0 → 1 product, an internal automation, or a sharp opinion on what
                    your agent UX is missing, my inbox is open.
                  </p>
                </Reveal>
              </div>

              <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
                <Reveal delay={0.3} className="w-full lg:w-auto">
                  <div className="flex w-full items-stretch overflow-hidden rounded-full bg-paper text-ink shadow-soft lg:w-auto">
                    <Magnetic strength={0.15} className="min-w-0 flex-1">
                      <a
                        href={`mailto:${profile.email}`}
                        data-cursor="Email"
                        className="focus-glow flex min-w-0 items-center gap-3 px-5 py-4 font-sans text-sm font-semibold tracking-tight transition-colors hover:bg-sun sm:px-6"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          <span className="sm:hidden">Email me</span>
                          <span className="hidden sm:inline">{profile.email}</span>
                        </span>
                      </a>
                    </Magnetic>
                    <button
                      type="button"
                      onClick={copy}
                      aria-label="Copy email address"
                      data-cursor={copied ? "Copied" : "Copy"}
                      className="focus-glow grid w-14 shrink-0 place-items-center border-l border-ink/10 transition-colors hover:bg-sun"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-3 select-all break-all text-center font-mono text-[11px] tracking-[0.08em] text-paper/80 sm:hidden">
                    {profile.email}
                  </p>
                </Reveal>

                <Reveal delay={0.4} className="w-full lg:w-auto">
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end">
                    {socials.map(({ href, label, Icon }) => (
                      <Magnetic key={label} strength={0.25} className="w-full sm:w-auto">
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          data-cursor="Open"
                          className="focus-glow flex w-full items-center justify-center gap-2 rounded-full border border-paper/30 px-4 py-3 sm:inline-flex sm:w-auto sm:py-2.5 font-sans text-[13px] font-medium tracking-tight text-paper transition-all duration-300 hover:border-paper hover:bg-paper hover:text-cobalt"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </a>
                      </Magnetic>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
