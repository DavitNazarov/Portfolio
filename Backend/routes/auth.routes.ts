import express from "express";
import { logIn, register } from "../controller/auth.controller.js";
import { loginRateLimit, registerRateLimit } from "../features/auth/rateLimits.js";

const authRouter = express.Router();

authRouter.post("/register", registerRateLimit, register);
authRouter.post("/login", loginRateLimit, logIn);

export default authRouter;
