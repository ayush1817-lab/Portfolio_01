/**
 * OptiApply case study — all copy and screenshot metadata live here so the
 * story can be edited without touching layout code.
 *
 * Accuracy rules (from the implementation spec):
 * - No invented users, outcomes, conversion, time saved or research findings.
 *   User count and feedback come from the author (12 early users).
 * - 200+, 20, Daily and "1 connected workflow" are product-state facts.
 * - Hunt Mode funnel is 1,963 fetched · 1,928 cached · 35 new · 1 matched.
 * - Screenshots are evidence: crop to focus, never redraw or relabel.
 */

/* ────────────────────────────────────────────────────────────────
 * Screenshot metadata
 * ──────────────────────────────────────────────────────────────── */

/** Percent-based rectangle within the original image. */
export type Crop = { x: number; y: number; w: number; h: number };

export type Annotation = {
  n: number;
  label: string;
  /** Target point in % of the ORIGINAL image. Omit to show the note in the legend only. */
  x?: number;
  y?: number;
  /** Which gutter holds the pin. Chosen so the leader line crosses whitespace, not labels. */
  side?: "left" | "right";
};

export type Shot = {
  /** Exact filename in src/assets/optiapply/. */
  file: string;
  /** Intrinsic pixel size, used for width/height attributes (no layout shift). */
  width?: number;
  height?: number;
  title: string;
  alt: string;
  caption: string;
  annotations?: Annotation[];
};

export type ShotId =
  | "jdInput"
  | "resumeInput"
  | "baseline"
  | "analysis"
  | "roleUnderstanding"
  | "metrics"
  | "rewrites"
  | "process"
  | "verification"
  | "huntProfile"
  | "huntDigest"
  | "dashboard";

