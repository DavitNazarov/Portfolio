import "dotenv/config";
import mongoose from "mongoose";
import { Projects } from "../model/Projects.model.js";
import { Experience } from "../model/Experience.model.js";
import { Education } from "../model/education.model.js";

const projects = [
  {
    name: "Geo Wushu — Competition Management Platform",
    description:
      "Full-stack tournament management system built for and actively used by the Georgian Wushu Federation.",
    year: 2025,
    githubLink: "#",
    liveLink: "#",
    technologies: [
      "NestJS 11",
      "Next.js 16",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
      "Docker",
    ],
  },
  {
    name: "Movie Hub — Social Movie Discovery Platform",
    description:
      "Full-stack social platform for discovering, discussing, and getting AI-powered recommendations on films.",
    year: 2025,
    githubLink: "#",
    liveLink: "https://moviehubs.cc",
    technologies: [
      "React 19",
      "Vite",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Google Gemini AI",
      "TMDB API",
      "Cloudinary",
      "TanStack Query",
      "Tailwind CSS",
    ],
  },
  {
    name: "Portfolio — Dynamic Portfolio & CMS",
    description:
      "Personal portfolio with a protected admin CMS dashboard for managing all content dynamically.",
    year: 2025,
    githubLink: "#",
    liveLink: "https://portfolio-m12j.onrender.com",
    technologies: [
      "React 19",
      "Vite",
      "Express",
      "MongoDB",
      "JWT",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
    ],
  },
];

const experiences = [
  {
    role: "Junior Front-End Developer",
    company: "SoftGen Group",
    period: "January 2026 – Present",
    description:
      "Built and maintained responsive React.js UIs, improving load time and UX across multiple client projects. Integrated Context API and Redux for seamless data flow between designer and back-end engineer. Translated Figma mockups into pixel-perfect, accessible components with performance optimisations (code splitting, lazy loading, memoisation). Reduced bundle size through refactoring and tree shaking; participated in code reviews and Git-based workflows.",
    tech: ["React.js", "Redux", "Context API", "Figma", "Git"],
  },
  {
    role: "Front-End Developer (Freelance)",
    company: "Tourism Platform",
    period: "2025",
    description:
      "Built interactive UI with Tailwind CSS for a Georgian tourism platform. Improved rendering performance and reduced bundle size through refactoring and tree shaking.",
    tech: ["React.js", "Tailwind CSS"],
  },
];

const educations = [
  {
    degree: "Bachelor of Science in Information Technologies (Admitted)",
    institution: "FH Kärnten — Carinthia University of Applied Sciences",
    period: "Starting September 2026",
    present: false,
    description: "Admitted to study Information Technologies in Austria.",
  },
  {
    degree: "Bachelor of Science in Information Technologies",
    institution: "Georgian National University SEU",
    period: "2025 – Present",
    present: true,
    description: "Currently pursuing a BSc in Information Technologies.",
  },
  {
    degree: "General Education Diploma",
    institution: "LEPL Mikheil Hrushevsky Public School #41",
    period: "Finished",
    present: false,
    description: "Completed general secondary education.",
  },
];

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Projects
  for (const project of projects) {
    const existing = await Projects.findOne({ name: project.name });
    if (existing) {
      console.log(`Project already exists: ${project.name}`);
    } else {
      await Projects.create(project);
      console.log(`Created project: ${project.name}`);
    }
  }

  // Experience
  for (const exp of experiences) {
    const existing = await Experience.findOne({
      role: exp.role,
      company: exp.company,
    });
    if (existing) {
      console.log(`Experience already exists: ${exp.role} @ ${exp.company}`);
    } else {
      await Experience.create(exp);
      console.log(`Created experience: ${exp.role} @ ${exp.company}`);
    }
  }

  // Education
  for (const edu of educations) {
    const existing = await Education.findOne({
      degree: edu.degree,
      institution: edu.institution,
    });
    if (existing) {
      console.log(`Education already exists: ${edu.degree}`);
    } else {
      await Education.create(edu);
      console.log(`Created education: ${edu.degree}`);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
