import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X, RotateCcw } from "lucide-react";

const assistantName = "Atlas";

const suggestions = [
  "Who is David?",
  "What projects has David built?",
  "What is David's tech stack?",
  "Where is David working?",
  "Where is David studying?",
  "What are David's skills?",
];

const knowledgeBase = [
  {
    keywords: [
      "who am i",
      "who is david",
      "introduce",
      "your name",
      "who are you",
    ],
    response:
      "David Nazarov is a MERN stack developer from Georgia who also knows Python. He delivers high-performance React applications and is currently pursuing an IT bachelor's degree at SEU.",
  },
  {
    keywords: [
      "age",
      "old",
      "how old",
      "birth",
      "born",
      "birthday",
      "year",
      "december 2007",
    ],
    response:
      "David is 17 years old, born in December 2007—bringing fresh energy and drive to every project.",
  },
  {
    keywords: [
      "athlete",
      "sport",
      "sports",
      "national team",
      "wushu",
      "sanda",
      "martial art",
      "martial arts",
    ],
    response:
      "Beyond coding, David is an athlete on Georgia's national Wushu Sanda martial arts team, balancing discipline in sport and software alike.",
  },
  {
    keywords: [
      "where do you work",
      "where are you working",
      "current job",
      "where is david working",
      "who do you work for",
      "present role",
      "working right now",
    ],
    response:
      "Since September 2025 David has been a React Developer at Softgen, a software company where he builds polished product experiences in close collaboration with cross-functional teams.",
  },
  {
    keywords: [
      "responsibility",
      "responsibilities",
      "what do you do at softgen",
      "day to day",
      "daily work",
      "dashboard",
      "admin dashboard",
      "tasks",
      "duty",
    ],
    response:
      "At Softgen David owns the front-end logic for admin dashboards—turning product specs into React flows, integrating with backend APIs, and shipping features on deadline alongside design and backend teams. He uses React, Tailwind, Framer Motion, and GitLab.",
  },
  {
    keywords: ["what do you do", "role", "focus", "specialize", "strength"],
    response:
      "David focuses on full-stack JavaScript with a front-end emphasis: rapid prototyping, motion-rich UX, and building secure, production-ready experiences end-to-end.",
  },
  {
    keywords: ["skills", "tech stack", "technologies", "stack", "tools", "mern", "python"],
    response:
      "David specializes in the MERN stack (MongoDB, Express, React, Node.js) and also knows Python. His toolkit includes HTML, CSS, Tailwind, SCSS, JavaScript, React, Framer Motion, GitHub, Node.js, Express, MongoDB, Python, and API Integration. He's comfortable building both the experience and the APIs behind it.",
  },
  {
    keywords: [
      "currently building",
      "working on",
      "latest",
      "now building",
      "right now",
      "learning",
    ],
    response:
      "He's currently working at Softgen, evolving admin dashboards and shipping features on deadline. He's also continuously improving his portfolio and working on side projects to expand his skills in the MERN stack and Python.",
  },
  {
    keywords: ["experience", "career", "background", "timeline"],
    response:
      "He joined Softgen in September 2025 as a React Developer building dashboard experiences. Earlier, from January to December 2024, he worked as a Front-End Developer at Startup Company (Hey guide), where he collaborated with backend developers to integrate APIs and built travel offer sections and authentication functionality using React, Tailwind, Framer, and GitHub.",
  },
  {
    keywords: ["contact", "connect", "reach", "linkedin", "github", "email", "mail"],
    response:
      "You can reach David via email at nazarov.davit17@gmail.com, connect on LinkedIn (https://www.linkedin.com/in/davit-nazarov-366b77389), explore his GitHub (https://github.com/DavitNazarov), or follow him on Instagram (@nazarovdati_).",
  },
  {
    keywords: ["location", "based", "from", "country", "where is he from"],
    response:
      "David is based in Georgia and collaborates remotely with teams across time zones.",
  },
  {
    keywords: ["available", "opportunities", "job", "hire", "open to"],
    response:
      "He's open to junior or apprenticeship roles—remote or hybrid—where he can deliver polished interfaces, connect with backend APIs, and grow toward AI-focused engineering.",
  },
  {
    keywords: [
      "education",
      "study",
      "school",
      "university",
      "degree",
      "digital academy",
      "seu",
    ],
    response:
      "David finished school in 2025 and enrolled the same year in SEU (University of SEU) in Georgia, where he's currently pursuing an IT bachelor's degree. He also completed React and Front-End Development courses at Digital Academy to deepen his practical skills.",
  },
  {
    keywords: [
      "language",
      "languages",
      "speak",
      "georgian",
      "english",
      "russian",
    ],
    response:
      "David speaks Georgian (native), English, and Russian fluently—making it easy to collaborate across international teams.",
  },
  {
    keywords: ["project", "projects", "movie app", "moviedb", "movie db", "moviehub", "movie hub"],
    response:
      "David has built several projects including MovieHub (2025) - a production-ready MERN stack application for exploring films with TMDB API integration, featuring authentication, user profiles, favorites & ratings, AI-powered movie chat (Jarvis), comments system, admin dashboard, real-time notifications, ad banner system, and comprehensive SEO optimization (https://www.moviehubs.cc/), Weather App (2025) - React + Vite weather dashboard with OpenWeatherMap integration (https://weatherdn.netlify.app/), Portfolio Website (2025) - built with React, Framer Motion, and TailwindCSS, Auth system (2025) - simple authentication system with MERN stack, Aim game (2024) - fun aim training game built with vanilla JavaScript, HTML, and CSS, and React Tic Tac Toe (2024) - tic-tac-toe game built with React.",
  },
  {
    keywords: ["moviehub", "movie hub", "moviedb", "movie app"],
    response:
      "MovieHub is David's production-ready MERN stack application built in 2025. It's a comprehensive movie exploration platform featuring authentication, user profiles, favorites & ratings, AI-powered movie chat (Jarvis using OpenRouter and TMDB), comments system, admin dashboard with user management, real-time notifications, ad banner system, and comprehensive SEO optimization. Built with React 19, Vite 7, Tailwind CSS, Node.js, Express, MongoDB, and integrated with TMDB API. Check it out at https://www.moviehubs.cc/",
  },
  {
    keywords: ["weather app", "weather"],
    response:
      "David built a Weather App in 2025 using React and Vite. It's a weather dashboard that pulls live OpenWeatherMap data, shows sunrise/sunset times, and supports location search with intelligent geocoding. You can check it out at https://weatherdn.netlify.app/",
  },
  {
    keywords: ["portfolio", "portfolio website", "this website"],
    response:
      "This portfolio website was built by David in 2025 using React, Framer Motion, and TailwindCSS. It features smooth animations, dark/light mode, and a minimalist design. The source code is available on GitHub at https://github.com/DavitNazarov/Portfolio",
  },
  {
    keywords: ["auth", "authentication", "auth system"],
    response:
      "David built an authentication system in 2025 using the MERN stack (MongoDB, Express, React, Node.js). It's a simple authentication system with MERN stack, though he didn't make the frontend part for it. The code is available on GitHub at https://github.com/DavitNazarov/Auth",
  },
  {
    keywords: ["github", "repositories", "code", "source code"],
    response:
      "You can explore all of David's projects on GitHub at https://github.com/DavitNazarov. His repositories include MovieHub (Movies), Weather App (WeatherApp), Portfolio, Auth system (Auth), Aim game, and React Tic Tac Toe.",
  },
  {
    keywords: ["softgen", "current company", "where does he work"],
    response:
      "David works at Softgen as a React Developer since September 2025. He owns the front-end logic for admin dashboards, turning product specs into React flows, integrating with backend APIs, and shipping features on deadline alongside design and backend teams. He uses React, Tailwind, Framer Motion, and GitLab.",
  },
  {
    keywords: ["hey guide", "previous", "past work", "2024", "startup company"],
    response:
      "From January to December 2024, David worked as a Front-End Developer at Startup Company (Hey guide). He collaborated with backend developers to integrate APIs and built travel offer sections and authentication functionality for the web app using React, Tailwind, Framer, and GitHub.",
  },
];

