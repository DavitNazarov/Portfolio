import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import Home from "@/page/Home";
import { Sun, Moon, LogIn, ChevronDown, LayoutDashboard, FolderKanban, Briefcase, GraduationCap, LogOut } from "lucide-react";
import Projects from "@/page/Projects";
import Contact from "@/page/Contact";
import Experience from "@/page/Experience";
import Education from "@/page/Education";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const sectionsRef = useRef([]);
  const { loggedIn, logout } = useAuth();

  useEffect(() => {
    function closeMenu(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored ? stored === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  useEffect(() => {
    setActiveSection("home");

    const makeVisible = () => {
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          section.classList.remove("opacity-0");
          setTimeout(() => {
            section.classList.add("animate-fade-in-up");
          }, index * 100);
        }
      });
    };

    setTimeout(makeVisible, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    setTimeout(() => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section);
      });
    }, 200);

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <>
      <Suspense fallback={null}>
        <div className="min-h-screen bg-background text-foreground relative transition-colors duration-300">
          {/* Login / User menu (before theme) */}
          <div className="fixed top-8 right-20 z-50 flex items-center gap-2" ref={menuRef}>
            {loggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all bg-background/80 backdrop-blur-sm"
                  aria-label="Menu"
                >
                  <span className="text-sm font-medium">Dashboard</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 py-1 w-48 rounded-lg border border-border bg-background shadow-lg">
                    <Link
                      to={ROUTES.DASHBOARD}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD_PROJECTS}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50"
                    >
                      <FolderKanban className="w-4 h-4" /> Projects
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD_EXPERIENCE}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50"
                    >
                      <Briefcase className="w-4 h-4" /> Experience
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD_EDUCATION}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50"
                    >
                      <GraduationCap className="w-4 h-4" /> Education
                    </Link>
                    <button
                      onClick={() => { setMenuOpen(false); logout(); }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 w-full text-left text-destructive"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all bg-background/80 backdrop-blur-sm"
              >
                <LogIn className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Log in</span>
              </Link>
            )}
          </div>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-50 group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg hover:scale-110 bg-background/80 backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            )}
          </button>

          <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <div className="flex flex-col gap-4">
              {["home", "experience", "education", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    const el = document.getElementById(section);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-2 h-8 rounded-full transition-all duration-500 hover:scale-125 ${
                    activeSection === section
                      ? "bg-foreground scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Navigate to ${section}`}
                />
              ))}
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
            <header
              id="home"
              ref={(el) => {
                sectionsRef.current[0] = el;
                if (el) {
                  el.classList.remove("opacity-0");
                  el.classList.add("animate-fade-in-up");
                }
              }}
              className="min-h-screen flex items-center"
            >
              <Home />
            </header>

            <section
              id="experience"
              ref={(el) => {
                sectionsRef.current[1] = el;
                if (el) {
                  setTimeout(() => {
                    el.classList.remove("opacity-0");
                    el.classList.add("animate-fade-in-up");
                  }, 200);
                }
              }}
              className="min-h-screen py-20 sm:py-32"
            >
              <Experience />
            </section>

            <section
              id="education"
              ref={(el) => {
                sectionsRef.current[2] = el;
                if (el) {
                  setTimeout(() => {
                    el.classList.remove("opacity-0");
                    el.classList.add("animate-fade-in-up");
                  }, 300);
                }
              }}
              className="min-h-screen py-20 sm:py-32"
            >
              <Education />
            </section>

            <section
              id="projects"
              ref={(el) => {
                sectionsRef.current[3] = el;
                if (el) {
                  setTimeout(() => {
                    el.classList.remove("opacity-0");
                    el.classList.add("animate-fade-in-up");
                  }, 400);
                }
              }}
              className="min-h-screen py-20 sm:py-32"
            >
              <Projects />
            </section>

            <section
              id="contact"
              ref={(el) => {
                sectionsRef.current[4] = el;
                if (el) {
                  setTimeout(() => {
                    el.classList.remove("opacity-0");
                    el.classList.add("animate-fade-in-up");
                  }, 500);
                }
              }}
              className="py-20 sm:py-32"
            >
              <Contact />
            </section>
          </main>

          <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none transition-colors duration-300"></div>
        </div>
      </Suspense>
      <ChatBotWidget />
    </>
  );
};

export default MainLayout;
