import { CreateSalePayload, RateSalePayload, Sale } from "@/types/sale";

interface ApiResponse<T> {
  data: T;
}

class SalesApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error ?? "Request failed");
    }

    const json = (await response.json()) as ApiResponse<T>;
    return json.data;
  }

  listSales(): Promise<Sale[]> {
    return this.request<Sale[]>("/sales");
  }

  createSale(payload: CreateSalePayload): Promise<Sale> {
    return this.request<Sale>("/sales", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  rateSale(id: number, payload: RateSalePayload): Promise<Sale> {
    return this.request<Sale>(`/sales/${id}/evaluate`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

export const salesApiClient = new SalesApiClient();
