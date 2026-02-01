import { Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  institution: string;
  period: string;
  present: boolean;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
