import cors from "cors";
import express, { Application } from "express";
import { UserRoutes } from "./app/modules/User/user.route";
import { TransactionRoutes } from "./app/modules/Transaction/transaction.route";
import { BudgetRoutes } from "./app/modules/Budget/budget.route";
import { LoanRoutes } from "./app/modules/Loan/loan.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// routes
app.use("/api/user", UserRoutes);
app.use("/api/transaction", TransactionRoutes);
app.use("/api/budget", BudgetRoutes);
app.use("/api/loan", LoanRoutes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;