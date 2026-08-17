import { createFileRoute } from "@tanstack/react-router";
import { 
  Factory, 
  Rocket, 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  CheckCircle2,
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-from)_0%,_transparent_50%)] from-primary" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
            Платформа для роста вашего бизнеса
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Станьте частью экосистемы <span className="text-primary">UNIVERSUM</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Мы объединяем производителей высокотехнологичного оборудования с образовательными и медицинскими организациями через единую систему Smart Match.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
              <a href="#contact-form">Стать партнером</a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-white/20 hover:bg-white/10">
              Посмотреть возможности
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Что дает UNIVERSUM производителю?</h2>
            <p className="mt-4 text-muted-foreground">Инструменты для масштабирования и научного подтверждения ценности продукта.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8 hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
              <div className="p-3 bg-blue-50 rounded-lg w-fit dark:bg-blue-900/20">
                <Globe className="size-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Выход на рынки B2B и B2G</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ваш продукт становится доступен тысячам школ, детских садов и ППМС-центров, которые уже используют АИС ППк-Помощник.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
              <div className="p-3 bg-purple-50 rounded-lg w-fit dark:bg-purple-900/20">
                <BrainCircuit className="size-8 text-purple-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Научная валидация (Smart Match)</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Мы помогаем связать функционал вашего оборудования с 5 сферами развития ребенка, создавая доказательную базу для специалистов.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
              <div className="p-3 bg-green-50 rounded-lg w-fit dark:bg-green-900/20">
                <Rocket className="size-8 text-green-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Прямая интеграция API</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Передавайте данные о результатах занятий напрямую в цифровую карту развития ребенка, подтверждая эффективность вашего решения.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">4 простых шага к интеграции</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Заявка на партнерство", text: "Заполните форму ниже. Мы проверим соответствие вашего продукта стандартам безопасности и педагогической ценности." },
                  { step: "02", title: "Маппинг дефицитов", text: "Наши эксперты помогут определить, на какие именно метрики API UNIVERSUM влияет ваше оборудование." },
                  { step: "03", title: "Техническое подключение", text: "Интеграция по протоколу API v2.1 или SCORM 1.2 для обмена данными о прогрессе детей." },
                  { step: "04", title: "Запуск продаж", text: "Ваш товар появляется в каталоге и начинает рекомендоваться системой Smart Match на основе реальных дефицитов детей." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-3xl font-black text-primary/20 tabular-nums">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Card id="contact-form" className="p-8 border-primary/20 shadow-xl">
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
                  <p className="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и условиями обработки данных (ФЗ-152).
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Block */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-medium mb-8">
            <ShieldCheck className="size-4" /> Полное соответствие ГОСТ и ФЗ-152
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-12">Технологический стек для вендоров</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">SCORM 1.2</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Стандарт контента</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">REST API</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Обмен данными</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">УЗ-1</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Защита данных</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">PWA / WEB</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Кроссплатформенность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Готовы масштабировать свой продукт?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Присоединяйтесь к крупнейшему маркетплейсу коррекционного оборудования в России и СНГ.
          </p>
          <Button variant="secondary" size="lg" className="mt-8 px-10 rounded-full" asChild>
            <a href="#contact-form">Начать сотрудничество <ArrowRight className="ml-2 size-4" /></a>
          </Button>
        </div>
      </section>
    </div>
  );
}
