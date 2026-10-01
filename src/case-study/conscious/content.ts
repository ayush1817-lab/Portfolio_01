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
 * - The later website redesign is an INDEPENDENT EXTENSION, never a team
 *   academic deliverable. It is left out until the site exists; the label is
 *   kept so that section can be added back under it.
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
    alt: "The Community Box prototype, photographed at an angle: two white display stands holding colourful cards and stickers.",
    caption: "The physical Community Box.",
    ownership: "TEAM",
    status: "Academic prototype",
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
    brief: "Ideation board from the internal workshop, 16:9",
  },
  boxHero: {
    id: "box-hero",
    slot: "A06",
    file: "community-box.jpg",
    title: "Community in a Box",
    alt: "The Community Box prototype from the front: two white display stands holding support cards, affirmation stickers, seed packets and guides.",
    caption: "The Community Box prototype.",
    ownership: "TEAM",
    status: "Academic prototype",
    aspectRatio: 1,
    brief: "Box prototype photo, front, 1:1",
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
  name: string;
  /** File stem of the hand-drawn sketch in src/assets/conscious/ideas/. */
  sketch: string;
  /** Describes the drawing itself. */
  alt: string;
  /** First sentence of the idea's description in the team's ideation write-up. */
  summary?: string;
  /** What happened to the idea, only where the brief states it. */
  fate?: "Combined into the final service" | "Early privacy concept";
};

