import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  Clock3,
  Plug,
  RefreshCcw,
  Star,
  Timer,
  Users2,
  Wrench,
  CreditCard,
  FileText,
  ShoppingCart,
  Info,
  ExternalLink,
  Eye,
} from "lucide-react";
import { DocViewer } from "@/components/universum/doc-viewer";
import { toast } from "sonner";
import { BillingForm } from "@/components/universum/billing-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SphereBadge } from "@/components/universum/sphere-badge";
import { SphereRadar } from "@/components/universum/sphere-radar";
import { ProductReviews } from "@/components/universum/product-reviews";
import {

  CATEGORY_LABELS,
  CHILDREN,
  OVZ_LABELS,
  PRODUCTS,
  formatAgeRange,
  formatPrice,
  sphereProfile,
} from "@/lib/universum-data";

export const Route = createFileRoute("/marketplace/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Решение не найдено — UNIVERSUM" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — UNIVERSUM` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — UNIVERSUM` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const child = CHILDREN[0]!;
  const profile = sphereProfile(product);
  const matchedDeficit = child.deficits.find((d) =>
    product.metrics.some((m) => m.metric === d.metric && m.impact > 60),
  );
  const impact = matchedDeficit
    ? product.metrics.find((m) => m.metric === matchedDeficit.metric)!.impact
    : 0;
  const [current, setCurrent] = useState<number[]>([matchedDeficit?.score ?? 30]);
  const projected = Math.min(95, Math.round(current[0]! + (impact || 70) * 0.42));
  const [billingOpen, setBillingOpen] = useState(false);
  const [viewer, setViewer] = useState<{ url: string; title: string; isOpen: boolean }>({
    url: "",
    title: "",
    isOpen: false,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <DocViewer
        isOpen={viewer.isOpen}
        url={viewer.url}
        title={viewer.title}
        onClose={() => setViewer((v) => ({ ...v, isOpen: false }))}
      />
      <BillingForm 
        product={product} 
        open={billingOpen} 
        onOpenChange={setBillingOpen} 
      />
      <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
        ← Каталог
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-[image:var(--gradient-soft)] p-6">
            <SphereRadar values={profile} height={280} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="absolute right-4 top-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background transition-colors">
                    <Info className="size-5 text-primary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px] p-0 overflow-hidden border-none shadow-xl">
                  <div className="bg-[#1e2b5e] text-white p-5 space-y-3">
                    <p className="font-bold text-base">Анализ профиля воздействия</p>
                    <p className="text-sm leading-relaxed opacity-90">
                      Форма радара отражает специализацию устройства. Отсутствие заполнения в определенных секторах (например, в Эмоциональном блоке) указывает на то, что данное решение не предназначено для коррекции дефицитов в этой области.
                    </p>
                    <p className="opacity-70 italic text-[11px] pt-1 border-t border-white/20">
                      Все данные подтверждены исследованиями в научной базе ниже.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.vendor}</Badge>
              <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
              {product.validated ? (
                <Badge className="gap-1">
                  <BadgeCheck className="size-3" /> Валидировано UNIVERSUM
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1 text-warning">
                  <Clock3 className="size-3" /> На валидации
                </Badge>
              )}
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="size-4 text-warning" /> {product.rating} ({product.reviews} отзывов)
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-muted-foreground">{product.description}</p>
            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Users2, label: "Возраст", value: formatAgeRange(product.ageMinMonths, product.ageMaxMonths) },
              { icon: RefreshCcw, label: "Занятия", value: product.sessions },
              { icon: Timer, label: "Длительность", value: product.duration },
              { icon: Wrench, label: "Установка", value: product.setup },
            ].map((s) => (
              <Card key={s.label} className="p-4">
                <s.icon className="size-4 text-primary" />
                <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </Card>
            ))}
          </div>

          <section>
            <h2 className="text-xl font-bold tracking-tight">Влияние на развитие ребенка</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...new Set(product.metrics.map((m) => m.sphere))].map((s) => (
                <SphereBadge key={s} sphere={s} />
              ))}
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Метрика API</TableHead>
                    <TableHead className="w-24">Влияние</TableHead>
                    <TableHead>Научное обоснование</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.metrics.map((m) => (
                    <TableRow key={m.metric}>
                      <TableCell>
                        <p className="font-medium">{m.metricLabel}</p>
                        <code className="text-xs text-muted-foreground">{m.metric}</code>
                      </TableCell>
                      <TableCell className="font-semibold">{m.impact}%</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.basis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="rounded-xl border border-border/70 bg-card p-5">
            <h2 className="text-lg font-bold tracking-tight">Симуляция прогресса</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Текущий уровень метрики: <span className="font-semibold text-foreground">{current[0]}%</span>
            </p>
            <Slider
              className="mt-4"
              value={current}
              onValueChange={setCurrent}
              min={0}
              max={100}
              step={1}
              aria-label="Текущий уровень метрики"
            />
            <p className="mt-4 text-sm">
              Через 12 недель: <span className="font-semibold text-success">→ {projected}%</span>{" "}
              <span className="text-muted-foreground">
                ({projected >= 70 ? "норма" : projected >= 40 ? "ниже нормы" : "критический дефицит"})
              </span>
            </p>
          </section>

          <section className="rounded-xl border border-border/70 bg-card p-5">
            <h2 className="text-lg font-bold tracking-tight">Интеграция с экосистемой</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>✅ Автоматическая передача данных в карту ребёнка</li>
              <li>✅ Объективный мониторинг прогресса</li>
              <li>✅ Интеграция с АИС ППк-Помощник</li>
              <li>✅ Соответствие Р-1016</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.integrations.map((i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  <Plug className="size-3" /> {i}
                </Badge>
              ))}
            </div>
            <p className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              [Устройство] → [UNIVERSUM API] → [Карта ребёнка] → [Отчёт ППк]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">Научная база и доказательная эффективность</h2>
            <div className="space-y-4">
              {product.papers.map((p) => (
                <div key={p.doi} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-5 hover:border-primary/30 transition-colors group">
                  <div className="flex-1">
                    <p className="font-bold text-[15px] leading-tight group-hover:text-primary transition-colors">{p.title}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
                      <a 
                        href={`https://doi.org/${p.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline font-medium"
                      >
                        <FileText className="size-3" /> DOI: {p.doi}
                      </a>
                      <span className="opacity-70">{p.note}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[13px] text-primary h-8 px-2 hover:bg-primary/5 gap-1.5 font-medium whitespace-nowrap"
                      onClick={() => setViewer({
                        url: `https://unvrsm.ru/research/${p.doi}`,
                        title: p.title,
                        isOpen: true
                      })}
                    >
                      Читать на русском <Eye className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Accordion type="single" collapsible className="mt-6 border rounded-xl overflow-hidden bg-muted/20">
              <AccordionItem value="method" className="border-b-0 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Wrench className="size-4 text-primary" /> Методология измерения
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  Устройство фиксирует сырые показатели сессии, нормирует их по возрастным нормам
                  UNIVERSUM и передаёт нормализованный score (0-100) через API v2.1. Используется математическая модель фильтра Калмана для сглаживания артефактов движений.
                </AccordionContent>
              </AccordionItem>
              <Separator />
              <AccordionItem value="gold" className="border-b-0 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <BadgeCheck className="size-4 text-primary" /> Сравнение с золотым стандартом
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  Валидация проводилась путём сопоставления с экспертными оценками по шкале GMFM-88 и тестом Тулуз-Пьерона. 
                  Коэффициент корреляции Пирсона r = 0.82. Точность распознавания целевых паттернов 87% на выборке n=150 детей.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

            <section className="mt-12">
              <ProductReviews reviews={product.userReviews || []} />
            </section>

        </div>

        <aside>
          <div className="sticky top-24 space-y-4">
            <Card className="p-5 shadow-[var(--shadow-card)]">
              <Tabs defaultValue="purchase">
                <TabsList className="w-full">
                  <TabsTrigger value="purchase" className="flex-1">Покупка</TabsTrigger>
                  <TabsTrigger value="rental" className="flex-1">Аренда</TabsTrigger>
                  <TabsTrigger value="sub" className="flex-1">Подписка</TabsTrigger>
                </TabsList>
                <TabsContent value="purchase" className="pt-4">
                  <p className="text-2xl font-extrabold">{formatPrice(product.pricePurchase)}</p>
                  <p className="text-sm text-muted-foreground">единоразово, с установкой</p>
                </TabsContent>
                <TabsContent value="rental" className="pt-4">
                  <p className="text-2xl font-extrabold">{formatPrice(product.priceRental)}</p>
                  <p className="text-sm text-muted-foreground">в месяц, минимум 3 месяца</p>
                </TabsContent>
                <TabsContent value="sub" className="pt-4">
                  <p className="text-2xl font-extrabold">
                    {formatPrice(Math.round(product.priceRental * 0.6))}
                  </p>
                  <p className="text-sm text-muted-foreground">в месяц при годовой оплате</p>
                </TabsContent>
              </Tabs>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Button className="w-full gap-2" onClick={() => toast.success("Переход к оформлению заказа")}>
                  <ShoppingCart className="size-4" /> Оформить заказ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full gap-2" 
                  onClick={() => setBillingOpen(true)}
                >
                  <FileText className="size-4" /> Оплата по реквизитам
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-muted-foreground"
                  onClick={() => toast("Добавлено в цифровой рецепт")}
                >
                  Добавить в рецепт
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Совместимость: {product.ovz.map((o) => OVZ_LABELS[o]).join(", ")}
              </p>
            </Card>

            {matchedDeficit && (
              <Card className="border-primary/30 bg-primary/5 p-5">
                <p className="text-sm font-semibold">🎯 Рекомендовано для вашего ребёнка</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Дефицит «{matchedDeficit.metricLabel}»: {matchedDeficit.score}% → прогноз{" "}
                  <span className="font-semibold text-foreground">
                    {Math.min(95, Math.round(matchedDeficit.score + impact * 0.42))}%
                  </span>{" "}
                  через 12 недель.
                </p>
                <Button variant="ghost" size="sm" className="mt-3 px-0" asChild>
                  <Link to="/parent/dashboard">Открыть цифровой рецепт →</Link>
                </Button>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}