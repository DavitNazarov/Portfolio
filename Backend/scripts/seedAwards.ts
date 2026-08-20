import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config.js";
import { Award } from "../model/Award.model.js";

/**
 * Ordered newest → oldest. `getAllAwards` does an unsorted `find()`, so the
 * insertion order below is the order the cards render in on the home page.
 */
const AWARDS = [
  {
    title: "20th European Wushu Kungfu Championships — Lyon",
    medals: ["Bronze"],
    category: "Sanda · Men's -60 kg · Adults 18–40",
    period: "May 2026",
  },
  {
    title: "Georgian X Wushu Cup Tournament",
    medals: ["Gold"],
    category: "Sanda · Men's -60 kg · Adults 18–40",
    period: "March 2026",
  },
  {
    title: "Eurasian Professional Sanda League",
    medals: ["Silver"],
    category: "Sanda · -60 kg · 18+",
    period: "February 2026",
  },
  {
    title: "Georgian XXII National Wushu Championship",
    medals: ["Gold"],
    category: "Sanda · Men's -60 kg · Adults 18–40",
    period: "December 2025",
  },
  {
    title: "Tbilisi City Hall Certificate of Appreciation",
    medals: ["Recognition"],
    category: "For achievements in sport",
    period: "2025",
  },
  {
    title: "Batumi Open International Wushu Tournament",
    medals: ["Silver"],
    category: "Sanda · Men's -60 kg · 15–17",
    period: "August 2025",
  },
  {
    title: "8th European Traditional Wushu Championships",
    medals: ["Bronze"],
    category: "Light Sanda · Boys 56 kg · 15–17",
    period: "May 2025",
  },
  {
    title: "Educational-Training Wushu Seminar",
    medals: ["Participation"],
    category: "Chinese Wushu Association & Georgian National Wushu Federation, Tbilisi",
    period: "April 2025",
  },
  {
    title: "Tbilisi 15th Wushu Championship",
    medals: ["Gold"],
    category: "Sanda · Men's -56 kg · 15–17",
    period: "February 2025",
  },
  {
    title: "Unique Learning — General English Course",
    medals: ["Certificate"],
    category: "Level B1",
    period: "2024 – 2025",
  },
  {
    title: "Georgian XXI National Wushu Championship",
    medals: ["Gold"],
    category: "Sanda · Men's -56 kg · 15–17",
    period: "December 2024",
  },
  {
    title: "Georgian 8th Wushu Cup Tournament",
    medals: ["Silver"],
    category: "Sanda · -60 kg · 15–17",
    period: "March 2024",
  },
  {
    title: "\"Belt and Road\" Wushu Training Seminar",
    medals: ["Participation"],
    category: "Chinese Wushu Association & Georgian National Wushu Federation, Tbilisi",
    period: "March 2024",
  },
  {
    title: "Georgian 7th Wushu Cup Tournament",
    medals: ["Gold"],
    category: "Sanda · -56 kg · 15–17",
    period: "March 2023",
  },
  {
    title: "Tbilisi 13th Wushu Championship",
    medals: ["Silver"],
    category: "Sanda · -60 kg · 15–17",
    period: "February 2023",
  },
  {
    title: "Tbilisi 12th Wushu Championship",
    medals: ["Silver"],
    category: "Sanda · -56 kg · 12–14",
    period: "February 2022",
  },
  {
    title: "18th Georgian National Wushu Championship",
    medals: ["Bronze"],
    category: "Sanda · -56 kg · 12–14",
    period: "December 2021",
  },
  {
    title: "Royal Fitness Certificate of Appreciation",
    medals: ["Recognition"],
    category: "Certificate of appreciation",
    period: "October 2021",
  },
  {
    title: "Tbilisi 10th Wushu Championship",
    medals: ["Gold"],
    category: "Sanda · 42–45 kg · 12–13",
    period: "February 2020",
  },
  {
    title: "Batumi Open International Wushu Tournament",
    medals: ["Bronze"],
    category: "Sanda · Men's -56 kg · Juniors 15–17",
    period: "",
  },
];

const replace = process.argv.includes("--replace");

async function seed() {
  if (!config.mongoUri) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }

  await mongoose.connect(config.mongoUri);
  console.log(`Connected to MongoDB (${replace ? "replace" : "upsert"} mode)`);

  if (replace) {
    const { deletedCount } = await Award.deleteMany({});
    console.log(`Removed ${deletedCount} existing awards`);
    const inserted = await Award.insertMany(AWARDS);
    inserted.forEach((a) => console.log(`  + ${a.title} — ${a.medals.join(", ")}`));
    console.log(`Seeded ${inserted.length} awards.`);
  } else {
    let created = 0;
    for (const award of AWARDS) {
      const existing = await Award.findOne({ title: award.title, period: award.period });
      if (existing) {
        console.log(`  = ${award.title} (${award.period || "no period"}) already exists`);
        continue;
      }
      await Award.create(award);
      created += 1;
      console.log(`  + ${award.title} — ${award.medals.join(", ")}`);
    }
    console.log(`Created ${created} awards, skipped ${AWARDS.length - created}.`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