export const shots: Record<ShotId, Shot> = {
  jdInput: {
    file: "optimizer-09.png",
    width: 938,
    height: 473,
    title: "Screen 01 · Job-description input",
    alt: "OptiApply's Optimize screen with a pasted job description in a text area and an 'Analyze this job' button, under the product navigation.",
    caption: "The first state of the Analyzer: paste the role, then ask OptiApply to analyse it.",
  },
  resumeInput: {
    file: "optimizer-08.png",
    width: 657,
    height: 388,
    title: "Screen 02 · Resume input",
    alt: "The second Optimize step, 'Now paste your resume', showing resume text in a text area, an Upload PDF/DOCX option and a 'Score my resume' button.",
    caption: "The second half of the baseline: the candidate's own evidence.",
  },
  baseline: {
    file: "optimizer-07.png",
    width: 638,
    height: 422,
    title: "Screen 03 · Baseline score",
    alt: "A score ring reading 38 out of 100, with the line 'Your resume matches 5 of 28 requirements for this role' and two actions: 'See what's missing' and 'Fix it with AI'.",
    caption: "The baseline for this one resume and this one role, not a universal benchmark.",
    annotations: [
      { n: 1, x: 38, y: 36, side: "left", label: "Overall alignment: 38/100." },
      { n: 2, x: 26, y: 55.5, side: "left", label: "Coverage: 5 of 28 role requirements." },
      {
        n: 3,
        x: 79,
        y: 76,
        side: "right",
        label: "The next action offers diagnosis or AI-assisted fixing.",
      },
    ],
  },
  analysis: {
    file: "optimizer-06.png",
    width: 811,
    height: 877,
    title: "Screen 04 · Resume Analysis Summary",
    alt: "Resume Analysis Summary: a banner reading 'Your resume matches 5 of 28 requirements', four score rings for Format Safety, Achievements, Sections and Action Verbs, and a Requirement Match list marking each requirement as partial, needs improvement or matched.",
    caption:
      "The diagnosis: coverage, four weighted dimensions and an explanation for every requirement.",
    annotations: [
      { n: 1, x: 3, y: 13, side: "left", label: "Overall requirement coverage." },
      {
        n: 2,
        x: 94.5,
        y: 30,
        side: "right",
        label: "Format Safety, Achievements, Sections and Action Verbs, each weighted.",
      },
      {
        n: 3,
        x: 94.5,
        y: 58,
        side: "right",
        label:
          "Requirement-level rows explain what matched, what was partial and what needs improvement.",
      },
    ],
  },
  roleUnderstanding: {
    file: "optimizer-03.png",
    width: 587,
    height: 428,
    title: "Screen 05 · Structured role interpretation",
    alt: "A panel titled 'Here's what this role really needs' listing the role, industry, experience and education, then must-have skills, key activities and hidden requirements.",
    caption: "Generation does not begin immediately. First, the role is structured.",
    annotations: [
      {
        n: 1,
        x: 82,
        y: 35.5,
        side: "right",
        label: "Must-have skills: explicit technologies and design capabilities.",
      },
      {
        n: 2,
        x: 64.5,
        y: 61,
        side: "right",
        label: "Key activities: what the person is expected to do in the role.",
      },
      {
        n: 3,
        x: 63.5,
        y: 88.5,
        side: "right",
        label: "Hidden requirements: implicit operating context and collaboration expectations.",
      },
    ],
  },
  metrics: {
    file: "optimizer-05.png",
    width: 615,
    height: 772,
    title: "Screen 06 · Metrics checkpoint",
    alt: "A 'Boost Your ATS Score with Metrics' panel asking three project-specific questions, each with an empty example input, a 'Finalise My Resume' button and a 'Skip optimise without metrics' link.",
    caption: "The optimiser asks for facts it cannot know. Skipping is a first-class path.",
    annotations: [
      { n: 1, x: 6, y: 51, side: "left", label: "Direct, project-specific questions." },
      {
        n: 2,
        x: 7,
        y: 58.5,
        side: "left",
        label: "Blank example fields are prompts, not generated answers.",
      },
      {
        n: 3,
        x: 91,
        y: 92.5,
        side: "right",
        label: "Skip is an explicit, honesty-preserving choice.",
      },
    ],
  },
  rewrites: {
    file: "optimizer-02.png",
    width: 591,
    height: 707,
    title: "Screen 07 · Suggested improvements",
    alt: "Suggested rewrite cards, each showing the original bullet, a suggested rewrite, a 'Why' explanation, a prompt to add real numbers, and 'Apply this change' and 'Skip' buttons.",
    caption: "Every change is shown, explained and individually accepted or rejected.",
    annotations: [
      { n: 1, x: 3, y: 16.5, side: "left", label: "Original: the candidate's own wording." },
      { n: 2, x: 3, y: 24, side: "left", label: "Suggested: the proposed rewrite." },
      { n: 3, x: 3, y: 27, side: "left", label: "Why: the reasoning behind the change." },
      { n: 4, x: 3.5, y: 33.5, side: "left", label: "Apply or Skip, one change at a time." },
    ],
  },
  process: {
    file: "optimizer-04.png",
    width: 447,
    height: 373,
    title: "Screen 08 · Five-step processing state",
    alt: "An 'Optimising your resume' state listing five steps: analysing job requirements, generating targeted additions, analysing achievement quality, quality-checking every edit and calculating the new score.",
    caption: "Five named stages instead of a spinner.",
  },
  verification: {
    file: "optimizer-01.png",
    width: 600,
    height: 533,
    title: "Screen 09 · Final verification",
    alt: "The optimised resume with a warning that AI-generated additions may contain inaccuracies, a review checklist, a confirmation checkbox and a disabled Export action.",
    caption: "Export stays disabled until the candidate confirms they have reviewed the changes.",
    annotations: [
      {
        n: 1,
        x: 5,
        y: 64.5,
        side: "left",
        label: "Warning: AI-generated additions may contain inaccuracies.",
      },
      { n: 2, x: 11, y: 76, side: "left", label: "A checklist of what to verify." },
      { n: 3, x: 6.5, y: 86, side: "left", label: "Confirmation checkbox." },
      { n: 4, x: 30, y: 93, side: "right", label: "Export waits for that confirmation." },
    ],
  },
  huntProfile: {
    file: "huntmode-profile.png",
    width: 982,
    height: 842,
    title: "Screen 10 · Hunt Mode profile and company selection",
    alt: "The Hunt Mode page, 'Your job hunt, on autopilot', with a profile, target keywords such as product designer and ux researcher, exclusions for senior and contract roles, and a company list showing 15 of 20 tracked.",
    caption: "One reusable profile: what to look for, what to exclude and where to look.",
    annotations: [
      { n: 1, x: 71, y: 35.5, side: "right", label: "Target keywords." },
      {
        n: 2,
        x: 39.5,
        y: 41,
        side: "right",
        label: "Exclusions remove roles that only look relevant.",
      },
      { n: 3, x: 28.5, y: 50, side: "left", label: "Search space: 15 of 20 companies tracked." },
    ],
  },
  // The two files below were not included with the brief. Drop the exact PNGs
  // into src/assets/optiapply/ and they render automatically.
  huntDigest: {
    file: "Huntmode.png",
    title: "Hunt Mode · Daily Job Digest",
    alt: "The Daily Job Digest: 1,963 jobs fetched, 1,928 cached, 35 new and 1 matched, followed by a recommendation scored 2 out of 10 with match factors and 'View job' and 'Tailor on OptiApply' actions.",
    caption:
      "The daily digest: a large search space reduced to one recommendation, with the reasons attached.",
    annotations: [
      { n: 1, label: "The funnel: 1,963 fetched, 1,928 cached, 35 new, 1 matched." },
      { n: 2, label: "A 2/10 recommendation, with the score shown rather than hidden." },
      { n: 3, label: "Skills, seniority, location and requirements explain the match." },
      { n: 4, label: "View job or Tailor on OptiApply: the user decides." },
    ],
  },
  dashboard: {
    file: "Dashboard.png",
    title: "Dashboard · the connected product",
    alt: "The OptiApply dashboard with Top Matches, an Applications tracker with Interested, Applied, Interviewing and Decided states, and Recent Optimisations with before and after scores.",
    caption: "Where the workflows reconnect: matches, applications and optimisation history.",
    annotations: [
      { n: 1, label: "Top Matches: opportunities worth considering." },
      { n: 2, label: "Applications: Interested, Applied, Interviewing, Decided." },
      { n: 3, label: "Recent Optimisations: before and after, per resume." },
    ],
  },
};

