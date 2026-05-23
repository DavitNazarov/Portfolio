import DashboardCrudPage from "@/features/dashboard/components/DashboardCrudPage";
import { projectDashboardConfig } from "@/features/dashboard/config/projects";

export default function DashboardProjects() {
  return <DashboardCrudPage config={projectDashboardConfig} />;
}
