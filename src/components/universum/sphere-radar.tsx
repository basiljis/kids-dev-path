import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { SPHERES, SPHERE_ORDER, type SphereKey } from "@/lib/universum-data";

type Props = {
  values: Record<SphereKey, number>;
  compare?: Record<SphereKey, number>;
  height?: number;
  compact?: boolean;
};

export function SphereRadar({ values, compare, height = 260, compact = false }: Props) {
  const data = SPHERE_ORDER.map((key) => ({
    sphere: compact ? SPHERES[key].label.slice(0, 3) : SPHERES[key].label,
    value: values[key],
    compare: compare?.[key] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius={compact ? "72%" : "70%"}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="sphere"
          tick={{ fontSize: compact ? 9 : 12, fill: "var(--muted-foreground)" }}
        />
        {!compact && <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />}
        {compare && (
          <Radar
            dataKey="compare"
            stroke="var(--muted-foreground)"
            fill="var(--muted-foreground)"
            fillOpacity={0.12}
          />
        )}
        <Radar
          dataKey="value"
          stroke="var(--primary)"
          fill="var(--primary)"
          fillOpacity={0.28}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}