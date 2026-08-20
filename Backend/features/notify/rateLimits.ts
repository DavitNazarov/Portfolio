import { createRateLimit } from "../../middleware/rateLimit.middleware.js";

// Keyed on req.ip, which Express derives from the trusted proxy hop count set
// in app/middleware.ts. The X-Forwarded-For value read by clientIp() is
// caller-controlled and would let anyone bypass these limits by rotating it.
const ipKey = (req: { ip?: string }) => req.ip ?? "unknown";

export const visitLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many visit notifications",
  keyGenerator: ipKey,
});

export const chatLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: "Too many chat notifications",
  keyGenerator: ipKey,
});

export const contactLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many contact form submissions. Please try again later.",
  keyGenerator: ipKey,
});
