const INTRO_VARIANTS = [
  "",
  "Short version: ",
  "In plain terms: ",
  "The clean read: ",
  "Quick take: ",
];

const CLOSING_VARIANTS = [
  "",
  "",
  " That is the useful signal here.",
  " That is the part worth remembering.",
  " Pretty strong profile for an early-career builder.",
];

const PHRASE_SWAPS = [
  ["Davit is", "Davit comes across as"],
  ["Dave is", "Dave comes across as"],
  ["His main projects are", "The headline projects are"],
  ["His personal work is", "His own work leans toward"],
  ["Front-end is where", "Front-end is the area where"],
  ["On the back-end", "For back-end work"],
  ["Timeline:", "The rough timeline:"],
  ["For serious", "For real"],
  ["the cleanest route is email", "email is the cleanest route"],
  ["All his public work lives at", "You can find his public work at"],
  ["The site you're on.", "This portfolio itself is part of the work."],
  ["Built with", "It is built with"],
  ["Features:", "It includes"],
  ["Stack:", "The stack is"],
  ["Source:", "Source lives at"],
  ["Live:", "Live version:"],
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function splitSentences(answer) {
  return answer
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function rotateSentences(sentences) {
  if (sentences.length < 3) return sentences;
  const [first, ...rest] = sentences;
  const pivot = Math.floor(Math.random() * rest.length);
  return [rest[pivot], first, ...rest.filter((_, index) => index !== pivot)];
}

function swapPhrases(answer) {
  return PHRASE_SWAPS.reduce((current, [from, to]) => {
    if (!current.includes(from) || Math.random() < 0.45) return current;
    return current.replace(from, to);
  }, answer);
}

export function paraphraseAnswer(answer) {
  const sentences = rotateSentences(splitSentences(answer));
  const body = swapPhrases(sentences.join(" "));
  const intro = randomItem(INTRO_VARIANTS);
  const closing = Math.random() < 0.35 ? randomItem(CLOSING_VARIANTS) : "";

  return `${intro}${body}${closing}`.trim();
}
