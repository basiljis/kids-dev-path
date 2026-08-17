import { createFileRoute } from "@tanstack/react-router";
import { 
  PRODUCTS, 
  CATEGORY_LABELS, 
  REGIONAL_STATS,
  type ProductCategory
} from "@/lib/universum-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 

  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Layers, Building2 } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/universum/product-card";

export const Route = createFileRoute("/registry")({
  head: () => ({
    meta: [
      { title: "Реестр оборудования по регионам — UNIVERSUM" },
      { name: "description", content: "Поиск сертифицированного оборудования по регионам и категориям." },
    ],
  }),
  component: RegistryPage,
});

function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const regions = REGIONAL_STATS.map(s => s.region).sort((a, b) => a.localeCompare('ru'));
  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    // In a real app, products would be linked to regions. 
    // For this demo, we'll simulate regional availability.
    const matchesRegion = regionFilter === "all" || 
                         (regionFilter === "Московская область" && ["kidalki-wall", "muse-bos", "voicekeeper-ai"].includes(product.id)) ||
                         (regionFilter === "Ленинградская область" && ["vr-social", "sensor-track", "logo-table"].includes(product.id));

    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Реестр оборудования и решений
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Единая база верифицированного оборудования с привязкой к региональным программам оснащения.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6 shadow-[var(--shadow-card)]">
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Поиск
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  placeholder="Название или вендор..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Регион
              </label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <MapPin className="size-4 mr-2 text-primary" />
                  <SelectValue placeholder="Все регионы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все регионы</SelectItem>
                  {regions.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Категория
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Layers className="size-4 mr-2 text-primary" />
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map(c => (
                    <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Всего в реестре:</span>
                <span className="font-bold">{PRODUCTS.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Найдено:</span>
                <span className="font-bold text-primary">{filteredProducts.length}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20 shadow-none">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="size-4 text-primary" />
              <h4 className="font-bold text-sm">Для организаций</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Реестр синхронизирован с нормативами Р-1016 и требованиями к оснащению коррекционных кабинетов.
            </p>
            <a 
              href="https://unvrsm.ru/legal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 text-[10px] text-primary hover:underline flex items-center gap-1"
            >
              Документация и регламенты
            </a>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border">
              <Search className="size-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setRegionFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
