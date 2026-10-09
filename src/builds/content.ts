/**
 * Small Builds — all copy for the homepage section and the three build pages.
 *
 * Source: the Small Builds implementation brief. Accuracy rules:
 * - No metrics, technologies, findings or collaborators beyond the brief.
 * - 3D pipeline: human-in-the-loop, ~75% accurate in 2024; never "fully autonomous".
 * - Détente: about noticing and interrupting doomscrolling, not strain detection.
 * - Voice agent: a working prototype and interaction-design experiment, not a
 *   production assistant or an Alexa/Siri replacement.
 * - Example exchanges in the visuals are labelled as illustrative.
 */

export type BuildSlug = "3d-pipeline" | "detente" | "voice-agent";
export type Where = "Workflow" | "Object" | "Interface";

export type Step = { k: string; v: string; gate?: boolean };

export type BuildCard = {
  slug: BuildSlug;
  index: string;
  where: Where;
  name: string;
  headline: string;
  description: string;
  tags: string[];
};

export const section = {
  label: "Small builds",
  headline: "Three experiments in where intelligence belongs.",
  body: "Smaller builds where I used AI, automation and interaction design to understand what changes when intelligence moves into a production workflow, a physical object, or the interface itself.",
};

export const cards: BuildCard[] = [
  {
    slug: "3d-pipeline",
    index: "01",
    where: "Workflow",
    name: "AI-assisted 3D Pipeline",
    headline: "Turning scene scripts into production-ready asset pipelines.",
    description:
      "A human-in-the-loop automation I built for a VR production team that extracted asset requirements, searched existing 3D libraries and generated missing models - reducing a process that took 7-10 days to roughly one day.",
    tags: ["AI Automation", "3D", "Agents", "Production Workflow"],
  },
  {
    slug: "detente",
    index: "02",
    where: "Object",
    name: "Détente",
    headline: "Breaking the scroll loop through a wearable interaction.",
    description:
      "A fashion-forward intelligent bracelet that uses colour, movement and physical feedback to help Gen Z women notice and interrupt doomscrolling.",
    tags: ["HCI Hackathon", "Wearable", "Behaviour Design"],
  },
  {
    slug: "voice-agent",
    index: "03",
    where: "Interface",
    name: "Voice Agent",
    headline: "You set the boundary. The model finds the route.",
    description:
      "A local voice agent I built to explore tool use, permissions and screenless AI interaction - where the model decides which capabilities to use instead of following a predefined workflow.",
    tags: ["Voice AI", "Agents", "Interaction Design"],
  },
];

export const buildUrl = (slug: BuildSlug) => `${import.meta.env.BASE_URL}work/builds/${slug}/`;

/* ────────────────────────────── 01 · 3D pipeline ────────────────────────────── */

