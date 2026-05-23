import WorkflowCard from "@/features/process/components/WorkflowCard";
import { WORKFLOW_STEPS } from "@/features/process/constants/process";

export default function WorkflowGrid() {
  return (
    <div className="grid gap-3.5 lg:grid-cols-3">
      {WORKFLOW_STEPS.map((item, index) => (
        <WorkflowCard key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}
