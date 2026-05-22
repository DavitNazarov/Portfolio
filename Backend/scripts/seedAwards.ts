import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config.js";
import { Award } from "../model/Award.model.js";

const AWARDS = [
  {
    title: "19th European Wushu Championships",
    medals: ["Gold"],
    category: "60 kg Light Sanda",
    period: "May 2024",
  },
  {
    title: "XXII Traditional Wushu Championships",
    medals: ["Gold", "Bronze"],
    category: "Tuishou & Sanda",
    period: "",
  },
  {
    title: "Batumi Open Tournament",
    medals: ["Gold", "Silver"],
    category: "Wushu Sanda",
    period: "",
  },
];

async function seed() {
  if (!config.mongoUri) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }

  await mongoose.connect(config.mongoUri);
  console.log("Connected to MongoDB");

  await Award.deleteMany({});
  const inserted = await Award.insertMany(AWARDS);
  console.log(`Seeded ${inserted.length} awards:`);
  inserted.forEach((a) => console.log(`  • ${a.title} — ${a.medals.join(", ")}`));

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
