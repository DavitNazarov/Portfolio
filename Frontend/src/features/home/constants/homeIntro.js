import { BrainCircuit, Boxes, Code2, Database, Server } from "lucide-react";

export const HERO_NAME = ["Davit", "Nazarov"];

export const TECH_GROUPS = [
  {
    key: "frontend",
    title: "Front-end Systems",
    tagline: "Interface · Routing · State",
    description: "Routing, rendering, state, and the tactile polish that makes an interface feel premium.",
    icon: Code2,
    tint: "56, 189, 248",
    featured: true,
    match: ["react", "next", "vite", "tailwind", "framer", "tanstack", "query"],
  },
  {
    key: "backend",
    title: "Back-end & Auth",
    tagline: "APIs · Sessions · Realtime",
    description: "APIs, events, and real-time application flows with secure session design.",
    icon: Server,
    tint: "251, 191, 36",
    match: ["nest", "express", "socket", "jwt", "node"],
  },
  {
    key: "data",
    title: "Data Layer",
    tagline: "Schemas · Modeling · Persistence",
    description: "Schemas, persistence, and the data modeling foundations behind every product.",
    icon: Database,
    tint: "52, 211, 153",
    match: ["postgres", "mongo", "prisma", "sql", "database"],
  },
  {
    key: "immersive",
    title: "Motion & 3D",
    tagline: "Animation · Spatial · Depth",
    description: "Spatial interaction, animation rhythm, and the visual depth that tells a story.",
    icon: Boxes,
    tint: "244, 114, 182",
    match: ["three", "fiber", "gsap"],
  },
  {
    key: "ai",
    title: "AI & Media",
    tagline: "Pipelines · Content · Intelligence",
    description: "Content systems, media pipelines, and AI-assisted features woven into real products.",
    icon: BrainCircuit,
    tint: "167, 139, 250",
    match: ["gemini", "cloudinary", "tmdb", "openai", "ai"],
  },
];
