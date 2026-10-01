import { Flow } from "@/case-study/components/Diagrams";
import { pipeline as d } from "../content";
import { mediaSlots } from "../media";
import {
  BuildDetailLayout,
  BuildHero,
  BuildMedia,
  BuildStoryBlock,
  MetricCallout,
  NextBuildNavigation,
  ReflectionBlock,
  Statement,
} from "../components/BuildLayout";
import { PipelineMotif, PipelineSteps } from "../components/Visuals";

/** Small build 01 — intelligence inside a workflow. */
export function PipelineBuild() {
  return (
    <BuildDetailLayout>
      <BuildHero
        slug="3d-pipeline"
        heroLine={d.heroLine}
        meta={d.meta}
        visual={<PipelineMotif />}
      />

      <BuildStoryBlock eyebrow={d.context.eyebrow} title={d.context.title} body={d.context.body}>
        <Flow nodes={d.context.production} label="The VR production pipeline" />
      </BuildStoryBlock>

      <BuildStoryBlock
        eyebrow={d.constraint.eyebrow}
        title={d.constraint.title}
        body={d.constraint.body}
        tone="tint"
      >
        <Flow nodes={d.overview} label="What the AI-assisted pipeline does, in six stages" />
      </BuildStoryBlock>

      <BuildStoryBlock eyebrow={d.workflow.eyebrow} title={d.workflow.title}>
        <PipelineSteps steps={d.workflow.steps} />
        {/* Media slots: pipeline-asset-sheet, pipeline-review-page (src/assets/builds/). */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <BuildMedia slot={mediaSlots.pipelineSheet} />
          <BuildMedia slot={mediaSlots.pipelineReview} />
        </div>
      </BuildStoryBlock>

      <Statement line={d.principle.line} sub={d.principle.sub} />

      <BuildStoryBlock eyebrow="Outcome" title="From a week or more to roughly a day.">
        <MetricCallout before={d.outcome.before} after={d.outcome.after} note={d.outcome.honesty} />
      </BuildStoryBlock>

      <ReflectionBlock title={d.today.title} items={d.today.items} />
      <NextBuildNavigation slug="3d-pipeline" />
    </BuildDetailLayout>
  );
}
