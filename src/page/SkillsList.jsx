import React from "react";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import ScrollFloat from "@/components/ui/ScrollFloat";
import {
  Code,
  Braces,
  Database,
  Server,
  Github,
  Globe,
  Terminal,
  Layers,
  Cloud,
  FileCode,
  Paintbrush,
  Sparkles,
} from "lucide-react";
import FadeContent from "@/components/ui/FadeContent";

// Row 1 – Basic Web Skills
const basicSkills = [
  { icon: <FileCode size={80} />, name: "HTML" },
  { icon: <Paintbrush size={80} />, name: "CSS" },
  { icon: <Globe size={80} />, name: "Tailwind" },
  { icon: <Sparkles size={80} />, name: "SCSS" },
];

// Row 2 – Frontend Frameworks / Libraries
const frontendSkills = [
  { icon: <Braces size={80} />, name: "JavaScript" },
  { icon: <Code size={80} />, name: "React" },
  { icon: <Layers size={80} />, name: "Framer Motion" },
  { icon: <Github size={80} />, name: "GitHub" },
];

// Row 3 – Backend / Tools
const backendSkills = [
  { icon: <Server size={80} />, name: "Node.js" },
  { icon: <Terminal size={80} />, name: "Express" },
  { icon: <Database size={80} />, name: "MongoDB" },

  { icon: <Cloud size={80} />, name: "API Integration" },
];

const LogoRow = ({ logos }) => (
  <div className="flex gap-20 md:gap-28 px-8 md:px-24 -translate-x-6 md:-translate-x-12">
    <div className="w-[60px] md:w-[120px]" />
    {logos.map((logo, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center w-[100px] md:w-[160px] opacity-90 hover:opacity-100 transition-opacity"
      >
        <div className="text-white mb-2 md:mb-3">
          {React.cloneElement(logo.icon, {
            size: window.innerWidth < 768 ? 50 : 80,
          })}
        </div>
        <p className="text-white text-lg md:text-2xl font-[Russo_One] text-center whitespace-nowrap">
          {logo.name}
        </p>
      </div>
    ))}
    <div className="w-[60px] md:w-[120px]" />
  </div>
);

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
            velocity={15}
            numCopies={4}
            damping={60}
            stiffness={400}
            parallaxClassName="w-full"
          />

          {/* Row 2 – Frontend */}
          <ScrollVelocity
            texts={[<LogoRow key="frontend" logos={frontendSkills} />]}
            velocity={-20}
            numCopies={4}
            damping={60}
            stiffness={400}
            parallaxClassName="w-full"
          />

          {/* Row 3 – Backend */}
          <ScrollVelocity
            texts={[<LogoRow key="backend" logos={backendSkills} />]}
            velocity={10}
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
