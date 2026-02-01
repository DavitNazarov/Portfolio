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

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in .env. Login will fail.");
}

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/education", educationRouter);

/** Mongoose options for Atlas on Render: timeouts + TLS-friendly defaults */
const mongooseOptions = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
};

async function start() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set. Set it in Render Environment (or .env).");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log("Mongoose connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    console.error("On Render: set MONGO_URI in Environment and allow 0.0.0/0 in Atlas Network Access.");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

start();
