import type { Request, Response } from "express";
import { config } from "../../../config.js";
import * as r from "../../../lib/response.js";
import { clipMessage, normalizeHistory } from "../utils/chatInput.js";
import { portfolioContext } from "../services/portfolioContext.js";
import {
  EmptyModelAnswerError,
  generateAtlasAnswer,
  OpenRouterError,
} from "../services/openRouterClient.js";

export async function chatHandler(req: Request, res: Response) {
  if (!config.openRouterApiKey) {
    return r.sendError(res, 503, "AI chat is not configured yet. OPENROUTER_API_KEY is missing on the server.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const message = clipMessage(body.message);
  if (!message) return r.badRequest(res, "Message is required.");

  try {
    const context = await portfolioContext();
    const result = await generateAtlasAnswer({
      context,
      history: normalizeHistory(body.history),
      message,
    });

    return r.sendSuccess(res, 200, "AI response generated", result);
  } catch (error) {
    if (error instanceof OpenRouterError) {
      return r.sendError(res, error.statusCode, error.message);
    }
    if (error instanceof EmptyModelAnswerError) {
      return r.serverError(res, error.message);
    }

    console.error("OpenRouter chat error", error);
    return r.serverError(res, "AI chat is temporarily unavailable. Please try again later.");
  }
}
