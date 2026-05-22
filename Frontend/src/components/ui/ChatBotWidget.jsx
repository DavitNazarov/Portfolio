import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, RotateCcw, Send } from "lucide-react";
import { trackChatOpen, trackChatMessage } from "@/lib/notify";
import { apiPublic } from "@/lib/api";

/* ──────────────────────────────────────────────────────────────────
 *  Davit's AI portfolio guide — "Atlas"
 *  Uses the backend OpenRouter proxy with live portfolio data, with a
 *  lightweight local fallback when the AI service is unavailable.
 * ──────────────────────────────────────────────────────────────── */

const ASSISTANT_NAME = "Atlas";
const TINT = "167, 139, 250"; // violet — matches the Contact section
const ease = [0.16, 1, 0.3, 1];

const SUGGESTIONS = [
  "Who is Dave?",
  "Geo Wushu",
  "Austria plan",
  "Tech stack",
  "Why hire him?",
];

const QUICK_FACTS = {
  identity:
    "Davit Nazarov, usually Dave, is an 18-year-old Georgian developer and national-team Wushu athlete from Tbilisi. He builds with JavaScript/TypeScript, has junior front-end experience from SoftGen Group, and is preparing to move to Klagenfurt, Austria for FH Karnten in September 2026.",
  athlete:
    "Dave is on Georgia's national Wushu team. He is a 2024 European Champion in Wushu Light Sanda, has multiple Georgian national titles, earned a Traditional EU Championship medal in 2025, and competed at the 20th European Wushu Championship in Lyon in May 2026.",
  austria:
    "Austria is the big next chapter: Dave has been accepted to FH Karnten for Information Technologies, Network and Communication Engineering, starting September 14, 2026. He is preparing for Klagenfurt, residence permit paperwork, accommodation, scholarships, and German.",
  work:
    "Dave's latest listed job is Junior Front-End Developer at SoftGen Group. Atlas treats a role as current only when its period says Present; otherwise it is shown as previous/last experience.",
  stack:
    "Dave's core stack is JavaScript/TypeScript: React 19, Next.js, NestJS, Prisma, PostgreSQL, Socket.IO, plus Node/Express and MongoDB when the project calls for it. He likes building real product systems, not just pretty screens.",
  projects:
    "His main projects are Geo Wushu Competition System, Movie Hub, and this Portfolio. Geo Wushu is the serious one: a real tournament-management platform for the Georgian Wushu Federation, built with a NestJS monorepo and Next.js App Router. His personal work is the useful stuff: product flows, API integration, dashboards, auth, realtime features, and UI polish.",
  contact:
    "Email: nazarov.davit17@gmail.com · LinkedIn: linkedin.com/in/davit-nazarov-366b77389 · GitHub: github.com/DavitNazarov · Instagram: @nazarovdati_. Fastest route: email. Old-school, but undefeated.",
  hiring:
    "Dave is a strong early-career frontend/full-stack bet: he has SoftGen experience, ships API-backed projects, has polished UI taste, and brings athlete-level discipline from Wushu. He is still growing, but he already ships more than a normal junior portfolio suggests.",
  personality:
    "Dave is direct, practical, and fast-moving. He likes short answers, catches mistakes quickly, trains seriously, codes for fun, and thinks long-term about Austria, career growth, and building a life in Europe.",
  workingStyle:
    "Dave works practically: define the user flow, connect the API early, cover loading/success/error states, then polish responsive UI. He likes short feedback loops, real data, and manual checks instead of trusting pretty code blindly.",
  aiWorkflow:
    "Dave uses AI for planning, copy, debugging ideas, code review, and studying, but he manually checks facts, API contracts, responsive behavior, and final code. AI as a power tool, not autopilot.",
};

