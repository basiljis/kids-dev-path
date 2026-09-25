import { createFileRoute } from "@tanstack/react-router";
import {
  Rocket,
  Globe,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
  MessageSquarePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/vendor/add-product")({
  head: () => ({
    meta: [
      { title: "Для производителей оборудования и ПО — UNIVERSUM" },
      {
        name: "description",
        content: "Присоединяйтесь к экосистеме UNIVERSUM. Прямой доступ к B2B и B2G рынкам, научная валидация и интеграция с АИС ППк.",
      },
      { property: "og:title", content: "Для производителей оборудования и ПО — UNIVERSUM" },
      { property: "og:description", content: "Партнерство с UNIVERSUM: доступ к организациям, научная валидация и интеграция оборудования и ПО." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VendorLandingPage,
});

function VendorLandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Заявка успешно отправлена! Наш менеджер свяжется с вами в течение 24 часов.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-14 text-background sm:py-24">
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
          <Badge className="mb-4 max-w-full border-primary/50 bg-primary/20 text-background hover:bg-primary/20">
            Платформа для роста вашего бизнеса
          </Badge>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Станьте частью экосистемы <span className="text-primary">UNIVERSUM</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:mt-6 sm:text-lg">
            Мы объединяем производителей высокотехнологичного оборудования с образовательными и медицинскими организациями через единую систему Smart Match.
          </p>
          <div className="mx-auto mt-8 grid max-w-sm gap-3 sm:mt-10 sm:max-w-none sm:grid-cols-[auto_auto] sm:justify-center sm:gap-4">
            <Button size="lg" className="h-12 w-full px-6 text-base font-semibold sm:w-auto sm:px-8" asChild>
              <a href="#contact-form">Стать партнером</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full border-background/70 bg-background/10 px-6 text-base font-semibold text-background hover:bg-background hover:text-foreground sm:w-auto sm:px-8">
              <a href="#benefits">Посмотреть возможности</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section id="benefits" className="scroll-mt-20 bg-background py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-9 text-center sm:mb-16">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Что дает UNIVERSUM производителю?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">Инструменты для масштабирования и научного подтверждения ценности продукта.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            <Card className="border-t-4 border-t-primary p-5 transition-shadow hover:shadow-lg sm:p-8">
              <div className="w-fit rounded-md bg-primary/10 p-3">
                <Globe className="size-7 text-primary sm:size-8" />
              </div>
              <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">Выход на рынки B2B и B2G</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                Ваш продукт становится доступен тысячам школ, детских садов и ППМС-центров, которые уже используют АИС ППк-Помощник.
              </p>
            </Card>

            <Card className="border-t-4 border-t-accent p-5 transition-shadow hover:shadow-lg sm:p-8">
              <div className="w-fit rounded-md bg-accent/15 p-3">
                <BrainCircuit className="size-7 text-accent-foreground sm:size-8" />
              </div>
              <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">Научная валидация (Smart Match)</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                Мы помогаем связать функционал вашего оборудования с 5 сферами развития ребенка, создавая доказательную базу для специалистов.
              </p>
            </Card>

            <Card className="border-t-4 border-t-secondary p-5 transition-shadow hover:shadow-lg sm:p-8">
              <div className="w-fit rounded-md bg-secondary p-3">
                <Rocket className="size-7 text-secondary-foreground sm:size-8" />
              </div>
              <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">Прямая интеграция API</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                Передавайте данные о результатах занятий напрямую в цифровую карту развития ребенка, подтверждая эффективность вашего решения.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/45 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="min-w-0 flex-1 space-y-7 sm:space-y-8">
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">4 простых шага к интеграции</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Заявка на партнерство", text: "Заполните форму ниже. Мы проверим соответствие вашего продукта стандартам безопасности и педагогической ценности." },
                  { step: "02", title: "Маппинг дефицитов", text: "Наши эксперты помогут определить, на какие именно метрики API UNIVERSUM влияет ваше оборудование." },
                  { step: "03", title: "Техническое подключение", text: "Интеграция по протоколу API v2.1 или SCORM 1.2 для обмена данными о прогрессе детей." },
                  { step: "04", title: "Запуск продаж", text: "Ваш товар появляется в каталоге и начинает рекомендоваться системой Smart Match на основе реальных дефицитов детей." }
                ].map((item) => (
                  <div key={item.step} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
                    <span className="text-2xl font-black tabular-nums text-primary/60 sm:text-3xl">{item.step}</span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold sm:text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex-1 lg:max-w-md">
              <Card id="contact-form" className="scroll-mt-20 border-primary/20 p-5 shadow-xl sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquarePlus className="size-6 text-primary" />
                  <h3 className="text-xl font-bold">Стать партнером</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Название компании / ИП</Label>
                    <Input id="company" placeholder="ООО Инновации в образовании" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product">Тип продукта</Label>
                    <Input id="product" placeholder="Интерактивное оборудование / ПО" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email представителя</Label>
                    <Input id="email" type="email" placeholder="partner@company.ru" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Краткое описание решения</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о пользе вашего продукта для развития детей..." 
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </Button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и условиями обработки данных (ФЗ-152).
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Block */}
      <section className="border-t bg-background py-14 sm:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground sm:mb-8 sm:text-sm">
            <ShieldCheck className="size-4" /> Полное соответствие ГОСТ и ФЗ-152
          </div>
          <h2 className="mb-8 text-2xl font-bold leading-tight sm:mb-12 sm:text-3xl">Технологический стек для вендоров</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-8">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">SCORM 1.2</p>
              <p className="text-xs uppercase text-muted-foreground">Стандарт контента</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">REST API</p>
              <p className="text-xs uppercase text-muted-foreground">Обмен данными</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">УЗ-1</p>
              <p className="text-xs uppercase text-muted-foreground">Защита данных</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">PWA / WEB</p>
              <p className="text-xs uppercase text-muted-foreground">Кроссплатформенность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Готовы масштабировать свой продукт?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Присоединяйтесь к крупнейшему маркетплейсу коррекционного оборудования в России и СНГ.
          </p>
          <Button variant="secondary" size="lg" className="mt-8 w-full px-6 sm:w-auto sm:px-10" asChild>
            <a href="#contact-form">Начать сотрудничество <ArrowRight className="ml-2 size-4" /></a>
          </Button>
        </div>
      </section>
    </div>
  );
}
