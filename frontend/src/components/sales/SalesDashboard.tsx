"use client";

import { useEffect, useState } from "react";
import { ReceiptText, Star } from "lucide-react";
import { SaleForm } from "@/components/sales/SaleForm";
import { SalesTable } from "@/components/sales/SalesTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { salesApiClient } from "@/lib/api";
import { CreateSalePayload, Sale } from "@/types/sale";

interface SalesDashboardProps {
  mode?: "sales" | "evaluate";
}

export const SalesDashboard = ({ mode = "sales" }: SalesDashboardProps) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const scoredSales = sales.filter((sale) => sale.score !== null);
  const averageScore =
    scoredSales.length === 0
      ? null
      : scoredSales.reduce((sum, sale) => sum + (sale.score ?? 0), 0) / scoredSales.length;
  const showCreateForm = mode === "sales";

  const loadSales = async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const data = await salesApiClient.listSales();
      setSales(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar ventas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSales();
  }, []);

  const handleCreateSale = async (payload: CreateSalePayload): Promise<void> => {
    setSubmitting(true);
    setError("");
    setFeedback("");

    try {
      await salesApiClient.createSale(payload);
      setFeedback("Venta creada correctamente.");
      await loadSales();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la venta");
    } finally {
      setSubmitting(false);
    }
  };

  const handleScoreSelect = async (id: number, score: number): Promise<void> => {
    setSubmitting(true);
    setError("");
    setFeedback("");

    try {
      await salesApiClient.rateSale(id, { score });
      setFeedback("Score actualizado.");
      await loadSales();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar score");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-800/30 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <ReceiptText className="h-4 w-4" />
          Sales App v2
        </p>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
          {showCreateForm ? "Gestión simple de ventas" : "Evaluación de ventas"}
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
          {showCreateForm
            ? "Crea ventas, visualiza el historial y califica cada operación del 1 al 5 para evaluación rápida."
            : "Asigna un score del 1 al 5 a las ventas registradas y revisa el promedio general."}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Ventas evaluadas</CardDescription>
            <CardTitle>{scoredSales.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Promedio de score</CardDescription>
            <CardTitle>{averageScore === null ? "Sin datos" : averageScore.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </section>

      {error && <p className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {feedback && (
        <p className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800">
          {feedback}
        </p>
      )}

      <section className={`grid gap-6 ${showCreateForm ? "lg:grid-cols-[380px_1fr]" : "lg:grid-cols-1"}`}>
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Nueva venta</CardTitle>
              <CardDescription>Registra cliente, producto y monto.</CardDescription>
            </CardHeader>
            <CardContent>
              <SaleForm onSubmit={handleCreateSale} isSubmitting={submitting} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-600" />
              Ventas registradas
            </CardTitle>
            <CardDescription>
              {showCreateForm
                ? "Selecciona una puntuación del 1 al 5 para cada venta."
                : "Evalúa cada venta rápidamente con una puntuación del 1 al 5."}
            </CardDescription>
          </CardHeader>
          <CardContent className="sales-scroll max-h-[520px] overflow-y-auto pr-2">
            {loading ? (
              <p className="text-sm text-zinc-600">Cargando ventas...</p>
            ) : (
              <SalesTable
                sales={sales}
                onScoreSelect={handleScoreSelect}
                disabled={submitting}
                showScoreValue={!showCreateForm}
              />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
