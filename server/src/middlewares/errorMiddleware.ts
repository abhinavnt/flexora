import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../types/HttpError";
import logger from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // Default to 500
  let message = err.message || "Internal Server Error";

    // Log the error with stack trace
  logger.error(`${req.method} ${req.originalUrl} - ${message} - ${err.stack || ''}`);

  if (err instanceof HttpError) {
    statusCode = err.statusCode; // Use the custom status code
  } else if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(", ");
  }

  res.status(statusCode).json({ message });
};
