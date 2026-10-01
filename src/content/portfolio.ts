import optiapplyCover from "@/assets/optiapply-cover.webp";
import reelpickCover from "@/assets/reelpick-cover.webp";
import ccCover from "@/assets/cc-cover.webp";

export const profile = {
  name: "Ayush Ramawat",
  role: "Product Designer",
  tagline: "I design AI products, workflows, and the SaaS tools I needed but couldn't find.",
  status: "Open to product design roles",
  email: "ayushramawat29@gmail.com",
  /**
   * Resume PDF, served from public/resume/. To update it, replace that file on
   * GitHub with a new PDF of the same name; the site redeploys on its own and
   * every resume button picks up the new version.
   */
  resume: `${import.meta.env.BASE_URL}resume/Ayush-Ramawat-Resume.pdf`,
  linkedin: "https://www.linkedin.com/in/ayush-ramawat-71880927b/",
  medium: "https://medium.com/@ayushramawat29",
  github: "https://github.com/ayush1817-lab",
  x: "https://x.com/AyushRamawat18", // replace with your X/Twitter URL
};

export const experience = [
  {
    year: "2025 — 2026",
    role: "AI Product Designer",
    org: "BPM Clinic Limited, Dublin",
    note: "Designed and shipped automation workflows and internal software tools for clinic operations.",
  },
  {
    year: "2024 — 2025",
    role: "Product Designer",
    org: "OAKS, Hyderabad",
    note: "Designed educational games and workflows, with additional contributions to 3D animation.",
  },
];

export const stack = ["Figma", "n8n", "Codex", "Claude", "Cursor", "Supabase", "Vercel", "Notion"];

export type Project = {
  id: string;
  title: string;
  /** Optional line under the card title. */
  subtitle?: string;
  blurb: string;
  tags: string[];
  year: string;
  link: string | null;
  accent: string; // css color
  /** Optional cover image for the Selected Work card (replaces the generated plate). */
  cover?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Plate colour behind the image, matched to the artwork's own background. */
    bg: string;
    /** "cover" fills the plate (portrait art); "contain" shows all of it (landscape art). */
    fit: "cover" | "contain";
    /** Focal point for the short image band on phones (CSS object-position). */
    mobileFocus?: string;
  };
  /** Shown as a clearly labelled placeholder plate until a real cover exists. */
  coverPlaceholder?: string;
};

