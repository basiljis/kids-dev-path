import { Link } from "@tanstack/react-router";
import { BadgeCheck, Clock3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SphereBadge } from "./sphere-badge";
import { SphereRadar } from "./sphere-radar";
import {
  CATEGORY_LABELS,
  formatAgeRange,
  formatPrice,
  sphereProfile,
  type Product,
} from "@/lib/universum-data";

export function ProductCard({
  product,
  recommended = false,
}: {
  product: Product;
  recommended?: boolean;
}) {
  const profile = sphereProfile(product);
  const top = [...product.metrics].sort((a, b) => b.impact - a.impact).slice(0, 2);

  return (
    <Card className="flex h-full flex-col overflow-hidden border-border/70 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-video bg-[image:var(--gradient-soft)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <SphereRadar values={profile} height={150} compact />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {recommended && (
            <Badge className="gap-1">
              <Sparkles className="size-3" /> Рекомендовано ППк
            </Badge>
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
            <li key={m.metric}>
              Улучшает «{m.metricLabel}» на{" "}
              <span className="font-semibold text-foreground">{m.impact}%</span>
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
          <Button asChild size="sm">
            <Link to="/marketplace/$id" params={{ id: product.id }}>
              Подробнее
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
