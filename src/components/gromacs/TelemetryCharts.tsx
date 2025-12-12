import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TelemetryChartsProps {
  progress: number;
  showResults?: boolean;
}

export function TelemetryCharts({ progress, showResults }: TelemetryChartsProps) {
  // Use full data when showing results
  const displayProgress = showResults ? 100 : progress;
  const rmsdData = useMemo(() => {
    const points = Math.floor((displayProgress / 100) * 50) + 1;
    return Array.from({ length: points }, (_, i) => ({
      time: i * 2,
      rmsd: 0.5 + Math.log(i + 1) * 0.4 + (showResults ? Math.sin(i * 0.3) * 0.1 : Math.random() * 0.15),
    }));
  }, [displayProgress, showResults]);

  const energyData = useMemo(() => {
    const points = Math.floor((displayProgress / 100) * 50) + 1;
    return Array.from({ length: points }, (_, i) => ({
      time: i * 2,
      energy: -45000 - Math.log(i + 1) * 2000 + (showResults ? Math.sin(i * 0.2) * 200 : Math.random() * 500),
    }));
  }, [displayProgress, showResults]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-card/50">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4361EE]" />
            RMSD (Å)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rmsdData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                  stroke="hsl(var(--muted-foreground))"
                  domain={[0, 3]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [value.toFixed(3), "RMSD"]}
                  labelFormatter={(label) => `Time: ${label} ns`}
                />
                <Line
                  type="monotone"
                  dataKey="rmsd"
                  stroke="#4361EE"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFB703]" />
            Potential Energy
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={45}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value.toFixed(0)} kJ/mol`, "Energy"]}
                  labelFormatter={(label) => `Time: ${label} ns`}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#FFB703"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
