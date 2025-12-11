import { RotateCw, Maximize2, Settings2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoleculeViewerProps {
  className?: string;
}

export function MoleculeViewer({ className }: MoleculeViewerProps) {
  return (
    <div className={className}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[hsl(220,20%,10%)]">
        {/* Placeholder for WebGL canvas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
            <p className="text-sm text-muted-foreground">
              3D Viewer
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Upload protein to visualize
            </p>
          </div>
        </div>

        {/* Viewer Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-card/10 text-muted-foreground backdrop-blur-sm hover:bg-card/20 hover:text-foreground"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-card/10 text-muted-foreground backdrop-blur-sm hover:bg-card/20 hover:text-foreground"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-card/10 text-muted-foreground backdrop-blur-sm hover:bg-card/20 hover:text-foreground"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-card/10 text-muted-foreground backdrop-blur-sm hover:bg-card/20 hover:text-foreground"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
