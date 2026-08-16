import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Plug,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-universum.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/universum/product-card";
import { SphereBadge } from "@/components/universum/sphere-badge";
import { CHILDREN, PRODUCTS, SPHERES, SPHERE_ORDER, recommendedProductIds } from "@/lib/universum-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UNIVERSUM — цифровой рецепт развития ребёнка" },
      {
        name: "description",
        content:
          "Маркетплейс коррекционного оборудования и цифровых тренажёров, привязанных к дефицитам развития из заключения ППк.",
      },
      { property: "og:title", content: "UNIVERSUM — цифровой рецепт развития ребёнка" },
      {
        property: "og:description",
        content: "Подбор оборудования по 5 сферам развития и метрикам АИС ППк-Помощник.",
      },
    ],
  }),
  component: Index,
});

const AUDIENCES = [
  { icon: HeartHandshake, title: "Родителям", text: "Цифровой рецепт от ППк: что купить или арендовать именно вашему ребёнку." },
  { icon: GraduationCap, title: "Педагогам и психологам", text: "Подбор оборудования под ИПКР с научным обоснованием." },
  { icon: Building2, title: "Производителям", text: "Загрузка устройств и маппинг на метрики API UNIVERSUM." },
  { icon: Users, title: "Регионам", text: "Закупки на основе аналитики дефицитов и мониторинга Р-1016." },
];

function Index() {
  const child = CHILDREN[0]!;
  const recommended = recommendedProductIds(child);
  const featured = PRODUCTS.filter((p) => recommended.has(p.id)).slice(0, 3);

  return (
    <div>
      <section className="border-b border-border/70 bg-[image:var(--gradient-soft)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Badge variant="secondary" className="gap-1">
              <Plug className="size-3" /> Интеграция с АИС ППк-Помощник
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Цифровой рецепт развития вашего ребенка
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Подбор оборудования и тренажеров на основе заключения ППк и данных UNIVERSUM —
              по пяти сферам развития и конкретным метрикам дефицитов.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/marketplace">
                  Подобрать оборудование <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/vendor/add-product">Я производитель</Link>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {SPHERE_ORDER.map((s) => (
                <SphereBadge key={s} sphere={s} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)]">
            <img
              src={heroImage}
              alt="Ребёнок занимается на интерактивной стене вместе со специалистом"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight">Как это работает</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { icon: FlaskConical, title: "1. Заключение ППк", text: "АИС передаёт метрики дефицитов по 5 сферам." },
            { icon: Activity, title: "2. Подбор", text: "Движок ищет устройства с влиянием >60% на метрику." },
            { icon: BadgeCheck, title: "3. Заказ", text: "Покупка, аренда или подписка на решение." },
            { icon: Plug, title: "4. Мониторинг", text: "Данные с устройств возвращаются в карту ребёнка (Р-1016)." },
          ].map((step) => (
            <Card key={step.title} className="p-5 shadow-[var(--shadow-card)]">
              <step.icon className="size-5 text-primary" />
              <p className="mt-3 font-semibold">{step.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Рекомендации по демо-профилю</h2>
          <Button variant="ghost" asChild>
            <Link to="/marketplace">
              Весь каталог <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Профиль: {child.name}, {Math.round(child.ageMonths / 12)} лет — дефициты в сферах «
          {SPHERES.motor.label}» и «{SPHERES.speech.label}».
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} recommended />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Кому подходит</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <Card key={a.title} className="p-5 shadow-[var(--shadow-card)]">
              <a.icon className="size-5 text-primary" />
              <p className="mt-3 font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
