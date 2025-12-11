import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Thermometer } from "lucide-react";

interface TemperatureSliderProps {
  temperature: number;
  onTemperatureChange: (value: number) => void;
}

export function TemperatureSlider({ temperature, onTemperatureChange }: TemperatureSliderProps) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Thermometer className="h-4 w-4 text-primary" />
          Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">
              Temperature
            </Label>
            <span className="rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium text-foreground">
              {temperature}°C
            </span>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={(values) => onTemperatureChange(values[0])}
            min={-20}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>-20°C</span>
            <span>100°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
