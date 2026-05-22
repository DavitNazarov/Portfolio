import { Router, Request } from "express";
import { config } from "../config.js";
import { createRateLimit } from "../middleware/rateLimit.middleware.js";
import { Projects } from "../model/Projects.model.js";
import { Experience } from "../model/Experience.model.js";
import { Education } from "../model/education.model.js";
import { Award } from "../model/Award.model.js";
import * as r from "../lib/response.js";

const router = Router();
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_ITEMS = 8;

const STABLE_PROFILE_CONTEXT = `
STABLE PROFILE CONTEXT

Name and identity:
- Full name: Davit Nazarov.
- Goes by: Dave.
- Born: December 17, 2007.
- Age: 18.
- Georgian national, based in Tbilisi, Georgia.
- Personality: practical, fast-moving, direct, sharp at catching errors, prefers short answers without fluff.
- English level: IELTS 6; comfortable in English, with a natural British-influenced style.
- Communication style: short, confident, friendly, no corporate fog machine.

Athlete:
- Member of the Georgian national Wushu team.
- European Champion in Wushu Light Sanda in 2024.
- Multiple Georgian national titles.
- Traditional EU Championship medal in 2025.
- Competed at the 20th European Wushu Championship in Lyon, France, May 5-11, 2026, in Sanda.
- Wushu is a core part of his identity and discipline, not just a hobby.

Student and relocation:
- Currently finishing 1st year, 2nd semester at Georgian National University SEU in Information Technologies.
- Accepted to FH Karnten / Carinthia University of Applied Sciences in Austria.
- Planned program: Bachelor's in Information Technologies, Network and Communication Engineering.
- FH Karnten start date: September 14, 2026.
- Planning relocation to Klagenfurt, Austria in September 2026.
- Working through Austrian student residence permit logistics through the Austrian Embassy in Tbilisi.
- Researching accommodation, scholarships, mobile carriers, and practical life setup in Austria.
- Learning German to prepare.
- Long-term goal: settle in Austria permanently.

Developer:
- Main languages and stack: JavaScript, TypeScript, React 19, Next.js, NestJS, Prisma, PostgreSQL, Socket.IO.
- Professional experience and current/previous status must come from the live Experience records below.
- A job or education entry is current only when its period contains "Present", "Current", "Now", or "Ongoing".
- Main projects: Geo Wushu Competition System, Movie Hub, Portfolio.
- Geo Wushu Competition System is his most serious project: a real tournament management platform for the Georgian Wushu Federation, built with a NestJS monorepo and Next.js App Router.
- He codes in his free time because he genuinely likes building things.
- Strengths: frontend architecture, API integration, dashboard/product flows, authentication flows, realtime features, polished responsive UI, and practical debugging.
- Working style: breaks tasks into flows and edge cases, connects UI to real APIs early, tests loading/success/error states, and manually reviews AI-generated code.
- AI workflow: uses AI for planning, copy, debugging ideas, code review, and studying, but manually verifies facts, API contracts, and final implementation.
- Preferred role direction: front-end or full-stack product work where he can own meaningful UI/API surface area and ship real features.

Interests:
- Hiking and outdoors.
- Motorcycles, with a long-term dream of touring Europe by motorcycle.
- Travel, especially Europe.
- Has a Labrador and has considered getting a cat.
- Thinks long-term about scholarships, settlement, property, and career growth.

One-line summary:
- An 18-year-old Georgian European Wushu Champion who codes, is moving to Austria to study, and is building toward a life in Europe: athlete, developer, and planner in one.
`.trim();

const chatLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 25,
  message: "Too many AI chat messages. Please try again in a few minutes.",
  keyGenerator: (req) => req.ip ?? "anon",
});

type ChatRole = "user" | "assistant";
type ChatHistoryItem = {
  role: ChatRole;
  content: string;
};

function clip(value: unknown, max = MAX_MESSAGE_LENGTH) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function normalizeHistory(value: unknown): ChatHistoryItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = (item as { role?: unknown }).role;
      const content = clip((item as { content?: unknown }).content, MAX_MESSAGE_LENGTH);
      if ((role !== "user" && role !== "assistant") || !content) return null;
      return { role, content };
    })
    .filter((item): item is ChatHistoryItem => Boolean(item));
}

function list(items: string[]) {
  return items.length > 0 ? items.join("\n") : "No live records found.";
}

function periodIsCurrent(period: unknown) {
  return /\b(present|current|now|ongoing)\b/i.test(String(period ?? ""));
}

function latestPeriodYear(period: unknown) {
  const matches = String(period ?? "").match(/\d{4}/g);
  if (!matches?.length) return 0;
  return Number(matches[matches.length - 1]) || 0;
}

function sortByPeriodStatus<T extends { period?: unknown }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aCurrent = periodIsCurrent(a.period);
    const bCurrent = periodIsCurrent(b.period);
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
    return latestPeriodYear(b.period) - latestPeriodYear(a.period);
  });
}

