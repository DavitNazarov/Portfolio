import {
  Code,
  Braces,
  Database,
  Server,
  Github,
  Globe,
  Terminal,
  Layers,
  Cloud,
  FileCode,
  Paintbrush,
  Sparkles,
} from "lucide-react";
// Row 1 – Basic Web Skills
export const basicSkills = [
  { icon: <FileCode size={80} />, name: "HTML" },
  { icon: <Paintbrush size={80} />, name: "CSS" },
  { icon: <Globe size={80} />, name: "Tailwind" },
  { icon: <Sparkles size={80} />, name: "SCSS" },
];

// Row 2 – Frontend Frameworks / Libraries
export const frontendSkills = [
  { icon: <Braces size={80} />, name: "JavaScript" },
  { icon: <Code size={80} />, name: "React" },
  { icon: <Layers size={80} />, name: "Framer Motion" },
  { icon: <Github size={80} />, name: "GitHub" },
];

// Row 3 – Backend / Tools
export const backendSkills = [
  { icon: <Server size={80} />, name: "Node.js" },
  { icon: <Terminal size={80} />, name: "Express" },
  { icon: <Database size={80} />, name: "MongoDB" },
  { icon: <FileCode size={80} />, name: "Python" },
  { icon: <Cloud size={80} />, name: "API Integration" },
];
