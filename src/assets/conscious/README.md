# Conscious Connections images

Drop an image here using the file name below (any of `.jpg`, `.jpeg`, `.png`,
`.webp`, `.avif`) and it replaces that slot's placeholder on the next build.
Alt text, captions, ownership labels and status live in
`src/case-study/conscious/content.ts`.

| Slot | File name                           | Ratio | What goes here                            |
| ---- | ----------------------------------- | ----- | ----------------------------------------- |
| A01a | `hero-community-box`                | 4:5   | Community Box, hero                       |
| A01b | `hero-website-desktop`              | 16:10 | Website, desktop, hero                    |
| A01c | `hero-buddy-connect-mobile`         | 9:19  | Buddy Connect, mobile, hero               |
| A02  | `context-rural-ireland`             | 21:9  | Rural Ireland context                     |
| A03a | `research-interview-guide`          | 4:3   | Interview guide                           |
| A03b | `research-thematic-analysis`        | 4:3   | Thematic analysis                         |
| A03c | `research-personas`                 | 4:3   | Personas                                  |
| A03d | `research-supporting`               | 4:3   | Supporting research artifacts             |
| A04  | `early-privacy-concepts`            | 16:9  | Early privacy concepts                    |
| A05  | `ideation-12-ideas`                 | 16:9  | Ideation workshop output                  |
| A06  | `community-box`                     | 3:2   | Community in a Box (hotspots sit on this) |
| A07  | `academic-website-concept`          | 16:9  | Academic website concept                  |
| A08a | `redesign-existing-concept`         | 16:10 | Redesign: existing concept + requirements |
| A08b | `redesign-information-architecture` | 16:10 | Redesign: information architecture        |
| A08c | `redesign-wireframes`               | 16:10 | Redesign: wireframes + UX decisions       |
| A08d | `redesign-visual-direction`         | 16:10 | Redesign: visual direction + a11y         |
| A08e | `redesign-responsive-screens`       | 16:10 | Redesign: final responsive screens        |
| A09  | `service-ecosystem`                 | 16:9  | Service ecosystem source diagram          |
| A10  | `architecture-full`                 | 16:10 | Full system architecture                  |
| A11  | `buddy-connect-flow`                | 16:9  | Buddy Connect flow                        |

Images are shown with `object-cover` inside a fixed-ratio box, so crop close to
the listed ratio. After adding A06, check the four hotspot positions
(`box.parts[].x / y` in `content.ts`) line up with the real photo.
