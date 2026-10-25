import { Budget } from "./budget.model";

const setBudget = async (userId: string, categoryId: string, limit: number) => {
  if (limit <= 0) {
    const result = await Budget.findOneAndDelete({ userId, categoryId });
    return result;
  }
  const result = await Budget.findOneAndUpdate(
    { userId, categoryId },
    { limit, period: "monthly" },
    { upsert: true, new: true, runValidators: true }
  );
  return result;
};

const getAllBudgets = async (userId: string) => {
  const result = await Budget.find({ userId });
  return result;
};

export const BudgetService = {
  setBudget,
  getAllBudgets,
};
