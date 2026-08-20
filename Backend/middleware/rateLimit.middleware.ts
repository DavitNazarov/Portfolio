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

/**
 * Safety cap on distinct keys held per limiter. Keys are derived from
 * client-controlled values (IP, submitted email), so without a ceiling a
 * request loop with rotating values would grow the map until the process
 * runs out of memory.
 */
const MAX_TRACKED_KEYS = 10_000;

/**
 * In-memory fixed-window rate limiter.
 *
 * Note: state lives in this process only. Behind multiple instances each one
 * keeps its own counters, so the effective limit scales with instance count.
 */
export function createRateLimit(options: RateLimitOptions) {
  const store = new Map<string, RateLimitEntry>();

  const sweep = (now: number) => {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  };

  /** Sweep first; if every entry is still live, evict the one expiring soonest. */
  const makeRoom = (now: number) => {
    sweep(now);
    while (store.size >= MAX_TRACKED_KEYS) {
      let oldestKey: string | undefined;
      let oldestResetAt = Infinity;
      for (const [key, entry] of store) {
        if (entry.resetAt < oldestResetAt) {
          oldestResetAt = entry.resetAt;
          oldestKey = key;
        }
      }
      if (oldestKey === undefined) break;
      store.delete(oldestKey);
    }
  };

  // Idle decay: without this, keys from a traffic burst would linger forever
  // once requests stop. unref() keeps the timer from holding the process open.
  const sweepTimer = setInterval(() => sweep(Date.now()), Math.max(options.windowMs, 60_000));
  sweepTimer.unref?.();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const baseKey = options.keyGenerator?.(req) ?? req.ip ?? "unknown";
    const key = `${req.method}:${req.path}:${baseKey}`;
    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      if (store.size >= MAX_TRACKED_KEYS) makeRoom(now);
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
