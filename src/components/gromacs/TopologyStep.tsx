import { useState } from "react";
import { Upload, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopologyStepProps {
  onComplete: () => void;
  demoFile?: { name: string } | null;
  demoForceField?: string;
}

export function TopologyStep({ onComplete, demoFile, demoForceField }: TopologyStepProps) {
  const [file, setFile] = useState<File | { name: string } | null>(demoFile || null);
  const [forceField, setForceField] = useState<string>(demoForceField || "");
  const [isDragOver, setIsDragOver] = useState(false);

  // Sync with demo props
  if (demoFile && !file) setFile(demoFile);
  if (demoForceField && !forceField) setForceField(demoForceField);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const canProceed = file && forceField;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Structure File</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer",
              isDragOver && "border-[#FFB703] bg-[#FFB703]/10",
              file ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-muted-foreground/50"
            )}
          >
            <input
              type="file"
              accept=".pdb,.gro,.mol2"
              onChange={handleFileChange}
              className="hidden"
              id="topology-upload"
            />
            <label htmlFor="topology-upload" className="cursor-pointer">
              {file ? (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <FileCheck className="w-6 h-6" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drop .pdb, .gro, or .mol2 file
                  </p>
                </div>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Force Field</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="sr-only">Select Force Field</Label>
          <Select value={forceField} onValueChange={setForceField}>
            <SelectTrigger>
              <SelectValue placeholder="Select force field..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="charmm36">CHARMM36</SelectItem>
              <SelectItem value="amber99sb">AMBER99SB-ILDN</SelectItem>
              <SelectItem value="opls-aa">OPLS-AA/L</SelectItem>
              <SelectItem value="gromos54a7">GROMOS54A7</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button
        onClick={onComplete}
        disabled={!canProceed}
        className="w-full bg-[#4361EE] hover:bg-[#4361EE]/90"
      >
        Continue to Box Setup
      </Button>
    </div>
  );
}
