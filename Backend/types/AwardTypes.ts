import { Document } from "mongoose";

export interface IAward extends Document {
  title: string;
  medals: string[];
  category: string;
  period: string;
}
