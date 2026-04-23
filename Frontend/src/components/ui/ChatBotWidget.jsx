import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, RotateCcw, Send } from "lucide-react";
import { trackChatOpen, trackChatMessage } from "@/lib/notify";

/* ──────────────────────────────────────────────────────────────────
 *  David's AI Guide — "Atlas"
 *  A lightweight, keyword-scored assistant that answers questions
 *  about David from a curated knowledge base. No network calls.
 * ──────────────────────────────────────────────────────────────── */

const ASSISTANT_NAME = "Atlas";
const TINT = "167, 139, 250"; // violet — matches the Contact section
const ease = [0.16, 1, 0.3, 1];

const SUGGESTIONS = [
  "Who is David?",
  "Tech stack",
  "Availability",
  "Projects",
  "How to contact",
];

/**
 * Knowledge base — each intent is unique and non-overlapping.
 *   id       : debug / analytics
 *   phrases  : multi-word phrases (scored x3 — highly specific)
 *   keywords : single words (scored x1)
 *   answer   : response text; URLs auto-linkify on render
 */
const KB = [
  {
    id: "identity",
    phrases: ["who is david", "who are you", "introduce yourself", "your name", "about david"],
    keywords: ["bio", "introduce", "identity"],
    answer:
      "David Nazarov is an 18-year-old full-stack developer from Georgia, working primarily across the MERN stack with Python on the side. He's currently pursuing a Bachelor of Science in Information Technologies at SEU while shipping production web apps for real teams.",
  },
  {
    id: "age",
    phrases: ["how old", "what age", "date of birth", "birthday"],
    keywords: ["age", "old", "born", "birth"],
    answer:
      "David is 18 years old — born December 2007 — which means he's been building on the web since he was 14.",
  },
  {
    id: "location",
    phrases: ["where is he from", "where does he live", "what country", "based in"],
    keywords: ["location", "country", "georgia", "tbilisi"],
    answer:
      "David is based in Georgia and works remotely with teams across Europe and beyond.",
  },
  {
    id: "languages",
    phrases: ["what languages", "does he speak"],
    keywords: ["languages", "speak", "english", "russian", "georgian"],
    answer:
      "David speaks Georgian (native), English, and Russian — fluent across all three, comfortable in international teams.",
  },
  {
    id: "sports",
    phrases: ["does he do sports", "martial arts", "national team"],
    keywords: ["athlete", "sport", "sports", "wushu", "sanda"],
    answer:
      "Off the keyboard, David competes on Georgia's national Wushu Sanda team — the discipline from martial arts carries directly into how he writes and ships code.",
  },

  /* ── Work ─────────────────────────────────────── */
  {
    id: "current-status",
    phrases: [
      "where does he work",
      "current job",
      "current role",
      "where is david working",
      "present role",
      "working right now",
      "does he have a job",
    ],
    keywords: ["job", "work", "company", "employer"],
    answer:
      "David is currently between roles and actively looking for his next front-end or full-stack position — remote or hybrid. He's using the time to ship side projects, polish his portfolio, and go deeper on React and Node.",
  },
  {
    id: "past-softgen",
    phrases: ["softgen", "soft gen", "soft-gen", "last job", "previous company"],
    keywords: [],
    answer:
      "His most recent role was Junior Front-End Developer at SoftGen Group (Jan–Mar 2026). He built admin dashboards and product flows in React + Tailwind + Framer Motion, integrating with backend APIs and shipping against real deadlines. He left SoftGen to focus on finding a role with a better long-term fit.",
  },
  {
    id: "past-hey-guide",
    phrases: ["hey guide", "heyguide", "startup company", "2024 job", "travel startup"],
    keywords: [],
    answer:
      "Through 2024, David was a Front-End Developer at Hey Guide (a travel startup), collaborating with backend engineers to integrate APIs and shipping travel offer flows + full auth. Stack: React, Tailwind, Framer Motion, GitHub.",
  },
  {
    id: "responsibilities",
    phrases: [
      "what has he done",
      "day to day",
      "daily work",
      "responsibilities",
      "admin dashboard",
    ],
    keywords: ["tasks", "duty", "workflow"],
    answer:
      "Across roles, David has owned front-end logic end-to-end: turning product specs into React flows, integrating REST APIs, wiring up auth (JWT), shipping design-grade UI with Tailwind + Framer Motion, and collaborating closely with back-end and design.",
  },
  {
    id: "career",
    phrases: ["career", "experience", "timeline", "background"],
    keywords: ["journey"],
    answer:
      "Timeline: self-taught front-end from his early teens → Front-End Developer at Hey Guide (2024) → Junior Front-End Developer at SoftGen Group (Jan–Mar 2026) → currently between roles and shipping side projects. In parallel: React + Front-End Development at Digital Academy and IT at SEU (2025 → current).",
  },
  {
    id: "open-to-work",
    phrases: [
      "is he available",
      "open to work",
      "looking for job",
      "looking for work",
      "hire him",
      "is he hiring",
      "can we hire",
      "need a developer",
    ],
    keywords: ["availability", "hire", "hiring", "opportunity", "opportunities", "available", "freelance"],
    answer:
      "Yes — David is actively looking for his next role. Junior or mid-level front-end / full-stack, remote or hybrid, where he can own meaningful surface area and ship real product. Best way to reach him: nazarov.davit17@gmail.com.",
  },

  /* ── Education ────────────────────────────────── */
  {
    id: "education",
    phrases: [
      "where does he study",
      "education",
      "university",
      "degree",
      "seu",
      "georgian national",
    ],
    keywords: ["school", "study", "studying", "student"],
    answer:
      "David is pursuing a Bachelor of Science in Information Technologies at Georgian National University (SEU), starting 2025 — current. He also completed React + Front-End Development at Digital Academy in parallel.",
  },

  /* ── Tech stack ───────────────────────────────── */
  {
    id: "stack",
    phrases: [
      "tech stack",
      "what does he use",
      "what technologies",
      "programming languages",
      "his tools",
    ],
    keywords: ["stack", "skills", "tools", "frameworks", "tech", "mern"],
    answer:
      "David's toolkit spans the full product: front-end (React 19, Next.js, Vite, Tailwind, Framer Motion, TanStack Query, React Three Fiber), back-end (Node.js, Express, NestJS, Socket.IO, JWT), data (MongoDB, PostgreSQL, Prisma), and supporting work with Python, AI APIs (OpenAI/OpenRouter/Gemini), Cloudinary, and TMDB.",
  },
  {
    id: "frontend-strength",
    phrases: ["frontend strength", "front-end skills", "ui skills"],
    keywords: ["frontend", "front-end", "ui", "ux", "interface"],
    answer:
      "Front-end is where David spends most of his time: React-heavy SPAs with a strong emphasis on motion, micro-interactions, responsive systems, accessibility, and design-grade polish.",
  },
  {
    id: "backend-strength",
    phrases: ["backend skills", "server side", "api skills"],
    keywords: ["backend", "api", "server", "node", "express", "nestjs"],
    answer:
      "On the back-end, David builds REST and realtime APIs with Node/Express and NestJS, handles auth with JWT, and models data in MongoDB (Mongoose) or PostgreSQL via Prisma.",
  },

  /* ── Projects ─────────────────────────────────── */
  {
    id: "projects-overview",
    phrases: ["what has he built", "what projects", "his projects", "show projects"],
    keywords: ["projects", "portfolio", "work-samples"],
    answer:
      "Highlights: MovieHub (production MERN app with AI movie chat, ad system, admin), this Portfolio (React + Framer Motion + custom design system), a Weather Dashboard (React + OpenWeatherMap), a MERN Auth system, and a few games (Aim trainer, React Tic-Tac-Toe).",
  },
  {
    id: "project-moviehub",
    phrases: ["moviehub", "movie hub", "movie app", "moviedb"],
    keywords: ["movies"],
    answer:
      "MovieHub (2025) — a production MERN app for exploring films via TMDB. Features: auth, user profiles, favorites + ratings, AI-powered movie chat (Jarvis via OpenRouter), comments, admin dashboard, realtime notifications, ad banner system, SEO. Stack: React 19, Vite, Tailwind, Node.js, Express, MongoDB. Live: https://www.moviehubs.cc/",
  },
  {
    id: "project-weather",
    phrases: ["weather app", "weather dashboard"],
    keywords: ["weather", "openweathermap"],
    answer:
      "Weather App (2025) — a React + Vite dashboard with live OpenWeatherMap data, sunrise/sunset, and intelligent geocoded search. Live: https://weatherdn.netlify.app/",
  },
  {
    id: "project-portfolio",
    phrases: ["this website", "this portfolio", "portfolio website", "this site"],
    keywords: ["portfolio"],
    answer:
      "The site you're on. Built with React, Framer Motion, and Tailwind CSS — Instrument Serif + Inter typography, cursor-tracked spotlight cards, and a shared design system across every section. Source: https://github.com/DavitNazarov/Portfolio",
  },
  {
    id: "project-auth",
    phrases: ["auth system", "authentication project"],
    keywords: ["authentication"],
    answer:
      "MERN Auth (2025) — a reusable authentication system (JWT, refresh tokens, role-based access) that David drops into other projects. Source: https://github.com/DavitNazarov/Auth",
  },

  /* ── Contact ──────────────────────────────────── */
  {
    id: "contact",
    phrases: [
      "how to contact",
      "reach him",
      "get in touch",
      "email him",
      "contact info",
    ],
    keywords: ["contact", "email", "reach", "connect"],
    answer:
      "Email: nazarov.davit17@gmail.com · LinkedIn: linkedin.com/in/davit-nazarov-366b77389 · GitHub: github.com/DavitNazarov · Instagram: @nazarovdati_. He replies within a day.",
  },
  {
    id: "github",
    phrases: ["github profile", "his repos", "source code"],
    keywords: ["github", "repositories", "repos"],
    answer:
      "All his public work lives at https://github.com/DavitNazarov — including MovieHub, this portfolio, the auth system, the weather app, and a few game experiments.",
  },
];

