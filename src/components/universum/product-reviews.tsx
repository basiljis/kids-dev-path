import { Star, User, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  text: string;
  usageTime?: string; // e.g., "3 месяца", "1 год"
}

interface ProductReviewsProps {
  reviews: Review[];
  showUsageTime?: boolean;
}

export function ProductReviews({ reviews, showUsageTime = false }: ProductReviewsProps) {
  if (!reviews?.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Пока нет отзывов. Будьте первым!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Отзывы пользователей</h3>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Star className="size-4 fill-warning text-warning" />
          <span>{(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({reviews.length})</span>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-border">
                  <AvatarFallback className="bg-primary/5 text-primary text-xs">
                    {review.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">{review.userName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`size-3 ${i < review.rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              {showUsageTime && review.usageTime && (
                <div className="flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary border border-primary/10">
                  <Clock className="size-3" />
                  Использует: {review.usageTime}
                </div>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {review.text}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
