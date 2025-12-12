import { useState } from "react";
import { Box, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BoxStepProps {
  onComplete: () => void;
  demoBoxShape?: "cubic" | "dodecahedron";
  demoAddIons?: boolean;
}

export function BoxStep({ onComplete, demoBoxShape, demoAddIons }: BoxStepProps) {
  const [boxShape, setBoxShape] = useState<"cubic" | "dodecahedron">(demoBoxShape || "cubic");
  const [addIons, setAddIons] = useState(demoAddIons !== undefined ? demoAddIons : true);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Box Shape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setBoxShape("cubic")}
              className={cn(
                "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                boxShape === "cubic"
                  ? "border-[#FFB703] bg-[#FFB703]/10"
                  : "border-muted hover:border-muted-foreground/50"
              )}
            >
              <Box className={cn(
                "w-10 h-10",
                boxShape === "cubic" ? "text-[#FFB703]" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                boxShape === "cubic" ? "text-[#FFB703]" : "text-muted-foreground"
              )}>
                Cubic
              </span>
            </button>
            <button
              onClick={() => setBoxShape("dodecahedron")}
              className={cn(
                "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                boxShape === "dodecahedron"
                  ? "border-[#FFB703] bg-[#FFB703]/10"
                  : "border-muted hover:border-muted-foreground/50"
              )}
            >
              <Circle className={cn(
                "w-10 h-10",
                boxShape === "dodecahedron" ? "text-[#FFB703]" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                boxShape === "dodecahedron" ? "text-[#FFB703]" : "text-muted-foreground"
              )}>
                Dodecahedron
              </span>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Solvation Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="add-ions" className="font-medium">Add Ions</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Neutralize system with Na⁺/Cl⁻
              </p>
            </div>
            <Switch
              id="add-ions"
              checked={addIons}
              onCheckedChange={setAddIons}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onComplete}
        className="w-full bg-[#4361EE] hover:bg-[#4361EE]/90"
      >
        Continue to Run Settings
      </Button>
    </div>
  );
}
