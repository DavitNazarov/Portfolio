import React, { useEffect, useRef } from "react";
import TextType from "@/components/ui/TextType";

const Home = () => {
  const emojiRef = useRef(null);

  // independent emoji motion
  useEffect(() => {
    const el = emojiRef.current;
    const move = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // more noticeable
      const y = (e.clientY / innerHeight - 0.5) * 40;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-transparent text-foreground px-6 z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              <TextType
                text={[
                  "Hey, I'm David.",
                  "From Georgia.",
                  "Web Developer.",
                  "Future AI Engineer.",
                ]}
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={1500}
                loop
                cursorClassName="text-white"
              />
            </span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            I'm a MERN stack developer passionate about crafting smooth,
            high-performance web apps and exploring the world of Artificial
            Intelligence.
          </p>
        </div>

        {/* Emoji that follows cursor */}
        <div className="flex justify-center md:justify-end select-none">
          <div
            ref={emojiRef}
            className="text-[6rem] md:text-[10rem] transition-transform duration-75 ease-out"
          >
            👨‍💻
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
