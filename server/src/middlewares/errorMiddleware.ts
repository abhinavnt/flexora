import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../types/HttpError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // Default to 500
  let message = err.message || "Internal Server Error";

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
