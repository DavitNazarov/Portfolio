import mongoose, { Schema, Model } from "mongoose";
import { IEducation } from "../types/educationTypes.js";

const educationSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  present: { type: Boolean, default: false },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Education: Model<IEducation> =
  mongoose.models.Education ??
  mongoose.model<IEducation>("Education", educationSchema);
