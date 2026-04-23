import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { resolveUserRole } from "../lib/userRole.js";
import { User } from "../model/User.model.js";
import * as r from "../lib/response.js";

export const loggedInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return r.unauthorized(res);

    if (!config.jwtSecret) return r.sendError(res, 500, "JWT_SECRET is not configured");

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role?: string };
    const user = await User.findById(decoded.userId).select("_id role");
    if (!user) return r.unauthorized(res);

    req.userId = String(user._id);
    req.userRole = resolveUserRole(user.role ?? decoded.role);
    next();
  } catch {
    return r.unauthorized(res);
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    return r.forbidden(res, "Admin access required");
  }
  next();
};
