import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import AdminMenu from "@/layout/components/AdminMenu";

export default function TopControls() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { loggedIn, isAdmin, logout } = useAuth();

  useEffect(() => {
    const close = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <div ref={menuRef}>
        {loggedIn && isAdmin ? (
          <AdminMenu
            menuOpen={menuOpen}
            onLogout={handleLogout}
            onToggle={() => setMenuOpen((open) => !open)}
            setMenuOpen={setMenuOpen}
          />
        ) : loggedIn ? (
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 backdrop-blur-md text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/15 transition-all duration-200"
          >
            <LogOut className="w-3 h-3" />
            Log out
          </button>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 backdrop-blur-md text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/15 transition-all duration-200"
          >
            <LogIn className="w-3 h-3" />
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}