/** Tight crops used inline. Every figure still opens to the full image. */
export const crops: Partial<Record<ShotId, Crop>> = {
  jdInput: { x: 0, y: 0, w: 100, h: 88 },
  resumeInput: { x: 3, y: 2, w: 94, h: 88 },
  baseline: { x: 0, y: 2, w: 100, h: 84 },
  metrics: { x: 2, y: 37, w: 96, h: 62 },
  rewrites: { x: 0, y: 0, w: 100, h: 65 },
  process: { x: 6, y: 6, w: 70, h: 58 },
  huntProfile: { x: 25, y: 5, w: 55, h: 91 },
};

/** Small evidence crops for the "automation experiment" section. */
export const evidence: { label: string; note: string; shot: ShotId; crop?: Crop }[] = [
  {
    label: "Hunt Mode",
    note: "View job / Tailor",
    shot: "huntDigest",
  },
  {
    label: "Metrics",
    note: "User provides numbers",
    shot: "metrics",
    crop: { x: 5, y: 88, w: 92, h: 10 },
  },
  {
    label: "Rewrite",
    note: "Apply / Skip",
    shot: "rewrites",
    crop: { x: 2, y: 13, w: 96, h: 23 },
  },
  {
    label: "Final resume",
    note: "Review and confirm",
    shot: "verification",
    crop: { x: 4, y: 60, w: 94, h: 38 },
  },
];

/* ────────────────────────────────────────────────────────────────
 * Copy
 * ──────────────────────────────────────────────────────────────── */

/** Which recruiter question a section answers. Shown as a small tag. */
export type Lens = "Problem" | "Decision" | "Why" | "Result" | "What I'd change";

export const meta = {
  title: "OptiApply: automation should remove effort, not agency",
  description:
    "A product-design case study: how a resume analyser evolved into a job-search workflow that keeps consequential decisions with the candidate.",
  liveUrl: "https://howtosolve.online",
};

export const hero = {
  eyebrow: "OptiApply / Product design / AI",
  title: ["I started with a resume analyser.", "It became a job-search workflow."],
  lede: "OptiApply helps candidates discover relevant opportunities, evaluate their fit, tailor resumes and track applications, while keeping consequential decisions with the candidate.",
  facts: [
    { k: "Role", v: "Product Designer / Builder" },
    { k: "Ownership", v: "Product thinking, UX/UI, AI workflows, prompt design" },
    { k: "Product", v: "Analyzer → Optimizer → Tracker → Hunt Mode" },
  ],
};

