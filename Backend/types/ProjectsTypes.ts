import { Document } from "mongodb";

export interface IProject extends Document {
  name: string;
  description: string;
  year: number;
  githubLink: string;
  liveLink: string;
  technologies: string[];
}
