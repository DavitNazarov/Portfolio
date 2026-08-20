import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { ADMIN_LINKS } from "@/layout/constants/adminLinks";

export default function AdminMenu({ menuOpen, onLogout, onToggle, setMenuOpen }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-white/15 hover:text-foreground"
      >
        <LayoutDashboard className="w-3 h-3" />
        Dashboard
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-white/8 bg-background/90 shadow-2xl backdrop-blur-xl"
          >
            {ADMIN_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center gap-2.5 px-3.5 py-2.5 text-xs text-muted-foreground transition-colors duration-150 hover:bg-white/5 hover:text-foreground"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
            <div className="h-px mx-3 bg-white/6" />
            <button
              role="menuitem"
              onClick={onLogout}
              className="flex min-h-11 w-full items-center gap-2.5 px-3.5 py-2.5 text-xs text-destructive-foreground transition-colors duration-150 hover:bg-white/5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
