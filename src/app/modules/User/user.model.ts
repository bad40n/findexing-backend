import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    currency: { type: String, default: "BDT", required: true },
    type: { type: String, enum: ["admin", "user"], default: "user", required: true },
    isActive: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("pass")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = model<IUser>("User", userSchema);
