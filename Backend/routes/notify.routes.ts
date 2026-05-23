import { Router } from "express";
import { chatEventHandler } from "../features/notify/handlers/chatEventHandler.js";
import { contactHandler } from "../features/notify/handlers/contactHandler.js";
import { visitHandler } from "../features/notify/handlers/visitHandler.js";
import { chatLimiter, contactLimiter, visitLimiter } from "../features/notify/rateLimits.js";

const router = Router();

router.post("/visit", visitLimiter, visitHandler);
router.post("/contact", contactLimiter, contactHandler);
router.post("/chat", chatLimiter, chatEventHandler);

export default router;
