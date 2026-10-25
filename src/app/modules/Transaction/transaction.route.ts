import express from "express";
import { TransactionController } from "./transaction.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Protect all transaction endpoints
router.use(auth());

router.route("/")
  .get(TransactionController.getAllTransactions as any)
  .post(TransactionController.createTransaction as any);

router.route("/:id")
  .patch(TransactionController.updateTransaction as any)
  .delete(TransactionController.deleteTransaction as any);

export const TransactionRoutes = router;
