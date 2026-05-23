import SpotlightCard from "@/components/ui/SpotlightCard";
import { PROCESS_TINT } from "@/features/process/constants/process";

export default function WorkflowCard({ index, item }) {
  const Icon = item.icon;

  return (
    <SpotlightCard key={item.title} tint={PROCESS_TINT} delay={index * 0.08} className="p-5 sm:p-6 h-full">
      <div className="flex h-full flex-col gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border"
          style={{
            borderColor: `rgba(${PROCESS_TINT}, 0.28)`,
            backgroundColor: `rgba(${PROCESS_TINT}, 0.13)`,
          }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: `rgb(${PROCESS_TINT})` }} />
        </div>
        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-[0.24em]"
            style={{ color: `rgba(${PROCESS_TINT}, 0.72)` }}
          >
            0{index + 1} · Workflow
          </p>
          <h3 className="mt-2 text-base font-medium text-foreground/95">{item.title}</h3>
          <p className="mt-3 text-[13.5px] leading-6 text-muted-foreground/68">{item.text}</p>
        </div>
      </div>
    </SpotlightCard>
  );
}
