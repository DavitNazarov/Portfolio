import { BrainCircuit, CheckCircle2, Sparkles } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { AI_TINT, AI_USAGE_POINTS } from "@/features/process/constants/process";

export default function AiWorkflowCard() {
  return (
    <SpotlightCard tint={AI_TINT} delay={0.18} className="mt-3.5 p-5 sm:p-6" hover={false}>
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "rgba(167, 139, 250, 0.28)",
            backgroundColor: "rgba(167, 139, 250, 0.13)",
          }}
        >
          <BrainCircuit className="h-5 w-5 text-violet-300" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-violet-300/75">
              AI in workflow
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-300/20 bg-violet-300/10 px-2 py-1 text-[10px] font-mono text-violet-200/85">
              <Sparkles className="h-3 w-3" />
              Assisted, reviewed manually
            </span>
          </div>
          <h3 className="mt-3 text-xl sm:text-2xl font-light tracking-tight text-foreground">
            AI helps me move faster, but I keep responsibility for the result.
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {AI_USAGE_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-muted-foreground/70">
                <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-violet-300/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}
