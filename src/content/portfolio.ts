export const profile = {
  name: "Ayush Ramawat",
  role: "Product Designer • Agentic AI",
  tagline:
    "I design and ship agentic-AI products, automations, and the SaaS tools I needed but couldn't find.",
  status: "agent online — open to collaborations",
  email: "ayushramawat29@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayush-ramawat-71880927b/",
  medium: "https://medium.com/@ayushramawat29",
  github: "#", // replace with your GitHub URL
  x: "#", // replace with your X/Twitter URL
};

export const experience = [
  {
    year: "2024 — Now",
    role: "Independent Product Designer & Agentic-AI Builder",
    org: "Self-directed",
    note: "Designing & shipping agent-driven products and internal SaaS tools.",
  },
  {
    year: "2022 — 2024",
    role: "Senior Product Designer",
    org: "Placeholder Studio",
    note: "Led design on B2B SaaS, design systems, end-to-end UX research.",
  },
  {
    year: "2020 — 2022",
    role: "Product Designer",
    org: "Placeholder Agency",
    note: "Shipped consumer apps for fintech and health clients.",
  },
];

export const stack = [
  "Figma",
  "Framer",
  "n8n",
  "LangGraph",
  "OpenAI",
  "Claude",
  "Cursor",
  "Supabase",
  "Vercel",
  "Notion",
  "Linear",
  "Webflow",
  "After Effects",
  "Spline",
];

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  link: string;
  accent: string; // css color
};

export const projects: Project[] = [
  {
    id: "proj-01",
    title: "Atlas — Multi-agent research workspace",
    blurb:
      "An agentic workspace where research agents plan, branch, and cite — designed end-to-end.",
    tags: ["Agentic AI", "Product Design", "0→1"],
    year: "2025",
    link: "#",
    accent: "#3b6fa0",
  },
  {
    id: "proj-02",
    title: "Loop — Background automation for ops teams",
    blurb:
      "A canvas to compose, observe, and debug long-running agent workflows.",
    tags: ["UX", "Automation", "n8n"],
    year: "2024",
    link: "#",
    accent: "#9a6b3f",
  },
  {
    id: "proj-03",
    title: "Quill — AI editor for product writers",
    blurb:
      "Inline agents that critique, restructure, and polish without taking the pen.",
    tags: ["AI", "Editor", "Design Systems"],
    year: "2024",
    link: "#",
    accent: "#4a7c59",
  },
  {
    id: "proj-04",
    title: "Mesh — Internal LLM ops console",
    blurb: "Cost, traces, evals — one console for product & platform teams.",
    tags: ["B2B", "Dashboard", "DX"],
    year: "2024",
    link: "#",
    accent: "#6b4a8a",
  },
  {
    id: "proj-05",
    title: "Nimbus — Voice-first agent for support",
    blurb: "Conversational scaffolding that hands off cleanly to humans.",
    tags: ["Voice", "Conversational", "Research"],
    year: "2023",
    link: "#",
    accent: "#b5562e",
  },
];

export const saas: Project[] = [
  {
    id: "saas-01",
    title: "Clipper — invoice agent for freelancers",
    blurb: "Drop a contract → get invoices, reminders, and reconciliation.",
    tags: ["Live", "Solo SaaS"],
    year: "2025",
    link: "#",
    accent: "#3b6fa0",
  },
  {
    id: "saas-02",
    title: "Brief — turn meetings into shippable specs",
    blurb: "An agent that watches your call and writes the PRD with you.",
    tags: ["Beta", "PM tools"],
    year: "2024",
    link: "#",
    accent: "#4a7c59",
  },
  {
    id: "saas-03",
    title: "Slate — daily journal for builders",
    blurb: "A quiet writing surface with an agent that asks the right questions.",
    tags: ["Live", "Consumer"],
    year: "2024",
    link: "#",
    accent: "#9a6b3f",
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  link: string;
  spineColor: string;
};

export const cases: CaseStudy[] = [
  {
    id: "ux-01",
    title: "Designing trust into a research agent",
    client: "Atlas",
    year: "2025",
    summary:
      "How we shaped citations, branching, and human-in-the-loop checkpoints to make an autonomous research agent feel safe to trust.",
    link: "#",
    spineColor: "#3b6fa0",
  },
  {
    id: "ux-02",
    title: "From workflow soup to one observable canvas",
    client: "Loop",
    year: "2024",
    summary:
      "Restructured a tangled automation product into a single canvas with traces, retries, and live observability.",
    link: "#",
    spineColor: "#9a6b3f",
  },
  {
    id: "ux-03",
    title: "Voice-first onboarding that survives interruptions",
    client: "Nimbus",
    year: "2023",
    summary:
      "Patterns for voice agents that gracefully resume, escalate, and hand off to a person.",
    link: "#",
    spineColor: "#4a7c59",
  },
  {
    id: "ux-04",
    title: "A design system for agent UIs",
    client: "Internal",
    year: "2024",
    summary:
      "Tokens, primitives, and patterns for chat, plans, traces, and tool calls — reusable across products.",
    link: "#",
    spineColor: "#6b4a8a",
  },
  {
    id: "ux-05",
    title: "Pricing an unpredictable product",
    client: "Mesh",
    year: "2024",
    summary:
      "Designing a usage-based pricing UI when cost varies per request and finance still needs predictability.",
    link: "#",
    spineColor: "#b5562e",
  },
];

export type Blog = {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  link: string;
};

export const blogs: Blog[] = [
  {
    id: "blog-01",
    title: "Designing for agents, not for screens",
    date: "May 2025",
    readingTime: "6 min",
    excerpt:
      "What changes when the user isn't a person anymore — and what stays exactly the same.",
    link: "https://medium.com/@ayushramawat29",
  },
  {
    id: "blog-02",
    title: "The quiet death of the empty state",
    date: "Mar 2025",
    readingTime: "4 min",
    excerpt:
      "Agentic products don't have empty states. They have first turns. A small UX shift with big implications.",
    link: "https://medium.com/@ayushramawat29",
  },
  {
    id: "blog-03",
    title: "Shipping a SaaS in 14 days, the boring way",
    date: "Jan 2025",
    readingTime: "7 min",
    excerpt:
      "How I built and shipped Clipper as a one-person team — scope, tools, and the cuts I made.",
    link: "https://medium.com/@ayushramawat29",
  },
  {
    id: "blog-04",
    title: "A field guide to agent traces",
    date: "Nov 2024",
    readingTime: "5 min",
    excerpt:
      "How to read, design, and instrument the trace UI that every agent product will eventually need.",
    link: "https://medium.com/@ayushramawat29",
  },
];