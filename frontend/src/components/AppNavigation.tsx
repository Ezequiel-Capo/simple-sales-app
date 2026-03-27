"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/sales", label: "Ventas" },
  { href: "/evaluar", label: "Evaluar" },
];

export const AppNavigation = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="text-sm font-black uppercase tracking-wider text-zinc-900">
          Sales App
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link href={item.href} key={item.href}>
                <Button size="sm" variant={active ? "primary" : "ghost"}>
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