export const problem = {
  lens: "Problem" as Lens,
  eyebrow: "The starting point",
  title: "The problem was repetition, not resume writing.",
  body: [
    "Applying for one job is manageable. Repeating the same discovery, evaluation, tailoring, application and tracking loop dozens of times is not.",
    "I noticed students repeatedly modifying their resumes for individual job descriptions. Every application meant finding a role, understanding the requirements, evaluating fit, tailoring a resume, applying and keeping track of what happened afterwards.",
  ],
  loop: [
    { k: "Discover", v: "Find a role" },
    { k: "Evaluate", v: "Assess fit" },
    { k: "Tailor", v: "Adapt evidence" },
    { k: "Apply", v: "Submit" },
    { k: "Track", v: "Remember" },
  ],
  question: {
    lead: "Rather than trying to solve the entire workflow, I started with one question:",
    q: "How well does my resume actually match this job?",
  },
};

export const analyzer = {
  lens: "Decision" as Lens,
  eyebrow: "V1 · Resume Analyzer",
  title: "Make the mismatch visible.",
  body: [
    "The first workflow was deliberately simple: paste a job description, add a resume and understand how well the two align.",
  ],
  flow: [
    { k: "Job description", v: "Paste role" },
    { k: "Resume", v: "Add candidate evidence" },
    { k: "Analysis", v: "Explain alignment" },
  ],
  baselineTitle: "Establish the baseline.",
  baselineBody:
    "Two inputs, one score. The score is specific to this resume and this role; it is a starting point, not a benchmark.",
  diagnosticTitle: "A diagnostic, not just a score.",
  diagnosticBody:
    "A score alone was not useful enough. I wanted candidates to understand why they received it and what was actually missing.",
};

export const friction = {
  lens: "Problem" as Lens,
  eyebrow: "First friction",
  title: [
    "The analyzer could tell me what was wrong.",
    "But I still had to fix everything myself.",
  ],
  loop: [
    { k: "Analyze", v: "Get diagnosis" },
    { k: "Read", v: "Interpret advice" },
    { k: "Leave", v: "Friction", warn: true },
    { k: "Edit", v: "Elsewhere", warn: true },
    { k: "Upload", v: "New file" },
    { k: "Analyze again", v: "Repeat" },
  ],
  close: [
    "Solving the diagnosis exposed the next problem.",
    "If OptiApply knows what is missing, why make the user fix it somewhere else?",
  ],
};

export const evolution = {
  lens: "Why" as Lens,
  eyebrow: "Product evolution",
  title: "One solved problem kept revealing another.",
  note: "None of this was a pre-planned roadmap. Each stage was a response to a limitation the previous workflow exposed.",
  stages: [
    {
      tag: "V1",
      k: "Analyze",
      q: "Does my resume fit?",
      v: "Make the mismatch visible: compare a job description and resume, then explain the score at requirement level.",
    },
    {
      tag: "V2",
      k: "Optimize",
      q: "Can I fix it here?",
      v: "Keep the correction inside the product: understand the role, ask for facts the model cannot know, propose changes and let the user apply or skip each one.",
    },
    {
      tag: "V3",
      k: "Track",
      q: "Where have I applied?",
      v: "Reconnect activity after tailoring: preserve interested, applied, interviewing and decided states alongside optimization history.",
    },
    {
      tag: "V4",
      k: "Hunt",
      q: "Can relevant jobs find me?",
      v: "Move upstream: scan selected company sources, reduce the search space, explain recommendations and leave the pursuit decision with the user.",
    },
  ],
};

export const optimizer = {
  lens: "Decision" as Lens,
  eyebrow: "V2 · Optimizer",
  title: "Keep the correction inside the product.",
  body: [
    "The Optimizer had one job: close the gap the Analyzer had just exposed, without making the candidate leave. That raised a harder question than generation: which parts of a resume should AI be allowed to change?",
  ],
};

export const roleUnderstanding = {
  lens: "Decision" as Lens,
  eyebrow: "Job requirement extraction",
  title: "Before rewriting anything, understand the role.",
  body: [
    "OptiApply first structures the job description into explicit and implicit requirements: role, experience, must-have skills, key activities and less obvious expectations.",
  ],
  columns: [
    { k: "01 / Must-have skills", v: "Explicit technologies and design capabilities." },
    { k: "02 / Key activities", v: "What the person is expected to do in the role." },
    {
      k: "03 / Hidden requirements",
      v: "Implicit operating context and collaboration expectations.",
    },
  ],
};

