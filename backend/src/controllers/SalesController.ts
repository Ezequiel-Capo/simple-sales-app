import { Request, Response } from "express";
import { CreateSaleDto, RateSaleDto } from "../dtos/sales";
import { SalesService } from "../services/SalesService";

export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  createSale = (
    req: Request<Record<string, never>, { data: unknown }, CreateSaleDto>,
    res: Response
  ): void => {
    const sale = this.salesService.createSale(req.body);
    res.status(201).json({ data: sale });
  };

  listSales = (_req: Request, res: Response): void => {
    const sales = this.salesService.listSales();
    res.status(200).json({ data: sales });
  };

  rateSale = (req: Request<{ id: string }, { data: unknown }, RateSaleDto>, res: Response): void => {
    const id = Number(req.params.id);
    const sale = this.salesService.rateSale(id, req.body);
    res.status(200).json({ data: sale });
  };
}
