import mongoose from "mongoose";
import { config } from "../config.js";

const mongooseOptions = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
};

export async function connectMongo() {
  if (!config.mongoUri) {
    console.error("MONGO_URI is not set. Set it in Render Environment Variables (or .env for local dev).");
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

export async function retryMongoUntilConnected() {
  let connected = await connectMongo();
  if (connected) return;

  console.log(
    `Retrying MongoDB every ${config.retryMs / 1000}s until Atlas Network Access allows this server (0.0.0.0/0).`
  );

  const id = setInterval(async () => {
    if (mongoose.connection.readyState === 1) {
      clearInterval(id);
      return;
    }

    connected = await connectMongo();
    if (connected) clearInterval(id);
  }, config.retryMs);
}
