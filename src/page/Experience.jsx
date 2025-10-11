import React from "react";
import SplitText from "@/components/ui/SplitText";

const Experience = () => {
  return (
    <div className="flex h-full items-center justify-start pl-[10%]">
      <SplitText
        text="Experience?"
        className="
    font-extrabold text-white leading-none font-[Russo_One]
    text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem]
  "
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

export default Experience;
