import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Home from "@/page/Home";
import {
  Sun, Moon, LogIn, ChevronDown, LayoutDashboard,
  FolderKanban, Briefcase, GraduationCap, LogOut,
} from "lucide-react";
import Projects from "@/page/Projects";
import Contact from "@/page/Contact";
import Experience from "@/page/Experience";
import Education from "@/page/Education";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

const SECTIONS = [
  { id: "home", label: "Intro", number: "01" },
  { id: "experience", label: "Work", number: "02" },
  { id: "education", label: "Study", number: "03" },
  { id: "projects", label: "Build", number: "04" },
  { id: "contact", label: "Connect", number: "05" },
];

export default function MainLayout() {
  const [active, setActive] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const menuRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  // Reliable active-section tracking: pick whichever section's top has
  // just passed the 40% viewport line. Works uniformly for the full-screen
  // hero and all other sections.
  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.scrollY + window.innerHeight * 0.4;
      let currentId = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerLine) currentId = id;
      }
      setActive(currentId);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const { loggedIn, isAdmin, logout } = useAuth();

  return (
    <>
      <NoiseOverlay />

      <Suspense fallback={null}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-400 relative">

          {/* ── Scroll progress ── */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[1px] bg-foreground/25 z-[9996] origin-left"
            style={{ scaleX }}
          />

          {/* ── Top-right controls ── */}
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
            <div ref={menuRef}>
              {loggedIn && isAdmin ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
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
                        {[
                          { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
                          { to: ROUTES.DASHBOARD_PROJECTS, icon: FolderKanban, label: "Projects" },
                          { to: ROUTES.DASHBOARD_EXPERIENCE, icon: Briefcase, label: "Experience" },
                          { to: ROUTES.DASHBOARD_EDUCATION, icon: GraduationCap, label: "Education" },
                        ].map(({ to, icon: Icon, label }) => (
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
                          onClick={() => { setMenuOpen(false); logout(); }}
                          className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs text-destructive hover:bg-white/5 transition-colors duration-150"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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

          {/* ── Left section nav ── */}
          <nav
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5"
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
            aria-label="Section navigation"
          >
            {/* Vertical spine */}
            <motion.div
              aria-hidden
              className="absolute left-[3px] top-1 bottom-1 w-px bg-foreground/15"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            />

            {SECTIONS.map(({ id, label, number }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  aria-label={`Go to ${label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex items-center gap-3 py-0.5"
                >
                  {/* Dot on spine */}
                  <motion.span
                    aria-hidden
                    className="relative block rounded-full"
                    animate={{
                      width: isActive ? 7 : 5,
                      height: isActive ? 7 : 5,
                      backgroundColor: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  >
                    {/* Active glow */}
                    {isActive && (
                      <motion.span
                        aria-hidden
                        layoutId="nav-active-glow"
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: "0 0 14px 2px rgba(255,255,255,0.35)" }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      />
                    )}
                  </motion.span>

                  {/* Number + label */}
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <motion.span
                      className="text-[9px] font-mono tracking-[0.2em] tabular-nums"
                      animate={{
                        opacity: isActive ? 0.9 : navHovered ? 0.55 : 0.3,
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {number}
                    </motion.span>

                    <AnimatePresence>
                      {(navHovered || isActive) && (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0, x: -6, width: 0 }}
                          animate={{
                            opacity: isActive ? 0.95 : 0.55,
                            x: 0,
                            width: "auto",
                          }}
                          exit={{ opacity: 0, x: -6, width: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[10px] font-mono tracking-[0.24em] uppercase text-foreground overflow-hidden"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* ── Content ── */}
          <main>
            {/* Home hero — no max-width, Home controls its own layout */}
            <header id="home">
              <Home />
            </header>

            {/* All other sections — centred via flex + component's own max-w */}
            <section id="experience" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <Experience />
            </section>

            <section id="education" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <Education />
            </section>

            <section id="projects" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <Projects />
            </section>

            <section id="contact" className="py-28 sm:py-36 flex justify-center px-6 sm:px-10 lg:px-16">
              <Contact />
            </section>
          </main>

          {/* Bottom fade */}
          <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </Suspense>

      <ChatBotWidget />
    </>
  );
}
