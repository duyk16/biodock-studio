import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Droplets, FlaskConical, Wine, Pill, Sparkles } from "lucide-react";

interface SolventSelectProps {
  solvent: string;
  onSolventChange: (value: string) => void;
}

const solvents = [
  { id: "water", name: "Water", icon: Droplets },
  { id: "ethanol", name: "Ethanol", icon: Wine },
  { id: "methanol", name: "Methanol", icon: FlaskConical },
  { id: "dmso", name: "DMSO", icon: Pill },
  { id: "custom", name: "Custom", icon: Sparkles },
];

export function SolventSelect({ solvent, onSolventChange }: SolventSelectProps) {
  const selectedSolvent = solvents.find((s) => s.id === solvent);

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Droplets className="h-4 w-4 text-primary" />
          The Solvent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="solvent" className="text-sm font-medium text-muted-foreground">
            Select solvent
          </Label>
          <Select value={solvent} onValueChange={onSolventChange}>
            <SelectTrigger id="solvent" className="w-full">
              <SelectValue placeholder="Select a solvent">
                {selectedSolvent && (
                  <div className="flex items-center gap-2">
                    <selectedSolvent.icon className="h-4 w-4 text-primary" />
                    <span>{selectedSolvent.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {solvents.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span>{s.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
