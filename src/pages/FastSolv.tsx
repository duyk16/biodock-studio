import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TagBadge } from "@/components/docking/TagBadge";
import { SoluteInput } from "@/components/solubility/SoluteInput";
import { SolventSelect } from "@/components/solubility/SolventSelect";
import { TemperatureSlider } from "@/components/solubility/TemperatureSlider";
import { SolubilityChart } from "@/components/solubility/SolubilityChart";
import { MetricsGrid } from "@/components/solubility/MetricsGrid";
import { MoleculeSnapshot } from "@/components/solubility/MoleculeSnapshot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Zap } from "lucide-react";

const FastSolv = () => {
  const [smiles, setSmiles] = useState("CC(=O)OC1=CC=CC=C1C(=O)O");
  const [solvent, setSolvent] = useState("water");
  const [temperature, setTemperature] = useState(25);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex flex-1 flex-col lg:flex-row">
          {/* Input Panel */}
          <div className="flex-1 overflow-y-auto border-r border-border p-6">
            <div className="mx-auto max-w-2xl space-y-6">
              {/* Header */}
              <header className="space-y-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">FastSolv</h1>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    Deep Learning
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    MIT
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TagBadge>solubility prediction</TagBadge>
                  <TagBadge>thermodynamics</TagBadge>
                  <TagBadge>SMILES</TagBadge>
                </div>
              </header>

              {/* Input Cards */}
              <SoluteInput smiles={smiles} onSmilesChange={setSmiles} />
              <SolventSelect solvent={solvent} onSolventChange={setSolvent} />
              <TemperatureSlider temperature={temperature} onTemperatureChange={setTemperature} />

              {/* Submit */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Instant prediction • No queue</span>
                </div>
                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  Predict Solubility
                </Button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="w-full border-t border-border bg-muted/30 p-6 lg:w-[420px] lg:border-t-0">
            <div className="sticky top-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Prediction Output
              </h2>

              <SolubilityChart temperature={temperature} solvent={solvent} />
              <MetricsGrid temperature={temperature} solvent={solvent} />
              <MoleculeSnapshot smiles={smiles} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FastSolv;
