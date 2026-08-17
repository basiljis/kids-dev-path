import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, ShieldCheck, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NAV = [
  { to: "/marketplace", label: "Каталог" },
  { to: "/marketplace/recommendations", label: "План развития (Пример)" },
  { to: "/vendor/add-product", label: "Для производителей" },
  { to: "/science", label: "Научная база" },
  { to: "/instructions", label: "Инструкции" },
  { to: "/parent/dashboard", label: "Кабинет" },
] as const;



export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Выход выполнен");
    router.history.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="UNIVERSUM Logo" 
            className="h-8 w-8 object-contain" 
          />
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
          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link to="/parent/dashboard">
                  <User className="size-4" /> Кабинет
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-destructive" onClick={handleLogout}>
                <LogOut className="size-4" /> Выход
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Войти</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth">Регистрация</Link>
              </Button>
            </>
          )}
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
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="UNIVERSUM Logo" 
              className="h-6 w-6 object-contain grayscale opacity-70" 
            />
            <p className="text-base font-extrabold tracking-tight">UNIVERSUM</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Экосистема психолого-педагогического сопровождения детей 0-18 лет.
          </p>

          <div className="mt-6 space-y-1 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Реквизиты:</p>
            <p>ИП Загладин В.С.</p>
            <p>ИНН: 770702169499</p>
            <p>ОГРНИП: 323774600132891</p>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Платформа</p>
          <ul className="mt-2 space-y-1.5 text-muted-foreground">
            <li>
              <Link to="/marketplace">Каталог</Link>
            </li>
            <li>
              <Link to="/marketplace/recommendations">Пример плана развития</Link>
            </li>
            <li>
              <Link to="/vendor/add-product">Для производителей</Link>
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
        <div className="text-sm">
          <p className="font-semibold text-foreground">Документы</p>
          <ul className="mt-2 space-y-1.5 text-muted-foreground">
            <li>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <p className="text-xs leading-relaxed">
                Данные детей обрабатываются по 152-ФЗ и доступны только в защищённом
                личном кабинете.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        <p>© 2025–2026 UNIVERSUM. Все права защищены.</p>
      </div>
    </footer>
  );
}