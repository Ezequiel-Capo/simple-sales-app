import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createDatabase } from "./db/sqlite";
import { SalesController } from "./controllers/SalesController";
import { SalesRepository } from "./repositories/SalesRepository";
import { SalesService } from "./services/SalesService";
import { createSalesRouter } from "./routes/salesRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

const db = createDatabase();
const salesRepository = new SalesRepository(db);
const salesService = new SalesService(salesRepository);
const salesController = new SalesController(salesService);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/sales", createSalesRouter(salesController));
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});