export const truth = {
  lens: "Why" as Lens,
  eyebrow: "AI truth checkpoint",
  title: ["AI can improve the wording.", "It should not improve your history."],
  body: [
    "The optimizer could recognize when an achievement needed stronger evidence. But generating a number would mean inventing candidate history.",
  ],
  pull: "If the model does not know the number, it does not get to invent one.",
  flowTitle: "The model identifies the gap; the candidate supplies the fact.",
  flow: [
    { k: "AI identifies", v: "Evidence is weak" },
    { k: "Candidate supplies", v: "A real metric, or skips", human: true },
    { k: "AI uses", v: "Context in the rewrite" },
  ],
  skipNote:
    "Skip is designed as a legitimate path, not a failure state. The checkpoint doesn't guarantee truth. It creates a deliberate place for the candidate to provide or withhold facts.",
};

export const principle = {
  line: ["Automation should remove effort,", "not agency."],
  sub: "Let the system handle volume. Let the human handle decisions.",
};

export const rewrites = {
  lens: "Decision" as Lens,
  eyebrow: "Suggested rewrites",
  title: "AI proposes. The candidate approves.",
  body: [
    "Rather than silently rewriting the resume, OptiApply exposes individual changes, explains the reasoning and lets the candidate accept or reject them.",
  ],
  principle: "Transparency over invisible automation.",
};

export const process = {
  lens: "Decision" as Lens,
  eyebrow: "Optimization process visibility",
  title: "AI should not disappear behind a loading spinner.",
  body: [
    "Optimization involves multiple stages. Exposing that process gives the candidate a better mental model of what the system is doing while they wait.",
  ],
  steps: [
    "Analyze job requirements",
    "Generate targeted additions",
    "Analyze achievement quality",
    "Quality-check every edit",
    "Calculate the new score",
  ],
};

export const verification = {
  lens: "Decision" as Lens,
  eyebrow: "Final candidate verification",
  title: "The last decision still belongs to the candidate.",
  body: [
    "Before export, OptiApply explicitly asks the candidate to review AI-generated changes. The system can assist with the application, but the candidate remains responsible for what represents them.",
  ],
  warning: "AI-generated additions may contain inaccuracies.",
  chain: ["Review the changes", "Confirm they are accurate", "Export"],
};

export const journey = {
  lens: "Problem" as Lens,
  eyebrow: "Zooming out",
  title: "I had improved the middle of the journey.",
  body: [
    "Evaluation and tailoring now lived inside OptiApply. But candidates were still manually finding opportunities before OptiApply could help, and losing track of them afterwards.",
  ],
  steps: [
    { k: "Discover", v: "Still manual", covered: false },
    { k: "Evaluate", v: "Analyzer", covered: true },
    { k: "Tailor", v: "Optimizer", covered: true },
    { k: "Apply", v: "Candidate", covered: false },
    { k: "Track", v: "Still scattered", covered: false },
  ],
};

export const hunt = {
  lens: "Decision" as Lens,
  eyebrow: "V4 · Hunt Mode",
  title: "What if the workflow started before the application?",
  body: [
    "Hunt Mode was not designed to create another job feed. Its job was to reduce the search space before the candidate had to spend attention on it.",
  ],
  headline: ["1,963 jobs were available.", "1 reached the user."],
  funnel: [
    { value: "1,963", label: "Fetched", note: "Postings scanned from tracked company sources." },
    { value: "35", label: "New", note: "1,928 had already been seen in earlier scans." },
    { value: "1", label: "Matched", note: "Passed the profile's targets and exclusions." },
    {
      value: "1",
      label: "Decision",
      note: "The candidate decides whether to pursue it.",
      human: true,
    },
  ],
};

