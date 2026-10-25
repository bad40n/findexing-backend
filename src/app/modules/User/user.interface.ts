import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  pass: string;
  currency: string;
  type: "admin" | "user";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
