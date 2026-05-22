import { Router, Request } from "express";
import { createRateLimit } from "../middleware/rateLimit.middleware.js";
import {
  sendVisitNotification,
  sendChatNotification,
  sendContactSubmission,
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

const contactLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many contact form submissions. Please try again later.",
  keyGenerator: (req) => clientIp(req) ?? "anon",
});

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requiredText(body: Record<string, unknown>, key: string, max: number) {
  const value = clip(body[key], max);
  return value ?? "";
}

function mailerErrorMessage(result: unknown) {
  if (!result || typeof result !== "object" || !("error" in result)) {
    return "Failed to send contact message. Please try again later.";
  }

  const error = (result as { error?: unknown }).error;
  if (typeof error === "string") {
    if (error.toLowerCase().includes("only send testing emails")) {
      return "This portfolio sends email through Resend. Until the sending domain is verified, Resend can only deliver messages to the verified owner email: nazarov.davit17@gmail.com.";
    }
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      if (message.toLowerCase().includes("only send testing emails")) {
        return "This portfolio sends email through Resend. Until the sending domain is verified, Resend can only deliver messages to the verified owner email: nazarov.davit17@gmail.com.";
      }
      return message;
    }
  }

  return "Failed to send contact message. Please try again later.";
}

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

router.post("/contact", contactLimiter, async (req, res) => {
  if (!isMailerConfigured()) {
    return r.sendError(res, 503, "Contact form is temporarily unavailable. Mailer is not configured.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = requiredText(body, "name", 120);
  const phone = requiredText(body, "phone", 80);
  const email = requiredText(body, "email", 160).toLowerCase();
  const comment = requiredText(body, "comment", 2000);

  if (!name || !phone || !email || !comment) {
    return r.badRequest(res, "Name, phone, email, and comment are required.");
  }
  if (!isEmail(email)) {
    return r.badRequest(res, "Please provide a valid email address.");
  }

  const result = await sendContactSubmission({
    name,
    phone,
    email,
    comment,
    ip: clientIp(req),
    userAgent: clip(req.headers["user-agent"], 400),
    referrer: clip(body.referrer ?? req.headers.referer, 400),
    path: clip(body.path, 200),
    locale: clip(body.locale, 60),
  });

  if ("skipped" in result && result.skipped) {
    return r.sendError(res, 503, "Contact form is temporarily unavailable. Mailer is not configured.");
  }
  if ("ok" in result && !result.ok) {
    return r.serverError(res, mailerErrorMessage(result));
  }
  return r.sendSuccess(res, 200, "Message sent. A copy was sent to your email.");
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
