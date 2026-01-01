import { Suspense, useEffect, useRef, useState } from "react";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import Home from "@/page/Home";
import { Sun, Moon } from "lucide-react";
import Projects from "@/page/Projects";
import Contact from "@/page/Contact";
import Experience from "@/page/Experience";
import Education from "@/page/Education";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark] = useState(true);
  const sectionsRef = useRef([]);

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

    // Make all sections visible immediately, then animate on scroll
    const makeVisible = () => {
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          // Remove opacity-0 immediately
          section.classList.remove("opacity-0");
          // Add animation after a small delay for staggered effect
          setTimeout(() => {
            section.classList.add("animate-fade-in-up");
          }, index * 100);
        }
      });
    };

    // Small delay to ensure DOM is ready
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

    // Observe all sections
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
