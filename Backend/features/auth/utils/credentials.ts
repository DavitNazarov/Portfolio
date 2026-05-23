import type { Request } from "express";

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizePassword(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function credentialsFromRequest(req: Request) {
  return {
    email: normalizeEmail(req.body?.email),
    password: normalizePassword(req.body?.password),
  };
}