export const ideation = {
  label: "MY ROLE" as Ownership,
  eyebrow: "Ideation",
  title: "We deliberately did not start with an app.",
  myRole:
    "I planned and hosted an internal ideation workshop, created the challenges, facilitated the exercises, and helped organise the 12 ideas generated by the team. The exploration included digital and non-digital formats, allowing concepts to complement one another rather than compete as isolated products.",
  railTitle: "12 ideas from the workshop",
  railNote:
    "Each of the 12 ideas from the team's ideation write-up, with its original hand-drawn sketch. Tags mark ideas the brief records as carried forward.",
  ideas: [
    {
      name: "Chat bot",
      sketch: "chatbot",
      alt: "Sketch of two phone screens: a voice screen reading 'listening…' and an assistant chat conversation.",
      summary:
        "An AI chatbot that offers a safe, non-judgemental space for LGBTQ+ individuals to talk, reflect, and access trusted community resources.",
    },
    {
      name: "Magazine",
      sketch: "magazine",
      alt: "Sketch of a single magazine page with pictures and lines of text.",
      summary:
        "A regular digital or printed magazine featuring personal stories from LGBTQ+ individuals across Ireland, alongside upcoming events, community news, and useful resources.",
      fate: "Combined into the final service",
    },
    {
      name: "Community YouTube channel",
      sketch: "youtube-channel",
      alt: "Sketch of a laptop playing a video of a presenter, with more video thumbnails below.",
      summary:
        "A dedicated YouTube channel where LGBTQ+ community members share lived experiences, advice, and personal stories to support and inspire others.",
    },
    {
      name: "Wearable haptics",
      sketch: "wearable-haptics",
      alt: "Sketch of a hand wearing a ring, with vibration lines around it.",
      summary:
        "A discreet wearable device that gently vibrates when another registered LGBTQ+ community member is nearby.",
      fate: "Early privacy concept",
    },
    {
      name: "Community newsletter",
      sketch: "newsletter",
      alt: "Sketch of an offline printed newsletter with a QR code, beside an online listing of upcoming events.",
      summary:
        "A regular newsletter sharing upcoming LGBTQ+ events, community updates, and local opportunities.",
      fate: "Combined into the final service",
    },
    {
      name: "Heatmap",
      sketch: "heatmap",
      alt: "Sketch of a map of Ireland with dots marking where there are more events and where events are needed.",
      summary:
        "An interactive map displaying LGBTQ+ events across Ireland while highlighting regions with little or no community activity.",
    },
    {
      name: "Community resource hub",
      sketch: "resource-hub",
      alt: "Sketch of a laptop showing a Community page with upcoming events, community news and support groups.",
      summary:
        "A shared resource hub where users can contribute and discover existing LGBTQ+ groups, WhatsApp communities, Facebook groups and organisations.",
      fate: "Combined into the final service",
    },
    {
      name: "Care circle",
      sketch: "care-circle",
      alt: "Sketch of a screen titled 'Find your care circle', listing circles such as reading and yoga, with an organiser's profile below.",
      summary:
        "A room where people from across the community can drop in to have conversations, relax, work, and spend time.",
    },
    {
      name: "Community living room",
      sketch: "living-room",
      alt: "Sketch of a lounge with a sofa, table, rugs, chairs and a notice board.",
      summary:
        "A welcoming physical community lounge where LGBTQ+ individuals can drop in to relax, have conversations, work, or simply spend time in a comfortable and inclusive environment.",
    },
    {
      name: "Buddy Programme",
      sketch: "buddy-programme",
      alt: "Sketch of a person with a bag arriving at an open door, where another person waves them in.",
      summary:
        "A buddy programme that pairs LGBTQ+ community members based on shared interests, experiences, or life stages to foster meaningful one-to-one connections.",
      fate: "Combined into the final service",
    },
    {
      name: "Events map of Ireland",
      sketch: "events-map",
      alt: "Sketch of a phone map with event pins, beside an event card with an RSVP button.",
      summary:
        "An interactive map displaying LGBTQ+ events taking place across Ireland, allowing users to easily discover activities based on location, date, or interest.",
      fate: "Combined into the final service",
    },
    {
      name: "XR community room",
      sketch: "xr-room",
      alt: "Sketch of a virtual room with a story wall, a seek-support shelf and a box for anonymous questions.",
      summary:
        "An immersive XR community space where users can anonymously share personal stories, ask questions, and connect with others in a safe virtual environment.",
    },
  ] as Idea[],
  boxNote:
    "Community Box wasn't one of the 12. It emerged later, when we looked for something unique that brought these ideas together.",
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
  insideTitle: "What's inside the box",
  insideNote: "The components of the final prototype.",
  /** Components of the final prototype. Images are cut-outs in src/assets/conscious/box/. */
  components: [
    {
      k: "Conscious Connections Magazine",
      image: "magazine",
      alt: "The Conscious Connections magazine: a cover and an open spread of community stories.",
      v: "A monthly print and digital magazine featuring local events, community stories and trusted support resources.",
    },
    {
      k: "Affirmation stickers",
      image: "affirmation-stickers",
      alt: "Six scalloped stickers with messages such as 'Peace and Love', 'Keep Blooming' and 'Be Yourself'.",
      v: "Colourful stickers featuring uplifting messages that users can keep, share or place on personal items.",
    },
    {
      k: "Game deck",
      image: "game-deck",
      alt: "Four cards from the game deck, including identity definitions, a myth card and a true-or-false card.",
      v: "A card deck that helps LGBTQ+ community members and others learn about identities, attraction and common misconceptions.",
    },
    {
      k: "Coming-out support cards",
      image: "coming-out-cards",
      alt: "Two support cards: one titled 'It didn't go the way you hoped', and one reading 'Resilience'.",
      v: "A set of reassuring cards offering practical guidance for difficult coming-out experiences and emotional setbacks.",
    },
    {
      k: "Resource guide",
      image: "resource-guide",
      alt: "A pink 'Need support?' leaflet listing LGBTQ+ support services and helplines.",
      v: "A guide bringing trusted LGBTQ+ support services, helplines and contact details into one place.",
    },
    {
      k: "Seeds of Connection",
      image: "seeds-of-connection",
      alt: "A seed packet with planting instructions and a 'thank you' card, with seeds scattered below.",
      v: "A small packet of seeds with simple planting instructions and an encouraging message.",
    },
    {
      k: "Interest badges",
      image: "interest-badges",
      alt: "A pin badge showing yoga, camera and hiking icons under the title 'Interest Badges'.",
      v: "Wearable badges that let event attendees share their interests without needing an awkward introduction.",
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
