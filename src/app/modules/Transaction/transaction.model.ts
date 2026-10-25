import { Schema, model } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now, required: true },
    currency: { type: String, default: "BDT", required: true },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);
