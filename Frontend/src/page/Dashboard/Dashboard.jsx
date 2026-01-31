import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { FolderKanban, Briefcase, ArrowLeft, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
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
];

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
          {cards.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-border",
                "bg-card/50 backdrop-blur-sm",
                "hover:border-muted-foreground/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
                "transition-all duration-300"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br shrink-0",
                  item.accent,
                  "group-hover:scale-105 transition-transform duration-300"
                )}
              >
                <item.icon className="w-7 h-7 text-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
