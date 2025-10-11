import React from "react";
import FadeContent from "@/components/ui/FadeContent";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { experiences } from "@/constants/ExperienceData";

const ExperienceList = () => {
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

      <FadeContent blur duration={500} easing="ease-out" initialOpacity={0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 md:px-20">
          {experiences.map((exp, index) => (
            <SpotlightCard
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md"
            >
              <h3 className="text-2xl font-[Russo_One] text-white mb-2">
                {exp.role}
              </h3>
              <p className="text-gray-400 text-sm font-mono mb-4">
                {exp.company} • {exp.period}
              </p>
              <p className="text-gray-300 mb-4 font-mono">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-l font-extralight font-mono px-3 py-1 rounded-full bg-white/10 text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </FadeContent>
    </div>
  );
};

export default ExperienceList;
