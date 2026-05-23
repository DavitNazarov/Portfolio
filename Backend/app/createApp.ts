import express from "express";
import { registerMiddleware } from "./middleware.js";
import { registerApiRoutes } from "./routes.js";
import { registerStaticFrontend } from "./staticFrontend.js";

export function createApp() {
  const app = express();
  registerMiddleware(app);
  registerApiRoutes(app);
  registerStaticFrontend(app);
  return app;
}
