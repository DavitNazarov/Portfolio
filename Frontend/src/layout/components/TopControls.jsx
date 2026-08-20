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

  // Only listen while the menu is actually open — this used to run on every
  // click anywhere in the app for the entire session.
  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
            className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-white/15 hover:text-foreground"
          >
            <LogOut className="w-3 h-3" />
            Log out
          </button>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-white/15 hover:text-foreground"
          >
            <LogIn className="w-3 h-3" />
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}
