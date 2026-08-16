import { cn } from "@/lib/utils";
import { SPHERES, type SphereKey } from "@/lib/universum-data";

const CLASSES: Record<SphereKey, string> = {
  cognitive: "bg-cognitive/12 text-cognitive border-cognitive/25",
  speech: "bg-speech/12 text-speech border-speech/25",
  emotional: "bg-emotional/12 text-emotional border-emotional/25",
  social: "bg-social/12 text-social border-social/25",
  motor: "bg-motor/12 text-motor border-motor/25",
};

export function SphereBadge({
  sphere,
  children,
  className,
}: {
  sphere: SphereKey;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        CLASSES[sphere],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children ?? SPHERES[sphere].label}
    </span>
  );
}