const fallbackResponses = [
  "Ask about David's background, responsibilities, or strengths—I've got the details.",
  "Curious about David's work at Softgen or his studies? Just ask.",
  "Try topics like his current role, daily responsibilities, or the languages he speaks.",
];

const politeClosings = [
  "Happy to help! Anything else you'd like to explore about David?",
  "Glad that helped. Curious about his projects or favorite tools?",
  "Always here if you need more insights about David's work.",
];

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollAnchorRef = useRef(null);

  const greetingMessage = useMemo(
    () => `Hey there—ask me anything you’d like to know about David.`,
    []
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      const panelEl = panelRef.current;
      const triggerEl = buttonRef.current;

      if (
        panelEl?.contains(event.target) ||
        triggerEl?.contains(event.target)
      ) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([
        {
          sender: "bot",
          text: greetingMessage,
        },
      ]);
      setHasGreeted(true);
    }
  }, [open, hasGreeted, greetingMessage]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const getBotResponse = (rawMessage) => {
    const normalized = rawMessage.toLowerCase().trim();

    // Handle gratitude
    if (/(thank|thanks|appreciate|great|awesome|perfect|excellent)/.test(normalized)) {
      return politeClosings[Math.floor(Math.random() * politeClosings.length)];
    }

    // Handle greetings
    if (/(hi|hello|hey|good morning|good evening|good afternoon|greetings)/.test(normalized)) {
      return "Hello! Ask me anything about David's journey, skills, projects, or what he's building at the moment.";
    }

    // Handle goodbye
    if (/(bye|goodbye|see you|farewell|later)/.test(normalized)) {
      return "Goodbye! Feel free to come back anytime if you have more questions about David.";
    }

    // Improved matching: find best match by counting keyword matches
    let bestMatch = null;
    let bestScore = 0;

    knowledgeBase.forEach((entry) => {
      const score = entry.keywords.reduce((acc, keyword) => {
        if (normalized.includes(keyword)) {
          return acc + 1;
        }
        return acc;
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch && bestScore > 0) {
      return bestMatch.response;
    }

    // Fallback with helpful suggestions
    return `${fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]} Try asking about his projects, education, or work experience.`;
  };

  const sendMessage = (rawMessage) => {
    const trimmed = rawMessage.trim();
    if (!trimmed) return;

    setInputValue("");
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setIsThinking(true);

    const response = getBotResponse(trimmed);
    const delay = Math.min(Math.max(response.length * 8, 400), 1400);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setIsThinking(false);
    }, delay);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  const clearMessages = () => {
    setMessages([
      {
        sender: "bot",
        text: greetingMessage,
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-80 sm:w-96 rounded-[28px] border border-border bg-card/95 backdrop-blur-xl shadow-2xl px-5 py-4 text-sm text-foreground"
            >
              <div className="absolute -bottom-2 right-10 h-5 w-5 rotate-45 border-b border-r border-border bg-card/95" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    David's AI Guide
                  </p>
                  <div className="flex items-center gap-2 text-foreground">
                    <Sparkles size={18} className="text-primary" />
                    <span className="text-lg font-light">
                      Ask {assistantName}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Type a question or tap a suggestion below.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {messages.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={clearMessages}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label="Clear conversation"
                      title="Clear conversation"
                    >
                      <RotateCcw size={14} />
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label="Close chatbot"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-light uppercase tracking-[0.12em] text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 flex max-h-64 sm:max-h-80 flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.sender}-${index}-${message.text.slice(
                      0,
                      8
                    )}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-foreground border border-border"
                      } font-light ${
                        message.sender === "user"
                          ? "shadow-lg shadow-primary/20"
                          : "shadow-lg"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <span className="whitespace-pre-wrap break-words">
                          {message.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                            if (part.match(/^https?:\/\//)) {
                              return (
                                <a
                                  key={i}
                                  href={part}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary underline hover:text-primary/80 transition-colors"
                                >
                                  {part}
                                </a>
                              );
                            }
                            return part;
                          })}
                        </span>
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                ))}

                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      thinking
                    </div>
                  </motion.div>
                )}

                <div ref={scrollAnchorRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-4 flex items-center gap-2"
              >
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask about David..."
                  className="flex-1 rounded-full border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground font-light placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200"
                  aria-label="Ask a question about David"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ask
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-xl transition-all duration-200 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={open ? "Hide David's chatbot" : "Show David's chatbot"}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={26} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBotWidget;
