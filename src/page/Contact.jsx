import React from "react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import FadeContent from "@/components/ui/FadeContent";
import { Github, Linkedin, Instagram } from "lucide-react";

const socials = [
  { icon: <Github size={36} />, href: "https://github.com/DavitNazarov" },
  {
    icon: <Linkedin size={36} />,
    href: "https://www.linkedin.com/in/davit-nazarov-366b77389",
  },
  {
    icon: <Instagram size={36} />,
    href: "https://www.instagram.com/nazarovdati_?igsh=dG1sa3dvZGE1eGNm&utm_source=qr",
  },
];

const Contact = () => {
  return (
    <div className="overflow-hidden w-full h-[100vh] flex flex-col items-center justify-center bg-background">
      {/* Floating heading */}
      <ScrollFloat
        className="text-5xl md:text-7xl font-[Russo_One] text-white mb-12"
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        Wanna Talk?
      </ScrollFloat>

      <FadeContent blur duration={600} initialOpacity={0.2}>
        <div className="flex gap-10 md:gap-16">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-transform duration-300 hover:scale-125"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </FadeContent>
    </div>
  );
};

export default Contact;
