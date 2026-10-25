import express from "express";
import { BudgetController } from "./budget.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Protect all budget endpoints
router.use(auth());

router.route("/")
  .get(BudgetController.getAllBudgets as any)
  .post(BudgetController.setBudget as any);

export const BudgetRoutes = router;
