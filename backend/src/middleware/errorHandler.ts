import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "invalid JSON body" });
    return;
  }

  // Keep internal errors generic for clients.
  res.status(500).json({ error: "internal server error" });
};
