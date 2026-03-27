export interface Sale {
  id: number;
  customer: string;
  product: string;
  amount: number;
  score: number | null;
  createdAt: string;
}

export interface CreateSaleInput {
  customer: string;
  product: string;
  amount: number;
}

export interface RateSaleInput {
  score: number;
}
