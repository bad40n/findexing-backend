import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    status = "fail";
    message = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(", ");
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    status = "fail";
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value for '${field}'. Please use another value!`;
  }

  // Handle Mongoose Cast Error (e.g. invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    status = "fail";
    message = `Invalid ${err.path}: ${err.value}.`;
  }

  res.status(statusCode).json({
    status,
    message,
    errorDetails: process.env.NODE_ENV === "development" ? errorDetails : undefined,
  });
};
