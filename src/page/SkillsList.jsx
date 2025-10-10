import React from "react";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import ScrollFloat from "@/components/ui/ScrollFloat";

import FadeContent from "@/components/ui/FadeContent";
import LogoRow from "@/components/ui/LogoRow";
import { backendSkills, basicSkills, frontendSkills } from "@/const/SkillsData";

const SkillsList = () => {
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
        {/* Rows wrapper */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Row 1 – Basic */}
          <ScrollVelocity
            texts={[<LogoRow key="basic" logos={basicSkills} />]}
            velocity={5}
            numCopies={4}
            damping={60}
            stiffness={400}
            parallaxClassName="w-full"
          />

          {/* Row 2 – Frontend */}
          <ScrollVelocity
            texts={[<LogoRow key="frontend" logos={frontendSkills} />]}
            velocity={-5}
            numCopies={4}
            damping={60}
            stiffness={400}
            parallaxClassName="w-full"
          />

          {/* Row 3 – Backend */}
          <ScrollVelocity
            texts={[<LogoRow key="backend" logos={backendSkills} />]}
            velocity={5}
            numCopies={4}
            damping={60}
            stiffness={400}
            parallaxClassName="w-full"
          />
        </div>
      </FadeContent>
    </div>
  );
};

export default SkillsList;
