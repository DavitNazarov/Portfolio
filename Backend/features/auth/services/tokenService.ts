import jwt from "jsonwebtoken";
import { config } from "../../../config.js";
import type { UserRole } from "../../../lib/userRole.js";

const TOKEN_EXPIRES_IN = "1h";

export function createAuthToken(userId: string, role: UserRole) {
  if (!config.jwtSecret) return null;

  return jwt.sign({ userId, role }, config.jwtSecret, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}
