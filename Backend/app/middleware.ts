import cors from "cors";
import express from "express";
import { corsOptions } from "./corsPolicy.js";

export function registerMiddleware(app: express.Express) {
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(cors(corsOptions()));
  app.use(express.json({ limit: "16kb" }));
}
