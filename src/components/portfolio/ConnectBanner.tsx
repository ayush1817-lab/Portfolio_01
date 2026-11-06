import { useState } from "react";
import { BookOpen, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { ResumeLinks } from "./ResumeLinks";

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
      aria-labelledby="connect-title"
      className="relative bg-cobalt py-20 text-paper sm:py-28 lg:py-44"
    >
      <div className="mx-auto grid max-w-page grid-cols-1 gap-x-8 gap-y-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-10">
        <div className="lg:col-span-7">
          <h2
            id="connect-title"
            className="max-w-[16ch] font-display text-h1 font-semibold tracking-[-0.04em] text-paper [overflow-wrap:break-word] [text-wrap:balance]"
          >
            Let’s build something together
          </h2>
          <p className="mt-8 max-w-[48ch] text-lead text-paper">
            I’m open to product design roles and always happy to talk about research, interaction
            design or AI-driven experiences. Send me a note.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
          <div className="flex w-full items-stretch overflow-hidden rounded-full bg-paper text-ink lg:w-auto">
            <a
              href={`mailto:${profile.email}`}
              className="focus-on-accent flex min-h-14 min-w-0 flex-1 items-center gap-3 px-5 text-sm font-semibold transition-colors duration-200 hover:bg-sun sm:px-6"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">
                <span className="sm:hidden">Email me</span>
                <span className="hidden sm:inline">{profile.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="focus-on-accent grid w-14 shrink-0 place-items-center border-l border-ink/10 transition-colors duration-200 hover:bg-sun active:bg-sun-soft disabled:cursor-not-allowed disabled:opacity-55"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p role="status" className="select-all break-all text-label text-paper sm:hidden">
            {copied ? "Copied to the clipboard." : profile.email}
          </p>
          <p role="status" className="sr-only max-sm:hidden">
            {copied ? "Email address copied to the clipboard." : ""}
          </p>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-on-accent flex min-h-11 items-center justify-center gap-2 rounded-full border border-paper/40 px-4 text-sm font-medium text-paper transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-cobalt sm:inline-flex"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>

          <ResumeLinks tone="dark" className="w-full lg:w-auto lg:justify-end" />
        </div>
      </div>
    </section>
  );
}
