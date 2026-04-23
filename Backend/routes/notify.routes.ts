import { Router, Request } from "express";
import { createRateLimit } from "../middleware/rateLimit.middleware.js";
import {
  sendVisitNotification,
  sendChatNotification,
  isMailerConfigured,
} from "../lib/mailer.js";
import * as r from "../lib/response.js";

const router = Router();

function clientIp(req: Request): string | undefined {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return fwd.split(",")[0]?.trim();
  }
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0];
  return req.ip;
}

function clip(value: unknown, max = 500): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) + "…" : trimmed;
}

/* Per-IP rate limits — prevents a single visitor from spamming the inbox. */
const visitLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many visit notifications",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});

const chatLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: "Too many chat notifications",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});

router.post("/visit", visitLimiter, async (req, res) => {
  if (!isMailerConfigured()) {
    return r.sendSuccess(res, 200, "Mailer not configured; visit ignored.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const result = await sendVisitNotification({
    ip: clientIp(req),
    userAgent: clip(req.headers["user-agent"], 400),
    referrer: clip(body.referrer ?? req.headers.referer, 400),
    path: clip(body.path, 200),
    locale: clip(body.locale, 60),
  });

  if ("skipped" in result && result.skipped) {
    return r.sendSuccess(res, 200, "Mailer skipped");
  }
  if ("ok" in result && !result.ok) {
    return r.serverError(res, "Failed to send notification");
  }
  return r.sendSuccess(res, 200, "Notification sent");
});

router.post("/chat", chatLimiter, async (req, res) => {
  if (!isMailerConfigured()) {
    return r.sendSuccess(res, 200, "Mailer not configured; chat event ignored.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const result = await sendChatNotification({
    ip: clientIp(req),
    userAgent: clip(req.headers["user-agent"], 400),
    referrer: clip(body.referrer ?? req.headers.referer, 400),
    path: clip(body.path, 200),
    locale: clip(body.locale, 60),
    message: clip(body.message, 600),
  });

  if ("skipped" in result && result.skipped) {
    return r.sendSuccess(res, 200, "Mailer skipped");
  }
  if ("ok" in result && !result.ok) {
    return r.serverError(res, "Failed to send notification");
  }
  return r.sendSuccess(res, 200, "Notification sent");
});

export default router;
