import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import experienceRouter from "./routes/experience.routes.js";
import educationRouter from "./routes/education.routes.js";

const PORT = process.env.PORT;
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

async function start() {
  try {
    await connectDB();
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log("Mongoose connected");
    } else {
      console.error("MONGO_URI is not set in .env. API will not work.");
    }
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