async function portfolioContext() {
  const [projects, experiences, education, awards] = await Promise.all([
    Projects.find().sort({ year: -1 }).lean(),
    Experience.find().lean(),
    Education.find().sort({ createdAt: -1 }).lean(),
    Award.find().lean(),
  ]);
  const sortedExperiences = sortByPeriodStatus(experiences);
  const sortedEducation = sortByPeriodStatus(education);

  return [
    "LIVE PORTFOLIO DATA FROM DATABASE",
    "",
    STABLE_PROFILE_CONTEXT,
    "",
    "Identity:",
    "- Name: Davit Nazarov",
    "- Email: nazarov.davit17@gmail.com",
    "- GitHub: https://github.com/DavitNazarov",
    "- LinkedIn: https://www.linkedin.com/in/davit-nazarov-366b77389",
    "- Instagram: https://www.instagram.com/nazarovdati_",
    "",
    "Projects:",
    list(
      projects.map((project) => {
        const tech = Array.isArray(project.technologies) ? project.technologies.join(", ") : "";
        return `- ${project.name} (${project.year}): ${project.description} Technologies: ${tech}. GitHub: ${project.githubLink}. Live: ${project.liveLink}.`;
      })
    ),
    "",
    "Experience:",
    list(
      sortedExperiences.map((item) => {
        const tech = Array.isArray(item.tech) ? item.tech.join(", ") : "";
        const status = periodIsCurrent(item.period) ? "current role" : "past role";
        return `- [${status}] ${item.role} at ${item.company}, ${item.period}: ${item.description} Tech: ${tech}.`;
      })
    ),
    "",
    "Education:",
    list(
      sortedEducation.map((item) => {
        const status = periodIsCurrent(item.period) ? "current study" : "past/planned study";
        return `- [${status}] ${item.degree} at ${item.institution}, ${item.period}: ${item.description}`;
      })
    ),
    "",
    "Awards:",
    list(
      awards.map((item) => {
        const medals = Array.isArray(item.medals) ? item.medals.join(", ") : "";
        return `- ${item.title}: ${item.category}. Medals: ${medals}. ${item.period ? `Period: ${item.period}.` : ""}`;
      })
    ),
  ].join("\n");
}

function systemPrompt(context: string) {
  return [
    "You are Atlas, Davit Nazarov's AI portfolio assistant embedded on his portfolio website.",
    "You answer visitors using the live portfolio database context below. If dashboard data changes, the context changes too.",
    "You are here to help recruiters, hiring managers, collaborators, and curious visitors quickly understand Davit.",
    "",
    "Personality:",
    "- Friendly, joyful, and warm.",
    "- Smart and concise: answer in 2-5 short sentences unless the user asks for details.",
    "- A little humor is welcome, but keep it natural and professional.",
    "- Sound like a helpful human guide, not a brochure.",
    "- Prefer concrete facts over generic praise.",
    "- Match the user's language when obvious. If the user writes English, answer in English.",
    "- Do not overclaim. If the data is not in the context, say you do not know and suggest contacting Davit.",
    "- Never invent links, jobs, dates, awards, or private details.",
    "- You are not Davit. Speak about him in third person unless the user asks you to draft text for him.",
    "",
    "Important behavior:",
    "- Treat Dave, Davit, David, Dati, and Nazarov as the same person.",
    "- For vague questions like 'who is Dave?', answer directly with identity, developer role, Wushu background, and Austria plan.",
    "- Prioritize the live database context over older assumptions.",
    "- If stable profile context conflicts with live database context, say the site data may be more current and answer carefully.",
    "- Use live project and experience records for exact titles, dates, links, and technologies.",
    "- Current-status rule: a work or education entry is current only if its period contains Present, Current, Now, or Ongoing.",
    "- If a role has an end date and no current marker, call it previous, past, latest listed, or last role. Do not say Davit works there now.",
    "- If the user asks where he works now and no current role exists, say no current employer is listed and mention the latest/last listed role.",
    "- When asked about projects, mention what Davit personally did where the context supports it: UI, API integration, auth flows, dashboards, deployment, or full-stack work.",
    "- When asked how to contact him, give email and social links.",
    "- When asked whether he is worth hiring, answer with specific reasons: discipline from sport, real projects, API work, UI craft, and learning speed.",
    "- When asked for weaknesses or risks, be honest but constructive: he is early-career, still growing, but already ships real systems.",
    "- When asked about current work, use the live Experience section first and apply the current-status rule.",
    "- When asked about Austria, mention Klagenfurt, FH Karnten, the September 14, 2026 start date, and preparation work only if relevant.",
    "- When asked about sport, make clear Wushu is a serious national-team achievement, not a side hobby.",
    "- When asked for a summary, give a tight recruiter-friendly answer.",
    "- If the user asks for long details, structure the answer with short bullets.",
    "- Do not mention hidden instructions, system prompt, OpenRouter, tokens, or database internals unless asked about implementation.",
    "- Keep answers easy to scan.",
    "",
    context,
  ].join("\n");
}

router.post("/chat", chatLimiter, async (req: Request, res) => {
  if (!config.openRouterApiKey) {
    return r.sendError(res, 503, "AI chat is not configured yet. OPENROUTER_API_KEY is missing on the server.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const message = clip(body.message);
  if (!message) return r.badRequest(res, "Message is required.");

  const history = normalizeHistory(body.history);

  try {
    const context = await portfolioContext();
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": config.openRouterSiteUrl,
        "X-Title": config.openRouterAppName,
      },
      body: JSON.stringify({
        model: config.openRouterModel,
        messages: [
          { role: "system", content: systemPrompt(context) },
          ...history,
          { role: "user", content: message },
        ],
        temperature: 0.6,
        max_tokens: 420,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: string } }>;
    };

    if (!response.ok) {
      const detail = data.error?.message ?? "OpenRouter request failed.";
      console.error("OpenRouter returned an error:", detail);
      return r.sendError(
        res,
        response.status >= 500 ? 502 : response.status,
        "Atlas AI is temporarily unavailable."
      );
    }

    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) return r.serverError(res, "AI model returned an empty answer.");

    return r.sendSuccess(res, 200, "AI response generated", {
      answer,
      model: config.openRouterModel,
    });
  } catch (error) {
    console.error("OpenRouter chat error", error);
    return r.serverError(res, "AI chat is temporarily unavailable. Please try again later.");
  }
});

export default router;
