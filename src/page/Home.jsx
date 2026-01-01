import React, { useMemo } from "react";
import { experiences } from "@/constants/ExperienceData";
import { basicSkills, frontendSkills, backendSkills } from "@/constants/SkillsData";

const Home = () => {
  const current = useMemo(
    () => experiences.find((exp) => exp.company.toLowerCase().includes("softgen")) || experiences[0],
    []
  );

  const allTech = [
    ...basicSkills.map(s => s.name),
    ...frontendSkills.map(s => s.name),
    ...backendSkills.map(s => s.name)
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
      <div className="lg:col-span-3 space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-2">
          <div className="text-sm text-muted-foreground font-mono tracking-wider hover:text-foreground transition-colors duration-300">
            PORTFOLIO / 2025
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight group">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Davit</span>
            <br />
            <span className="text-muted-foreground inline-block hover:text-foreground hover:scale-105 transition-all duration-300">
              Nazarov
            </span>
          </h1>
        </div>

        <div className="space-y-6 max-w-md">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            MERN stack developer with Python expertise, crafting digital experiences at the intersection of
            <span className="text-foreground hover:scale-105 inline-block transition-transform duration-300"> design</span>,<span className="text-foreground hover:scale-105 inline-block transition-transform duration-300"> technology</span>,
            and
            <span className="text-foreground hover:scale-105 inline-block transition-transform duration-300"> user experience</span>.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 group">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
              <span className="group-hover:text-foreground transition-colors duration-300">Available for work</span>
            </div>
            <div className="hover:text-foreground transition-colors duration-300">Georgia</div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
        <div className="space-y-4 group">
          <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-300">
            CURRENTLY
          </div>
          <div className="space-y-2">
            <div className="text-foreground hover:translate-x-2 transition-transform duration-300">{current.role}</div>
            <div className="text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300">
              @{current.company}
            </div>
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              {current.period}
            </div>
          </div>
        </div>

        <div className="space-y-4 group">
          <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-300">
            EDUCATION
          </div>
          <div className="space-y-2">
            <div className="text-foreground hover:translate-x-2 transition-transform duration-300">IT Bachelor</div>
            <div className="text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300">
              University of SEU
            </div>
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              2025 — Present
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300">
            FOCUS
          </div>
          <div className="flex flex-wrap gap-2">
            {["React", "JavaScript", "Node.js", "MongoDB", "Python"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 hover:bg-muted hover:scale-110 hover:text-foreground transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
