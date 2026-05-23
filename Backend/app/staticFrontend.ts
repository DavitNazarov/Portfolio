import path from "path";
import express from "express";
import { publicDir } from "./paths.js";

export function registerStaticFrontend(app: express.Express) {
  app.use(express.static(publicDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
