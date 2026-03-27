import { RequestHandler } from "express";
import { ZodType } from "zod";
import { AppError } from "../errors";

const formatZodIssuePath = (path: PropertyKey[]): string => {
  if (path.length === 0) {
    return "request";
  }

  return path.map((segment) => String(segment)).join(".");
};

export const validateBody = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const path = formatZodIssuePath(issue.path);
      next(new AppError(`${path}: ${issue.message}`, 400));
      return;
    }

    req.body = parsed.data;
    next();
  };
};

export const validateParams = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req.params);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const path = formatZodIssuePath(issue.path);
      next(new AppError(`${path}: ${issue.message}`, 400));
      return;
    }

    req.params = parsed.data as typeof req.params;
    next();
  };
};
