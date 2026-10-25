import { Types } from "mongoose";

export type TransactionType = "income" | "expense";

export interface ITransaction {
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  category: string;
  title: string;
  note?: string;
  date: Date;
  currency: string;
}
