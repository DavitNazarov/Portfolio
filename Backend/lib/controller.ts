import type { Request, Response } from "express";
import { isDbConnectionError } from "./dbError.js";
import * as r from "./response.js";

export type BodyRecord = Record<string, unknown>;

export function bodyRecord(req: Request): BodyRecord {
  return (req.body ?? {}) as BodyRecord;
}

export function hasRequiredFields<const T extends readonly string[]>(
  body: unknown,
  fields: T
): body is BodyRecord & Record<T[number], unknown> {
  if (!body || typeof body !== "object") return false;

  const record = body as BodyRecord;
  return fields.every((field) => {
    const value = record[field];
    if (value == null) return false;
    // Blank and whitespace-only strings used to pass this check and then fail
    // Mongoose's `required` validator, turning a bad request into a 500.
    if (typeof value === "string") return value.trim().length > 0;
    return Array.isArray(value) ? value.length > 0 : true;
  });
}

export function pickDefined<T extends object>(body: BodyRecord, fields: readonly (keyof T & string)[]) {
  const update: Partial<T> = {};

  for (const field of fields) {
    if (body[field] !== undefined) {
      (update as Record<string, unknown>)[field] = body[field];
    }
  }

  return update;
}

export function requestId(req: Request, res: Response, resourceName: string) {
  const { id } = req.params;
  if (!id) {
    r.badRequest(res, `${resourceName} ID is required`);
    return null;
  }

  return id;
}

/**
 * Client-safe message for errors caused by the request itself (bad field
 * values, duplicate keys). Returns null for anything that is genuinely a
 * server fault, so those still surface as a 500.
 */
function invalidInputMessage(error: unknown): string | null {
  if (!(error instanceof Error)) return null;

  if (error.name === "ValidationError") {
    const paths = (error as { errors?: Record<string, { message?: string }> }).errors ?? {};
    const details = Object.values(paths)
      .map((detail) => detail?.message)
      .filter((message): message is string => Boolean(message));

    return details.length > 0 ? details.join(" ") : "Some fields are invalid.";
  }

  if (error.name === "CastError") {
    const path = (error as { path?: string }).path;
    return path ? `Invalid value for "${path}".` : "Invalid value in request.";
  }

  if ((error as { code?: number }).code === 11000) {
    return "That record already exists.";
  }

  return null;
}

export function handleControllerError(res: Response, error: unknown, label: string) {
  console.error(label, error);
  if (isDbConnectionError(error)) return r.serviceUnavailable(res);

  const invalid = invalidInputMessage(error);
  return invalid ? r.badRequest(res, invalid) : r.serverError(res);
}
