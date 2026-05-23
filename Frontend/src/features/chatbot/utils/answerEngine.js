import {
  ASSISTANT_NAME,
  CHATBOT_FALLBACKS,
  CHATBOT_POLITE_REPLIES,
} from "@/features/chatbot/constants/chatbot";
import { KNOWLEDGE_BASE } from "@/features/chatbot/data/knowledgeBase";
import { paraphraseAnswer } from "@/features/chatbot/utils/paraphraseAnswer";

const INDEX = KNOWLEDGE_BASE.map((entry) => ({
  ...entry,
  phrases: entry.phrases.map((phrase) => phrase.toLowerCase()),
  keywords: entry.keywords.map((keyword) => keyword.toLowerCase()),
}));

const INTENT_PATTERNS = {
  greeting: /\b(hi|hello|hey|hola|yo|good\s+(morning|afternoon|evening)|greetings)\b/,
  thanks: /\b(thank|thanks|thx|ty|appreciate|awesome|perfect|great|nice|cool)\b/,
  bye: /\b(bye|goodbye|see\s+you|cya|later|farewell)\b/,
};

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
  const answer = KNOWLEDGE_BASE.find((entry) => entry.id === id)?.answer;
  return answer ? paraphraseAnswer(answer) : null;
}

function keywordRegex(keyword) {
  return new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
}

function scoreEntry(entry, text) {
  let score = 0;
  for (const phrase of entry.phrases) {
    if (text.includes(phrase)) score += 3;
  }
  for (const keyword of entry.keywords) {
    if (keywordRegex(keyword).test(text)) score += 1;
  }
  return score;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function findBestAnswer(raw) {
  const text = normalizeQuery(raw);
  if (!text) return null;

  if (INTENT_PATTERNS.thanks.test(text)) return paraphraseAnswer(randomItem(CHATBOT_POLITE_REPLIES));
  if (INTENT_PATTERNS.greeting.test(text)) {
    return paraphraseAnswer(
      `Hey — I'm ${ASSISTANT_NAME}, Davit's on-site portfolio helper. Ask me anything about his work, stack, or projects.`
    );
  }
  if (INTENT_PATTERNS.bye.test(text)) {
    return paraphraseAnswer("Catch you later. Close me anytime — I'll be here when you come back.");
  }

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
    const score = scoreEntry(entry, text);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (best && bestScore >= 1) return paraphraseAnswer(best.answer);
  return paraphraseAnswer(randomItem(CHATBOT_FALLBACKS));
}
