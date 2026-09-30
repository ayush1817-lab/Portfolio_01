# Conscious Connections: images to provide

Save each image in this folder with the file name below. Any of `.jpg`,
`.png`, `.webp` or `.avif` works (e.g. `community-box.png`). It replaces that
slot's placeholder on the next build. Alt text, captions, ownership labels
and status lines are already written in `src/case-study/conscious/content.ts`.

Sizes are the minimum for sharp display on high-density screens. Crop close to
the listed shape: images fill a fixed-shape frame, so extra edges get trimmed.

## Needed (15 on the case study + 1 homepage cover)

| #   | Slot | File name                    | Shape | Min. size | Where it appears                           | What to show                                                              |
| --- | ---- | ---------------------------- | ----- | --------- | ------------------------------------------ | ------------------------------------------------------------------------- |
| 1   | A01a | `hero-community-box`         | 4:5   | 800×1000  | Hero, left                                 | The Community Box on a plain background                                   |
| 2   | A01b | `hero-website-desktop`       | 16:10 | 1600×1000 | Hero, centre (largest)                     | The website concept on a desktop screen                                   |
| 3   | A01c | `hero-buddy-connect-mobile`  | 9:19  | 600×1266  | Hero, right                                | Buddy Connect on a phone screen                                           |
| 4   | A02  | `context-rural-ireland`      | 21:9  | 2400×1030 | 01 Context, full width                     | Rural Ireland / travel context. Licensed or your own photo only           |
| 5   | A03a | `research-interview-guide`   | 4:3   | 1400×1050 | 01 "View research process" panel           | The interview guide                                                       |
| 6   | A03b | `research-thematic-analysis` | 4:3   | 1400×1050 | 01 "View research process" panel           | Affinity map / thematic analysis                                          |
| 7   | A03c | `research-personas`          | 4:3   | 1400×1050 | 01 "View research process" panel           | Persona sheets                                                            |
| 8   | A03d | `research-supporting`        | 4:3   | 1400×1050 | 01 "View research process" panel           | Journey fragments or other supporting evidence                            |
| 9   | A04  | `early-privacy-concepts`     | 16:9  | 2000×1125 | 02 Turning point                           | Early privacy concepts: anonymous badge, discreet haptics, sketches       |
| 10  | A05  | `ideation-12-ideas`          | 16:9  | 2000×1125 | 03 Ideation, below the idea cards          | The ideation board from the internal workshop                             |
| 11  | A06  | `community-box`              | 3:2   | 1800×1200 | 04 Community in a Box (numbered markers)   | The box opened: magazine, resources, activities and pathway cards visible |
| 12  | A07  | `academic-website-concept`   | 16:9  | 2000×1125 | 06 The website                             | Academic website concept screens and information structure                |
| 13  | A09  | `service-ecosystem`          | 16:9  | 2400×1350 | 07 Ecosystem, "original diagram" panel     | The team's service ecosystem diagram                                      |
| 14  | A10  | `architecture-full`          | 16:10 | 2400×1500 | 09 Architecture, "full architecture" panel | The full proposed architecture diagram                                    |
| 15  | A11  | `buddy-connect-flow`         | 16:9  | 2000×1125 | 08 Buddy Connect                           | Buddy Connect screens or preference flow                                  |
| 16  | —    | homepage card cover          | 6:7   | 1200×1400 | Homepage, Selected Work card               | Community Box, website and Buddy Connect together                         |

The homepage cover is not read from this folder: send it over and it gets
wired into `src/content/portfolio.ts`, as the OptiApply and ReelPick covers were.

## After adding images

- **A06:** check the four numbered markers line up with the real photo. Their
  positions are `box.parts[].x / y` (percent) in `content.ts`.
- **A08 (website redesign):** that slot number is reserved for the independent
  website redesign. Add it back once the website exists.
