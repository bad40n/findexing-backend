import { Schema, model } from "mongoose";
import { IBudget } from "./budget.interface";

const budgetSchema = new Schema<IBudget>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: String, required: true },
    limit: { type: Number, required: true },
    period: { type: String, enum: ["monthly"], default: "monthly", required: true },
  },
  {
    timestamps: true,
  }
);

// Ensure uniqueness per user and category
budgetSchema.index({ userId: 1, categoryId: 1 }, { unique: true });

export const Budget = model<IBudget>("Budget", budgetSchema);
