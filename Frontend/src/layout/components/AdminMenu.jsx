import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { ADMIN_LINKS } from "@/layout/constants/adminLinks";

export default function AdminMenu({ menuOpen, onLogout, onToggle, setMenuOpen }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 backdrop-blur-md text-muted-foreground hover:text-foreground hover:border-white/15 transition-all duration-200 text-xs font-medium"
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
            className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/8 bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {ADMIN_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors duration-150"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
            <div className="h-px mx-3 bg-white/6" />
            <button
              onClick={onLogout}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs text-destructive hover:bg-white/5 transition-colors duration-150"
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
