import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/universum/product-card";
import {
  CATEGORY_LABELS,
  CHILDREN,
  OVZ_LABELS,
  PRODUCTS,
  SPHERES,
  SPHERE_ORDER,
  formatPrice,
  recommendedProductIds,
  type ProductCategory,
  type SphereKey,
} from "@/lib/universum-data";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Каталог оборудования — UNIVERSUM" },
      {
        name: "description",
        content:
          "Фильтруйте коррекционное оборудование и цифровые тренажёры по сферам развития, возрасту, категории ОВЗ и цене.",
      },
      { property: "og:title", content: "Каталог оборудования — UNIVERSUM" },
      {
        property: "og:description",
        content: "Оборудование, привязанное к метрикам развития детей 0-18 лет.",
      },
    ],
  }),
  component: MarketplacePage,
});

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function MarketplacePage() {
  const child = CHILDREN[0]!;
  const recommended = useMemo(() => recommendedProductIds(child), [child]);
  const isMobile = useIsMobile();

  const [spheres, setSpheres] = useState<SphereKey[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [ovz, setOvz] = useState<string[]>([]);
  const [validatedOnly, setValidatedOnly] = useState(false);
  const [ageYears, setAgeYears] = useState<number[]>([0, 18]);
  const [price, setPrice] = useState<number[]>([0, 500000]);

  const products = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        const productSpheres = new Set(p.metrics.map((m) => m.sphere));
        if (spheres.length && !spheres.some((s) => productSpheres.has(s))) return false;
        if (categories.length && !categories.includes(p.category)) return false;
        if (ovz.length && !ovz.some((o) => p.ovz.includes(o))) return false;
        if (validatedOnly && !p.validated) return false;
        if (p.ageMinMonths / 12 > ageYears[1]! || p.ageMaxMonths / 12 < ageYears[0]!) return false;
        if (p.pricePurchase < price[0]! || p.pricePurchase > price[1]!) return false;
        return true;
      }),
    [spheres, categories, ovz, validatedOnly, ageYears, price],
  );

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold">Сферы развития</p>
        <div className="mt-3 space-y-2.5">
          {SPHERE_ORDER.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Checkbox
                id={`sphere-${s}`}
                checked={spheres.includes(s)}
                onCheckedChange={() => setSpheres((v) => toggle(v, s))}
              />
              <Label htmlFor={`sphere-${s}`} className="flex items-center gap-2 text-sm font-normal">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: SPHERES[s].color }}
                  aria-hidden
                />
                {SPHERES[s].label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-semibold">Тип решения</p>
        <div className="mt-3 space-y-2.5">
          {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${c}`}
                checked={categories.includes(c)}
                onCheckedChange={() => setCategories((v) => toggle(v, c))}
              />
              <Label htmlFor={`cat-${c}`} className="text-sm font-normal">
                {CATEGORY_LABELS[c]}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-semibold">
          Возраст: {ageYears[0]}–{ageYears[1]} лет
        </p>
        <Slider
          className="mt-4"
          value={ageYears}
          onValueChange={setAgeYears}
          min={0}
          max={18}
          step={1}
          aria-label="Возраст ребёнка"
        />
      </div>
      <Separator />
      <div>
        <p className="text-sm font-semibold">Категория ОВЗ</p>
        <div className="mt-3 space-y-2.5">
          {Object.entries(OVZ_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`ovz-${key}`}
                checked={ovz.includes(key)}
                onCheckedChange={() => setOvz((v) => toggle(v, key))}
              />
              <Label htmlFor={`ovz-${key}`} className="text-sm font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Checkbox
          id="validated"
          checked={validatedOnly}
          onCheckedChange={(v) => setValidatedOnly(Boolean(v))}
        />
        <Label htmlFor="validated" className="text-sm font-normal">
          Только валидировано UNIVERSUM
        </Label>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-semibold">
          Цена: {formatPrice(price[0]!)} – {formatPrice(price[1]!)}
        </p>
        <Slider
          className="mt-4"
          value={price}
          onValueChange={setPrice}
          min={0}
          max={500000}
          step={5000}
          aria-label="Цена покупки"
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Каталог оборудования</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Найдено решений: {products.length}. Бейдж «Рекомендовано ППк» — совпадение с
            демо-профилем ребёнка.
          </p>
        </div>
        {isMobile && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="size-4" /> Фильтры
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Фильтры</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-10">
                {filters}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
            {filters}
          </div>
        </aside>

        <div>
          <Tabs defaultValue="products" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="products" className="gap-2">
                  <Search className="size-4" /> Товары
                </TabsTrigger>
                <TabsTrigger value="filters" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="size-4" /> Фильтры
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="products">
              {products.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  Ничего не найдено. Смягчите фильтры.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} recommended={recommended.has(p.id)} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="filters" className="lg:hidden">
              <div className="rounded-xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
                {filters}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}