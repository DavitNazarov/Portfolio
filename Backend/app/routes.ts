import express from "express";
import mongoose from "mongoose";
import aiRouter from "../routes/ai.routes.js";
import authRouter from "../routes/auth.routes.js";
import awardRouter from "../routes/award.routes.js";
import educationRouter from "../routes/education.routes.js";
import experienceRouter from "../routes/experience.routes.js";
import notifyRouter from "../routes/notify.routes.js";
import portfolioRouter from "../routes/portfolio.routes.js";
import projectsRouter from "../routes/projects.routes.js";
import * as r from "../lib/response.js";

export function registerApiRoutes(app: express.Express) {
  app.get("/health", (_req, res) => {
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 503).json({
      status: ready ? "ok" : "db_not_ready",
      db: ready ? "connected" : "disconnected",
    });
  });

  app.use("/api/notify", notifyRouter);

  app.use("/api", (_req, res, next) => {
    if (mongoose.connection.readyState !== 1) return r.serviceUnavailable(res);
    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/experience", experienceRouter);
  app.use("/api/education", educationRouter);
  app.use("/api/awards", awardRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/portfolio", portfolioRouter);

  // Unmatched API paths must answer with JSON. Without this they fall through
  // to the SPA catch-all and return index.html with a 200, which the client
  // then parses as an empty object instead of reporting the failure.
  app.use("/api", (_req, res) => r.notFound(res, "API endpoint not found"));
}
