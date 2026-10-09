/**
 * ReelPick case study — copy and image metadata.
 *
 * Source of truth: Ayush Ramawat, "ReelPick Product Idea Case Study"
 * (Medium, 18 July 2026) and the approved case-study PDF.
 *
 * Accuracy rules:
 * - Beta evidence is qualitative feedback from four closed-beta participants.
 *   No conversion, retention, time-saved, survey or demographic numbers.
 * - The journey image does not include a group swipe screen; never label a
 *   crop as one. Screens 01, 02 and 07 are the personal side of the app.
 * - A link-based version is a possible direction, not something built or tested.
 */
import type { Lens } from "../content";

export const meta = {
  medium: "https://medium.com/@ayushramawat29/reelpick-product-idea-case-study-ac8ee684b3bc",
};

export const hero = {
  eyebrow: "ReelPick / Product design / Group decisions",
  name: "ReelPick",
  title: ["Nobody could pick a movie.", "So I built a way to vote on one."],
  sub: "A group decision making experiment disguised as a movie app.",
  facts: [
    { k: "Role", v: "Solo product designer and developer" },
    { k: "Scope", v: "Product strategy, UX/UI, backend, mobile, ML" },
    { k: "Outcome", v: "Shipped to a four-person closed beta, then retired after testing" },
  ],
  art: {
    alt: "ReelPick hero artwork: the ReelPick wordmark and the line 'Nobody could pick a movie. So I built a way to vote on one.', beside five phones showing soft illustrated movie cards with like and pass buttons.",
  },
};

export const contribution = {
  title: "I took ReelPick from idea to closed beta on my own.",
  intro: "A solo project: every product, design and engineering decision was mine.",
  items: [
    {
      k: "Problem framing",
      v: "Reframed movie night as a social decision problem rather than a discovery one, and set the hypothesis: separate preference from decision.",
    },
    {
      k: "UX and UI design",
      v: "Designed the room flow end to end: six-letter room codes, private picks and votes, a waiting state that hides choices, and the ranked reveal.",
    },
    {
      k: "Mobile and backend",
      v: "Built the mobile app and backend, including a nightly TMDB and OMDB sync into PostgreSQL with Redis caching, and a Python recommendation model.",
    },
    {
      k: "Beta and the product call",
      v: "Ran the four-person closed beta, read the split feedback, and decided to retire the app rather than add features.",
    },
  ],
};

export const problem = {
  lens: "Problem" as Lens,
  eyebrow: "The Friday night problem",
  title: ["Four people. Hundreds of movies.", "Still nothing to watch."],
  body: [
    "Four friends can spend a long time browsing and still end up deferring to one person. The catalogue wasn't the problem. The conversation was.",
  ],
  progression: [
    { k: "The question", v: "“What should we watch?”" },
    { k: "The scroll", v: "Browse, hesitate, browse again" },
    { k: "The deferral", v: "“You pick.”", warn: true },
  ],
  forces: [
    {
      k: "Reluctance to impose",
      v: "Nobody wants to be the person who chose the bad movie, so everyone waits.",
    },
    {
      k: "First-speaker anchoring",
      v: "The first title said out loud becomes the option everyone reacts to.",
    },
    {
      k: "Quiet preferences disappear",
      v: "The people least willing to argue are the ones whose taste never gets counted.",
    },
  ],
  reframe: {
    lead: "The friction was social, not informational. So the design question became:",
    q: "How might a group reach a decision without requiring anyone to take control of it?",
  },
};

export const hypothesis = {
  lens: "Decision" as Lens,
  eyebrow: "The product hypothesis",
  title: "Separate preference from decision.",
  body: [
    "Let everyone express what they want privately. Then let the group's behaviour, not the loudest voice, reveal the winner.",
  ],
  principles: [
    { k: "Private by default", v: "Reduce the pressure to agree with whoever speaks first." },
    { k: "Temporary by design", v: "A room exists for movie night and expires after two hours." },
    {
      k: "Democratic outcome",
      v: "The winner reflects the group's likes, not one person's pitch.",
    },
  ],
};

export const journey = {
  lens: "Result" as Lens,
  eyebrow: "Product journey",
  title: "From a room to a shared winner.",
  body: [
    "One shortlist. Private votes. A result everyone can accept. The journey below is the original graphic from the shipped app, including the personal screens on either side of the group flow.",
  ],
  image: {
    title: "The ReelPick product journey",
    alt: "Seven screens from the ReelPick app on a cream background, headed 'From “what should we watch?” to one shared winner.' 01 Discover: a For You feed with today's pick. 02 Recommend: a personal recommendation card. 03 Create room: a lobby showing the room code HZ47FQ and two members. 04 Pick privately: a Pick genres screen. 05 Wait for group: 'Waiting for everyone…'. 06 See the winner: a Results screen with three films, each 3/3 liked, 100%. 07 Save for later: a profile with a saved My List. Footer: 'Private choices remove social pressure. The group result makes the decision feel fair.'",
    caption:
      "The original journey graphic. Screens 01, 02 and 07 are the personal side of the app; 03 to 06 are the group room.",
  },
  // Horizontal centre of each phone, as % of the image width (for mobile jump links).
  steps: [
    { n: "01", k: "Discover", x: 10.6, group: false, v: "Personal feed with a daily pick." },
    {
      n: "02",
      k: "Recommend",
      x: 23.6,
      group: false,
      v: "Personal recommendations, not the group vote.",
    },
    {
      n: "03",
      k: "Create room",
      x: 36.6,
      group: true,
      v: "One person opens a room and shares a six-letter code.",
    },
    {
      n: "04",
      k: "Pick privately",
      x: 49.6,
      group: true,
      v: "Each member chooses genres on their own phone.",
    },
    {
      n: "05",
      k: "Wait for group",
      x: 62.6,
      group: true,
      v: "Shows that others are still voting, not what they chose.",
    },
    {
      n: "06",
      k: "See the winner",
      x: 76.4,
      group: true,
      v: "The top three, ranked by the share of the group that liked each.",
    },
    {
      n: "07",
      k: "Save for later",
      x: 89.6,
      group: false,
      v: "Personal list for films worth keeping.",
    },
  ],
  mechanism: {
    title: "How the room actually decides",
    flow: [
      { k: "Create", v: "A temporary room with a six-letter code" },
      { k: "Pick genres", v: "Privately, on each phone" },
      { k: "Shortlist", v: "15 popular, well-rated films from the leading genre" },
      { k: "Like or pass", v: "Privately, on the same 15 titles" },
      { k: "Reveal", v: "Top three by the share of the group that liked each" },
    ],
    notes: [
      "If the group's genres don't overlap cleanly, the shortlist falls back to broadly popular titles.",
      "Rooms expire after two hours.",
      "The like-or-pass step isn't pictured in the journey graphic.",
    ],
  },
};

