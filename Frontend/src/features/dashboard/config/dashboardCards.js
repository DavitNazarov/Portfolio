import { Briefcase, FolderKanban, GraduationCap, Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const DASHBOARD_CARDS = [
  {
    to: ROUTES.DASHBOARD_PROJECTS,
    title: "Projects",
    description: "Create, edit, and remove portfolio projects",
    icon: FolderKanban,
    accent: "from-chart-1/20 to-chart-2/10",
  },
  {
    to: ROUTES.DASHBOARD_EXPERIENCE,
    title: "Experience",
    description: "Manage work history and roles",
    icon: Briefcase,
    accent: "from-chart-3/20 to-chart-4/10",
  },
  {
    to: ROUTES.DASHBOARD_EDUCATION,
    title: "Education",
    description: "Degrees and institutions",
    icon: GraduationCap,
    accent: "from-chart-5/20 to-chart-4/10",
  },
  {
    to: ROUTES.DASHBOARD_AWARDS,
    title: "Awards",
    description: "Competition results and achievements",
    icon: Trophy,
    accent: "from-yellow-500/20 to-orange-400/10",
  },
];
