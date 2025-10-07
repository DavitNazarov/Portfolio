import { useEffect, useRef } from "react";
import NavBar from "@/components/navbar/NavBar";
import Skills from "@/page/Skills";
import Projects from "@/page/Projects";
import Home from "@/page/Home";
import Particles from "@/components/ui/Particles";
import SkillsList from "@/page/SkillsList";

const MainLayout = () => {
  const bgRef = useRef(null);

  // move only background
  useEffect(() => {
    const el = bgRef.current;
    const move = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25; // subtle motion
      const y = (e.clientY / innerHeight - 0.5) * 25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <NavBar />
      <section
        id="home"
        className="relative h-screen overflow-hidden bg-background"
      >
        {/* Background that follows cursor */}
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

        {/* Home content above */}
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

      <section
        id="projects"
        className="h-screen flex items-center justify-center bg-yellow-100"
      >
        <Projects />
      </section>
    </>
  );
};

export default MainLayout;
