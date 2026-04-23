import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";
import { config } from "../config.js";
import { resolveUserRole } from "../lib/userRole.js";
import * as r from "../lib/response.js";

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizePassword(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function register(req: Request, res: Response) {
  try {
    if (!config.allowPublicRegistration) {
      return r.forbidden(res, "Public registration is disabled");
    }

    const email = normalizeEmail(req.body?.email);
    const password = normalizePassword(req.body?.password);
    if (!email || !password) return r.badRequest(res, "Email and password are required");

    const existing = await User.findOne({ email });
    if (existing) return r.badRequest(res, "Invalid credentials, please try again");

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword, role: "viewer" });

    return r.sendSuccess(res, 201, "User registered successfully");
  } catch (error) {
    console.error("Error registering user", error);
    return r.serverError(res);
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = normalizePassword(req.body?.password);
    if (!email || !password) return r.badRequest(res, "Email and password are required");

    const user = await User.findOne({ email });
    if (!user) return r.unauthorized(res, "Invalid credentials, please try again");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return r.unauthorized(res, "Invalid credentials, please try again");

    if (!config.jwtSecret) {
      return r.sendError(res, 500, "JWT_SECRET not configured");
    }

    const role = resolveUserRole(user.role);
    const token = jwt.sign(
      { userId: String(user._id), role },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login successful", status: "success", token, role });
  } catch (error) {
    console.error("Error logging in user", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return r.sendError(res, 500, "Internal server error, please try again later", {
      ...(process.env.NODE_ENV !== "production" && { detail: message }),
    });
  }
}
