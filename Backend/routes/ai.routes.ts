import { Router } from "express";
import { chatHandler } from "../features/ai/handlers/chatHandler.js";
import { aiChatLimiter } from "../features/ai/rateLimits.js";

const router = Router();

router.post("/chat", aiChatLimiter, chatHandler);

export default router;
