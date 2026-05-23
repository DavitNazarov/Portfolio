import DashboardCrudPage from "@/features/dashboard/components/DashboardCrudPage";
import { educationDashboardConfig } from "@/features/dashboard/config/education";

export default function DashboardEducation() {
  return <DashboardCrudPage config={educationDashboardConfig} />;
}
