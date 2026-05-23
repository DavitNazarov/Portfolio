import DashboardCrudPage from "@/features/dashboard/components/DashboardCrudPage";
import { awardDashboardConfig } from "@/features/dashboard/config/awards";

export default function DashboardAwards() {
  return <DashboardCrudPage config={awardDashboardConfig} />;
}
