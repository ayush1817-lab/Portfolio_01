import { Check } from "lucide-react";
import { Flow } from "@/case-study/components/Diagrams";
import { voice as d } from "../content";
import { mediaSlots } from "../media";
import {
  BuildDetailLayout,
  BuildHero,
  BuildMedia,
  BuildStoryBlock,
  NextBuildNavigation,
  ReflectionBlock,
  Statement,
} from "../components/BuildLayout";
import { RoutesCompare, VoiceMotif, VoiceSession } from "../components/Visuals";

/** Small build 03 — intelligence inside an interface. */
export function VoiceBuild() {
  return (
    <BuildDetailLayout>
      <BuildHero slug="voice-agent" heroLine={d.heroLine} meta={d.meta} visual={<VoiceMotif />} />

      <BuildStoryBlock eyebrow={d.origin.eyebrow} title={d.origin.title} body={d.origin.body} />

      <BuildStoryBlock eyebrow={d.what.eyebrow} title={d.what.title} body={d.what.body} tone="tint">
        <Flow nodes={d.what.pipeline} label="The voice agent pipeline" />
        <h3 className="mt-10 font-display text-[1.3rem] font-semibold tracking-[-0.02em]">
          Current capabilities
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {d.what.capabilities.map((c) => (
            <li key={c} className="flex gap-2.5 text-[1.02rem] leading-snug">
              <Check className="mt-1 h-4 w-4 shrink-0 text-cobalt" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
        {/* Media slot: voice-agent-demo (src/assets/builds/). */}
        <BuildMedia slot={mediaSlots.voiceDemo} className="mt-8 max-w-[900px]" />
      </BuildStoryBlock>

      <BuildStoryBlock eyebrow={d.routes.eyebrow} title={d.routes.title} body={d.routes.body}>
        <RoutesCompare workflow={d.routes.workflow} agent={d.routes.agent} />
      </BuildStoryBlock>

      <Statement line={d.principle.line} />

      <BuildStoryBlock eyebrow="Design findings" title="What building it taught me." tone="tint">
        <ul className="grid gap-4 md:grid-cols-2">
          {d.findings.map((f) => (
            <li key={f.k} className="rounded-xl border border-line-strong bg-paper p-6">
              <p className="font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em]">
                {f.k}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.v}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <VoiceSession />
        </div>
      </BuildStoryBlock>

      <ReflectionBlock title={d.screenless.title} items={d.screenless.items} tone="plain" />

      <BuildStoryBlock
        eyebrow="Next step"
        title={d.evaluation.title}
        body={[d.evaluation.body]}
        tone="tint"
      >
        <ul className="flex flex-wrap gap-2" aria-label="Failure categories">
          {d.evaluation.categories.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-[14px]"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-ink-faint">
          A working prototype and an AI interaction-design experiment, not a production assistant.
        </p>
      </BuildStoryBlock>

      <NextBuildNavigation slug="voice-agent" />
    </BuildDetailLayout>
  );
}
