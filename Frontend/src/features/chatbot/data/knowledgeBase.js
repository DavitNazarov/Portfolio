import { QUICK_FACTS } from "@/features/chatbot/data/quickFacts";

export const KNOWLEDGE_BASE = [
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
