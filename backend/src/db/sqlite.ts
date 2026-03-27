import Database from "better-sqlite3";

const createSalesTableSql = `
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    product TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount > 0),
    score INTEGER CHECK(score >= 1 AND score <= 5),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`;

export const createDatabase = (): Database.Database => {
  const dbPath = process.env.DB_PATH ?? "./data/sales.db";
  const db = new Database(dbPath);

  db.pragma("journal_mode = WAL");
  db.exec(createSalesTableSql);

  return db;
};
