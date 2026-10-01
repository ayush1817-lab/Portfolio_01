import { detente as d } from "../content";
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
import { Bracelet, DetenteSequence } from "../components/Visuals";

/** Small build 02 — intelligence inside an object. */
export function DetenteBuild() {
  return (
    <BuildDetailLayout>
      <BuildHero
        slug="detente"
        heroLine={d.heroLine}
        meta={d.meta}
        visual={
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_35%,#fbf6ee_0%,#efe6d8_75%)] p-6">
            <Bracelet state="recover" className="max-w-[420px]" />
          </div>
        }
      />

      <BuildStoryBlock eyebrow={d.what.eyebrow} title={d.what.title} body={d.what.body}>
        {/* Media slot: detente-product (src/assets/builds/). */}
        <BuildMedia slot={mediaSlots.detenteProduct} className="max-w-[900px]" />
      </BuildStoryBlock>

      <BuildStoryBlock
        eyebrow={d.problem.eyebrow}
        title={d.problem.title}
        body={d.problem.body}
        tone="tint"
      />

      <BuildStoryBlock eyebrow={d.interaction.eyebrow} title={d.interaction.title}>
        <DetenteSequence />
        {/* Media slot: detente-states (src/assets/builds/). */}
        <BuildMedia slot={mediaSlots.detenteStates} className="mt-8 max-w-[900px]" />
      </BuildStoryBlock>

      <BuildStoryBlock eyebrow={d.why.eyebrow} title={d.why.title} body={d.why.body} tone="tint" />

      <Statement line={d.principle.line} sub={d.principle.sub} />

      <ReflectionBlock title={d.next.title} items={d.next.items} tone="plain" />
      <NextBuildNavigation slug="detente" />
    </BuildDetailLayout>
  );
}
