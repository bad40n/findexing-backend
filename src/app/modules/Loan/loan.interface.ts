import { Schema } from "mongoose";

export interface ILoan {
  userId: Schema.Types.ObjectId;
  personName: string;
  type: "gave" | "took"; // "gave" = given (lent), "took" = taken (borrowed)
  amount: number;
  status: "pending" | "settled";
  date: Date;
  dueDate?: Date;
  note?: string;
}
