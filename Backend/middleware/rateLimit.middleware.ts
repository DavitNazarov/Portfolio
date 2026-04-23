import { Request, Response, NextFunction } from "express";
import * as r from "../lib/response.js";

type RateLimitOptions = {
  windowMs: number;
  max: number;
  message: string;
  keyGenerator?: (req: Request) => string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export function createRateLimit(options: RateLimitOptions) {
  const store = new Map<string, RateLimitEntry>();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const baseKey = options.keyGenerator?.(req) ?? req.ip;
    const key = `${req.method}:${req.path}:${baseKey}`;
    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
      return next();
    }

    if (entry.count >= options.max) {
      const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      res.setHeader("Retry-After", retryAfter);
      return r.sendError(res, 429, options.message, { retryAfter });
    }

    entry.count += 1;
    next();
  };
}
