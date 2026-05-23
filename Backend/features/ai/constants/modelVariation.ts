const RESPONSE_ANGLES = [
  "lead with the strongest recruiter signal, then add one concrete detail",
  "start conversationally, then give the practical facts",
  "open with the human story, then connect it back to product work",
  "answer like a sharp portfolio guide: direct, warm, and specific",
  "use a slightly different sentence rhythm from the previous assistant replies",
];

const RESPONSE_TONES = [
  "confident and compact",
  "warm and precise",
  "calm, clever, and useful",
  "friendly with one light human touch",
  "recruiter-friendly and concrete",
];

function randomItem(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function responseVariationPrompt() {
  const seed = Math.random().toString(36).slice(2, 8);

  return [
    "Response variation for this exact answer:",
    `- Variation seed: ${seed}.`,
    `- Angle: ${randomItem(RESPONSE_ANGLES)}.`,
    `- Tone: ${randomItem(RESPONSE_TONES)}.`,
    "- Preserve facts exactly, especially dates, links, roles, awards, schools, project names, and technologies.",
    "- Make the wording feel fresh compared with prior assistant messages in the conversation.",
  ].join("\n");
}
