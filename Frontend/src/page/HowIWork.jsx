import SectionHeader from "@/components/ui/SectionHeader";
import AiWorkflowCard from "@/features/process/components/AiWorkflowCard";
import WorkflowGrid from "@/features/process/components/WorkflowGrid";
import { PROCESS_TINT } from "@/features/process/constants/process";

export default function HowIWork() {
  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="04"
        eyebrow="Process"
        title="How I"
        accent="work"
        after=" with product tasks."
        description="The important part is not only a polished screen. I try to show the complete path from requirement to interface, API, error handling, and a result the user can trust."
        tint={PROCESS_TINT}
      />

      <WorkflowGrid />
      <AiWorkflowCard />
    </div>
  );
}
