import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ShieldCheck, Database, Award, ExternalLink, Eye } from "lucide-react";
import { PRODUCTS, SPHERES, SPHERE_ORDER, RESEARCH_BASE } from "@/lib/universum-data";
import { DocViewer } from "@/components/universum/doc-viewer";

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
  const [viewer, setViewer] = useState<{ url: string; title: string; isOpen: boolean }>({
    url: "",
    title: "",
    isOpen: false,
  });

  const papers = PRODUCTS.flatMap((p) => p.papers.map((paper) => ({ ...paper, product: p.name })));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <DocViewer
        isOpen={viewer.isOpen}
        url={viewer.url}
        title={viewer.title}
        onClose={() => setViewer((v) => ({ ...v, isOpen: false }))}
      />
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
          <div key={p.doi + p.product} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-5 hover:border-primary/30 transition-colors group">
            <div className="flex-1">
              <p className="font-bold text-[15px] leading-tight group-hover:text-primary transition-colors">{p.title}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
                <a 
                  href={`https://doi.org/${p.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  <BookOpen className="size-3" /> DOI: {p.doi}
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
              <Badge variant="secondary" className="w-fit shrink-0 px-2 py-0 text-[11px] uppercase tracking-wider font-bold">
                {p.product}
              </Badge>
            </div>
          </div>
        ))}
      </div>


      <h2 className="mt-16 text-2xl font-bold tracking-tight">Внутренние исследования и протоколы</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {RESEARCH_BASE.map((group) => (
          <Card key={group.category} className="p-6">
            <h3 className="font-bold text-lg mb-4">{group.category}</h3>
            <ul className="space-y-4">
              {group.items.map((item) => (
                <li key={item.title}>
                  <button 
                    onClick={() => setViewer({
                      url: item.url,
                      title: item.title,
                      isOpen: true
                    })}
                    className="group block text-left w-full"
                  >
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.note}</span>
                      <Eye className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Нормативно-правовое регулирование</h2>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-lg"><ArrowRight className="size-4 text-primary" /> Законодательство РФ</h3>
          <ul className="space-y-4">
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/fz-273.pdf",
                  title: "ФЗ-273 «Об образовании»",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  ФЗ-273 «Об образовании» <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Регулирует психолого-педагогическую помощь и деятельность ППк.</p>
              </button>
            </li>
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/fz-152.pdf",
                  title: "ФЗ-152 «О персональных данных»",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  ФЗ-152 «О персональных данных» <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Требования к защите сведений о детях и родителях.</p>
              </button>
            </li>
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/fz-124.pdf",
                  title: "ФЗ-124 «О гарантиях прав ребёнка»",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  ФЗ-124 «О гарантиях прав ребёнка» <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Защита интересов несовершеннолетних в цифровой среде.</p>
              </button>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-lg"><ArrowRight className="size-4 text-primary" /> Ведомственные приказы</h3>
          <ul className="space-y-4">
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/order-666.pdf",
                  title: "Приказ ДОНМ № 666",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Приказ ДОНМ № 666 <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Основополагающий регламент работы школьных консилиумов г. Москвы.</p>
              </button>
            </li>
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/order-r93.pdf",
                  title: "Распоряжение Минпросвещения № Р-93",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Распоряжение Минпросвещения № Р-93 <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Федеральное положение о ППк.</p>
              </button>
            </li>
            <li className="group">
              <button 
                onClick={() => setViewer({
                  url: "https://unvrsm.ru/legal/sanpin-3685.pdf",
                  title: "СанПиН 1.2.3685-21",
                  isOpen: true
                })}
                className="block text-left w-full transition-all"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  СанПиН 1.2.3685-21 <Eye className="size-3 opacity-0 group-hover:opacity-100" />
                </span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Гигиенические нормы работы с ЭСО и цифровыми тренажёрами.</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="mt-16 text-2xl font-bold tracking-tight">Совместимость и медицинские коды</h2>
      <div className="mt-6">
        <Card className="p-6 bg-muted/30">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="font-bold text-primary">РАС (F84.0)</p>
              <p className="text-sm text-muted-foreground">Расстройства аутистического спектра. Включает детский аутизм по МКБ-10.</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-primary">ЗПР</p>
              <p className="text-sm text-muted-foreground">Задержка психического развития. Отставание темпов развития психики.</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-primary">ДЦП</p>
              <p className="text-sm text-muted-foreground">Детский церебральный паралич. Группа двигательных нарушений.</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-primary">Без ОВЗ</p>
              <p className="text-sm text-muted-foreground">Дети без ограниченных возможностей здоровья. Нормотипичное развитие.</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic border-t pt-4">
            * Данные сокращения используются в системе Smart Match для автоматизированного подбора оборудования на основе клинических рекомендаций.
          </p>
        </Card>
      </div>

      <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h3 className="text-xl font-bold">Протокол валидации UNIVERSUM</h3>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Каждое устройство проходит 4 этапа проверки: маппинг на метрику, корреляционный анализ (r ≥ 0.7), 
          пилотное исследование (n ≥ 20) и сертификацию.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => setViewer({
              url: "https://unvrsm.ru/legal",
              title: "Полная документация (RU)",
              isOpen: true
            })}
          >
            Полная документация (RU)
          </Button>
          <Button asChild variant="outline">
            <a href="https://unvrsm.ru/research-methodology" target="_blank" rel="noopener noreferrer" className="gap-2">
              Методология исследований <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
