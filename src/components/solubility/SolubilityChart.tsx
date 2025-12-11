import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface SolubilityChartProps {
  temperature: number;
  solvent: string;
}

// Sigmoid function to simulate solubility curve
function generateSolubilityData(solvent: string) {
  const solventModifiers: Record<string, { base: number; steepness: number; midpoint: number }> = {
    water: { base: 0.5, steepness: 0.08, midpoint: 40 },
    ethanol: { base: 2.0, steepness: 0.06, midpoint: 30 },
    methanol: { base: 1.5, steepness: 0.07, midpoint: 35 },
    dmso: { base: 3.0, steepness: 0.05, midpoint: 25 },
    custom: { base: 1.0, steepness: 0.1, midpoint: 50 },
  };

  const { base, steepness, midpoint } = solventModifiers[solvent] || solventModifiers.water;

  const data = [];
  for (let temp = -20; temp <= 100; temp += 5) {
    const solubility = base * (1 / (1 + Math.exp(-steepness * (temp - midpoint)))) + 0.1;
    const uncertainty = solubility * 0.15;
    data.push({
      temp,
      solubility: parseFloat(solubility.toFixed(3)),
      upper: parseFloat((solubility + uncertainty).toFixed(3)),
      lower: parseFloat((solubility - uncertainty).toFixed(3)),
    });
  }
  return data;
}

export function SolubilityChart({ temperature, solvent }: SolubilityChartProps) {
  const data = useMemo(() => generateSolubilityData(solvent), [solvent]);

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          Solubility vs Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(168, 57%, 39%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(168, 57%, 39%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="temp"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="fill-muted-foreground"
                label={{ value: "Temperature (°C)", position: "bottom", offset: -5, fontSize: 11 }}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="fill-muted-foreground"
                label={{ value: "Solubility (g/L)", angle: -90, position: "insideLeft", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
                labelFormatter={(label) => `${label}°C`}
              />
              {/* Confidence interval area */}
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="url(#confidenceGradient)"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="hsl(var(--card))"
              />
              {/* Upper bound dashed line */}
              <Line
                type="monotone"
                dataKey="upper"
                stroke="hsl(168, 57%, 39%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
                opacity={0.5}
              />
              {/* Lower bound dashed line */}
              <Line
                type="monotone"
                dataKey="lower"
                stroke="hsl(168, 57%, 39%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
                opacity={0.5}
              />
              {/* Main solubility line */}
              <Line
                type="monotone"
                dataKey="solubility"
                stroke="hsl(168, 57%, 39%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(168, 57%, 39%)" }}
              />
              {/* Temperature cursor */}
              <ReferenceLine
                x={temperature}
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: `${temperature}°C`,
                  position: "top",
                  fill: "hsl(var(--foreground))",
                  fontSize: 11,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
