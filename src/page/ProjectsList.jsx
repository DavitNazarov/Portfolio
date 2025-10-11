import React from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import FadeContent from "@/components/ui/FadeContent";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { projects } from "@/constants/projects";

const ProjectsList = () => {
  return (
    <div className="overflow-hidden w-full min-h-[160vh] flex flex-col justify-center bg-background">
      {/* Floating heading */}
      <div className="pl-6 md:pl-20 mb-12 md:mb-24">
        <ScrollFloat
          className="text-4xl md:text-6xl font-[Russo_One] text-white tracking-wide"
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Here they are
        </ScrollFloat>
      </div>

      <FadeContent
        blur={true}
        duration={500}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 md:px-20">
          {projects.map((project, index) => (
            <SpotlightCard
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md"
            >
              <h3 className="text-2xl font-[Russo_One] text-white mb-3">
                {project.name}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Live
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </FadeContent>
    </div>
  );
};

export default ProjectsList;
