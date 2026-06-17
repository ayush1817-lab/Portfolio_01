import { ArrowUpRight } from "lucide-react";

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

const links = [
  { id: "projects", label: "Projects" },
  { id: "ux", label: "UX" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" },
];

export function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)]/55 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(13,13,13,0.18)] sm:px-4 sm:py-2.5"
        style={{ backdropFilter: "saturate(160%) blur(18px)" }}
      >
        <a
          href="#hero"
          onClick={scrollTo("hero")}
          className="flex items-center gap-2 pl-2 font-display text-sm font-bold uppercase tracking-tight text-[color:var(--color-ink)]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-ink)]" />
          Ayush&nbsp;Ramawat
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={scrollTo(l.id)}
              className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]/75 transition-colors hover:bg-[color:var(--color-ink)]/5 hover:text-[color:var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#connect"
          onClick={scrollTo("connect")}
          className="group inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-ink)] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-paper)] transition-colors hover:bg-[#2d2d2d] sm:px-5 sm:py-2.5"
        >
          Connect
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
        </a>
      </div>
    </header>
  );
}