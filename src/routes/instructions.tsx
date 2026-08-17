import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  BookOpen, 
  Settings, 
  Users, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SPHERES, SPHERE_ORDER } from "@/lib/universum-data";

export const Route = createFileRoute("/instructions")({
  head: () => ({
    meta: [
      { title: "Инструкции и описание 5 блоков — UNIVERSUM" },
      {
        name: "description",
        content: "Подробное руководство по работе с платформой UNIVERSUM и описание 5 сфер развития ребёнка.",
      },
    ],
  }),
  component: InstructionsPage,
});

function InstructionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Инструкции</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Как работает экосистема UNIVERSUM: от диагностики до реабилитации.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href="https://unvrsm.ru/instructions" target="_blank" rel="noopener noreferrer" className="gap-2">
            Оригинал на unvrsm.ru <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Описание 5 сфер развития</h2>
        <p className="mt-2 text-muted-foreground">
          В основе UNIVERSUM лежит маппинг оборудования на 5 ключевых сфер развития ребёнка. 
          Это позволяет точно подбирать решения под конкретные дефициты.
        </p>
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPHERE_ORDER.map((s) => (
            <Card key={s} className="overflow-hidden border-l-4 p-5 shadow-sm" style={{ borderLeftColor: SPHERES[s].color }}>
              <h3 className="font-bold text-lg">{SPHERES[s].label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {s === 'cognitive' && "Память, внимание, мышление и исполнительные функции. База для любого обучения."}
                {s === 'speech' && "Фонематический слух, артикуляция, словарь и грамматический строй речи."}
                {s === 'emotional' && "Саморегуляция, контроль возбуждения, распознавание и выражение эмоций."}
                {s === 'social' && "Навыки коммуникации, совместное внимание, следование социальным правилам."}
                {s === 'motor' && "Зрительно-моторная координация, крупная и мелкая моторика, баланс."}
              </p>
              <Button variant="link" size="sm" className="mt-3 h-auto p-0" asChild>
                <Link to="/science" className="gap-1">
                  Научные метрики <ChevronRight className="size-3" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Роли в системе</h2>
        <div className="mt-6 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="orgs">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold">Организациям (Школы, ППМС-центры)</div>
                    <div className="text-sm font-normal text-muted-foreground">Контроль команды и соответствие ФЗ-152.</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-muted-foreground leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Регистрация:</strong> Ввод ИНН и данных организации. Проверка соответствия образовательным стандартам.</li>
                  <li><strong>Сотрудники:</strong> Добавление психологов, логопедов и дефектологов. Разграничение прав доступа.</li>
                  <li><strong>KPI и отчёты:</strong> Автоматическая выгрузка статистики посещаемости и эффективности коррекции.</li>
                  <li><strong>Интеграция:</strong> Поддержка АИС ППк-Помощник для бесшовной передачи данных.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="specialists">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30">
                    <Settings className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold">Специалистам</div>
                    <div className="text-sm font-normal text-muted-foreground">Подбор оборудования под дефициты ребёнка.</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-muted-foreground leading-relaxed">
                <p>Используйте научную базу для формирования ИПКР:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Просмотр маппинга «устройство — метрика» в <Link to="/science" className="text-primary hover:underline">Научной базе</Link>.</li>
                  <li>Анализ прогнозируемого влияния на дефициты (impact &gt; 60%).</li>
                  <li>Добавление собственных разработок через <Link to="/vendor/add-product" className="text-primary hover:underline">панель производителя</Link>.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="parents">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold">Родителям</div>
                    <div className="text-sm font-normal text-muted-foreground">Персональный план развития.</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-muted-foreground leading-relaxed">
                <p>Получите прозрачный путь развития для вашего ребёнка:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Регистрация в <Link to="/auth" className="text-primary hover:underline">Личном кабинете</Link>.</li>
                  <li>Получение цифрового рецепта на основе заключения ППк.</li>
                  <li>Заказ или аренда оборудования напрямую в <Link to="/marketplace" className="text-primary hover:underline">Каталоге</Link>.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <div className="mt-16 rounded-2xl bg-muted/50 p-8">
        <div className="flex items-start gap-4">
          <Info className="mt-1 size-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold">Нормативная база</h3>
            <p className="mt-2 text-muted-foreground">
              Платформа UNIVERSUM полностью соответствует ФЗ-152, Приказу ДОНМ № 666 и распоряжениям Минпросвещения. 
              Все данные хранятся на защищённых серверах с уровнем УЗ-1.
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link to="/science">Подробнее о стандартах</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