function toAiHistory(items) {
  return items
    .filter((item) => item.sender === "user" || item.sender === "bot")
    .slice(-8)
    .map((item) => ({
      role: item.sender === "user" ? "user" : "assistant",
      content: item.text,
    }));
}

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
    phrases: [
      "who is davit",
      "who is dave",
      "who is dati",
      "who is david",
      "who is nazarov",
      "about davit",
      "about dave",
      "about david",
      "who are you",
      "introduce yourself",
      "your name",
    ],
    keywords: ["bio", "introduce", "identity", "davit", "dave", "dati", "david", "nazarov"],
    answer: QUICK_FACTS.identity,
  },
  {
    id: "age",
    phrases: ["how old", "what age", "date of birth", "birthday"],
    keywords: ["age", "old", "born", "birth"],
    answer:
      "Davit is 18 years old — born December 17, 2007. Young, yes; suspiciously busy, also yes.",
  },
  {
    id: "location",
    phrases: ["where is he from", "where does he live", "what country", "based in"],
    keywords: ["location", "country", "georgia", "tbilisi", "austria", "klagenfurt"],
    answer:
      "Davit is based in Tbilisi, Georgia. His next big move is Klagenfurt, Austria, where he plans to start at FH Karnten in September 2026.",
  },
  {
    id: "languages",
    phrases: ["what languages", "does he speak"],
    keywords: ["languages", "speak", "english", "russian", "georgian"],
    answer:
      "Davit speaks Georgian (native), English, and Russian — fluent across all three, comfortable in international teams.",
  },
  {
    id: "sports",
    phrases: ["does he do sports", "martial arts", "national team", "wushu champion", "european champion"],
    keywords: ["athlete", "sport", "sports", "wushu", "sanda", "champion", "medal", "competition"],
    answer: QUICK_FACTS.athlete,
  },
  {
    id: "austria-plan",
    phrases: [
      "austria plan",
      "moving to austria",
      "move to austria",
      "klagenfurt",
      "fh karnten",
      "carinthia university",
      "student residence permit",
    ],
    keywords: ["austria", "klagenfurt", "karnten", "carinthia", "relocation", "german", "scholarship", "residence", "permit"],
    answer: QUICK_FACTS.austria,
  },

  /* ── Work ─────────────────────────────────────── */
  {
    id: "current-status",
    phrases: [
      "where does he work",
      "current job",
      "current role",
      "where is davit working",
      "where is dave working",
      "where is david working",
      "present role",
      "working right now",
      "does he have a job",
    ],
    keywords: ["job", "work", "company", "employer"],
    answer: QUICK_FACTS.work,
  },
  {
    id: "past-softgen",
    phrases: ["softgen", "soft gen", "soft-gen", "last company", "previous company"],
    keywords: [],
    answer: QUICK_FACTS.work,
  },
  {
    id: "past-hey-guide",
    phrases: ["hey guide", "heyguide", "startup company", "2024 job", "travel startup"],
    keywords: [],
    answer:
      "Through 2024, Davit was a Front-End Developer at Hey Guide (a travel startup), collaborating with backend engineers to integrate APIs and shipping travel offer flows + full auth. Stack: React, Tailwind, Framer Motion, GitHub.",
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
      "Across roles, Davit has owned front-end logic end-to-end: turning product specs into React flows, integrating REST APIs, wiring up auth (JWT), shipping design-grade UI with Tailwind + Framer Motion, and collaborating closely with back-end and design.",
  },
  {
    id: "career",
    phrases: ["career", "experience", "timeline", "background"],
    keywords: ["journey"],
    answer:
      "Timeline: self-taught front-end from his early teens -> front-end project work in 2024/2025 -> Junior Front-End Developer at SoftGen Group as the latest listed role. In parallel: IT at SEU, accepted to FH Karnten in Austria for September 2026, and building projects like Geo Wushu and Movie Hub.",
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
      "For serious front-end, full-stack, freelance, or collaboration opportunities, the cleanest route is email: nazarov.davit17@gmail.com. His latest listed job is SoftGen; a role counts as current only when the period says Present.",
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
      "Davit is finishing his 1st year, 2nd semester in Information Technologies at Georgian National University SEU. He has also been accepted to FH Karnten in Austria for Information Technologies, Network and Communication Engineering, starting September 14, 2026.",
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
    answer: QUICK_FACTS.stack,
  },
  {
    id: "frontend-strength",
    phrases: ["frontend strength", "front-end skills", "ui skills"],
    keywords: ["frontend", "front-end", "ui", "ux", "interface"],
    answer:
      "Front-end is where Davit spends most of his time: React-heavy SPAs with a strong emphasis on motion, micro-interactions, responsive systems, accessibility, and design-grade polish.",
  },
  {
    id: "backend-strength",
    phrases: ["backend skills", "server side", "api skills"],
    keywords: ["backend", "api", "server", "node", "express", "nestjs"],
    answer:
      "On the back-end, Davit builds REST and realtime APIs with Node/Express and NestJS, handles auth with JWT, and models data in MongoDB (Mongoose) or PostgreSQL via Prisma.",
  },

  /* ── Projects ─────────────────────────────────── */
  {
    id: "projects-overview",
    phrases: ["what has he built", "what projects", "his projects", "show projects"],
    keywords: ["projects", "portfolio", "work-samples"],
    answer: QUICK_FACTS.projects,
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
    id: "project-geo-wushu",
    phrases: [
      "geo wushu",
      "wushu system",
      "competition system",
      "tournament system",
      "georgian wushu federation",
    ],
    keywords: ["tournament", "federation", "competition"],
    answer:
      "Geo Wushu Competition System is Dave's strongest case: a real tournament-management platform for the Georgian Wushu Federation. It uses a NestJS monorepo, Next.js App Router, PostgreSQL, Prisma, Socket.IO, JWT, Tailwind, Framer Motion, and Docker. Dave's part is the full product flow: admin/dashboard logic, API-connected UI, auth, realtime competition features, and making it usable for real federation work.",
  },

  /* ── Personal / hiring signal ─────────────────── */
  {
    id: "hiring-signal",
    phrases: ["why hire him", "should we hire him", "is he good", "strong candidate", "candidate"],
    keywords: ["hire", "hiring", "strength", "strong", "candidate", "recruiter"],
    answer: QUICK_FACTS.hiring,
  },
  {
    id: "personality",
    phrases: ["what is he like", "personality"],
    keywords: ["personality", "style", "direct", "practical", "discipline"],
    answer: QUICK_FACTS.personality,
  },
  {
    id: "working-style",
    phrases: ["working style", "how does he work", "approach to tasks", "task approach", "debugging approach"],
    keywords: ["process", "workflow", "approach", "debugging", "testing", "manual"],
    answer: QUICK_FACTS.workingStyle,
  },
  {
    id: "ai-workflow",
    phrases: ["how does he use ai", "ai workflow", "ai tools", "what ai"],
    keywords: ["ai", "claude", "chatgpt", "openrouter", "manual", "review"],
    answer: QUICK_FACTS.aiWorkflow,
  },
  {
    id: "project-auth",
    phrases: ["auth system", "authentication project"],
    keywords: ["authentication"],
    answer:
      "MERN Auth (2025) — a reusable authentication system (JWT, refresh tokens, role-based access) that Davit drops into other projects. Source: https://github.com/DavitNazarov/Auth",
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
    answer: QUICK_FACTS.contact,
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
  "Ask me about Dave's developer work, Wushu background, Austria plan, stack, projects, or contact info.",
  "I know Dave's SoftGen role, Geo Wushu project, FH Karnten plan, sport background, and tech stack — give me a direction.",
  "I missed the intent there. Try: Geo Wushu, Austria plan, SoftGen, Wushu titles, stack, or contact.",
];

