import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import authRouter from "./routes/auth.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import experienceRouter from "./routes/experience.routes.js";
import educationRouter from "./routes/education.routes.js";
import * as r from "./lib/response.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

if (!config.jwtSecret) {
  console.error("JWT_SECRET is not set in .env. Login will fail.");
}

const app = express();

app.use(
  cors({
    origin: config.frontendUrl || true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    status: ready ? "ok" : "db_not_ready",
    db: ready ? "connected" : "disconnected",
  });
});

app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return r.serviceUnavailable(res);
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/education", educationRouter);

// Serve frontend (Vite build) and SPA fallback
app.use(express.static(publicDir));
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const mongooseOptions = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
};

async function connectMongo() {
  if (!config.mongoUri) {
    console.error("MONGO_URI is not set. Set it in Railway Environment (or .env).");
    return false;
  }
  try {
    await mongoose.connect(config.mongoUri, mongooseOptions);
    console.log("Mongoose connected to MongoDB");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed:", (err as Error).message);
    console.error(">>> Add 0.0.0.0/0 in Atlas: Network Access → Add IP Address → Allow access from anywhere");
    return false;
  }
}

async function start() {
  app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`);
  });

  let connected = await connectMongo();
  if (!connected) {
    console.log(`Retrying MongoDB every ${config.retryMs / 1000}s until Atlas Network Access allows this server (0.0.0.0/0).`);
    const id = setInterval(async () => {
      if (mongoose.connection.readyState === 1) {
        clearInterval(id);
        return;
      }
      connected = await connectMongo();
      if (connected) clearInterval(id);
    }, config.retryMs);
  }
}

start();
