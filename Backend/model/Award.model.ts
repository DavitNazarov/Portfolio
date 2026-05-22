import mongoose, { Schema, Model } from "mongoose";
import { IAward } from "../types/AwardTypes.js";

const awardSchema = new Schema<IAward>({
  title: { type: String, required: true },
  medals: { type: [String], required: true },
  category: { type: String, required: true },
  period: { type: String, default: "" },
});

export const Award: Model<IAward> =
  mongoose.models.Award ?? mongoose.model<IAward>("Award", awardSchema);