const POLITE = [
  "Happy to help. Anything else about Davit?",
  "Glad that landed. Want to dig into his projects or stack next?",
  "Anytime — I can keep going if you have more.",
];

function normalizeQuery(value) {
  return value
    .toLowerCase()
    .replace(/\bdave\b/g, "davit")
    .replace(/\bdavid\b/g, "davit")
    .replace(/\bdati\b/g, "davit")
    .replace(/\s+/g, " ")
    .trim();
}

function answerById(id) {
  return KB.find((entry) => entry.id === id)?.answer ?? null;
}

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
  const text = normalizeQuery(raw);
  if (!text) return null;

  if (RX.thanks.test(text)) return POLITE[Math.floor(Math.random() * POLITE.length)];
  if (RX.greeting.test(text))
    return `Hey — I'm ${ASSISTANT_NAME}, Davit's on-site portfolio helper. Ask me anything about his work, stack, or projects.`;
  if (RX.bye.test(text))
    return "Catch you later. Close me anytime — I'll be here when you come back.";

  if (/\b(who|about|bio|introduce)\b/.test(text) && /\b(davit|nazarov|him|he)\b/.test(text)) {
    return answerById("identity");
  }
  if (/\b(geo\s*wushu|wushu\s+system|competition\s+system|tournament\s+system|georgian\s+wushu\s+federation)\b/.test(text)) {
    return answerById("project-geo-wushu");
  }
  if (/\b(wushu|sanda|athlete|sport|sports|champion|medal|competition|national\s+team)\b/.test(text)) {
    return answerById("sports");
  }
  if (/\b(austria|klagenfurt|fh\s+karnten|carinthia|relocat|german|residence|permit|scholarship)\b/.test(text)) {
    return answerById("austria-plan");
  }
  if (/\b(why\s+hire|should\s+.*hire|candidate|recruiter|strength|worth\s+hiring)\b/.test(text)) {
    return answerById("hiring-signal");
  }
  if (/\b(how\s+.*work|working\s+style|approach|process|debugging|testing|manual\s+checks?)\b/.test(text)) {
    return answerById("working-style");
  }
  if (/\b(ai|openrouter|claude|chatgpt|manual\s+review)\b/.test(text)) {
    return answerById("ai-workflow");
  }
  if (/\b(personality|what\s+is\s+he\s+like|direct|practical|discipline)\b/.test(text)) {
    return answerById("personality");
  }
  if (/\b(education|study|student|university|seu|degree)\b/.test(text)) {
    return answerById("education");
  }
  if (/\b(work|working|job|role|available|availability|hire|softgen)\b/.test(text)) {
    return answerById("current-status");
  }
  if (/\b(stack|skills|tools|technologies|tech)\b/.test(text)) {
    return answerById("stack");
  }
  if (/\b(moviehub|movie\s+hub|movie\s+app|moviedb)\b/.test(text)) {
    return answerById("project-moviehub");
  }
  if (/\b(weather|openweathermap)\b/.test(text)) {
    return answerById("project-weather");
  }
  if (/\b(auth|authentication)\b/.test(text)) {
    return answerById("project-auth");
  }
  if (/\b(this\s+(website|site|portfolio)|portfolio\s+website)\b/.test(text)) {
    return answerById("project-portfolio");
  }
  if (/\b(project|built|build|portfolio)\b/.test(text)) {
    return answerById("projects-overview");
  }
  if (/\b(github|repositories|repos|source\s+code)\b/.test(text)) {
    return answerById("github");
  }
  if (/\b(contact|email|reach|linkedin|github|instagram)\b/.test(text)) {
    return answerById("contact");
  }

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
      const href = part.replace(/[.,)]$/, "");
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/25 underline-offset-2 transition-colors duration-200 hover:decoration-white/80"
          style={{ color: `rgb(${TINT})` }}
        >
          {href}
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

  const greeting = useMemo(
    () =>
      `Hey — I'm ${ASSISTANT_NAME}, Davit's AI portfolio helper. I read the live portfolio data before answering, so ask me anything about his work, stack, or projects.`,
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

  /* Contain wheel + touch scrolling inside the panel.
     The page sits behind a fixed widget, so we manually scroll the message
     region whenever the gesture starts inside it. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const scroller = messagesRef.current;
    if (!panel) return;

    const scrollMessages = (deltaY) => {
      if (!scroller) return false;
      if (scroller.scrollHeight <= scroller.clientHeight) return false;
      scroller.scrollTop = Math.max(
        0,
        Math.min(scroller.scrollTop + deltaY, scroller.scrollHeight - scroller.clientHeight)
      );
      return true;
    };

    const onWheel = (e) => {
      if (!panel.contains(e.target)) return;
      scrollMessages(e.deltaY);
      e.preventDefault();
      e.stopPropagation();
    };

    let lastTouchY = 0;
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? 0;
      const deltaY = lastTouchY - y;
      lastTouchY = y;
      if (!panel.contains(e.target)) return;
      scrollMessages(deltaY);
      e.preventDefault();
      e.stopPropagation();
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

  const send = useCallback(async (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setInput("");
    const history = messages;
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setThinking(true);
    trackChatMessage(trimmed);

    try {
      const response = await apiPublic("/api/ai/chat", {
        method: "POST",
        body: {
          message: trimmed,
          history: toAiHistory(history),
        },
      });
      const answer = response.answer?.trim() || "I had the thought, then dropped it. Try me again?";
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    } catch (error) {
      const fallback = findBestAnswer(trimmed) ?? FALLBACK[0];
      console.warn("Atlas AI fallback used:", error.message);
      setMessages((prev) => [...prev, { sender: "bot", text: fallback }]);
    } finally {
      setThinking(false);
    }
  }, [messages]);

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const reset = () => {
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
              className="mb-4 relative flex h-[min(82dvh,44rem)] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-[1.6rem] border backdrop-blur-xl shadow-2xl sm:h-[min(86dvh,46rem)] sm:w-[26rem]"
              style={{
                borderColor: `rgba(${TINT}, 0.2)`,
                background: `linear-gradient(155deg, rgba(${TINT}, 0.08) 0%, rgba(20,20,24,0.92) 45%, rgba(8,8,10,0.96) 100%)`,
              }}
              role="dialog"
              aria-label="Davit's portfolio guide"
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
                      Portfolio · Helper
                    </p>
                    <h3 className="mt-1.5 text-lg sm:text-xl font-light tracking-tight text-foreground leading-none">
                      Ask{" "}
                      <span className="font-serif italic font-normal text-white">
                        {ASSISTANT_NAME}
                      </span>
                    </h3>
                    <p className="mt-1.5 text-[11.5px] text-muted-foreground/60 leading-snug">
                      OpenRouter-powered, using live portfolio data.
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
                className="chatbot-messages relative mt-4 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-5 py-2 pr-3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: `rgba(${TINT},0.35) transparent`,
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
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
                    placeholder="Ask about Davit…"
                    aria-label="Ask about Davit"
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
          aria-label={open ? "Close Davit's portfolio guide" : "Open Davit's portfolio guide"}
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
