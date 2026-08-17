import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ShieldCheck, Database, Award, ExternalLink } from "lucide-react";
import { PRODUCTS, SPHERES, SPHERE_ORDER, RESEARCH_BASE } from "@/lib/universum-data";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "Научная база, патенты и нормативные акты — UNIVERSUM" },
      {
        name: "description",
        content:
          "Методология 5 сфер развития, исследования с DOI, патенты РЦИС и нормативная база (ФЗ-152, Приказ 666).",
      },
      { property: "og:title", content: "Научная база и метрики — UNIVERSUM" },
      {
        property: "og:description",
        content: "Доказательная педагогика и юридическая чистота платформы UNIVERSUM.",
      },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  const papers = PRODUCTS.flatMap((p) => p.papers.map((paper) => ({ ...paper, product: p.name })));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Научная база и правовой статус</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Методология UNIVERSUM объединяет доказательную педагогику, высокие стандарты ИТ-безопасности 
            и полное соответствие законодательству РФ.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="https://unvrsm.ru/legal" target="_blank" rel="noopener noreferrer" className="gap-2">
              Нормативная база <ExternalLink className="size-3" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://unvrsm.ru/patents" target="_blank" rel="noopener noreferrer" className="gap-2">
              Патенты <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <Award className="size-8 text-primary" />
          <h3 className="mt-4 font-bold text-lg">Интеллектуальная собственность</h3>
          <div className="mt-2 space-y-3 text-sm text-muted-foreground">
            <p><strong>АИС ППк</strong> — Свидетельство РЦИС № 0864-181-444.</p>
            <p>Депонированная программа для ЭВМ, обеспечивающая автоматизацию консилиумов.</p>
            <p>Рег. номер: 307-082-374.</p>
          </div>
        </Card>

        <Card className="p-6">
          <ShieldCheck className="size-8 text-primary" />
          <h3 className="mt-4 font-bold text-lg">Безопасность (ФЗ-152)</h3>
          <div className="mt-2 space-y-3 text-sm text-muted-foreground">
            <p>Соответствие уровню защищённости <strong>УЗ-1</strong>.</p>
            <p>Обработка специальных категорий персональных данных (сведения о здоровье).</p>
            <p>Размещение в защищённом контуре на территории РФ.</p>
          </div>
        </Card>

        <Card className="p-6">
          <Database className="size-8 text-primary" />
          <h3 className="mt-4 font-bold text-lg">Реестр ПО</h3>
          <div className="mt-2 space-y-3 text-sm text-muted-foreground">
            <p>Внесено в <strong>Единый реестр российского ПО</strong> Минцифры России.</p>
            <p>Совместимость с АИС ДОНМ и государственными информационными системами.</p>
          </div>
        </Card>
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Методология 5 сфер развития</h2>
      <p className="mt-2 text-muted-foreground">
        Каждое решение в каталоге привязано к метрикам API UNIVERSUM на основе научных исследований.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPHERE_ORDER.map((s) => (
          <Card key={s} className="p-5 border-l-4" style={{ borderLeftColor: SPHERES[s].color }}>
            <p className="font-bold text-lg">{SPHERES[s].label}</p>
            <p className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">Метрики API:</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {[
                ...new Set(
                  PRODUCTS.flatMap((p) => p.metrics.filter((m) => m.sphere === s).map((m) => m.metricLabel)),
                ),
              ].join(", ") || "—"}
            </p>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Публикации и доказательная база</h2>
      <div className="mt-6 space-y-4">
        {papers.map((p) => (
          <div key={p.doi + p.product} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-5">
            <div className="flex-1">
              <p className="font-bold">{p.title}</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a 
                  href={`https://doi.org/${p.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <BookOpen className="size-3" /> DOI: {p.doi}
                </a>
                <span>{p.note}</span>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit shrink-0">
              {p.product}
            </Badge>
          </div>
        ))}
      </div>


      <h2 className="mt-16 text-2xl font-bold tracking-tight">Нормативно-правовое регулирование</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2"><ArrowRight className="size-4 text-primary" /> Законодательство РФ</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><strong>ФЗ-273 «Об образовании»:</strong> Регулирует психолого-педагогическую помощь и деятельность ППк.</li>
            <li><strong>ФЗ-152 «О персональных данных»:</strong> Требования к защите сведений о детях и родителях.</li>
            <li><strong>ФЗ-124 «О гарантиях прав ребёнка»:</strong> Защита интересов несовершеннолетних в цифровой среде.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2"><ArrowRight className="size-4 text-primary" /> Ведомственные приказы</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><strong>Приказ ДОНМ № 666:</strong> Основополагающий регламент работы школьных консилиумов г. Москвы.</li>
            <li><strong>Распоряжение Минпросвещения № Р-93:</strong> Федеральное положение о ППк.</li>
            <li><strong>СанПиН 1.2.3685-21:</strong> Гигиенические нормы работы с ЭСО и цифровыми тренажёрами.</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h3 className="text-xl font-bold">Протокол валидации UNIVERSUM</h3>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Каждое устройство проходит 4 этапа проверки: маппинг на метрику, корреляционный анализ (r ≥ 0.7), 
          пилотное исследование (n ≥ 20) и сертификацию.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <a href="https://unvrsm.ru/legal" target="_blank" rel="noopener noreferrer">Полная документация</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
