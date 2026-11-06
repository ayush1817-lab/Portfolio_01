import photoAsset from "@/assets/ayush-photo.jpeg.png";
import { experience, stack } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ResumeLinks } from "./ResumeLinks";
import { InView, PathGlyph, PathLine } from "./art";

const journey = ["Mathematics", "3D animation", "HCI", "Product design"];

const facts = [
  { k: "Based in", v: "Dublin, IE" },
  { k: "Studying", v: "MSc HCI, UCD" },
  { k: "Focus", v: "AI product design" },
];

const paragraphs = [
  "I'm Ayush, a Product Designer based in Dublin, currently pursuing my MSc in Human-Computer Interaction at UCD.",
  "My journey from mathematics to 3D animation and product design has shaped how I think, combining logical problem-solving with creativity and an understanding of how people interact with technology.",
  "I enjoy exploring problems, questioning assumptions, and turning ideas into working experiences. From educational games and internal business tools to my own digital products, I've learned that building, testing, and sometimes getting things wrong are all part of designing something useful.",
  "I'm particularly interested in AI, automation, and creating experiences that make complex technology feel simple and human.",
];

/**
 * About: the portrait holds still on the left while the bio, the path,
 * experience and tools read down the right. Hairlines part the lists.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-16 sm:py-24 lg:py-36">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-x-8 gap-y-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        {/* ── portrait and facts ──────────────────────────── */}
        <div className="lg:col-span-5">
          <figure className="relative lg:sticky lg:top-28">
            {/* a sun behind the portrait and a registration square in front */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute -right-6 -top-8 z-0 h-32 w-32 sm:h-40 sm:w-40 max-sm:right-auto max-sm:left-56"
            >
              <circle cx="50" cy="50" r="38" className="fill-sun" />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                className="stroke-cobalt"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="2 5"
              />
            </svg>
            <span
              aria-hidden
              className="pointer-events-none absolute -left-4 top-[45%] z-0 h-24 w-24 rounded-2xl border-2 border-cobalt max-sm:hidden"
            />
            <div className="relative z-10 aspect-[4/5] shadow-frame max-h-[38rem] overflow-hidden rounded-3xl border border-line bg-paper-3 max-sm:max-w-[20rem]">
              <img
                src={photoAsset}
                alt="Portrait of Ayush Ramawat"
                className="h-full w-full object-cover object-center grayscale-[35%]"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <dl className="mt-6 grid grid-cols-3 border-t border-line pt-4">
                {facts.map((f, i) => (
                  <div key={f.k} className={i ? "border-l border-line pl-4" : "pr-4"}>
                    <dt className="text-label text-ink-soft">{f.k}</dt>
                    <dd className="mt-1 text-small font-medium text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </div>

        {/* ── bio, path, experience, tools ────────────────── */}
        <div className="flex min-w-0 flex-col gap-14 lg:col-span-7">
          <div>
            <SectionHeading id="about-title" title="A designer who likes to figure things out" />
            <div className="mt-8 flex max-w-[62ch] flex-col gap-5">
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lead text-ink" : "text-body text-ink-soft"}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-label text-ink-soft">The path so far</h3>
            <div className="relative mt-5">
              {/* the dashed line that runs through the four steps */}
              <PathLine className="inset-x-8 top-6 hidden h-10 sm:block sm:top-8" />
              <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                {journey.map((step, i) => {
                  const last = i === journey.length - 1;
                  return (
                    <InView as="li" key={step} i={i} className="flex flex-col items-start gap-3">
                      <PathGlyph step={step} i={i} current={last} />
                      <span>
                        <span className="block text-small tabular-nums text-ink-soft">{i + 1}</span>
                        <span
                          className={`block font-display text-h4 font-semibold tracking-[-0.02em] ${last ? "text-cobalt" : "text-ink"}`}
                        >
                          {step}
                        </span>
                      </span>
                    </InView>
                  );
                })}
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-label text-ink-soft">Experience</h3>
            <ul className="mt-4 border-t border-line">
              {experience.map((e) => (
                <li
                  key={e.year}
                  className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[9rem_minmax(0,1fr)]"
                >
                  <span className="text-small tabular-nums text-ink-soft">
                    {e.year.replace(/\s*—\s*/, " to ")}
                  </span>
                  <div>
                    <p className="font-display text-h4 font-semibold tracking-[-0.02em] text-ink">
                      {e.role}
                    </p>
                    <p className="mt-1 text-small text-ink-soft">{e.org}</p>
                    <p className="mt-3 max-w-[60ch] text-body text-ink-soft">{e.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <h3 className="text-label text-ink-soft">Tools I work with</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3.5 py-1.5 text-small text-ink"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <ResumeLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
