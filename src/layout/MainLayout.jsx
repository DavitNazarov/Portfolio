import { useEffect, useRef, Suspense } from "react";
import Particles from "@/components/ui/Particles";
import ChatBotWidget from "@/components/ui/ChatBotWidget";
import { Home, NavBar, Projects, Skills, SkillsList } from "@/lazy/pages";
import { Loader } from "lucide-react";
import ProjectsList from "@/page/ProjectsList";
import Contact from "@/page/Contact";
import Experience from "@/page/Experience";
import ExperienceList from "@/page/ExperienceList";
const MainLayout = () => {
  const bgRef = useRef(null);

  // Cursor-based background movement
  useEffect(() => {
    const el = bgRef.current;
    const move = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25;
      const y = (e.clientY / innerHeight - 0.5) * 25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <section
          id="home"
          className="relative h-screen overflow-hidden bg-background"
        >
          {/* Background following cursor */}
          <div
            ref={bgRef}
            className="absolute inset-0 z-0 transition-transform duration-150 ease-out"
          >
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Foreground content */}
          <div className="relative z-10">
            <Home />
          </div>
        </section>

        <section id="skills" className="h-[150vh] bg-background">
          <Skills />
        </section>

        <section className="h-[150vh] flex items-center justify-center bg-background">
          <SkillsList />
        </section>

        <section id="projects" className="h-[150vh] bg-background">
          <Projects />
        </section>

        <section className="h-[150vh] flex items-center justify-center bg-background">
          <ProjectsList />
        </section>

        <section id="experience" className="h-[150vh] bg-background">
          <Experience />
        </section>

        <section className="h-[150vh] flex items-center justify-center bg-background">
          <ExperienceList />
        </section>

        <section id="contact" className="h-[100vh] bg-background">
          <Contact />
        </section>
      </Suspense>
      <ChatBotWidget />
    </>
  );
};

export default MainLayout;
