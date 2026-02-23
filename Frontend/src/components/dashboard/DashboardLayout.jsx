import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

/**
 * Shared layout for dashboard sub-pages: header with back link and title area.
 */
export function DashboardLayout({ title, subtitle, icon: Icon, iconColor, action, children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {Icon && (
                <div
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-xl text-foreground",
                    iconColor ?? "bg-chart-1/20"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
            {action}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">{children}</div>
    </div>
  );
}
