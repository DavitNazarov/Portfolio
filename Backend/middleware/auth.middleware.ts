import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as r from "../lib/response.js";

export const loggedInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return r.unauthorized(res);

    if (!config.jwtSecret) return r.sendError(res, 500, "JWT_SECRET is not configured");

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    return r.unauthorized(res);
  }
};
