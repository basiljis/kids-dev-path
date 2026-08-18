import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Database,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Plug,
  ShieldCheck,
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
                <Link to="/registry">Реестр оборудования</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="text-foreground/90 hover:text-foreground hover:bg-muted/80 border border-border/40 hover:border-border/80 shadow-sm">
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

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center">Как работает UNIVERSUM</h2>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Блок для родителей */}
          <div className="rounded-2xl bg-card border border-border/70 p-8 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-primary/10 p-2">
                <HeartHandshake className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Для родителей</h3>
            </div>
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border/60">
              {[
                { title: "Получите рецепт", text: "После консилиума ППк данные о дефицитах ребенка автоматически попадают в систему." },
                { title: "Выберите решение", text: "Маркетплейс предложит только те тренажеры, которые доказанно помогают в вашей ситуации." },
                { title: "Занимайтесь дома", text: "Арендуйте или купите оборудование, а результаты тренировок увидит ваш педагог." },
              ].map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-base leading-tight">{step.title}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/80">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Блок для организаций */}
          <div className="rounded-2xl bg-card border border-border/70 p-8 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Для организаций</h3>
            </div>
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border/60">
              {[
                { title: "Синхронизируйте ППк", text: "Бесшовная интеграция с АИС ППк-Помощник для мгновенного подбора оборудования." },
                { title: "Обоснуйте закупки", text: "Формируйте перечень оборудования на основе реальной статистики дефицитов в регионе и рекомендаций АИС ППк-Помощник." },
                { title: "Контролируйте эффект", text: "Отслеживайте динамику развития каждого ребенка через автоматический сбор данных." },
              ].map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-base leading-tight">{step.title}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/80">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center">Кому подходит UNIVERSUM</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <Card key={a.title} className="p-6 shadow-[var(--shadow-elegant)] border-border/70 hover:border-primary/30 transition-colors">
              <div className="rounded-lg bg-primary/10 p-2 w-fit mb-4">
                <a.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{a.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 mt-16 border-t border-border/40 pt-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-8 shadow-[var(--shadow-elegant)] border-border/70 bg-card/50 backdrop-blur-sm">
            <Award className="size-8 text-primary mb-6" />
            <h3 className="font-bold text-xl leading-tight">Интеллектуальная собственность</h3>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
              <p>
                <span className="font-bold text-foreground">АИС ППк</span> — Свидетельство РЦИС № 0864-181-444.
              </p>
              <p>
                Депонированная программа для ЭВМ, обеспечивающая автоматизацию консилиумов.
              </p>
              <p className="text-sm text-muted-foreground pt-2 border-t border-border/50">
                Рег. номер: 307-082-374.
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-[var(--shadow-elegant)] border-border/70 bg-card/50 backdrop-blur-sm">
            <ShieldCheck className="size-8 text-primary mb-6" />
            <h3 className="font-bold text-xl leading-tight">Безопасность (ФЗ-152)</h3>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
              <p>
                Соответствие уровню защищённости <span className="font-bold text-foreground">УЗ-1</span>.
              </p>
              <p>
                Обработка специальных категорий персональных данных (сведения о здоровье).
              </p>
              <p>
                Размещение в защищённом контуре на территории РФ.
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-[var(--shadow-elegant)] border-border/70 bg-card/50 backdrop-blur-sm">
            <Database className="size-8 text-primary mb-6" />
            <h3 className="font-bold text-xl leading-tight">Реестр ПО</h3>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
              <p>
                Внесено в <span className="font-bold text-foreground text-balance">Единый реестр российского ПО</span> Минцифры России.
              </p>
              <p>
                Совместимость с АИС ДОНМ и государственными информационными системами.
              </p>
            </div>
          </Card>
        </div>
        <div className="mt-10 text-center">
          <Button variant="link" asChild className="text-muted-foreground hover:text-primary transition-colors">
            <a href="https://unvrsm.ru/legal" target="_blank" rel="noopener noreferrer" className="gap-2 text-base">
              Правовая информация и документы <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
