import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function DockingParameters() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [exhaustiveness, setExhaustiveness] = useState([8]);
  const [rmsd, setRmsd] = useState([1]);
  const [configureSearchSpace, setConfigureSearchSpace] = useState(false);

  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Docking Parameters
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Scoring function</span>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <Select defaultValue="vina">
            <SelectTrigger className="w-40 bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vina">Vina (default)</SelectItem>
              <SelectItem value="vinardo">Vinardo</SelectItem>
              <SelectItem value="ad4">AutoDock4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">Exhaustiveness</span>
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="w-10 rounded bg-muted/50 px-2 py-1 text-center font-mono text-sm">
              {exhaustiveness[0]}
            </span>
          </div>
          <Slider
            value={exhaustiveness}
            onValueChange={setExhaustiveness}
            min={1}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">Min RMSD between poses (Å)</span>
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="w-10 rounded bg-muted/50 px-2 py-1 text-center font-mono text-sm">
              {rmsd[0]}
            </span>
          </div>
          <Slider
            value={rmsd}
            onValueChange={setRmsd}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Configure search space</span>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <Switch checked={configureSearchSpace} onCheckedChange={setConfigureSearchSpace} />
        </div>
      </div>

      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
          <span className="uppercase tracking-wider">Advanced Settings</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              isAdvancedOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Number of poses</span>
            <span className="font-mono text-sm text-foreground">9</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Energy range</span>
            <span className="font-mono text-sm text-foreground">3 kcal/mol</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Random seed</span>
            <span className="font-mono text-sm text-foreground">Auto</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
