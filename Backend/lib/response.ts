import { Response } from "express";

type JsonBody = Record<string, unknown>;

export function sendError(res: Response, status: number, message: string, extra?: JsonBody) {
  return res.status(status).json({ status: "error", message, ...extra });
}

export function sendSuccess(res: Response, status: number, message: string, data?: JsonBody) {
  return res.status(status).json({ status: "success", message, ...data });
}

export function badRequest(res: Response, message: string) {
  return sendError(res, 400, message);
}

export function unauthorized(res: Response, message = "Unauthorized, please login to continue") {
  return sendError(res, 401, message);
}

export function notFound(res: Response, message: string) {
  return sendError(res, 404, message);
}

export function serverError(res: Response, message = "Internal server error, please try again later") {
  return sendError(res, 500, message);
}

export function serviceUnavailable(res: Response, message = "Database not ready. Please retry in a moment.") {
  return sendError(res, 503, message, { db: "disconnected" });
}
