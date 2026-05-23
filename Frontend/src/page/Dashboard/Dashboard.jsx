import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import DashboardHomeCard from "@/features/dashboard/components/DashboardHomeCard";
import { DASHBOARD_CARDS } from "@/features/dashboard/config/dashboardCards";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Soft gradient header */}
      <div className="border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/10 text-foreground">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Manage your portfolio content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid gap-4 sm:gap-6">
          {DASHBOARD_CARDS.map((item) => (
            <DashboardHomeCard key={item.to} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
