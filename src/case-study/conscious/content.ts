/**
 * Conscious Connections case study — all copy and the asset manifest.
 *
 * Source boundary: the Conscious Connections case-study webpage brief, which
 * draws only on the correct Ayush Ramawat academic portfolio.
 *
 * Accuracy rules:
 * - No participant counts, metrics, test results, launch outcomes, dates,
 *   partner statements or implementation status beyond what the brief states.
 * - The academic website is a concept/design proposal; the architecture is
 *   proposed, not shipped.
 * - The website redesign is an INDEPENDENT EXTENSION completed after the
 *   academic project, never a team academic deliverable.
 * - Team outcomes are never presented as Ayush's sole work.
 */

/* ────────────────────────────────────────────────────────────────
 * Ownership
 * ──────────────────────────────────────────────────────────────── */

export type Ownership =
  | "MY ROLE"
  | "TEAM"
  | "DECISION"
  | "TEAM + MY ROLE"
  | "INDEPENDENT EXTENSION"
  | "CONTEXT";

/* ────────────────────────────────────────────────────────────────
 * Asset manifest
 *
 * To add a real artifact: put the file in src/assets/conscious/ with the
 * exact `file` name below. It is picked up automatically at build time.
 * Until then each slot renders as a labelled placeholder.
 * ──────────────────────────────────────────────────────────────── */

export type Asset = {
  id: string;
  /** Slot code from the brief's asset plan (A01–A11). */
  slot: string;
  /** Expected filename in src/assets/conscious/. */
  file: string;
  title: string;
  alt: string;
  caption: string;
  ownership: Ownership;
  /** Implementation / evidence status, shown in the caption. */
  status: string;
  /** width / height, reserved before the image loads (no layout shift). */
  aspectRatio: number;
  /** What the final image should show — printed on the placeholder. */
  brief: string;
};

