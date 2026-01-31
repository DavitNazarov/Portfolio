import mongoose, { Schema, Model } from "mongoose";
import { IProject } from "../types/ProjectsTypes.js";

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  githubLink: { type: String, required: true },
  liveLink: { type: String, required: true },
  technologies: { type: [String], required: true },
});

export const Projects: Model<IProject> =
  mongoose.models.Projects ??
  mongoose.model<IProject>("Projects", projectSchema);
