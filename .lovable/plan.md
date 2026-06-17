
# Ayush Ramawat — Portfolio Plan

A single-page, fully responsive portfolio in the **Paper Lab** aesthetic: warm off-white canvas, ink-black type, faint blueprint blue accent — minimalist and editorial, with subtle agentic-AI cues (node/graph motifs, monospace labels, "agent log" micro-copy). The signature interaction is a **horizontal, drag-scrollable shelf** of round-edged 3D cards per section — left side holds the section title, right side is the scrollable shelf you drag through like flipping through a file drawer.

## Design system

- **Palette** — bg `#f5f3ee` (paper), surface `#e8e4dd`, ink `#0d0d0d`, accent `#3b6fa0` (blueprint blue), muted ink `#6b6862`.
- **Type** — *Instrument Serif* for display headlines, *Work Sans* for body, *JetBrains Mono* for tags / "agent log" labels.
- **Motifs** — hairline grid background, dotted connector lines between cards (suggesting an agent graph), small `// node_0234` style monospace captions, subtle paper grain texture.
- **Cards** — large border radius (24–28px), soft layered shadows + 1px ink border to feel like a thick paper card with depth; tilt slightly on hover (perspective transform).
- **Motion** — fade/slide-in on scroll, drag-scroll shelves with snap, cursor changes to grab/grabbing, hover tilt on cards.

## Hero portrait

Default for v1: an **AI-generated stylized 3D character** of you in the Paper Lab style — clay-render / soft-3D look, ink outline, blueprint-blue accents, isolated on the paper background. Placed to the right of the headline on desktop, above the headline on mobile. Floating monospace tags around the portrait (e.g. `// designer`, `// agent-builder`, `// 0.1x → 10x`) connected by hairline dotted lines for the agent-graph feel.

You'll have two easy swaps later:
- **Real photo** — drop your headshot into `src/assets/` and replace one import; I'll include a subtle paper-grain duotone treatment so it fits the theme.
- **Different 3D character style** — regenerate via one prompt edit.

If you want, share a reference photo any time and I'll regen the character to actually resemble you. For v1 I'll generate a neutral stylized character so the page ships.

## Sections (in order)

1. **Hero** — Name + role ("Product Designer • Agentic AI"), one-sentence positioning, soft animated node-graph background, stylized 3D portrait (see above), two CTAs (View Work → scroll to Projects, Get in Touch → scroll to Connect). Monospace status line like `// agent online — open to collaborations`.
2. **About / Experience** — Short bio paragraph + a compact vertical timeline of roles (placeholder content, easy to edit).
3. **Tech stack strip** — Slow auto-scrolling marquee of tools (Figma, Framer, n8n, LangGraph, OpenAI, Claude, Supabase, etc.) as monospace chips. Pauses on hover.
4. **Projects shelf** — Left title block "Projects / 01". Right: horizontal drag-scroll shelf of rounded **card-shaped** project tiles (image, title, tags, short blurb, link). Drag, wheel, or arrow buttons to scroll; snaps card-to-card.
5. **SaaS Products shelf** — Same shelf pattern, distinguished by a different accent chip ("Product"), live-link button per card.
6. **UX Work shelf** — Same drag mechanic but cards rendered as **book spines / book covers**: taller aspect ratio, spine detail on the left edge, title rotated on the spine, cover hover-flips to show a case-study summary.
7. **Blog shelf** — Drag-scroll cards pulling from your Medium (placeholder entries for now; one-line swap to your live feed later). Each card: date, title, reading time, "Read on Medium" link.
8. **Connect banner** — Full-width paper card with oversized serif headline ("Let's build something agentic."), email button (mailto), LinkedIn button, Medium button. Visible copy-email affordance.
9. **Footer** — Name, short tagline, social links repeated, year, "Designed & built by Ayush" line, back-to-top.

## Content (placeholders — easy to swap)

- **Name**: Ayush Ramawat
- **Tagline**: Product Designer crafting agentic-AI products & automations
- **Email**: ayushramawat29@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ayush-ramawat-71880927b/
- **Medium**: https://medium.com/@ayushramawat29
- 3 demo Projects, 2 demo SaaS products, 3 demo UX case studies, 3 demo blog posts — all clearly marked as placeholders in a single `src/content/portfolio.ts` file so you can edit in one spot.

## Buttons & links (all wired)

- Hero "View Work" → smooth-scroll to #projects.
- Hero "Get in Touch" → smooth-scroll to #connect.
- Every project / SaaS / blog card → opens its link in a new tab (placeholder URLs you can replace).
- Connect banner email button → `mailto:ayushramawat29@gmail.com`.
- LinkedIn & Medium buttons → your real URLs (open in new tab).
- Shelf arrow buttons → scroll the shelf by one card.
- Back-to-top in footer → scrolls to hero.

## Responsiveness

- Desktop: shelves show ~2.5 cards; UX books show ~4 spines; hero is two-column (text left, portrait right).
- Tablet: ~1.5 cards visible, drag remains primary; hero stacks if needed.
- Mobile: 1 card visible with peek of next; snap scrolling; arrow buttons hidden in favor of drag + dots indicator. Hero stacks (portrait above headline); nav collapses to a minimal top bar with anchor links.

## Technical notes

- **Stack**: existing TanStack Start + Tailwind v4 + shadcn — no new framework.
- **Routes**: single landing on `/` (`src/routes/index.tsx`). Each section is a sibling component in `src/components/portfolio/` (`Hero`, `About`, `TechStrip`, `CardShelf`, `BookShelf`, `BlogShelf`, `ConnectBanner`, `Footer`).
- **Reusable `<CardShelf>`** drives Projects, SaaS, and Blog (variant prop for accent + card content). `<BookShelf>` is a separate variant for UX (different aspect + spine).
- **Drag scroll**: lightweight pointer-events implementation on a `overflow-x-auto snap-x snap-mandatory` track — no extra dependency.
- **Hero portrait**: generated with `imagegen` (premium tier, transparent background) and saved to `src/assets/hero-portrait.png`.
- **Fonts**: load Instrument Serif / Work Sans / JetBrains Mono via `<link>` in `src/routes/__root.tsx`; register families in `src/styles.css` under `@theme`.
- **Tokens**: add the Paper Lab palette + radii + shadows as semantic tokens in `src/styles.css` (`--background`, `--foreground`, `--accent`, `--paper-grain`, etc.) — no hardcoded hex in components.
- **SEO**: route `head()` with title, description, og tags. Single H1 in hero. Semantic `<section>` + `aria-label` on each shelf.

## I'll need from you (after build)

- (Optional) A reference photo if you want the 3D character to actually resemble you — otherwise I ship a neutral stylized one.
- Your real project / SaaS / case-study / blog content when ready (drop-in edits in `src/content/portfolio.ts`).
- Optional: GitHub or X/Twitter URL if you want those added to footer.

Approve and I'll build it.
