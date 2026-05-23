import { createRateLimit } from "../../middleware/rateLimit.middleware.js";
import { clientIp } from "./utils/requestMeta.js";

export const visitLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many visit notifications",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});

export const chatLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: "Too many chat notifications",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});

export const contactLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many contact form submissions. Please try again later.",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});
