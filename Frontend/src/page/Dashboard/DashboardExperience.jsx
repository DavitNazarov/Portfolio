import DashboardCrudPage from "@/features/dashboard/components/DashboardCrudPage";
import { experienceDashboardConfig } from "@/features/dashboard/config/experience";

export default function DashboardExperience() {
  return <DashboardCrudPage config={experienceDashboardConfig} />;
}
