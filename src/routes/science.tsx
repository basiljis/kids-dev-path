import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, SPHERES, SPHERE_ORDER } from "@/lib/universum-data";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "Научная база и метрики — UNIVERSUM" },
      {
        name: "description",
        content:
          "Метрики пяти сфер развития, исследования с DOI и протокол валидации оборудования UNIVERSUM.",
      },
      { property: "og:title", content: "Научная база и метрики — UNIVERSUM" },
      {
        property: "og:description",
        content: "Как UNIVERSUM валидирует оборудование и измеряет прогресс ребёнка.",
      },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  const papers = PRODUCTS.flatMap((p) => p.papers.map((paper) => ({ ...paper, product: p.name })));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Научная база</h1>
      <p className="mt-2 text-muted-foreground">
        Каждое решение в каталоге привязано к метрикам API UNIVERSUM. Валидация включает проверку
        методологии измерения, сравнение с золотым стандартом и пилотное исследование.
      </p>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Пять сфер развития</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SPHERE_ORDER.map((s) => (
          <Card key={s} className="p-4">
            <span
              className="inline-block size-3 rounded-full"
              style={{ backgroundColor: SPHERES[s].color }}
              aria-hidden
            />
            <p className="mt-2 font-semibold">{SPHERES[s].label}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Метрики:{" "}
              {[
                ...new Set(
                  PRODUCTS.flatMap((p) => p.metrics.filter((m) => m.sphere === s).map((m) => m.metric)),
                ),
              ].join(", ") || "—"}
            </p>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Публикации и исследования</h2>
      <ul className="mt-4 space-y-3">
        {papers.map((p) => (
          <li key={p.doi + p.product} className="rounded-xl border border-border/70 bg-card p-4">
            <p className="font-medium">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              DOI: {p.doi} · {p.note}
            </p>
            <Badge variant="secondary" className="mt-2">
              {p.product}
            </Badge>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Нормативно-правовая база</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-bold">Федеральные законы</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>ФЗ-152 «О персональных данных» (УЗ-1)</li>
            <li>ФЗ-273 «Об образовании в РФ»</li>
            <li>ФЗ-124 «Об основных гарантиях прав ребёнка»</li>
            <li>ФЗ-181 «О социальной защите инвалидов»</li>
          </ul>
        </Card>
        <Card className="p-4">
          <h3 className="font-bold">Ведомственные акты</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>Приказ ДОНМ № 666 (Положение о ППк)</li>
            <li>Распоряжение Минпросвещения № Р-93</li>
            <li>СанПиН 1.2.3685-21 (Цифровая среда)</li>
            <li>ФГОС НОО ОВЗ (Приказ № 1598)</li>
          </ul>
        </Card>
      </div>
      <div className="mt-6 flex justify-center">
        <Button asChild variant="outline" size="sm">
          <a href="https://unvrsm.ru/legal" target="_blank" rel="noopener noreferrer" className="gap-2">
            Полный реестр на unvrsm.ru <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Протокол валидации</h2>
      <ol className="mt-3 list-inside list-decimal space-y-1.5 text-sm text-muted-foreground">
        <li>Проверка заявленного маппинга «устройство → метрика».</li>
        <li>Сравнение измерений с экспертной диагностикой (целевой r ≥ 0.7).</li>
        <li>Пилотное исследование не менее 20 детей целевой группы.</li>
        <li>Публикация результатов и присвоение статуса «Валидировано UNIVERSUM».</li>
      </ol>
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Данные синхронизированы с реестром отечественного ПО и патентами платформы.
      </p>
    </div>
  );
}