import catchAsync from "../../utils/catchAsync";
import { TransactionService } from "./transaction.service";
import { CustomRequest } from "../../middlewares/auth";

const createTransaction = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await TransactionService.createTransaction(userId as string, req.body);
  res.status(201).json({
    status: "success",
    message: "Transaction added successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await TransactionService.getAllTransactions(userId as string);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

const updateTransaction = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await TransactionService.updateTransaction(
    userId as string,
    req.params.id as string,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully",
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  await TransactionService.deleteTransaction(userId as string, req.params.id as string);
  res.status(200).json({
    status: "success",
    message: "Transaction deleted successfully",
  });
});

export const TransactionController = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