/* ── Pre-index the knowledge base once at module load ─────────── */
const INDEX = KB.map((entry) => ({
  ...entry,
  _phrases: entry.phrases.map((p) => p.toLowerCase()),
  _keywords: entry.keywords.map((k) => k.toLowerCase()),
}));

/* ── Regex intents — cheaper than KB walk ─────────────────────── */
const RX = {
  greeting: /\b(hi|hello|hey|hola|yo|good\s+(morning|afternoon|evening)|greetings)\b/,
  thanks: /\b(thank|thanks|thx|ty|appreciate|awesome|perfect|great|nice|cool)\b/,
  bye: /\b(bye|goodbye|see\s+you|cya|later|farewell)\b/,
};

const FALLBACK = [
  "Try one of the chips above, or ask about his projects, stack, or current role.",
  "I can cover his background, work history, education, stack, projects, or contact info — pick any.",
  "Not sure I followed. Ask about MovieHub, the tech stack, or how to get in touch.",
];

const POLITE = [
  "Happy to help. Anything else about David?",
  "Glad that landed. Want to dig into his projects or stack next?",
  "Anytime — I can keep going if you have more.",
];

/* ── Scoring: phrase match = 3, keyword match = 1 ─────────────── */
function scoreEntry(entry, text) {
  let score = 0;
  for (const phrase of entry._phrases) {
    if (text.includes(phrase)) score += 3;
  }
  for (const kw of entry._keywords) {
    const rx = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    if (rx.test(text)) score += 1;
  }
  return score;
}

