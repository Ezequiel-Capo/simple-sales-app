import Database from "better-sqlite3";
import { CreateSaleInput, Sale } from "../models/Sale";

interface SaleRow {
  id: number;
  customer: string;
  product: string;
  amount: number;
  score: number | null;
  created_at: string;
}

const mapRowToSale = (row: SaleRow): Sale => ({
  id: row.id,
  customer: row.customer,
  product: row.product,
  amount: row.amount,
  score: row.score,
  createdAt: row.created_at,
});

export class SalesRepository {
  constructor(private readonly db: Database.Database) {}

  create(input: CreateSaleInput): Sale {
    const insertStmt = this.db.prepare(
      `INSERT INTO sales (customer, product, amount) VALUES (?, ?, ?)`
    );

    const result = insertStmt.run(input.customer, input.product, input.amount);
    const insertedId = Number(result.lastInsertRowid);

    const sale = this.findById(insertedId);
    if (!sale) {
      throw new Error("Sale could not be created");
    }

    return sale;
  }

  findAll(): Sale[] {
    const stmt = this.db.prepare(`
      SELECT id, customer, product, amount, score, created_at
      FROM sales
      ORDER BY id DESC
    `);

    const rows = stmt.all() as SaleRow[];
    return rows.map(mapRowToSale);
  }

  findById(id: number): Sale | null {
    const stmt = this.db.prepare(`
      SELECT id, customer, product, amount, score, created_at
      FROM sales
      WHERE id = ?
    `);

    const row = stmt.get(id) as SaleRow | undefined;
    return row ? mapRowToSale(row) : null;
  }

  updateScore(id: number, score: number): Sale | null {
    const updateStmt = this.db.prepare(`UPDATE sales SET score = ? WHERE id = ?`);
    const result = updateStmt.run(score, id);

    if (result.changes === 0) {
      return null;
    }

    return this.findById(id);
  }
}
