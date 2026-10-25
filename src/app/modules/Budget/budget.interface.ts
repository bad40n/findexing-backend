import { Types } from "mongoose";

export interface IBudget {
  userId: Types.ObjectId;
  categoryId: string;
  limit: number;
  period: "monthly";
}
