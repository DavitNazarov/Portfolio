import { createRateLimit } from "../../middleware/rateLimit.middleware.js";
import { normalizeEmail } from "./utils/credentials.js";

function emailRateLimitKey(req: { ip?: string; body?: { email?: unknown } }) {
  return `${req.ip ?? "unknown"}:${normalizeEmail(req.body?.email)}`;
}

export const loginRateLimit = createRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again in a minute.",
  keyGenerator: emailRateLimitKey,
});

export const registerRateLimit = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many registration attempts. Please try again later.",
  keyGenerator: emailRateLimitKey,
});
