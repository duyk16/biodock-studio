import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Beaker } from "lucide-react";

interface SoluteInputProps {
  smiles: string;
  onSmilesChange: (value: string) => void;
}

// Mock SMILES to compound data mapping
const smilesDatabase: Record<string, { name: string; mw: string }> = {
  "CC(=O)OC1=CC=CC=C1C(=O)O": { name: "Aspirin", mw: "180 g/mol" },
  "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O": { name: "Ibuprofen", mw: "206 g/mol" },
  "CC(=O)NC1=CC=C(C=C1)O": { name: "Acetaminophen", mw: "151 g/mol" },
  "C1=CC=C(C=C1)C(=O)O": { name: "Benzoic Acid", mw: "122 g/mol" },
  "CCO": { name: "Ethanol", mw: "46 g/mol" },
};

export function SoluteInput({ smiles, onSmilesChange }: SoluteInputProps) {
  const compound = smilesDatabase[smiles] || null;

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Beaker className="h-4 w-4 text-primary" />
          The Solute
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="smiles" className="text-sm font-medium text-muted-foreground">
            Enter SMILES
          </Label>
          <Input
            id="smiles"
            placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
            value={smiles}
            onChange={(e) => onSmilesChange(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        {compound && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {compound.name}
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {compound.mw}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
