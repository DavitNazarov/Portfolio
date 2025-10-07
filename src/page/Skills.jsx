import React from "react";
import SplitText from "@/components/ui/SplitText";

const Skills = () => {
  return (
    <div className="flex h-full items-center justify-start pl-[10%]">
      <SplitText
        text="My Skills?"
        className="text-[9rem] font-extrabold text-white leading-none font-[Russo_One]"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    </div>
  );
};

export default Skills;
