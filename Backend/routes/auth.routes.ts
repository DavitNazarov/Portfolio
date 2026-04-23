import { logIn, register } from "../controller/auth.controller.js";
import express from "express";
import { createRateLimit } from "../middleware/rateLimit.middleware.js";

const authRouter = express.Router();
const loginRateLimit = createRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again in a minute.",
  keyGenerator: (req) => `${req.ip}:${String(req.body?.email ?? "").trim().toLowerCase()}`,
});
const registerRateLimit = createRateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many registration attempts. Please try again later.",
  keyGenerator: (req) => `${req.ip}:${String(req.body?.email ?? "").trim().toLowerCase()}`,
});

authRouter.post("/register", registerRateLimit, register);
authRouter.post("/login", loginRateLimit, logIn);

export default authRouter;
