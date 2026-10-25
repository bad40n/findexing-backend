import catchAsync from "../../utils/catchAsync";
import { LoanService } from "./loan.service";
import { CustomRequest } from "../../middlewares/auth";

const createLoan = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await LoanService.createLoan(userId as string, req.body);
  res.status(201).json({
    status: "success",
    message: "Loan added successfully",
    data: result,
  });
});

const getAllLoans = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await LoanService.getAllLoans(userId as string);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

const updateLoan = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await LoanService.updateLoan(
    userId as string,
    req.params.id as string,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Loan updated successfully",
    data: result,
  });
});

const deleteLoan = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  await LoanService.deleteLoan(userId as string, req.params.id as string);
  res.status(200).json({
    status: "success",
    message: "Loan deleted successfully",
  });
});

export const LoanController = {
  createLoan,
  getAllLoans,
  updateLoan,
  deleteLoan,
};