function findBestAnswer(raw) {
  const text = raw.toLowerCase().trim();
  if (!text) return null;

  if (RX.thanks.test(text)) return POLITE[Math.floor(Math.random() * POLITE.length)];
  if (RX.greeting.test(text))
    return `Hey — I'm ${ASSISTANT_NAME}, David's on-site guide. Ask me anything about his work, stack, or projects.`;
  if (RX.bye.test(text))
    return "Catch you later. Close me anytime — I'll be here when you come back.";

  let best = null;
  let bestScore = 0;
  for (const entry of INDEX) {
    const s = scoreEntry(entry, text);
    if (s > bestScore) {
      best = entry;
      bestScore = s;
    }
  }

  if (best && bestScore >= 1) return best.answer;
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

/* ── Linkify helper ───────────────────────────────────────────── */
const URL_RX = /(https?:\/\/[^\s]+)/g;
function renderWithLinks(text) {
  return text.split(URL_RX).map((part, i) => {
    if (URL_RX.test(part)) {
      URL_RX.lastIndex = 0; // reset global regex state
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/25 underline-offset-2 transition-colors duration-200 hover:decoration-white/80"
          style={{ color: `rgb(${TINT})` }}
        >
          {part.replace(/[.,]$/, "")}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ────────────────────────────────────────────────────────────── */

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [greeted, setGreeted] = useState(false);

  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const anchorRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const thinkingTimer = useRef(null);

  const greeting = useMemo(
    () =>
      `Hey — I'm ${ASSISTANT_NAME}, David's on-site guide. Tap a suggestion below or ask me anything.`,
    []
  );

  /* Outside click + Escape to close */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (triggerRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Greet once per session */
  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ sender: "bot", text: greeting }]);
      setGreeted(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, greeted, greeting]);

  /* Notify owner when someone opens the chat (once per browser session) */
  useEffect(() => {
    if (open) trackChatOpen();
  }, [open]);

  /* Auto-scroll — scroll only the messages container, never the page */
  useEffect(() => {
    const scroller = messagesRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  /* Cleanup any pending thinking timer on unmount */
  useEffect(() => {
    return () => {
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    };
  }, []);

  /* Contain wheel + touch scrolling inside the panel.
     React's onWheel is passive — we need a native listener with { passive: false }
     to actually preventDefault and stop the page from scrolling when the cursor
     is over non-scrollable parts of the chat (header, chips, input, bounds). */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (e) => {
      const scroller = messagesRef.current;
      if (scroller && scroller.contains(e.target)) {
        const { scrollTop, scrollHeight, clientHeight } = scroller;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const scrollingUp = e.deltaY < 0;
        const scrollingDown = e.deltaY > 0;
        if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
    };

    let lastTouchY = 0;
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const scroller = messagesRef.current;
      const y = e.touches[0]?.clientY ?? 0;
      const deltaY = lastTouchY - y;
      lastTouchY = y;
      if (scroller && scroller.contains(e.target)) {
        const { scrollTop, scrollHeight, clientHeight } = scroller;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      panel.removeEventListener("wheel", onWheel);
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  const send = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setThinking(true);
    trackChatMessage(trimmed);

    const answer = findBestAnswer(trimmed) ?? FALLBACK[0];
    const delay = Math.min(260 + answer.length * 6, 1100);

    thinkingTimer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
      setThinking(false);
    }, delay);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const reset = () => {
    if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    setThinking(false);
    setMessages([{ sender: "bot", text: greeting }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.24, ease }}
              className="mb-4 relative w-[min(92vw,22rem)] sm:w-[26rem] overflow-hidden rounded-[1.6rem] border backdrop-blur-xl shadow-2xl"
              style={{
                borderColor: `rgba(${TINT}, 0.2)`,
                background: `linear-gradient(155deg, rgba(${TINT}, 0.08) 0%, rgba(20,20,24,0.92) 45%, rgba(8,8,10,0.96) 100%)`,
              }}
              role="dialog"
              aria-label="David's AI Guide"
            >
              {/* Top hairline accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${TINT}, 0.6), transparent)`,
                }}
              />
              {/* Ambient glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
                style={{ background: `rgba(${TINT}, 0.25)` }}
              />

              {/* ── Header ── */}
              <div className="relative flex items-start justify-between gap-3 px-5 pt-5 pb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-xl blur-lg opacity-70"
                      style={{ background: `rgba(${TINT}, 0.45)` }}
                    />
                    <div
                      className="relative flex h-9 w-9 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `rgba(${TINT}, 0.32)`,
                        backgroundColor: `rgba(${TINT}, 0.15)`,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <Sparkles className="h-4 w-4" style={{ color: `rgb(${TINT})` }} />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-[9.5px] font-mono uppercase tracking-[0.32em] leading-none"
                      style={{ color: `rgba(${TINT}, 0.8)` }}
                    >
                      AI · Guide
                    </p>
                    <h3 className="mt-1.5 text-lg sm:text-xl font-light tracking-tight text-foreground leading-none">
                      Ask{" "}
                      <span className="font-serif italic font-normal text-white">
                        {ASSISTANT_NAME}
                      </span>
                    </h3>
                    <p className="mt-1.5 text-[11.5px] text-muted-foreground/60 leading-snug">
                      On-site guide to David — trained on his own bio.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {messages.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={reset}
                      whileHover={{ scale: 1.08, rotate: -18 }}
                      whileTap={{ scale: 0.92 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground/70 transition-colors duration-200 hover:text-foreground hover:border-white/20"
                      aria-label="Clear conversation"
                      title="Clear"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground/70 transition-colors duration-200 hover:text-foreground hover:border-white/20"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* ── Suggestion chips ── */}
              <div className="relative px-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: `rgba(${TINT}, 0.15)` }}
                  />
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.32em]"
                    style={{ color: `rgba(${TINT}, 0.55)` }}
                  >
                    Suggested
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: `rgba(${TINT}, 0.15)` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.04, ease }}
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] text-foreground/85 transition-colors duration-200 cursor-default"
                      style={{
                        borderColor: `rgba(${TINT}, 0.22)`,
                        backgroundColor: `rgba(${TINT}, 0.08)`,
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ── Messages ── */}
              <div
                ref={messagesRef}
                className="relative mt-4 flex max-h-64 sm:max-h-80 flex-col gap-2.5 overflow-y-auto overscroll-contain px-5 py-2 pr-3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: `rgba(${TINT},0.35) transparent`,
                  overscrollBehavior: "contain",
                }}
              >
                {messages.map((m, i) => {
                  const isUser = m.sender === "user";
                  return (
                    <motion.div
                      key={`${i}-${m.sender}`}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.24, ease }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          isUser ? "text-white" : "text-foreground/92 border"
                        }`}
                        style={
                          isUser
                            ? {
                                background: `linear-gradient(135deg, rgba(${TINT},0.85), rgba(${TINT},0.65))`,
                                boxShadow: `0 8px 24px -8px rgba(${TINT},0.55)`,
                              }
                            : {
                                borderColor: `rgba(${TINT}, 0.14)`,
                                backgroundColor: "rgba(255,255,255,0.03)",
                              }
                        }
                      >
                        {m.sender === "bot" ? renderWithLinks(m.text) : m.text}
                      </div>
                    </motion.div>
                  );
                })}

                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div
                      className="flex items-center gap-1.5 rounded-2xl border px-3.5 py-2.5"
                      style={{
                        borderColor: `rgba(${TINT}, 0.14)`,
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: `rgba(${TINT}, 0.75)` }}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={anchorRef} />
              </div>

              {/* ── Input ── */}
              <form onSubmit={onSubmit} className="relative px-5 py-4 pt-3">
                <div
                  className="flex items-center gap-1.5 rounded-full border pl-4 pr-1.5 py-1 transition-colors duration-200 focus-within:border-white/25"
                  style={{
                    borderColor: `rgba(${TINT}, 0.2)`,
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about David…"
                    aria-label="Ask about David"
                    className="flex-1 bg-transparent text-[13px] text-foreground/95 placeholder:text-muted-foreground/45 py-2 focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || thinking}
                    whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-opacity duration-200 disabled:opacity-40"
                    style={{
                      background: `linear-gradient(135deg, rgba(${TINT},0.95), rgba(${TINT},0.72))`,
                      boxShadow: input.trim() ? `0 6px 18px -6px rgba(${TINT},0.7)` : "none",
                    }}
                    aria-label="Send"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
                <p className="mt-2 text-center text-[9.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground/35">
                  Press enter · Esc to close
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Launcher ── */}
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border text-white shadow-xl transition-shadow duration-200 focus-visible:outline-none"
          style={{
            borderColor: `rgba(${TINT}, 0.35)`,
            background: `linear-gradient(135deg, rgba(${TINT},0.9) 0%, rgba(${TINT},0.6) 60%, rgba(20,20,24,0.92) 120%)`,
            boxShadow: `0 10px 32px -8px rgba(${TINT},0.55)`,
          }}
          aria-label={open ? "Close David's AI guide" : "Open David's AI guide"}
        >
          {/* Idle pulse ring */}
          {!open && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid rgba(${TINT}, 0.5)` }}
              animate={{ scale: [1, 1.25, 1.25], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </motion.div>

          {/* Notification dot when closed and fresh session */}
          {!open && !greeted && (
            <motion.span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
