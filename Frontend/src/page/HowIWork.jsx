import { BrainCircuit, Bug, CheckCircle2, GitBranch, ServerCog, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";

const TINT = "244, 114, 182";

const WORKFLOW = [
  {
    title: "Break down the task",
    text: "I start by turning requirements into small user flows, API needs, and edge cases before touching the UI.",
    icon: GitBranch,
  },
  {
    title: "Design around real data",
    text: "I connect screens to the backend early, so loading, empty, error, and success states are part of the first version.",
    icon: ServerCog,
  },
  {
    title: "Debug manually",
    text: "I verify the happy path and failure paths by hand, then clean rough edges that generated code or first drafts usually miss.",
    icon: Bug,
  },
];

const AI_USAGE = [
  "Use AI mainly for frontend UI/UX implementation: layout ideas, component structure, responsive states, micro-interactions, and cleaner interface copy.",
  "Give AI exact instructions before coding: what the screen must do, which design style to follow, which files to touch, and what edge cases matter.",
  "Prepare the environment for AI first by sharing project context, API contracts, existing components, styling rules, and the expected user flow.",
  "Code with AI as a pair-programming tool, then manually control the result: simplify logic, remove weak abstractions, fix bugs, and make the code cleaner.",
  "Manually check API behavior, validation, loading/success/error states, responsiveness, and final wording before treating the work as finished.",
];

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
        tint={TINT}
      />

      <div className="grid gap-3.5 lg:grid-cols-3">
        {WORKFLOW.map((item, index) => {
          const Icon = item.icon;
          return (
            <SpotlightCard key={item.title} tint={TINT} delay={index * 0.08} className="p-5 sm:p-6 h-full">
              <div className="flex h-full flex-col gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: `rgba(${TINT}, 0.28)`,
                    backgroundColor: `rgba(${TINT}, 0.13)`,
                  }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: `rgb(${TINT})` }} />
                </div>
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-[0.24em]"
                    style={{ color: `rgba(${TINT}, 0.72)` }}
                  >
                    0{index + 1} · Workflow
                  </p>
                  <h3 className="mt-2 text-base font-medium text-foreground/95">{item.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-6 text-muted-foreground/68">{item.text}</p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      <SpotlightCard tint="167, 139, 250" delay={0.18} className="mt-3.5 p-5 sm:p-6" hover={false}>
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
              {AI_USAGE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-muted-foreground/70">
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-violet-300/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
