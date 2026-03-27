import { describe, expect, it, vi } from "vitest";
import { Request, Response } from "express";
import { SalesController } from "../src/controllers/SalesController";
import { Sale } from "../src/models/Sale";

const createResponseMock = (): Response => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  } as unknown as Response;

  (res.status as unknown as ReturnType<typeof vi.fn>).mockReturnValue(res);
  return res;
};

describe("SalesController", () => {
  it("createSale responds 201 with created sale", () => {
    const sale: Sale = {
      id: 1,
      customer: "Acme",
      product: "Laptop",
      amount: 1200,
      score: null,
      createdAt: new Date().toISOString(),
    };

    const salesService = {
      createSale: vi.fn().mockReturnValue(sale),
      listSales: vi.fn(),
      rateSale: vi.fn(),
    };

    const controller = new SalesController(salesService as never);
    const req = { body: { customer: "Acme", product: "Laptop", amount: 1200 } } as Request;
    const res = createResponseMock();

    controller.createSale(req as never, res);

    expect(salesService.createSale).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: sale });
  });

  it("rateSale uses numeric id from validated params", () => {
    const sale: Sale = {
      id: 2,
      customer: "Globex",
      product: "Monitor",
      amount: 220,
      score: 5,
      createdAt: new Date().toISOString(),
    };

    const salesService = {
      createSale: vi.fn(),
      listSales: vi.fn(),
      rateSale: vi.fn().mockReturnValue(sale),
    };

    const controller = new SalesController(salesService as never);
    const req = { params: { id: 2 }, body: { score: 5 } } as unknown as Request;
    const res = createResponseMock();

    controller.rateSale(req as never, res);

    expect(salesService.rateSale).toHaveBeenCalledWith(2, { score: 5 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: sale });
  });
});
