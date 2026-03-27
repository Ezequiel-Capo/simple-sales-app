export interface Sale {
  id: number;
  customer: string;
  product: string;
  amount: number;
  score: number | null;
  createdAt: string;
}

export interface CreateSalePayload {
  customer: string;
  product: string;
  amount: number;
}

export interface RateSalePayload {
  score: number;
}
