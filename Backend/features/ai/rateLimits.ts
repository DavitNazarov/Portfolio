import { createRateLimit } from "../../middleware/rateLimit.middleware.js";

export const aiChatLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 25,
  message: "Too many AI chat messages. Please try again in a few minutes.",
  keyGenerator: (req) => req.ip ?? "anon",
});
