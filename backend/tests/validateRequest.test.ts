import { describe, expect, it, vi } from "vitest";
import { Request, Response } from "express";
import { AppError } from "../src/errors";
import { createSaleSchema, rateSaleParamsSchema } from "../src/dtos/sales";
import { validateBody, validateParams } from "../src/middleware/validateRequest";

describe("validateRequest middleware", () => {
  it("validates create sale body and normalizes values", () => {
    const middleware = validateBody(createSaleSchema);
    const req = { body: { customer: " Ana ", product: " Laptop ", amount: "123.5" } } as Request;
    const res = {} as Response;
    const next = vi.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual({ customer: "Ana", product: "Laptop", amount: 123.5 });
  });

  it("returns AppError when body is invalid", () => {
    const middleware = validateBody(createSaleSchema);
    const req = { body: { customer: "", product: "Laptop", amount: 100 } } as Request;
    const res = {} as Response;
    const next = vi.fn();

    middleware(req, res, next);

    const error = next.mock.calls[0]?.[0];
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).statusCode).toBe(400);
  });

  it("validates params and converts id to number", () => {
    const middleware = validateParams(rateSaleParamsSchema);
    const req = { params: { id: "42" } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.params).toEqual({ id: 42 });
  });
});
