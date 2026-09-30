# OptiApply case-study screenshots

Real product screens used by `src/case-study/`. They are evidence, not
decoration: crop with CSS only (see `crops` in `src/case-study/content.ts`),
never edit, redraw or relabel them. Every figure opens the untouched file in
the lightbox.

| File                   | Screen                                |
| ---------------------- | ------------------------------------- |
| `optimizer-09.png`     | Job-description input                 |
| `optimizer-08.png`     | Resume input                          |
| `optimizer-07.png`     | Baseline score (38/100, 5 of 28)      |
| `optimizer-06.png`     | Resume Analysis Summary               |
| `optimizer-03.png`     | Structured role interpretation        |
| `optimizer-05.png`     | Metrics truth checkpoint              |
| `optimizer-02.png`     | Suggested rewrite approval            |
| `optimizer-04.png`     | Five-step processing state            |
| `optimizer-01.png`     | Final verification and export         |
| `huntmode-profile.png` | Hunt Mode profile and 15/20 companies |

## Still missing

Add these exact files here and they render automatically, no code change:

- `Huntmode.png`: Daily Job Digest (1,963 fetched · 1,928 cached · 35 new ·
  1 matched, the 2/10 recommendation, View job / Tailor on OptiApply).
  It becomes the hero's front screen and the Hunt Mode figures.
- `Dashboard.png`: Top Matches, Applications tracker, Recent Optimizations.
  It fills the connected-product section and the hero's right-hand screen.

Until then, their slots are hidden in production builds and shown as labelled
placeholders in `npm run dev`. Once added, set `width`/`height` for them in
`content.ts`, and optionally a crop and annotation coordinates.
