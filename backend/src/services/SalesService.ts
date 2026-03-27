import { AppError } from "../errors";
import { CreateSaleDto, RateSaleDto } from "../dtos/sales";
import { Sale } from "../models/Sale";
import { SalesRepository } from "../repositories/SalesRepository";

export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  createSale(input: CreateSaleDto): Sale {
    return this.salesRepository.create(input);
  }

  listSales(): Sale[] {
    return this.salesRepository.findAll();
  }

  rateSale(id: number, input: RateSaleDto): Sale {
    const updatedSale = this.salesRepository.updateScore(id, input.score);
    if (!updatedSale) {
      throw new AppError("sale not found", 404);
    }

    return updatedSale;
  }
}
