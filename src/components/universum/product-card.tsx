import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Clock3, ExternalLink, Info, Sparkles, Target, ShoppingCart, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SphereBadge } from "./sphere-badge";
import { SphereRadar } from "./sphere-radar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { BillingForm } from "./billing-form";
import {
  CATEGORY_LABELS,
  formatAgeRange,
  formatPrice,
  sphereProfile,
  type Product,
  type RecommendationReason,
} from "@/lib/universum-data";

export function ProductCard({
  product,
  recommended = false,
  reasons = [],
}: {
  product: Product;
  recommended?: boolean;
  reasons?: RecommendationReason[];
}) {
  const profile = sphereProfile(product);
  const top = [...product.metrics].sort((a, b) => b.impact - a.impact).slice(0, 2);
  const isMobile = useIsMobile();
  const [billingOpen, setBillingOpen] = useState(false);

  return (
    <>
      <BillingForm 
        product={product} 
        open={billingOpen} 
        onOpenChange={setBillingOpen} 
      />
      <Card className="flex h-full flex-col overflow-hidden border-border/70 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-video bg-[image:var(--gradient-soft)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <SphereRadar values={profile} height={150} compact />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {recommended && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="gap-1 cursor-help">
                    <Target className="size-3" /> Для дефицитов
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] p-2">
                  <p className="text-xs font-semibold mb-1">Рекомендовано по дефицитам:</p>
                  <ul className="text-[10px] space-y-1">
                    {reasons.map(r => (
                      <li key={r.metric}>• {r.metricLabel} (Влияние: {r.impact}%)</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {product.validated ? (
            <Badge variant="secondary" className="gap-1 text-success">
              <BadgeCheck className="size-3" /> Валидировано
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1 text-warning">
              <Clock3 className="size-3" /> На проверке
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs text-muted-foreground">
            {product.vendor} · {CATEGORY_LABELS[product.category]}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatAgeRange(product.ageMinMonths, product.ageMaxMonths)} · {product.duration}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[...new Set(product.metrics.map((m) => m.sphere))].map((sphere) => (
            <SphereBadge key={sphere} sphere={sphere} />
          ))}
        </div>

        <ul className="space-y-1 text-xs text-muted-foreground">
          {top.map((m) => (
            <li key={m.metric} className="flex items-center gap-1">
              <span>Улучшает «{m.metricLabel}» на </span>
              <span className="font-semibold text-foreground">{m.impact}%</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex cursor-help items-center opacity-70 hover:opacity-100">
                      <Info className="size-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[240px] p-2 text-[10px] leading-relaxed">
                    <p className="font-semibold mb-1">Научное обоснование:</p>
                    {m.basis}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-sm font-semibold">{formatPrice(product.pricePurchase)}</p>
            <p className="text-xs text-muted-foreground">
              аренда {formatPrice(product.priceRental)}/мес
            </p>
          </div>
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="sm">Подробнее</Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <DrawerHeader className="text-left">
                  <DrawerTitle>{product.name}</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-8">
                   <div className="aspect-video bg-[image:var(--gradient-soft)] rounded-xl flex items-center justify-center mb-6">
                     <SphereRadar values={profile} height={200} />
                   </div>
                   <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                   
                   <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold mb-2">Ключевые показатели и обоснование</h4>
                      <div className="space-y-3">
                        {product.metrics.map(m => (
                          <div key={m.metric} className="p-3 border rounded-lg bg-card/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{m.metricLabel}</p>
                              <p className="text-sm font-bold text-primary">+{m.impact}%</p>
                            </div>
                            <p className="text-[11px] leading-relaxed text-muted-foreground">{m.basis}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {product.papers.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-sm font-bold mb-2">Научные публикации</h4>
                        <div className="space-y-2">
                          {product.papers.map(p => (
                            <a 
                              key={p.doi}
                              href={`https://doi.org/${p.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-[11px] text-foreground hover:bg-muted transition-colors border border-transparent hover:border-border"
                            >
                              <ExternalLink className="size-3 shrink-0 text-primary" />
                              <div className="overflow-hidden">
                                <p className="font-medium truncate">{p.title}</p>
                                <p className="text-[9px] text-muted-foreground">DOI: {p.doi} · {p.note}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                     <div className="pt-4 flex flex-col gap-2">
                        <Button className="w-full gap-2" onClick={() => toast.success("Переход к оформлению заказа")}>
                          <ShoppingCart className="size-4" /> Оформить заказ
                        </Button>
                        <Button variant="outline" className="w-full gap-2" onClick={() => setBillingOpen(true)}>
                          <FileText className="size-4" /> Оплата по реквизитам
                        </Button>
                        <Button variant="ghost" className="w-full text-muted-foreground" asChild>
                          <Link to="/marketplace/$id" params={{ id: product.id }}>
                            Открыть полную страницу
                          </Link>
                        </Button>
                     </div>
                   </div>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button asChild size="sm">
              <Link to="/marketplace/$id" params={{ id: product.id }}>
                Подробнее
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
    </>
  );
}
