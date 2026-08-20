import type { Request } from "express";
import { lookupGeo } from "./geoLookup.js";

export type RequestBody = Record<string, unknown>;

export function requestBody(req: Request): RequestBody {
  return (req.body ?? {}) as RequestBody;
}

/**
 * Best-effort visitor IP for *display in notification emails only*.
 *
 * X-Forwarded-For is caller-controlled and trivially spoofed, so this value
 * must never be used for rate limiting, access control, or anything else
 * security-relevant. Use `req.ip` for those — Express derives it from the
 * trusted proxy hop count configured in app/middleware.ts.
 */
export function clientIp(req: Request): string | undefined {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0]?.trim();
  }
  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  return req.ip;
}

export function clipText(value: unknown, max = 500): string | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  return trimmed.length > max ? `${trimmed.slice(0, max)}\u2026` : trimmed;
}

export function visitorMeta(req: Request, body: RequestBody) {
  return {
    ip: clientIp(req),
    userAgent: clipText(req.headers["user-agent"], 400),
    referrer: clipText(body.referrer ?? req.headers.referer, 400),
    path: clipText(body.path, 200),
    locale: clipText(body.locale, 60),
  };
}

/**
 * Request-derived metadata enriched with server-side IP geolocation.
 * The geo lookup is best-effort and degrades to the base meta on failure,
 * so notifications still send even if the geo provider is unreachable.
 */
export async function visitorMetaWithGeo(req: Request, body: RequestBody) {
  const base = visitorMeta(req, body);
  const geo = await lookupGeo(base.ip);
  return { ...base, ...geo };
}