export const projects: Project[] = [
  {
    id: "proj-01",
    title: "Optiapply",
    blurb:
      "An AI job-hunting tool that finds jobs relevant to the profile, and handles the complete job hunting process, from find to apply. ",
    tags: ["AI product", "Product Design", "Case study"],
    year: "2026",
    // In-site case study; the live product is linked from inside it.
    link: `${import.meta.env.BASE_URL}work/optiapply/`,
    cover: {
      src: optiapplyCover,
      alt: "OptiApply, from insight to action: the Resume Analysis Summary labelled Analyze, the Hunt Mode profile labelled Discover, and the final resume verification labelled Review.",
      width: 1200,
      height: 1400,
      bg: "#e3ebfd",
      fit: "cover",
    },
    accent: "#3b6fa0",
  },
  {
    id: "proj-02",
    title: "ReelPick",
    subtitle: "What if choosing a movie together didn't take 30 minutes?",
    blurb: "The product that can help in reducing the social cost of making a decision ",
    tags: ["UX", "Railway", "Expo", "Supabase", "Case study"],
    year: "2025",
    // In-site case study; the original Medium article is linked from inside it.
    link: `${import.meta.env.BASE_URL}work/reelpick/`,
    cover: {
      src: reelpickCover,
      alt: "ReelPick on a phone: a group of five picking together, the Dune: Part Two card in focus with pass and like buttons, and more movie cards fanned out behind it.",
      width: 1086,
      height: 1448,
      bg: "#fef8f1",
      fit: "cover",
      mobileFocus: "50% 40%",
    },
    accent: "#9a6b3f",
  },
  {
    id: "proj-03",
    title: "Conscious Connections",
    blurb:
      "A hybrid physical and digital service concept helping LGBTQ+ women and non-binary people in rural Ireland discover resources, build confidence, and connect with community at their own pace.",
    tags: ["Service design", "Research", "Academic concept", "Case study"],
    // No year until confirmed.
    year: "",
    link: `${import.meta.env.BASE_URL}work/conscious-connections/`,
    cover: {
      src: ccCover,
      alt: "The Community Box prototype: two white display stands filled with colourful support cards, affirmation stickers and seed packets.",
      width: 1200,
      height: 1375,
      bg: "#e9dfcf",
      fit: "cover",
      mobileFocus: "50% 55%",
    },
    accent: "#3d6450",
  },
  {
    id: "proj-04",
    title: "Mesh — Internal LLM ops console",
    blurb: "Cost, traces, evals — one console for product & platform teams.",
    tags: ["B2B", "Dashboard", "DX"],
    year: "2024",
    link: null,
    accent: "#6b4a8a",
  },
  {
    id: "proj-05",
    title: "Nimbus — Voice-first agent for support",
    blurb: "Conversational scaffolding that hands off cleanly to humans.",
    tags: ["Voice", "Conversational", "Research"],
    year: "2023",
    link: null,
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
    link: null,
    accent: "#3b6fa0",
  },
  {
    id: "saas-02",
    title: "Brief — turn meetings into shippable specs",
    blurb: "An agent that watches your call and writes the PRD with you.",
    tags: ["Beta", "PM tools"],
    year: "2024",
    link: null,
    accent: "#4a7c59",
  },
  {
    id: "saas-03",
    title: "Slate — daily journal for builders",
    blurb: "A quiet writing surface with an agent that asks the right questions.",
    tags: ["Live", "Consumer"],
    year: "2024",
    link: null,
    accent: "#9a6b3f",
  },
];

/**
 * Feedback from managers, founders and teammates. Quotes are their exact
 * words, shared with permission. The section stays hidden while empty.
 */
export type Testimonial = {
  name: string;
  /** Role and organisation are each optional; the card shows whatever is given. */
  role?: string;
  org?: string;
  /** How we worked together, e.g. "Managed my work on…". */
  relation?: string;
  quote: string;
  /** Avatar colour. */
  tone: "cobalt" | "sun" | "sage" | "lilac";
};

export const testimonials: Testimonial[] = [
  {
    name: "Karina Murray",
    role: "CEO",
    org: "Conscious Connections",
    quote:
      "Ayush consistently brought fresh, out-of-the-box ideas to the table. He often approached challenges from perspectives I hadn’t initially considered, which helped us explore new possibilities for the product and experience.",
    tone: "sage",
  },
  {
    name: "Jinho Ahn",
    role: "CEO",
    org: "BPM Clinic Limited",
    quote:
      "Ayush is a strong problem solver who is always willing to take on a challenge. Whatever problem I gave him, he would explore different approaches and find a way forward. He is also very resourceful with tools and learns quickly when something new is needed.",
    tone: "cobalt",
  },
  {
    name: "Pavan Thota",
    role: "Product Manager",
    org: "OAKS Kidz",
    quote:
      "Ayush has a strong product vision and a different way of thinking about how technology can be used. He looks beyond the immediate solution and considers how a product could evolve and create a better experience for users.",
    tone: "sun",
  },
  {
    name: "Suman Matcha",
    role: "CEO",
    org: "OAKS Kidz",
    quote:
      "One thing I’ve consistently noticed about Ayush is his curiosity and ability to stay ahead of emerging trends. Whether it’s AI, new tools, or developments in technology, he actively keeps himself updated and looks for ways to apply what he learns.",
    tone: "lilac",
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
    excerpt: "What changes when the user isn't a person anymore — and what stays exactly the same.",
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
