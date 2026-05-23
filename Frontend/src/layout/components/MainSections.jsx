import Contact from "@/page/Contact";
import Education from "@/page/Education";
import Experience from "@/page/Experience";
import Home from "@/page/Home";
import HowIWork from "@/page/HowIWork";
import Projects from "@/page/Projects";

export default function MainSections() {
  return (
    <main>
      <header id="home">
        <Home />
      </header>

      <section id="experience" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <Experience />
      </section>

      <section id="education" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <Education />
      </section>

      <section id="process" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <HowIWork />
      </section>

      <section id="projects" className="min-h-screen py-28 sm:py-36 flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <Projects />
      </section>

      <section id="contact" className="py-28 sm:py-36 flex justify-center px-6 sm:px-10 lg:px-16">
        <Contact />
      </section>
    </main>
  );
}
