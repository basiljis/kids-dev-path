import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, ShieldCheck, X, User, LogOut, Info, Code, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



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
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground flex items-center gap-1.5"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            <Home className="size-4" /> Главная
          </Link>
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
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary transition-colors cursor-pointer text-left">Научная база</button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <ShieldCheck className="size-5 text-primary" />
                      Научная база UNIVERSUM
                    </DialogTitle>
                    <DialogDescription className="pt-4 space-y-4 text-foreground">
                      <p>
                        Платформа UNIVERSUM базируется на доказательных методах коррекционной педагогики и психологии. Мы интегрируем только те решения, которые прошли клиническую апробацию и имеют подтвержденную эффективность.
                      </p>
                      <div className="grid gap-3 mt-2">
                        <div className="flex gap-3 items-start">
                          <div className="p-1 bg-primary/10 rounded mt-0.5">
                            <Info className="size-4 text-primary" />
                          </div>
                          <p className="text-sm">Маппинг оборудования на 5 сфер развития (когнитивная, речевая, эмоциональная, социальная, моторная).</p>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="p-1 bg-primary/10 rounded mt-0.5">
                            <Info className="size-4 text-primary" />
                          </div>
                          <p className="text-sm">Использование международных стандартов оценки дефицитов и прогресса ребенка.</p>
                        </div>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to="/science">Перейти в полный раздел</Link>
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary transition-colors cursor-pointer text-left">API v2.1 / SCORM 1.2</button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Code className="size-5 text-primary" />
                      Технические стандарты
                    </DialogTitle>
                    <DialogDescription className="pt-4 space-y-4 text-foreground">
                      <p>
                        UNIVERSUM поддерживает современные стандарты обмена данными для образовательных и медицинских систем:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg border border-border">
                          <p className="font-bold text-sm">API v2.1 (RESTful)</p>
                          <p className="text-xs text-muted-foreground mt-1">Позволяет вендорам передавать данные о занятиях напрямую в личную карту ребенка в реальном времени.</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg border border-border">
                          <p className="font-bold text-sm">SCORM 1.2</p>
                          <p className="text-xs text-muted-foreground mt-1">Обеспечивает совместимость с интерактивным контентом и тренажерами от различных производителей.</p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary transition-colors cursor-pointer text-left">АИС ППк-Помощник</button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <LayoutDashboard className="size-5 text-primary" />
                      АИС ППк-Помощник
                    </DialogTitle>
                    <DialogDescription className="pt-4 space-y-4 text-foreground">
                      <p>
                        Глубокая интеграция с лидирующей системой психолого-педагогических консилиумов обеспечивает бесшовный путь от диагностики до реабилитации.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Автоматическая передача данных о дефицитах из заключения ППк.</li>
                        <li>Формирование «цифрового рецепта» на основе актуальных метрик.</li>
                        <li>Обратная связь: результаты занятий с оборудования UNIVERSUM возвращаются в систему для мониторинга динамики.</li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
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
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs hover:text-primary transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <ShieldCheck className="size-3 text-primary" />
                    Безопасность (ФЗ-152)
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <ShieldCheck className="size-5 text-primary" />
                      Безопасность и соответствие ФЗ-152
                    </DialogTitle>
                    <DialogDescription className="pt-4 space-y-4 text-foreground">
                      <p>
                        Платформа UNIVERSUM обеспечивает высший уровень защиты персональных данных в соответствии с законодательством РФ:
                      </p>
                      <div className="grid gap-4 mt-2">
                        <div className="p-3 bg-muted rounded-lg border border-border">
                          <p className="font-bold text-sm">Уровень защищённости УЗ-1</p>
                          <p className="text-xs text-muted-foreground mt-1">Максимальный уровень защиты для информационных систем, обрабатывающих специальные категории персональных данных (сведения о состоянии здоровья).</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-3 items-start">
                            <div className="p-1 bg-primary/10 rounded mt-0.5">
                              <Info className="size-4 text-primary" />
                            </div>
                            <p className="text-sm">Размещение данных исключительно в защищённых ЦОД на территории Российской Федерации.</p>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="p-1 bg-primary/10 rounded mt-0.5">
                              <Info className="size-4 text-primary" />
                            </div>
                            <p className="text-sm">Использование сертифицированных средств криптографической защиты информации (СКЗИ).</p>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="p-1 bg-primary/10 rounded mt-0.5">
                              <Info className="size-4 text-primary" />
                            </div>
                            <p className="text-sm">Регулярный аудит безопасности и контроль доступа согласно ролевой модели.</p>
                          </div>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full mt-4">
                        <Link to="/science">Подробнее в Научной базе</Link>
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <p className="text-xs leading-relaxed opacity-70">
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