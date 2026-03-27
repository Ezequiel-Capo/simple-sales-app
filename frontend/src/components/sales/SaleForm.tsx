"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const saleFormSchema = z.object({
  customer: z.string().trim().min(2, "Cliente requerido (minimo 2 caracteres)"),
  product: z.string().trim().min(2, "Producto requerido (minimo 2 caracteres)"),
  amount: z.number().positive("Monto debe ser mayor a 0"),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

interface SaleFormProps {
  onSubmit: (values: SaleFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const SaleForm = ({ onSubmit, isSubmitting }: SaleFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      customer: "",
      product: "",
      amount: undefined,
    },
  });

  const submit = async (values: SaleFormValues): Promise<void> => {
    await onSubmit(values);
    reset({ customer: "", product: "", amount: undefined });
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(submit)}>
      <div className="grid gap-1">
        <label className="text-sm font-semibold text-zinc-700">Cliente</label>
        <Input placeholder="Nombre del cliente" {...register("customer")} />
        {errors.customer && <p className="text-xs text-red-600">{errors.customer.message}</p>}
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-zinc-700">Producto</label>
        <Input placeholder="Producto vendido" {...register("product")} />
        {errors.product && <p className="text-xs text-red-600">{errors.product.message}</p>}
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-zinc-700">Monto</label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Ej: 1200"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p className="text-xs text-red-600">{errors.amount.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Crear venta"}
      </Button>
    </form>
  );
};
