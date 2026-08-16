import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/universum/product-card";
import { PRODUCTS, OVZ_LABELS } from "@/lib/universum-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/marketplace/recommendations")({
  head: () => ({
    meta: [
      { title: "Рекомендованное оборудование по категориям ОВЗ — UNIVERSUM" },
    ],
  }),
  component: RecommendationsPage,
});

const TARGET_OVZ = ["RAS", "ZPR", "TNR", "DCP", "typical"];

function RecommendationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Рекомендованное оборудование
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Специализированные решения, сгруппированные по основным категориям развития и нозологиям.
        </p>
      </div>

      <div className="space-y-16">
        {TARGET_OVZ.map((ovzKey) => {
          const recommendedProducts = PRODUCTS.filter((p) => p.ovz.includes(ovzKey));
          
          if (recommendedProducts.length === 0) return null;

          return (
            <section key={ovzKey} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  {OVZ_LABELS[ovzKey] || ovzKey}
                </h2>
                <Badge variant="secondary" className="text-sm">
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
      
      {/* Fallback info */}
      <div className="mt-20 rounded-2xl bg-muted p-8 text-center">
        <h3 className="text-xl font-semibold">Не нашли подходящее решение?</h3>
        <p className="mt-2 text-muted-foreground">
          Воспользуйтесь полным каталогом с расширенными фильтрами по 5 сферам развития.
        </p>
        <div className="mt-6">
          <Badge variant="outline" className="px-4 py-2 text-base">
            <a href="/marketplace">Перейти в полный каталог →</a>
          </Badge>
        </div>
      </div>
    </div>
  );
}
