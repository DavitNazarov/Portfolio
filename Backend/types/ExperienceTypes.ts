import { Document } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}
