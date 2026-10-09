# Design system: typography

Every font size on the site comes from one type scale, defined as tokens in
`src/styles.css` (`@theme`). The home page, case studies and builds all pick
from this list **by role**, so the same kind of text is the same size everywhere.

Sizes are fluid: they scale smoothly between a phone (390px) and a desktop
(1440px) without breakpoint overrides. Don't add `sm:` / `lg:` size variants on
top of a token.

## The scale

| Token          | Font           | Phone → desktop | Use for                                                                       |
| -------------- | -------------- | --------------- | ----------------------------------------------------------------------------- |
| `text-display` | Display        | 54 → 124px      | Home hero name; one climax line per page at most                              |
| `text-h1`      | Display        | 40 → 80px       | Page titles (case study / build heroes), big closing statements, "Let's talk" |
| `text-h2`      | Display        | 34 → 67px       | Section titles                                                                |
| `text-h3`      | Display        | 26 → 40px       | Subsection titles, project card titles, mid-size statements                   |
| `text-h4`      | Display        | 19 → 23px       | Item and card titles in grids, card subtitles, timeline steps                 |
| `text-stat`    | Display        | 36 → 59px       | Numbers and metrics                                                           |
| `text-pull`    | Display        | 24 → 40px       | Pull quotes (`<Pull>`)                                                        |
| `text-lead`    | Sans / Display | 19 → 24px       | Intro paragraph under a page title, hero statement                            |
| `text-read`    | Sans           | 18 → 21px       | Long-form case-study reading copy                                             |
| `text-body`    | Sans           | 16 → 18px       | Descriptions in cards, lists and grids                                        |
| `text-small`   | Sans           | 15px            | Secondary text in dense grids, field values                                   |
| `text-caption` | Sans           | 13px            | Figure captions, footnotes, small pills                                       |
| `text-sm`      | Sans           | 14px            | UI controls: buttons, nav (Tailwind default)                                  |
| `text-label`   | Mono           | 11px            | Eyebrows, section indexes, field labels: uppercase + tracked                  |
| `text-micro`   | Mono           | 10px            | Tags and chips: uppercase + tracked                                           |

Line heights come with each token; override with `leading-*` only for display
type that needs to sit tighter.

## Rules

1. **Pick by role, not by look.** A section title is `text-h2` on every page.
   If something looks wrong at that size, fix the layout, not the size.
2. **No arbitrary sizes.** No `text-[15px]`, `text-[1.3rem]` or
   `text-[clamp(...)]`. If a genuinely new role appears, add a token to
   `styles.css` and to the list in `src/lib/utils.ts` first.
3. **Hierarchy goes down one step at a time.** Page title `h1` → section `h2` →
   subsection `h3` → item `h4` → `body`.
4. **Mono is for labels only**: `text-label` or `text-micro`, always uppercase
   with letter-spacing.
5. **Register new tokens with `cn()`.** `src/lib/utils.ts` tells
   tailwind-merge about every size token; without it, `cn("text-label",
"text-ink-soft")` silently drops the size.

Exempt: purely decorative, `aria-hidden` type (the large ghost numbers on
project cards, the rotating hero badge SVG) and the generic 404/error screens in
`src/routes/__root.tsx`.
