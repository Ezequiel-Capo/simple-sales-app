"use client";

import { Sale } from "@/types/sale";
import { ScoreSelector } from "@/components/sales/ScoreSelector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SalesTableProps {
  sales: Sale[];
  onScoreSelect: (id: number, score: number) => Promise<void>;
  disabled?: boolean;
  showScoreValue?: boolean;
}

const formatCreatedAt = (value: string): string => value.replace("T", " ").slice(0, 19);

export const SalesTable = ({ sales, onScoreSelect, disabled, showScoreValue = false }: SalesTableProps) => {
  if (sales.length === 0) {
    return <p className="text-sm text-zinc-600">No hay ventas registradas todavía.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-semibold">{sale.customer}</TableCell>
            <TableCell>{sale.product}</TableCell>
            <TableCell>${sale.amount.toFixed(2)}</TableCell>
            <TableCell>{formatCreatedAt(sale.createdAt)}</TableCell>
            <TableCell>
              {showScoreValue && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Actual: {sale.score === null ? "-" : sale.score}
                </p>
              )}
              <ScoreSelector
                currentScore={sale.score}
                onSelect={(score) => onScoreSelect(sale.id, score)}
                disabled={disabled}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
