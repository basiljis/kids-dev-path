import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Globe, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REGIONAL_STATS, SPHERES } from "@/lib/universum-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Региональная аналитика — UNIVERSUM" },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const chartData = REGIONAL_STATS.map((s) => ({
    name: s.region,
    ...s.deficits,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Региональная аналитика</h1>
        <p className="mt-2 text-muted-foreground">
          Анализ дефицитов развития детей в регионах РФ на основе данных АИС ППк-Помощник.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего детей</p>
              <p className="text-2xl font-bold">2,130</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
              <MapPin className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Регионов</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2 text-green-500">
              <BarChart3 className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Рекомендовано закупок</p>
              <p className="text-2xl font-bold">45 ед.</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <h2 className="mb-6 text-xl font-bold">Распределение дефицитов по регионам (%)</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  borderRadius: "8px"
                }}
              />
              {Object.keys(SPHERES).map((key) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  name={SPHERES[key as keyof typeof SPHERES].label} 
                  fill={SPHERES[key as keyof typeof SPHERES].color}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {REGIONAL_STATS.map((region) => (
          <Card key={region.region} className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">{region.region}</h3>
              <Badge variant="outline">{region.totalChildren} детей</Badge>
            </div>
            <div className="space-y-4">
              {Object.entries(region.deficits).map(([key, val]) => (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{SPHERES[key as keyof typeof SPHERES].label}</span>
                    <span className="font-semibold">{val}% дефицитов</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${val}%`,
                        backgroundColor: SPHERES[key as keyof typeof SPHERES].color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
