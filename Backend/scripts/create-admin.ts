import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";

const EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const PASSWORD = process.env.ADMIN_PASSWORD;

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set in .env");
    process.exit(1);
  }

  if (!EMAIL || !PASSWORD) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: EMAIL });
  if (existing) {
    console.log("User already exists:", EMAIL);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(PASSWORD, 10);
  await User.create({ email: EMAIL, password: hashed, role: "admin" });
  console.log("Admin created:", EMAIL);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
