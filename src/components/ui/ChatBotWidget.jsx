import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

const assistantName = "Atlas";

const suggestions = [
  "Who is David?",
  "Where is David working right now?",
  "What are David's core skills?",
  "What languages does David speak?",
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
      "David Nazarov is a MERN-focused developer from Georgia who delivers high-performance React applications.",
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
      "Since September 2025 David has been a Front-End Developer at Softgen, a software company where he builds polished product experiences in close collaboration with cross-functional teams.",
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
      "At Softgen David owns the front-end logic for admin dashboards—translating product requirements into React flows, wiring them to backend APIs, and keeping delivery on schedule alongside design and backend teammates.",
  },
  {
    keywords: ["what do you do", "role", "focus", "specialize", "strength"],
    response:
      "David focuses on full-stack JavaScript with a front-end emphasis: rapid prototyping, motion-rich UX, and building secure, production-ready experiences end-to-end.",
  },
  {
    keywords: ["skills", "tech stack", "technologies", "stack", "tools"],
    response:
      "His toolkit includes React, Node.js, Express, MongoDB, Tailwind, Framer Motion, GSAP, and GitHub-driven workflows. He's comfortable building both the experience and the APIs behind it.",
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
      "He's evolving Softgen's admin dashboards, experimenting with AI-assisted UX patterns, and polishing side projects like his Movie App while planning the next additions to his portfolio.",
  },
  {
    keywords: ["experience", "career", "background", "timeline"],
    response:
      "He joined Softgen in September 2025 as a Front-End Developer building dashboard experiences. Earlier, in 2024 at Hey guide, he delivered travel offer flows, authentication, and polished UI components in partnership with backend teams.",
  },
  {
    keywords: ["contact", "connect", "reach", "linkedin", "github"],
    response:
      "Feel free to connect with David on LinkedIn (https://www.linkedin.com/in/davit-nazarov-366b77389) or explore his GitHub (https://github.com/DavitNazarov).",
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
      "David finished school in 2025, enrolled the same year in SEU's IT bachelor's program in Georgia, and completed React and Front-End Development courses at Digital Academy to deepen his practical skills.",
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
    keywords: ["project", "projects", "movie app", "portfolio"],
    response:
      "His current highlight is a Movie App that showcases his React skills, and he's preparing to ship more portfolio-ready projects soon.",
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
    const normalized = rawMessage.toLowerCase();

    if (/(thank|appreciate|great)/.test(normalized)) {
      return politeClosings[Math.floor(Math.random() * politeClosings.length)];
    }

    if (/(hi|hello|hey|good morning|good evening)/.test(normalized)) {
      return "Hello! Ask me anything about David's journey, skills, or what he's building at the moment.";
    }

    const match = knowledgeBase.find((entry) =>
      entry.keywords.some((keyword) => normalized.includes(keyword))
    );

    if (match) {
      return match.response;
    }

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
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
              className="relative w-80 sm:w-96 rounded-[28px] border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-lg px-5 py-4 text-sm text-foreground font-[100]"
            >
              <div className="absolute -bottom-2 right-10 h-5 w-5 rotate-45 border-b border-r border-white/10 bg-slate-900/95" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-secondary">
                    David’s AI Guide
                  </p>
                  <div className="flex items-center gap-2 text-foreground">
                    <Sparkles size={18} className="text-accent" />
                    <span className="text-lg font-normal">
                      Ask {assistantName}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Type a question or tap a suggestion below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                  aria-label="Close chatbot"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-[100] uppercase tracking-[0.12em] text-muted-foreground transition hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex max-h-56 flex-col gap-3 overflow-y-auto pr-1">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed backdrop-blur ${
                        message.sender === "user"
                          ? "bg-primary/80 text-primary-foreground"
                          : "bg-white/5 text-foreground border border-white/10"
                      } font-[100] ${
                        message.sender === "user"
                          ? "shadow-lg shadow-primary/20"
                          : "shadow-lg shadow-secondary/10"
                      }`}
                    >
                      {message.text}
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
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
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
                  placeholder="Ask about David's work..."
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground font-[100] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  aria-label="Ask a question about David"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-secondary-foreground transition hover:bg-secondary/90"
                >
                  Ask
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-primary text-primary-foreground shadow-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-label={open ? "Hide David's chatbot" : "Show David's chatbot"}
        >
          <MessageCircle size={26} />
        </button>
      </div>
    </div>
  );
};

export default ChatBotWidget;