export const explainable = {
  lens: "Why" as Lens,
  eyebrow: "Explainable job matching",
  title: "A recommendation should show its reasoning.",
  body: [
    "The digest doesn't just say a role matched. It shows the score, and the factors behind it, so the candidate can judge whether an opportunity deserves their time.",
  ],
  factors: [
    { k: "Skills Match", v: "Does my evidence cover what the role needs?" },
    { k: "Seniority Fit", v: "Is this the right level for me?" },
    { k: "Location Fit", v: "Can I actually work here?" },
    { k: "Requirements Match", v: "Which stated requirements do I meet?" },
  ],
  actions: {
    score: "2/10",
    note: "Even a low score is surfaced honestly, and the next step stays with the user: View job or Tailor on OptiApply.",
  },
};

export const huntProfile = {
  lens: "Decision" as Lens,
  eyebrow: "Hunt Mode profile",
  title: "One profile instead of repeating the same search.",
  body: [
    "Candidates describe what they're looking for once: target keywords, exclusions and the companies to watch. Hunt Mode reuses that profile on every daily scan.",
    "Exclusions are as important as targets. They remove roles that look relevant on the surface, like a senior title or a contract position, before they ever reach the candidate.",
  ],
};

export const constraint = {
  lens: "What I'd change" as Lens,
  eyebrow: "Product constraint",
  title: "1,000+ to approximately 200 to 20.",
  stages: [
    { value: "1,000+", label: "Company sources discovered" },
    { value: "~200", label: "Curated for OptiApply" },
    { value: "20", label: "Actively monitored per user" },
  ],
  reasons: [
    { k: "Infrastructure", v: "More monitored sources increase processing cost." },
    {
      k: "Attention",
      v: "More opportunities do not automatically mean more useful opportunities.",
    },
    { k: "Product", v: "A fixed limit kept the initial system manageable." },
  ],
  cost: {
    title: "But the constraint also hurt the product.",
    body: "Users told me that limiting Hunt Mode to 20 companies reduced its value when they wanted broader discovery.",
  },
  reconsider: {
    title: "What I would reconsider",
    body: "Broaden discovery while improving relevance filtering, and find a more cost-efficient processing model.",
  },
};

export const experiment = {
  lens: "Result" as Lens,
  eyebrow: "The decision that changed the product",
  title: ["I tried to automate everything.", "It made the experience worse."],
  before: {
    title: "First approach",
    steps: ["AI finds", "AI decides", "AI generates", "AI acts", "User watches"],
  },
  after: {
    title: "What I moved toward",
    steps: ["AI filters", "User decides", "AI assists", "User reviews", "User acts"],
  },
  evidenceTitle: "The principle, in the interface",
};

export const connected = {
  lens: "Result" as Lens,
  eyebrow: "The connected product",
  title: "What started as one analysis became one workflow.",
  body: [
    "As OptiApply expanded, the product needed somewhere for its workflows to reconnect. The dashboard became the candidate's overview of opportunities, active applications and previous optimizations.",
  ],
  flow: [
    { k: "Hunt", v: "Discover" },
    { k: "Match", v: "Evaluate" },
    { k: "Tailor", v: "Optimize" },
    { k: "Review", v: "Verify", human: true },
    { k: "Apply", v: "Submit", human: true },
    { k: "Track", v: "Remember" },
  ],
  panels: [
    { k: "Top matches", v: "Opportunities worth considering." },
    { k: "Applications", v: "Interested → Applied → Interviewing → Decided." },
    { k: "Recent optimizations", v: "Before → after, for every tailored resume." },
  ],
};

export const today = {
  lens: "Result" as Lens,
  eyebrow: "Where the product is today",
  title: "Product today.",
  facts: [
    { value: "200+", label: "Supported company sources" },
    { value: "20", label: "Active companies per user" },
    { value: "Daily", label: "Personalized discovery" },
    { value: "1", label: "Connected workflow" },
  ],
  factsNote: "These describe the product as it stands, not its impact.",
  unknown: {
    title: "What I still don't know",
    body: [
      "I know people are using the product and receiving recommendations, but I don't yet have enough evidence to claim that OptiApply improves job-search outcomes.",
      "The next measurement challenge isn't 'How many people clicked Optimize?' It's whether users discover better-fitting opportunities and spend less time preparing applications.",
    ],
  },
};

export const next = {
  lens: "What I'd change" as Lens,
  eyebrow: "Next iteration",
  title: "If I built the next version tomorrow…",
  items: [
    {
      k: "Expand discovery",
      v: "Reduce dependency on a fixed 20-company limit without simply multiplying infrastructure cost.",
    },
    {
      k: "Improve recommendation quality",
      v: "Make match reasoning more useful for deciding whether an opportunity deserves time.",
    },
    {
      k: "Measure outcomes",
      v: "Measure relevance and time saved rather than feature clicks alone.",
    },
  ],
};

