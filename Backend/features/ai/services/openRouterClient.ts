import { config } from "../../../config.js";
import { responseVariationPrompt } from "../constants/modelVariation.js";
import { systemPrompt } from "../prompts/systemPrompt.js";
import type { ChatHistoryItem } from "../types/chat.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type OpenRouterPayload = {
  error?: { message?: string };
  choices?: Array<{ message?: { content?: string } }>;
};

type GenerateAtlasAnswerOptions = {
  context: string;
  history: ChatHistoryItem[];
  message: string;
};

export class OpenRouterError extends Error {
  constructor(
    public readonly statusCode: number,
    message = "Atlas AI is temporarily unavailable."
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}

export class EmptyModelAnswerError extends Error {
  constructor() {
    super("AI model returned an empty answer.");
    this.name = "EmptyModelAnswerError";
  }
}

export async function generateAtlasAnswer({ context, history, message }: GenerateAtlasAnswerOptions) {
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
        { role: "system", content: responseVariationPrompt() },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.9,
      top_p: 0.92,
      frequency_penalty: 0.35,
      presence_penalty: 0.2,
      max_tokens: 420,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as OpenRouterPayload;

  if (!response.ok) {
    const detail = data.error?.message ?? "OpenRouter request failed.";
    console.error("OpenRouter returned an error:", detail);
    throw new OpenRouterError(response.status >= 500 ? 502 : response.status);
  }

  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new EmptyModelAnswerError();

  return {
    answer,
    model: config.openRouterModel,
  };
}
