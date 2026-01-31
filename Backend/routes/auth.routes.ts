import { logIn, register } from "../controller/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);

export default authRouter;
