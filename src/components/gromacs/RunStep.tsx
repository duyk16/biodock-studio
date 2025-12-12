import { useState } from "react";
import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RunStepProps {
  onStart: () => void;
}

export function RunStep({ onStart }: RunStepProps) {
  const [simulationTime, setSimulationTime] = useState([10]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Simulation Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Simulation Time</Label>
              <span className="text-sm font-mono text-[#FFB703] font-bold">
                {simulationTime[0]} ns
              </span>
            </div>
            <Slider
              value={simulationTime}
              onValueChange={setSimulationTime}
              min={1}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-[#FFB703] [&_[role=slider]]:border-[#FFB703] [&_.bg-primary]:bg-[#FFB703]"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 ns</span>
              <span>100 ns</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Time Step</p>
              <p className="font-mono font-medium">2 fs</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-mono font-medium">300 K</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Pressure</p>
              <p className="font-mono font-medium">1 bar</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Frames</p>
              <p className="font-mono font-medium">{simulationTime[0] * 100}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onStart}
        className="w-full h-14 text-lg bg-[#FFB703] hover:bg-[#FFB703]/90 text-[#4361EE] font-bold"
      >
        <Play className="w-5 h-5 mr-2" />
        Start Simulation
      </Button>
    </div>
  );
}
