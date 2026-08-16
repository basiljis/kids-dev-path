import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/marketplace", label: "Каталог оборудования" },
  { to: "/vendor/add-product", label: "Для производителей" },
  { to: "/science", label: "Научная база" },
  { to: "/parent/dashboard", label: "Кабинет родителя" },
  { to: "/analytics", label: "Аналитика" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">UNIVERSUM</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/parent/dashboard">Войти</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/marketplace">Регистрация</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-background px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2.5 text-sm text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base font-extrabold tracking-tight">UNIVERSUM</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Экосистема психолого-педагогического сопровождения детей 0-18 лет.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Платформа</p>
          <ul className="mt-2 space-y-1.5 text-muted-foreground">
            <li>
              <Link to="/marketplace">Каталог</Link>
            </li>
            <li>
              <Link to="/parent/dashboard">Цифровой рецепт</Link>
            </li>
            <li>
              <Link to="/vendor/add-product">Добавить продукт</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Интеграции</p>
          <ul className="mt-2 space-y-1.5 text-muted-foreground">
            <li>
              <Link to="/science">Научная база</Link>
            </li>
            <li>API v2.1 / SCORM 1.2</li>
            <li>АИС ППк-Помощник</li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Данные детей</p>
          <p className="mt-2">
            Диагнозы и метрики обрабатываются по 152-ФЗ и доступны только в защищённом
            личном кабинете.
          </p>
        </div>
      </div>
    </footer>
  );
}