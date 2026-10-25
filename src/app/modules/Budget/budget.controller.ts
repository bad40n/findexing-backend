import catchAsync from "../../utils/catchAsync";
import { BudgetService } from "./budget.service";
import { CustomRequest } from "../../middlewares/auth";

const setBudget = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const { categoryId, limit } = req.body;

  if (!categoryId || limit === undefined) {
    res.status(400).json({
      status: "fail",
      message: "Please provide categoryId and limit",
    });
    return;
  }

  const result = await BudgetService.setBudget(userId as string, categoryId, Number(limit));
  res.status(200).json({
    status: "success",
    message: "Budget set successfully",
    data: result,
  });
});

const getAllBudgets = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await BudgetService.getAllBudgets(userId as string);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const BudgetController = {
  setBudget,
  getAllBudgets,
};
