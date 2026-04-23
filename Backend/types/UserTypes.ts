import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role?: "admin" | "viewer";
  createdAt: Date;
  updatedAt: Date;
}
