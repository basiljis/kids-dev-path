import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Calendar, ClipboardList, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SphereRadar } from "@/components/universum/sphere-radar";
import { CHILDREN, generatePrescription, SPHERES } from "@/lib/universum-data";

export const Route = createFileRoute("/parent/dashboard")({
  head: () => ({
    meta: [
      { title: "Личный кабинет родителя — UNIVERSUM" },
    ],
  }),
  component: ParentDashboard,
});

function ParentDashboard() {
  const child = CHILDREN[0]!;
  const prescription = generatePrescription(child);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Кабинет родителя</h1>
          <p className="mt-1 text-muted-foreground">
            Профиль ребёнка: <span className="font-semibold text-foreground">{child.name}</span>,{" "}
            {Math.floor(child.ageMonths / 12)} лет
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8">
            ID: {child.id}
          </Badge>
          <Badge className="h-8 bg-success/10 text-success border-success/20">
            Заключение ППк активно
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <TrendingUp className="size-5 text-primary" /> Профиль развития (5 сфер)
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center rounded-xl bg-[image:var(--gradient-soft)] p-4">
                <SphereRadar values={child.spheres} height={300} />
              </div>
              <div className="space-y-4">
                {Object.entries(child.spheres).map(([key, value]) => {
                  const sphere = SPHERES[key as keyof typeof SPHERES];
                  return (
                    <div key={key}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{sphere.label}</span>
                        <span className="text-muted-foreground">{value}%</span>
                      </div>
                      <Progress 
                        value={value} 
                        className="h-2" 
                        style={{ "--progress-foreground": sphere.color } as any}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <BadgeCheck className="size-5 text-primary" /> Цифровой рецепт
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {prescription.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex p-4">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{product.vendor}</p>
                      <h3 className="font-bold">{product.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.metrics.filter(m => child.deficits.some(d => d.metric === m.metric)).map(m => (
                          <Badge key={m.metric} variant="secondary" className="text-[10px]">
                            {m.metricLabel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t bg-muted/30 px-4 py-2 flex justify-between items-center">
                    <span className="text-sm font-semibold">Рекомендовано</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/marketplace/$id" params={{ id: product.id }}>Смотреть</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <Card className="p-5">
            <h3 className="mb-4 flex items-center gap-2 font-bold">
              <Calendar className="size-4 text-primary" /> Ближайшие занятия
            </h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 p-3 text-sm">
                <p className="font-semibold text-primary">Сегодня, 16:00</p>
                <p>Интерактивная стена «Кидалки»</p>
                <p className="mt-1 text-xs text-muted-foreground">Моторная сфера · 20 мин</p>
              </div>
              <div className="rounded-lg border border-border/50 p-3 text-sm">
                <p className="font-semibold">Завтра, 11:30</p>
                <p>VoiceKeeper AI (дома)</p>
                <p className="mt-1 text-xs text-muted-foreground">Речевая сфера · 15 мин</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full size-sm">
              Весь календарь
            </Button>
          </Card>

          <Card className="bg-primary text-primary-foreground p-5 shadow-lg shadow-primary/20">
            <h3 className="flex items-center gap-2 font-bold">
              <ClipboardList className="size-4" /> Аналитика ППк
            </h3>
            <p className="mt-2 text-sm opacity-90">
              На основе последних 12 сессий наблюдается прогресс в моторной сфере (+8% к норме).
            </p>
            <Button variant="secondary" className="mt-4 w-full">
              Скачать отчет Р-1016
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