export const pipeline = {
  heroLine: "Reducing a 7-10 day modelling bottleneck to roughly one day.",
  meta: [
    { k: "Context", v: "OAKS Kids Pvt Limited · VR gaming team" },
    { k: "Year", v: "2024" },
    { k: "Timeframe", v: "20-day target" },
    { k: "Approach", v: "Human-in-the-loop automation" },
  ],
  context: {
    eyebrow: "Context",
    title: "One stage kept holding production up.",
    body: [
      "At OAKS Kids Pvt Limited, the gaming team was creating VR experiences. The production pipeline moved from script to 3D modelling, then texturing, animation and development.",
      "The recurring bottleneck was the 3D modelling stage: artists first had to interpret the script, identify required assets, search for reusable models and decide what had to be created from scratch.",
    ],
    production: [
      { k: "Script", v: "Scene written" },
      { k: "3D modelling", v: "The bottleneck", warn: true },
      { k: "Texturing", v: "Surface detail" },
      { k: "Animation", v: "Movement" },
      { k: "Development", v: "Built into VR" },
    ],
  },
  constraint: {
    eyebrow: "Constraint",
    title: "20 days, learning as I built.",
    body: [
      "I was given a 20-day target in 2024 to explore whether AI could make this part of the pipeline faster. I had to learn the necessary NLP and agent concepts and design the workflow from scratch.",
    ],
  },
  overview: [
    { k: "Script", v: "Scene input" },
    { k: "Extract", v: "Asset list" },
    { k: "Search", v: "Existing models" },
    { k: "Generate", v: "Missing assets" },
    { k: "Review", v: "Human approval", human: true },
    { k: "Handoff", v: "Next team" },
  ],
  workflow: {
    eyebrow: "Workflow",
    title: "Search before generating. Approve before continuing.",
    steps: [
      { k: "Script ingestion", v: "A scene script is passed to an agent." },
      {
        k: "Asset extraction",
        v: "The agent identifies the 3D assets likely required and writes them to an Excel sheet.",
      },
      {
        k: "Human approval",
        v: "The list pauses for correction and approval before continuing.",
        gate: true,
      },
      {
        k: "Search before generation",
        v: "The workflow queries available 3D model sources and matches candidates mainly through keywords and metadata.",
      },
      {
        k: "Human verification",
        v: "Suitable downloadable models are approved and generation is skipped.",
        gate: true,
      },
      {
        k: "Generate the missing assets",
        v: "Rejected or unavailable assets are turned into prompts by another agent and sent to the Meshy 3D API, using the model available at the time.",
      },
      {
        k: "Internal review",
        v: "Generated models appear on an internal web page and wait for approval.",
        gate: true,
      },
      {
        k: "Production handoff",
        v: "Approved models and textures are downloaded, uploaded to Drive and passed into the next stage of the pipeline.",
      },
    ] as Step[],
  },
  principle: {
    line: "AI proposes. Humans verify. Automation continues.",
    sub: "The system was designed around the assumption that AI would sometimes be wrong. Human approval was placed at asset identification, external-model selection and generated-model review.",
  },
  outcome: {
    before: { value: "7-10 days", label: "for one script to move through the asset stage" },
    after: { value: "~1 day", label: "to process one script, sometimes two" },
    honesty: {
      title: "Accuracy and honesty",
      body: "The workflow was around 75% accurate in 2024. The limiting factor was largely the quality of available 3D generation models, so this was a useful human-in-the-loop system, not a fully autonomous pipeline.",
    },
  },
  today: {
    title: "What I would improve today",
    items: [
      "Replace metadata-only discovery with stronger multimodal comparison.",
      "Pre-rank candidate assets automatically.",
      "Reduce unnecessary human review while keeping approval at critical production decisions.",
    ],
  },
};

/* ────────────────────────────── 02 · Détente ────────────────────────────── */

export type DetenteState = "scroll" | "signal" | "move" | "recover";

