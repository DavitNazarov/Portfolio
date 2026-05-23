import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function DashboardHomeCard({ item }) {
  const Icon = item.icon;

  return (
    <Link
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
        <Icon className="w-7 h-7 text-foreground" />
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
  );
}
