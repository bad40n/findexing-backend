import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const createTransaction = async (userId: string, payload: Omit<ITransaction, "userId">) => {
  const result = await Transaction.create({
    ...payload,
    userId,
  });
  return result;
};

const getAllTransactions = async (userId: string) => {
  const result = await Transaction.find({ userId }).sort({ date: -1, createdAt: -1 });
  return result;
};

const updateTransaction = async (
  userId: string,
  id: string,
  payload: Partial<ITransaction>
) => {
  const transaction = await Transaction.findOne({ _id: id, userId });
  if (!transaction) {
    throw new Error("Transaction not found or unauthorized");
  }

  const result = await Transaction.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTransaction = async (userId: string, id: string) => {
  const transaction = await Transaction.findOne({ _id: id, userId });
  if (!transaction) {
    throw new Error("Transaction not found or unauthorized");
  }

  const result = await Transaction.findByIdAndDelete(id);
  return result;
};

export const TransactionService = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