export const detente = {
  heroLine: "Breaking the scroll loop through a wearable interaction.",
  meta: [
    { k: "Context", v: "HCI hackathon" },
    { k: "Form", v: "Intelligent bracelet" },
    { k: "For", v: "Gen Z women" },
    { k: "Senses", v: "Motion · LED colour feedback" },
  ],
  what: {
    eyebrow: "What it is",
    title: "Digital self-care you can wear.",
    body: [
      "Détente is a fashion-forward intelligent bracelet created for an HCI hackathon. It is designed to help Gen Z women notice and interrupt doomscrolling in real time through motion sensing, LED colour feedback and a small physical movement.",
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "Not screen time. The moment scrolling stops being a choice.",
    body: [
      "The project is not about eliminating phone use. It focuses on the moment intentional use turns into an automatic, uninterrupted scrolling loop that the user may fail to notice in the moment.",
    ],
  },
  interaction: {
    eyebrow: "The interaction",
    title: "Scroll. Signal. Move. Recover.",
    steps: [
      {
        id: "scroll" as DetenteState,
        k: "Scroll",
        v: "The user keeps scrolling on social media. The bracelet stays calm.",
        state: "Calm",
      },
      {
        id: "signal" as DetenteState,
        k: "Signal",
        v: "Red gradually spreads around the bracelet as the loop continues.",
        state: "Red spreading",
      },
      {
        id: "move" as DetenteState,
        k: "Move",
        v: "A small indicator suggests a hand or wrist movement.",
        state: "Movement cue",
      },
      {
        id: "recover" as DetenteState,
        k: "Recover",
        v: "After the movement, the bracelet returns to green.",
        state: "Back to green",
      },
    ],
  },
  why: {
    eyebrow: "Why a wearable",
    title: "Move the intervention off the screen.",
    body: [
      "Most digital-wellbeing interventions live on the same device demanding attention. Détente moves the intervention outside the screen.",
      "The bracelet is intentionally desirable, expressive and non-clinical, so digital self-care can exist as an everyday object rather than a corrective device. The interface is the bracelet changing state through colour and movement, not another dashboard.",
    ],
  },
  principle: {
    line: "Care, not correction.",
    sub: "Doomscrolling moves from an invisible digital habit into a visible, embodied moment of care. The system does not punish the user or block the phone; it introduces a gentle interruption and gives the user a chance to consciously choose what happens next.",
  },
  next: {
    title: "What I would test next",
    items: [
      {
        k: "Detection accuracy",
        v: "Can the system distinguish intentional browsing from compulsive scrolling?",
      },
      { k: "Intervention fatigue", v: "Do users learn to ignore the signal?" },
      { k: "Personalisation", v: "Should thresholds differ by person or context?" },
      { k: "Social visibility", v: "Does visible colour create awareness or embarrassment?" },
      { k: "Fashion adoption", v: "Would someone still wear it if the technology was removed?" },
    ],
  },
};

/* ────────────────────────────── 03 · Voice agent ────────────────────────────── */

export const voice = {
  heroLine: "You set the boundary. The model finds the route.",
  meta: [
    { k: "Status", v: "Working prototype" },
    { k: "Runs", v: "Locally" },
    { k: "Stack", v: "Deepgram · Claude · Python · Cartesia · Pipecat" },
    { k: "Explores", v: "Tool use · permissions · screenless UX" },
  ],
  origin: {
    eyebrow: "Where it started",
    title: "Why can't a voice assistant actually do things for me?",
    body: [
      "The project began with an unused Echo and a question: could it be reflashed into something that actually performed useful actions? Modern hardware restrictions made that path a dead end, but the underlying question remained.",
    ],
  },
  what: {
    eyebrow: "What it is",
    title: "A local, extensible voice agent built from parts I control.",
    body: [
      "Deepgram transcribes speech, Claude reasons over the request and the available tools, Python functions execute local actions, Cartesia produces the spoken response, and Pipecat keeps the pipeline streaming so it feels conversational.",
    ],
    pipeline: [
      { k: "Voice", v: "User speaks" },
      { k: "Deepgram", v: "Transcribe" },
      { k: "Claude", v: "Reason + select tool" },
      { k: "Python", v: "Run tool" },
      { k: "Claude", v: "Respond" },
      { k: "Cartesia", v: "Speak" },
    ],
    capabilities: [
      "Check a simulated weather service.",
      "Write notes to a local file.",
      "Read those notes back.",
      "Ask for confirmation before write actions.",
    ],
  },
  routes: {
    eyebrow: "The finding",
    title: "Capabilities, not routes.",
    body: [
      "In traditional workflow tools, the designer specifies the route: trigger, then node A, then node B. Here, I define the available capabilities and the model decides which one to use at runtime.",
      "That means an indirect request such as “Do I need a jacket?” can trigger a weather lookup even though the user never explicitly asked to check the weather.",
    ],
    workflow: ["Trigger", "Node A", "Node B"],
    agent: ["Weather lookup", "Write note", "Read notes"],
  },
  principle: {
    line: "You set the boundary. You don't set the route.",
  },
  findings: [
    {
      k: "Tool descriptions are interface design",
      v: "A tool description must communicate not only what a function does, but when the model should reach for it. Changing that description could flip whether indirect requests were handled correctly, which turns tool descriptions into specifications for a reasoning system.",
    },
    {
      k: "Actions need permission design",
      v: "Reading information and changing information are not the same interaction. The prototype adds a confirmation gate before write operations, which raises a broader question: when should an agent act immediately, and when should it ask first?",
    },
  ],
  screenless: {
    title: "Screenless state",
    items: [
      "How does the user know it is listening?",
      "How does the user know it is thinking or executing?",
      "What does the system do when it is only partly confident?",
      "When does silence mean “working” versus “broken”?",
    ],
  },
  evaluation: {
    title: "Next step: evaluation",
    body: "Run a fixed set of utterances, log interpretation and tool selection, and categorise failures. That evaluation is what turns the build from a demo into an AI interaction-design experiment.",
    categories: [
      "Intent",
      "Tool selection",
      "Tool description",
      "Confirmation",
      "Speech recognition",
      "Response quality",
    ],
  },
};
