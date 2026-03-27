import Link from "next/link";
import { ArrowRight, ClipboardCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <section className="space-y-4 rounded-3xl border border-emerald-900/15 bg-white/90 p-6 shadow-[0_18px_38px_-28px_rgba(16,24,40,0.6)] sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-800/30 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Inicio
        </p>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
          Sales App 
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
          Registra ventas, evalua operaciones y revisa el promedio de score con una interfaz simple.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/sales">
            <Button>
              Ir a Ventas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/evaluar">
            <Button variant="outline">Ir a Evaluar</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-emerald-700" />
              Menu Ventas
            </CardTitle>
            <CardDescription>
              Carga nuevas ventas con validaciones basicas y observa feedback al instante.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-700" />
              Menu Evaluar
            </CardTitle>
            <CardDescription>
              Asigna score del 1 al 5 a cada venta y visualiza el promedio de evaluacion.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
