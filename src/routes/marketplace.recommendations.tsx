import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/universum/product-card";
import { 
  PRODUCTS, 
  OVZ_LABELS, 
  CHILDREN, 
  generatePrescription,
  type ProductRecommendation
} from "@/lib/universum-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Sparkles } from "lucide-react";

export const Route = createFileRoute("/marketplace/recommendations")({
  head: () => ({
    meta: [
      { title: "Персональные рекомендации по дефицитам — UNIVERSUM" },
    ],
  }),
  component: RecommendationsPage,
});

const TARGET_OVZ = ["RAS", "ZPR", "TNR", "DCP", "typical"];

function RecommendationsPage() {
  const child = CHILDREN[0]!; // Demo child Dima K. (RAS)
  const personalRecs = generatePrescription(child);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Персональный план развития
        </h1>
        <div className="mt-4 flex flex-col items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-1 border-primary/30">
            Ребёнок: {child.name} ({child.ageMonths / 12} лет)
          </Badge>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Система UNIVERSUM проанализировала дефициты и подобрала решения с максимальным прогнозом коррекции.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        {/* Section 1: Deficit-based Personalized Recommendations */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BrainCircuit className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Подобранно по дефицитам
                </h2>
                <p className="text-sm text-muted-foreground">
                  Приоритетные решения для {child.name} на основе анализа API
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex gap-1">
              <Sparkles className="size-3" /> Smart Match
            </Badge>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {personalRecs.map((rec: ProductRecommendation) => (
              <ProductCard 
                key={rec.product.id} 
                product={rec.product} 
                recommended 
                reasons={rec.reasons}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Catalog by Diagnosis (Legacy view) */}
        <div className="pt-10 border-t border-border">
          <h2 className="text-xl font-bold text-center mb-8">Исследовать по категориям ОВЗ</h2>
          <div className="space-y-12">
            {TARGET_OVZ.map((ovzKey) => {
              const recommendedProducts = PRODUCTS.filter((p) => p.ovz.includes(ovzKey));
              
              if (recommendedProducts.length === 0) return null;

              return (
                <section key={ovzKey} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-4">
                    <h3 className="text-lg font-bold tracking-tight">
                      {OVZ_LABELS[ovzKey] || ovzKey}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {recommendedProducts.length} решений
                    </Badge>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {recommendedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="mt-20 rounded-3xl bg-gradient-to-br from-muted/50 to-muted border border-border/50 p-12 text-center">
        <h3 className="text-2xl font-bold">Нужна глубокая аналитика?</h3>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Загрузите данные из АИС ППк-Помощник для автоматического расчёта 
          индивидуального образовательного маршрута.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="rounded-full px-8">
            Загрузить данные ППк
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Полный каталог
          </Button>
        </div>
      </div>
    </div>
  );
}
