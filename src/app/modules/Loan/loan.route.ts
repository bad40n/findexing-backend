import express from "express";
import { LoanController } from "./loan.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Protect all loan endpoints
router.use(auth());

router.route("/")
  .get(LoanController.getAllLoans as any)
  .post(LoanController.createLoan as any);

router.route("/:id")
  .patch(LoanController.updateLoan as any)
  .delete(LoanController.deleteLoan as any);

export const LoanRoutes = router;
