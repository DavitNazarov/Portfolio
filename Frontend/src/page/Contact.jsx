import React from "react";

const socials = [
  { name: "GitHub", handle: "@DavitNazarov", href: "https://github.com/DavitNazarov" },
  { name: "LinkedIn", handle: "davit-nazarov", href: "https://www.linkedin.com/in/davit-nazarov-366b77389" },
  { name: "Instagram", handle: "@nazarovdati_", href: "https://www.instagram.com/nazarovdati_?igsh=dG1sa3dvZGE1eGNm&utm_source=qr" },
];

const Contact = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-light hover:scale-105 transition-transform duration-300 inline-block">
          Let's Connect
        </h2>

        <div className="space-y-6">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
            Always interested in new opportunities, collaborations, and conversations about technology and design.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:nazarov.davit17@gmail.com"
              className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-all duration-300 hover:translate-x-2"
            >
              <span className="text-base sm:text-lg group-hover:scale-105 transition-transform duration-300">
                nazarov.davit17@gmail.com
              </span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300">
          ELSEWHERE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 hover:shadow-lg hover:scale-105 hover:bg-muted/50 transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="text-foreground group-hover:text-muted-foreground group-hover:translate-x-1 transition-all duration-300">
                  {social.name}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {social.handle}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 pt-8 border-t border-border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              © 2025 Davit Nazarov. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Built with React & Framer Motion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
