import mongoose, { Schema, Model } from "mongoose";
import { IExperience } from "../types/ExperienceTypes.js";

const experienceSchema = new Schema<IExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: [String], required: true },
});

export const Experience: Model<IExperience> =
  mongoose.models.Experience ??
  mongoose.model<IExperience>("Experience", experienceSchema);