export const assets = {
  heroBox: {
    id: "hero-box",
    slot: "A01a",
    file: "hero-community-box.jpg",
    title: "Community Box",
    alt: "The Community Box concept.",
    caption: "The physical Community Box.",
    ownership: "TEAM",
    status: "Academic concept",
    aspectRatio: 4 / 5,
    brief: "Box photo or render, neutral background, 4:5",
  },
  heroDesktop: {
    id: "hero-desktop",
    slot: "A01b",
    file: "hero-website-desktop.jpg",
    title: "Website, desktop",
    alt: "The Conscious Connections website concept on a desktop screen.",
    caption: "The academic website concept on desktop.",
    ownership: "TEAM + MY ROLE",
    status: "Academic concept / design proposal",
    aspectRatio: 16 / 10,
    brief: "Desktop website view, 16:10",
  },
  heroMobile: {
    id: "hero-mobile",
    slot: "A01c",
    file: "hero-buddy-connect-mobile.jpg",
    title: "Buddy Connect, mobile",
    alt: "The Buddy Connect flow on a mobile screen.",
    caption: "Buddy Connect on mobile.",
    ownership: "TEAM + MY ROLE",
    status: "Academic concept / design proposal",
    aspectRatio: 9 / 19,
    brief: "Mobile or Buddy Connect view, 9:19",
  },
  context: {
    id: "context",
    slot: "A02",
    file: "context-rural-ireland.jpg",
    title: "Rural Ireland context",
    alt: "Rural Ireland travel context.",
    caption: "The geographic context: distance and travel shape access to community.",
    ownership: "CONTEXT",
    status: "Licensed or owned imagery only",
    aspectRatio: 21 / 9,
    brief: "Rural Ireland / travel context, licensed or owned, 21:9",
  },
  researchGuide: {
    id: "research-guide",
    slot: "A03a",
    file: "research-interview-guide.jpg",
    title: "Interview guide",
    alt: "The interview guide used for community interviews.",
    caption: "Interview guide.",
    ownership: "TEAM + MY ROLE",
    status: "Academic research artifact",
    aspectRatio: 4 / 3,
    brief: "Interview guide, 4:3",
  },
  researchThemes: {
    id: "research-themes",
    slot: "A03b",
    file: "research-thematic-analysis.jpg",
    title: "Thematic analysis",
    alt: "The team's thematic analysis of interview findings.",
    caption: "Thematic analysis.",
    ownership: "TEAM",
    status: "Academic research artifact",
    aspectRatio: 4 / 3,
    brief: "Affinity map / themes, 4:3",
  },
  researchPersonas: {
    id: "research-personas",
    slot: "A03c",
    file: "research-personas.jpg",
    title: "Personas",
    alt: "Personas developed from the research.",
    caption: "Personas.",
    ownership: "TEAM",
    status: "Academic research artifact",
    aspectRatio: 4 / 3,
    brief: "Persona sheets, 4:3",
  },
  researchSupporting: {
    id: "research-supporting",
    slot: "A03d",
    file: "research-supporting.jpg",
    title: "Supporting artifacts",
    alt: "Supporting research artifacts, including journey fragments.",
    caption: "Supporting artifacts and journey fragments.",
    ownership: "TEAM",
    status: "Academic research artifact",
    aspectRatio: 4 / 3,
    brief: "Journey fragments or other evidence, 4:3",
  },
  earlyConcepts: {
    id: "early-concepts",
    slot: "A04",
    file: "early-privacy-concepts.jpg",
    title: "Early privacy concepts",
    alt: "Early privacy concepts: an anonymous badge, discreet haptics and sketches.",
    caption:
      "Early privacy concepts: anonymous participation, discreet signals and wearable haptics.",
    ownership: "TEAM",
    status: "Early academic concepts, not carried forward as proposed",
    aspectRatio: 16 / 9,
    brief: "Anonymous badge / discreet haptics / sketches, 16:9",
  },
  ideationBoard: {
    id: "ideation-board",
    slot: "A05",
    file: "ideation-12-ideas.jpg",
    title: "Ideation workshop output",
    alt: "The ideas generated in the internal ideation workshop.",
    caption: "Ideation output from the internal workshop I planned and facilitated.",
    ownership: "MY ROLE",
    status: "Academic workshop artifact",
    aspectRatio: 16 / 9,
    brief: "Ideation board, grouped by contributor, 16:9",
  },
  boxHero: {
    id: "box-hero",
    slot: "A06",
    file: "community-box.jpg",
    title: "Community in a Box",
    alt: "The Community Box, opened to show its magazine, resources, activities and pathway cards.",
    caption: "The Community Box and its components.",
    ownership: "TEAM",
    status: "Academic concept",
    aspectRatio: 3 / 2,
    brief: "High-resolution box photo or render with components visible, 3:2",
  },
  academicWebsite: {
    id: "academic-website",
    slot: "A07",
    file: "academic-website-concept.jpg",
    title: "Academic website concept",
    alt: "Screens from the academic website concept and its information structure.",
    caption: "The website concept produced during the academic project.",
    ownership: "TEAM + MY ROLE",
    status: "Academic concept / design proposal",
    aspectRatio: 16 / 9,
    brief: "Existing concept screens and information structure, 16:9",
  },
  redesignConcept: {
    id: "redesign-concept",
    slot: "A08a",
    file: "redesign-existing-concept.jpg",
    title: "Existing concept and service requirements",
    alt: "The existing website concept and the service requirements for the redesign.",
    caption: "Starting point: the existing concept and service requirements.",
    ownership: "INDEPENDENT EXTENSION",
    status: "In progress, added when produced",
    aspectRatio: 16 / 10,
    brief: "Existing concept + requirements, 16:10",
  },
  redesignIA: {
    id: "redesign-ia",
    slot: "A08b",
    file: "redesign-information-architecture.jpg",
    title: "Information architecture",
    alt: "Information architecture for the website redesign.",
    caption: "Information architecture.",
    ownership: "INDEPENDENT EXTENSION",
    status: "In progress, added when produced",
    aspectRatio: 16 / 10,
    brief: "IA diagram, 16:10",
  },
  redesignWireframes: {
    id: "redesign-wireframes",
    slot: "A08c",
    file: "redesign-wireframes.jpg",
    title: "Wireframes and key UX decisions",
    alt: "Wireframes for the website redesign, annotated with key UX decisions.",
    caption: "Wireframes and key UX decisions.",
    ownership: "INDEPENDENT EXTENSION",
    status: "In progress, added when produced",
    aspectRatio: 16 / 10,
    brief: "Wireframes, 16:10",
  },
  redesignVisual: {
    id: "redesign-visual",
    slot: "A08d",
    file: "redesign-visual-direction.jpg",
    title: "Visual direction and accessibility choices",
    alt: "Visual system and accessibility choices for the website redesign.",
    caption: "Visual system and accessibility choices.",
    ownership: "INDEPENDENT EXTENSION",
    status: "In progress, added when produced",
    aspectRatio: 16 / 10,
    brief: "Visual system, 16:10",
  },
  redesignScreens: {
    id: "redesign-screens",
    slot: "A08e",
    file: "redesign-responsive-screens.jpg",
    title: "Final responsive screens",
    alt: "Final responsive screens of the website redesign.",
    caption: "Final responsive screens.",
    ownership: "INDEPENDENT EXTENSION",
    status: "In progress, added when produced",
    aspectRatio: 16 / 10,
    brief: "Desktop + mobile screens, 16:10",
  },
  ecosystem: {
    id: "ecosystem",
    slot: "A09",
    file: "service-ecosystem.jpg",
    title: "Service ecosystem source diagram",
    alt: "The team's service ecosystem diagram.",
    caption: "The original service ecosystem diagram.",
    ownership: "TEAM",
    status: "Academic concept",
    aspectRatio: 16 / 9,
    brief: "Simplified service journey and touchpoints, 16:9",
  },
  architectureFull: {
    id: "architecture-full",
    slot: "A10",
    file: "architecture-full.jpg",
    title: "Full system architecture",
    alt: "The full proposed system architecture diagram from the academic project.",
    caption: "The full proposed architecture from the academic project.",
    ownership: "MY ROLE",
    status: "Proposed architecture, not a shipped system",
    aspectRatio: 16 / 10,
    brief: "Full academic architecture diagram, 16:10",
  },
  buddyFlow: {
    id: "buddy-flow",
    slot: "A11",
    file: "buddy-connect-flow.jpg",
    title: "Buddy Connect flow",
    alt: "The Buddy Connect preference flow.",
    caption: "The Buddy Connect preference flow.",
    ownership: "TEAM + MY ROLE",
    status: "Academic concept / design proposal",
    aspectRatio: 16 / 9,
    brief: "Buddy Connect screens or flow, 16:9",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;

/* ────────────────────────────────────────────────────────────────
 * Copy
 * ──────────────────────────────────────────────────────────────── */

export const hero = {
  label: "TEAM + MY ROLE" as Ownership,
  title: "Conscious Connections",
  headline: "Designing a safer path from private discovery to meaningful community connection.",
  intro:
    "A hybrid physical and digital service concept helping LGBTQ+ women and non-binary people in rural Ireland discover resources, build confidence, and connect with community at their own pace.",
  meta: [
    { k: "Role", v: "Product Designer · Research Coordinator · Systems Contributor" },
    { k: "Team", v: "Four-person student design team" },
    { k: "Partner", v: "Conscious Connections" },
    { k: "Focus", v: "Research · Service design · Product thinking · Systems contribution" },
  ],
};

export const glance = [
  {
    k: "Problem",
    v: "Rural LGBTQ+ women and non-binary people can face geographic, social, privacy, and discoverability barriers when seeking meaningful community.",
  },
  {
    k: "Insight",
    v: "People need more than access. They need control over visibility and the pace of participation.",
  },
  {
    k: "Response",
    v: "A connected service combining a Community Box, website, magazine, events, resources, stories, and Buddy Connect.",
  },
];

export const research = {
  label: "TEAM" as Ownership,
  eyebrow: "Context + research",
  title: "Finding your community should not depend on where you live.",
  body: [
    "Conscious Connections asked how meaningful, wellbeing-centred community experiences could be supported beyond pubs, clubs, and mainstream social media. The research focused on LGBTQ+ women and non-binary adults with experience living in rural Ireland.",
  ],
  tensionsTitle: "Three tensions shaped the project",
  tensions: [
    {
      want: "I want connection.",
      but: "But distance, transport, and fragmented information make it hard to discover and attend.",
    },
    {
      want: "I want to participate.",
      but: "But I need control over who knows, what I disclose, and when I become visible.",
    },
    {
      want: "Online improves access.",
      but: "But online discovery is not the same as trust, readiness, or belonging.",
    },
  ],
  myRole:
    "I coordinated participant communication and interview arrangements, conducted community interviews, and helped connect the lived context behind participants' words to the team's thematic analysis.",
  readinessTitle: "Connection is a journey, not a search result",
  readiness: [
    "Can I find it?",
    "Can I trust it?",
    "Do I know what to expect?",
    "Do I feel ready?",
    "Can I control disclosure?",
    "Will I belong?",
    "Can I remain involved?",
  ],
  disclosure: "View research process",
  disclosureNote:
    "Interview guide, thematic analysis, personas and supporting artifacts, kept here as evidence rather than a methods list.",
};

export const turningPoint = {
  label: "DECISION" as Ownership,
  eyebrow: "The turning point",
  title: "Our first instinct was to design for privacy.",
  body: [
    "Early concepts explored anonymous participation, discreet signals, and wearable haptics. These directions responded to genuine concerns about exposure and judgement.",
    "But something felt wrong.",
  ],
  question:
    "Were we helping people manage identity safely - or reinforcing the idea that they should hide it?",
  myRole:
    "During concept selection, I challenged the repeated emphasis on hiding LGBTQ+ identity. I argued that privacy should give people control over participation, not make invisibility the default.",
  initial: { title: "Initial logic", steps: ["Safety", "Discretion", "Invisibility"] },
  reframed: {
    title: "Reframed logic",
    steps: ["Safety", "Control", "Confidence", "Participation"],
  },
  decision: "Privacy should create control, not make invisibility the default.",
};

export const principles = {
  title: "Three principles guided what came next",
  items: [
    {
      k: "Control, not invisibility",
      v: "Make privacy adjustable to the person's comfort and context.",
    },
    {
      k: "Participation at your own pace",
      v: "Discovery does not have to become immediate social interaction.",
    },
    {
      k: "Technology enables community",
      v: "Digital tools should make human and physical community easier to access, not replace it.",
    },
  ],
};

export type Idea = {
  name: string | null;
  /** Grounded note on what happened to the idea, from the brief. */
  fate?: "Became the core concept" | "Combined into the final service" | "Early privacy concept";
};

export const ideation = {
  label: "MY ROLE" as Ownership,
  eyebrow: "Ideation",
  title: "We deliberately did not start with an app.",
  myRole:
    "I planned and hosted an internal ideation workshop, created the challenges, facilitated the exercises, and helped organise the 12 ideas generated by the team. The exploration included digital and non-digital formats, allowing concepts to complement one another rather than compete as isolated products.",
  railTitle: "12 ideas from the workshop",
  railNote:
    "Named concepts are the ones that explain the final synthesis. The remaining slots will be filled from the original workshop output.",
  ideas: [
    { name: "Community Box", fate: "Became the core concept" },
    { name: "Magazine", fate: "Combined into the final service" },
    { name: "Newsletter", fate: "Combined into the final service" },
    { name: "Resource hub", fate: "Combined into the final service" },
    { name: "Buddy Programme", fate: "Combined into the final service" },
    { name: "Event map", fate: "Combined into the final service" },
    { name: "Shared-experience platform", fate: "Combined into the final service" },
    { name: "Discreet haptics", fate: "Early privacy concept" },
    { name: "Anonymous participation", fate: "Early privacy concept" },
    { name: null },
    { name: null },
    { name: null },
  ] as Idea[],
  decision:
    "Instead of asking which interface to build, we asked what combination of experiences best supports the journey into community.",
};

export const box = {
  label: "TEAM" as Ownership,
  eyebrow: "The solution",
  title: "Community in a Box.",
  sub: "A low-pressure starting point for exploring community.",
  body: [
    "The Community Box is a physical, supportive introduction to LGBTQ+ knowledge, resources, and connection. It helps people find, understand, and connect with existing communities without requiring immediate participation.",
  ],
  moreTitle: "More than a box",
  more: "The team combined elements from the magazine, newsletter, resource hub, Buddy Programme, event map, and shared-experience platform into one connected service. The box makes the first step smaller, more private, and more approachable; it does not replace existing communities.",
  /** Hotspot positions are % of the image; adjust once the real photo is in. */
  parts: [
    {
      k: "Magazine",
      v: "Stories, representation, events, and community information.",
      x: 24,
      y: 38,
    },
    {
      k: "Resources",
      v: "Trusted support information gathered into an approachable format.",
      x: 50,
      y: 30,
    },
    {
      k: "Activities",
      v: "Tools that support reflection, conversation, and confidence.",
      x: 72,
      y: 46,
    },
    {
      k: "Pathways",
      v: "QR links and service routes toward events, the website, and Buddy Connect.",
      x: 44,
      y: 70,
    },
  ],
};

export const critique = {
  labels: ["MY ROLE", "DECISION"] as Ownership[],
  eyebrow: "Self-critique",
  title: "Then we found a flaw in our own solution.",
  question: "What happens if someone cannot or does not want to receive a Community Box?",
  barriers: [
    { k: "Delivery privacy", v: "Where and how can it be received?" },
    { k: "Visible packaging", v: "Who might see the package?" },
    { k: "Distribution access", v: "Can the person reach a distribution point?" },
    { k: "Uncertain relevance", v: "Is this for me?" },
    { k: "Digital preference", v: "Some people prefer information online." },
    { k: "Explore first", v: "Some want to look around before ordering anything." },
    { k: "Current information", v: "Can printed information stay current?" },
  ],
  decision: "The solution could not depend on one doorway.",
  myRole:
    "I defined the website as an alternative and complementary access point, connecting events, stories, the magazine, resources, and Buddy Connect.",
};

export const website = {
  label: "TEAM + MY ROLE" as Ownership,
  eyebrow: "The website",
  title: "One community. Multiple ways in.",
  body: [
    "Some users may only want to read privately. Others may be ready to attend an event, request a box, or connect with a buddy. The website should support exploration without forcing registration or immediate participation.",
  ],
  routes: [
    { k: "Explore", v: "Read stories and learn what the service offers." },
    { k: "Discover", v: "Find events using interests, date, and approximate location." },
    { k: "Request", v: "Understand and request the Community Box when ready." },
    { k: "Connect", v: "Choose Buddy Connect and share only agreed preferences." },
  ],
  extension: {
    label: "INDEPENDENT EXTENSION" as Ownership,
    title: "INDEPENDENT EXTENSION - WEBSITE REDESIGN",
    body: "After the academic project, Ayush continued exploring the public-facing website. This redesign is an independent extension, not a team deliverable completed during the academic project.",
    note: "Artifacts appear here only as they are produced.",
  },
};

export const ecosystem = {
  label: "TEAM" as Ownership,
  eyebrow: "Service ecosystem",
  title: ["It was not really a box.", "It was a connected service ecosystem."],
  body: [
    "Physical resources, digital services, and community experiences work together across discovery, preparation, connection, and continued involvement.",
  ],
  stages: [
    { k: "Discover", touch: ["Website", "Posters", "QR codes", "Social and partner channels"] },
    { k: "Explore", touch: ["Stories", "Magazine", "Resources", "Event discovery"] },
    { k: "Prepare", touch: ["Community Box", "Expectations", "Reassurance", "Preferences"] },
    { k: "Connect", touch: ["Events", "Buddy Connect", "Introductions"] },
    {
      k: "Stay involved",
      touch: ["Ongoing content", "Community participation", "Feedback", "Updates"],
    },
  ],
  layer:
    "The website runs across every stage as a connective layer, not a hub that replaces everything else.",
  bridge:
    "The components are not separate features. They support different levels of confidence and different ways of entering the same community journey.",
};

export const buddy = {
  label: "TEAM + MY ROLE" as Ownership,
  eyebrow: "Buddy Connect",
  title: "Connection without oversharing.",
  body: [
    "Buddy Connect is a proposed rule-based process. It compares only preferences that people have agreed to provide, instead of automatically exposing personal details.",
  ],
  demoLabel: "Illustrative matching logic",
  demoNote:
    "A demonstration of which information enters the comparison. It does not simulate a real match, collect any data, or imply tested matching performance.",
  prefs: [
    { k: "Shared interests", v: "Natural starting points for conversation." },
    { k: "Approximate location", v: "A suitable region without revealing a precise address." },
    { k: "Availability", v: "Days and times that work for both people." },
    { k: "Communication preference", v: "Messaging, voice, online, or in-person." },
    { k: "Support preference", v: "Conversation, local guidance, event support, or information." },
  ],
  keyLine: "Privacy was not added at the end. It shaped what the system was allowed to compare.",
};

export const architecture = {
  label: "MY ROLE" as Ownership,
  eyebrow: "System architecture",
  title: "Thinking beyond the interface.",
  sub: "A secure, connected system supporting the service journey.",
  myRole:
    "I contributed to the website backend concept, the user interaction model, and the system architecture connecting the Community Box, magazine, events, resources, and Buddy Connect.",
  status: "Proposed architecture, not a shipped production system",
  layers: [
    { k: "Experience", items: ["Website", "Community Box", "Magazine", "Buddy Connect"] },
    {
      k: "Core services",
      items: ["Authentication", "Content management", "Events", "Buddy matching"],
    },
    { k: "Data", items: ["Accounts", "Chosen preferences", "Box requests", "Event information"] },
    {
      k: "Privacy + security",
      items: [
        "HTTPS",
        "Password hashing",
        "Role-based access",
        "Optional location",
        "Minimal data collection",
      ],
    },
    {
      k: "External services",
      items: [
        "Authentication",
        "Content / database",
        "Location / event discovery",
        "Email notifications",
      ],
    },
  ],
  insight:
    "Privacy is both an interaction principle and an architectural constraint: collect less, share approximate rather than precise location, and compare only agreed preferences.",
  disclosure: "View full system architecture",
};

export const reflection = {
  label: "MY ROLE" as Ownership,
  eyebrow: "Reflection",
  title: "What this project changed about how I design.",
  body: [
    "I began by thinking the central problem was access: help people find community. Interviews and concept refinement showed that discovery was only one stage. People also needed to assess safety, understand what to expect, decide what to disclose, feel ready to participate, and find a reason to remain involved.",
    "My biggest learning was that designing for safety does not necessarily mean designing for invisibility. The stronger approach is to give people control over the transition from private exploration to confidence, participation, and meaningful connection.",
  ],
  before: "How can technology help people find community?",
  after: "How can a service support the whole journey into community at a person's own pace?",
  nextTitle: "What I would test next",
  nextNote: "Future validation questions, not measured results.",
  next: [
    "Do people understand what the service offers?",
    "Do people feel more confident before attending an event?",
    "Does requesting a box feel private enough?",
    "Is Buddy Connect consent clear?",
  ],
};
