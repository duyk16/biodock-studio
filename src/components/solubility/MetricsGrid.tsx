import { Card, CardContent } from "@/components/ui/card";
import { Activity, Beaker, AlertCircle } from "lucide-react";

interface MetricsGridProps {
  temperature: number;
  solvent: string;
}

// Calculate metrics based on sigmoid function
function calculateMetrics(temperature: number, solvent: string) {
  const solventModifiers: Record<string, { base: number; steepness: number; midpoint: number }> = {
    water: { base: 0.5, steepness: 0.08, midpoint: 40 },
    ethanol: { base: 2.0, steepness: 0.06, midpoint: 30 },
    methanol: { base: 1.5, steepness: 0.07, midpoint: 35 },
    dmso: { base: 3.0, steepness: 0.05, midpoint: 25 },
    custom: { base: 1.0, steepness: 0.1, midpoint: 50 },
  };

  const { base, steepness, midpoint } = solventModifiers[solvent] || solventModifiers.water;
  const solubility = base * (1 / (1 + Math.exp(-steepness * (temperature - midpoint)))) + 0.1;
  const logS = Math.log10(solubility);
  const uncertainty = solubility * 0.15;

  return {
    logS: logS.toFixed(2),
    solubility: solubility.toFixed(3),
    uncertainty: `±${uncertainty.toFixed(3)}`,
  };
}

export function MetricsGrid({ temperature, solvent }: MetricsGridProps) {
  const metrics = calculateMetrics(temperature, solvent);

  const metricCards = [
    {
      label: "logS",
      value: metrics.logS,
      icon: Activity,
      isPrimary: true,
    },
    {
      label: "Solubility",
      value: `${metrics.solubility} g/L`,
      icon: Beaker,
      isPrimary: false,
    },
    {
      label: "Uncertainty",
      value: metrics.uncertainty,
      icon: AlertCircle,
      isPrimary: false,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {metricCards.map((metric) => (
        <Card
          key={metric.label}
          className={`border-border shadow-sm ${
            metric.isPrimary ? "bg-primary/10 border-primary/20" : "bg-card"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <metric.icon
                className={`h-4 w-4 ${
                  metric.isPrimary ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {metric.label}
              </span>
            </div>
            <p
              className={`font-mono text-lg font-semibold ${
                metric.isPrimary ? "text-primary" : "text-foreground"
              }`}
            >
              {metric.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