/* ────────────────────────────────────────────────────────────────
 * Recruiter cut — the condensed 8-section story. Copy is drawn only from
 * the sections above; nothing new is claimed.
 * ──────────────────────────────────────────────────────────────── */

/** Feedback from early users, as reported by the author. */
export const insights = {
  title: "What 12 early users told me",
  items: [
    {
      k: "Automated resume updates",
      v: "Users liked that OptiApply updates the resume for them, instead of leaving the edits to do elsewhere.",
      tone: "positive" as const,
    },
    {
      k: "More companies to choose from",
      v: "Users asked for more options when picking companies, which confirmed the cost of the 20-company limit.",
      tone: "request" as const,
    },
    {
      k: "Location filters",
      v: "Users asked for location filters when browsing job boards.",
      tone: "request" as const,
    },
  ],
};

export const v1 = {
  lens: "Decision" as Lens,
  eyebrow: "V1 · Resume Analyzer",
  title: "Make the mismatch visible.",
  body: [
    "The first workflow was deliberately simple: paste a job description, add a resume and see how well the two align. A score alone was not useful enough, so every requirement is explained as matched, partial or needing improvement.",
  ],
  frictionTitle: friction.title,
  loop: friction.loop,
  close: friction.close[1],
};

export const v2 = {
  lens: "Decision" as Lens,
  eyebrow: "V2 · Optimizer",
  title: "AI proposes. The candidate approves.",
  body: [
    "The Optimizer closes the gap the Analyzer exposed, without making the candidate leave. It first structures the role into must-have skills, key activities and hidden requirements. The harder question was which parts of a resume AI should be allowed to change.",
  ],
  decisions: [
    {
      k: "Ask for facts. Never invent them.",
      v: "When an achievement needs stronger evidence, the model identifies the gap and the candidate supplies a real metric, or skips. Skipping is a legitimate path, not a failure state.",
      pull: truth.pull,
      shot: "metrics" as ShotId,
    },
    {
      k: "Show every change, and why.",
      v: "Rather than silently rewriting the resume, each change shows the original, the suggestion and the reasoning, and is applied or skipped one at a time.",
      shot: "rewrites" as ShotId,
    },
    {
      k: "The candidate signs off.",
      v: "Export stays disabled until the candidate confirms they have reviewed the AI-generated changes. The system assists; the candidate remains responsible for what represents them.",
      shot: "verification" as ShotId,
    },
  ],
};

export const v4 = {
  lens: "Decision" as Lens,
  eyebrow: "V4 · Hunt Mode",
  title: hunt.title,
  body: [
    "Evaluation and tailoring now lived inside OptiApply, but candidates were still finding roles manually. Hunt Mode moves upstream: describe target keywords, exclusions and companies once, and a daily scan reduces the search space before it costs the candidate attention.",
  ],
  headline: hunt.headline,
  funnel: hunt.funnel,
  factorsTitle: "Every recommendation shows its reasoning",
  factors: explainable.factors,
  factorsNote: explainable.actions.note,
  constraint: {
    title: "The trade-off: 20 companies per user",
    body: "Over 1,000 company sources were discovered and about 200 curated, but each user monitors 20, to keep processing cost and attention manageable. Users told me that limit reduced Hunt Mode's value when they wanted broader discovery.",
    next: constraint.reconsider.body,
  },
};

export const outcome = {
  lens: "Result" as Lens,
  eyebrow: "Where the product is today",
  title: connected.title,
  flow: connected.flow,
  facts: [{ value: "12", label: "Early users" }, ...today.facts],
  factsNote: today.factsNote,
  insights,
  unknown: {
    title: today.unknown.title,
    body: [
      "Twelve people are using the product and receiving recommendations, but I don't yet have enough evidence to claim that OptiApply improves job-search outcomes.",
      today.unknown.body[1],
    ],
  },
};

export const reflection = {
  eyebrow: "What OptiApply taught me",
  closing: [
    "I started by asking how AI could improve someone's resume.",
    "I ended up asking which parts of job searching should AI handle and which decisions should remain human?",
  ],
};
