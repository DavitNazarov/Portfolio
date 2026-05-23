import { Briefcase, FolderKanban, GraduationCap, LayoutDashboard, Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const ADMIN_LINKS = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
  { to: ROUTES.DASHBOARD_PROJECTS, icon: FolderKanban, label: "Projects" },
  { to: ROUTES.DASHBOARD_EXPERIENCE, icon: Briefcase, label: "Experience" },
  { to: ROUTES.DASHBOARD_EDUCATION, icon: GraduationCap, label: "Education" },
  { to: ROUTES.DASHBOARD_AWARDS, icon: Trophy, label: "Awards" },
];
