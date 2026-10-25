import { Schema, model } from "mongoose";
import { ILoan } from "./loan.interface";

const loanSchema = new Schema<ILoan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    personName: { type: String, required: true },
    type: { type: String, enum: ["gave", "took"], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "settled"], default: "pending", required: true },
    date: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Loan = model<ILoan>("Loan", loanSchema);
