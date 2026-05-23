import { Bug, GitBranch, ServerCog } from "lucide-react";

export const PROCESS_TINT = "244, 114, 182";
export const AI_TINT = "167, 139, 250";

export const WORKFLOW_STEPS = [
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

export const AI_USAGE_POINTS = [
  "Use AI mainly for frontend UI/UX implementation: layout ideas, component structure, responsive states, micro-interactions, and cleaner interface copy.",
  "Give AI exact instructions before coding: what the screen must do, which design style to follow, which files to touch, and what edge cases matter.",
  "Prepare the environment for AI first by sharing project context, API contracts, existing components, styling rules, and the expected user flow.",
  "Code with AI as a pair-programming tool, then manually control the result: simplify logic, remove weak abstractions, fix bugs, and make the code cleaner.",
  "Manually check API behavior, validation, loading/success/error states, responsiveness, and final wording before treating the work as finished.",
];