/** Crops of individual phones in the journey image, as % of the original. */
export type Crop = { x: number; y: number; w: number; h: number };

export const decisions = {
  lens: "Decision" as Lens,
  eyebrow: "Decisions for real groups",
  title: "The happy path wasn't enough.",
  items: [
    {
      k: "No friend graph",
      v: "A group that exists for one night doesn't need accounts connected to each other. A six-letter code is enough.",
      crop: { x: 30.6, y: 20.3, w: 12.1, h: 47.8 } as Crop,
      cropLabel: "03 Create room: the lobby and its room code",
    },
    {
      k: "Private choices",
      v: "Genres and votes happen on each person's phone, so nobody anchors on the first opinion.",
      crop: { x: 43.6, y: 20.3, w: 12.1, h: 47.8 } as Crop,
      cropLabel: "04 Pick privately: genre selection",
    },
    {
      k: "Visible progress, hidden preferences",
      v: "The waiting state shows how many people have voted without revealing what anyone chose.",
      crop: { x: 56.6, y: 20.3, w: 12.1, h: 47.8 } as Crop,
      cropLabel: "05 Wait for group: the waiting state",
    },
    {
      k: "No dead end",
      v: "When tastes don't overlap, the shortlist falls back to broadly popular titles instead of coming back empty.",
    },
    {
      k: "Ten people, maximum",
      v: "A room holds up to ten people: sized for a movie night, not a crowd.",
    },
    {
      k: "Finished rooms lock",
      v: "Once the result is in, the room closes, so the decision stays decided.",
    },
  ],
};

export const engineering = {
  lens: "Why" as Lens,
  eyebrow: "Engineering awareness",
  title: "A group product has to feel instant.",
  body: [
    "Movie data was prepared before any room opened, so swiping never waited on a third-party request.",
  ],
  pipeline: [
    { k: "TMDB", v: "Movie catalogue" },
    { k: "OMDB", v: "Enrichment" },
    { k: "Nightly sync", v: "Prepare and enrich" },
    { k: "PostgreSQL", v: "Ready to query" },
    { k: "Redis", v: "Cache hot data" },
    { k: "Room", v: "Serve the group" },
  ],
  note: "The live room never fetches movie metadata from TMDB or OMDB.",
  second: {
    title: "The second engine",
    flow: [
      { k: "Onboarding", v: "Stated preferences" },
      { k: "Collaborative filtering", v: "Taste from similar users" },
      { k: "Python neural model", v: "With a fallback" },
    ],
    body: "I also built personal recommendations. It stretched my engineering skills, but it was a lesson in scope: better personal recommendations were never the core value. Helping a group agree was.",
  },
};

export const verdict = {
  lens: "Result" as Lens,
  eyebrow: "The beta verdict",
  title: ["The concept landed.", "The package didn't."],
  context: "Shipped to a four-person closed beta. What follows is their qualitative feedback.",
  worked: {
    k: "The interaction worked",
    v: "The four beta participants understood and liked private voting, swiping, and receiving a shared winner without an argument.",
  },
  failed: {
    k: "The format didn't",
    v: "Everyone had to install, and keep, an app for a decision that came up only a couple of times a month.",
  },
  bottom: "The adoption cost outweighed the cost of the original problem.",
};

export const decision = {
  eyebrow: "The product decision",
  title: ["The mechanism worked.", "The form factor didn't."],
  body: [
    "I retired ReelPick instead of adding features. No feature would have removed the real cost: asking every member of a group to install and keep an app for an occasional decision.",
    "A link-based experience may have suited an occasional group decision better. That direction was not built or tested.",
  ],
};

export const practice = {
  eyebrow: "What changed in my practice",
  items: [
    {
      k: "Match the solution's format to the problem's frequency.",
      v: "An occasional problem can't ask for a permanent commitment.",
    },
    {
      k: "Design for the quietest person in the room.",
      v: "If the mechanism works for them, it works for everyone.",
    },
    {
      k: "Treat split feedback as product strategy.",
      v: "“We love it” and “we won't install it” are two answers to two different questions.",
    },
  ],
  closing: "ReelPick didn't become a successful app. It made me a better product designer.",
};
