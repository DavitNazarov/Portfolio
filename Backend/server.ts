import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import experienceRouter from "./routes/experience.routes.js";
import educationRouter from "./routes/education.routes.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const RETRY_MS = 30000; // retry MongoDB every 30s until connected

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in .env. Login will fail.");
}

const app = express();
app.use(express.json());

// Health: so Render sees a live process; 503 when DB not ready
app.get("/health", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    status: ready ? "ok" : "db_not_ready",
    db: ready ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/education", educationRouter);

const mongooseOptions = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
};

async function connectMongo() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set. Set it in Render Environment (or .env).");
    return false;
  }
  try {
    await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log("Mongoose connected to MongoDB");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed:", (err as Error).message);
    console.error(">>> Add 0.0.0.0/0 in Atlas: Network Access → Add IP Address → Allow access from anywhere");
    return false;
  }
}

async function start() {
  // Bind port first so Render deploy succeeds even if DB is not reachable yet
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });

  let connected = await connectMongo();
  if (!connected) {
    console.log(`Retrying MongoDB every ${RETRY_MS / 1000}s until Atlas Network Access allows this server (0.0.0.0/0).`);
    const id = setInterval(async () => {
      if (mongoose.connection.readyState === 1) {
        clearInterval(id);
        return;
      }
      connected = await connectMongo();
      if (connected) clearInterval(id);
    }, RETRY_MS);
  }
}

start();
