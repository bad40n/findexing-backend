import { ILoan } from "./loan.interface";
import { Loan } from "./loan.model";

const createLoan = async (userId: string, payload: Omit<ILoan, "userId">) => {
  const result = await Loan.create({
    ...payload,
    userId,
  });
  return result;
};

const getAllLoans = async (userId: string) => {
  // Sort pending first, then by date descending and createdAt descending
  const result = await Loan.find({ userId }).sort({ status: 1, date: -1, createdAt: -1 });
  return result;
};

const updateLoan = async (
  userId: string,
  id: string,
  payload: Partial<ILoan>
) => {
  const loan = await Loan.findOne({ _id: id, userId });
  if (!loan) {
    throw new Error("Loan not found or unauthorized");
  }

  const result = await Loan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteLoan = async (userId: string, id: string) => {
  const loan = await Loan.findOne({ _id: id, userId });
  if (!loan) {
    throw new Error("Loan not found or unauthorized");
  }

  const result = await Loan.findByIdAndDelete(id);
  return result;
};

export const LoanService = {
  createLoan,
  getAllLoans,
  updateLoan,
  deleteLoan,
};
