import { useState } from "react";
import { Type, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputMode = "text" | "file";

interface LigandInputProps {
  onValueChange?: (value: string, mode: InputMode) => void;
}

export function LigandInput({ onValueChange }: LigandInputProps) {
  const [mode, setMode] = useState<InputMode>("text");
  const [smilesValue, setSmilesValue] = useState("");

  const handleModeChange = (newMode: InputMode) => {
    setMode(newMode);
    if (newMode === "text") {
      onValueChange?.(smilesValue, newMode);
    }
  };

  const handleSmilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSmilesValue(value);
    onValueChange?.(value, mode);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Ligand</label>
        <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleModeChange("text")}
            className={cn(
              "h-7 px-3 text-xs",
              mode === "text"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Type className="mr-1.5 h-3 w-3" />
            Text
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleModeChange("file")}
            className={cn(
              "h-7 px-3 text-xs",
              mode === "file"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Paperclip className="mr-1.5 h-3 w-3" />
            File
          </Button>
        </div>
      </div>

      {mode === "text" ? (
        <Input
          placeholder="Enter SMILES string (e.g., CCO for ethanol)..."
          value={smilesValue}
          onChange={handleSmilesChange}
          className="bg-muted/30 font-mono text-sm"
        />
      ) : (
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Click or drag files to upload (.mol2, .sdf)
          </p>
        </div>
      )}
    </div>
  );
}
