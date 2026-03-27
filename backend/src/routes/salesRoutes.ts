import { Router } from "express";
import { SalesController } from "../controllers/SalesController";
import { createSaleSchema, rateSaleParamsSchema, rateSaleSchema } from "../dtos/sales";
import { validateBody, validateParams } from "../middleware/validateRequest";

export const createSalesRouter = (salesController: SalesController): Router => {
  const router = Router();

  router.get("/", salesController.listSales);
  router.post("/", validateBody(createSaleSchema), salesController.createSale);
  router.post(
    "/:id/evaluate",
    validateParams(rateSaleParamsSchema),
    validateBody(rateSaleSchema),
    salesController.rateSale
  );

  return router;
};
