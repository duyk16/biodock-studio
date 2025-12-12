import { useEffect, useState } from "react";
import { Terminal, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ConsoleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

const logMessages = [
  "Initializing GROMACS 2024.1...",
  "Reading topology file...",
  "Setting up force field parameters...",
  "Generating box coordinates...",
  "Solvating system with TIP3P water...",
  "Adding ions to neutralize charge...",
  "Running energy minimization...",
  "Equilibrating NVT ensemble...",
  "Equilibrating NPT ensemble...",
  "Starting production MD run...",
  "Writing trajectory frames...",
];

export function ConsoleDrawer({ isOpen, onClose, progress }: ConsoleDrawerProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const messageIndex = Math.floor((progress / 100) * logMessages.length);
      const newLogs = logMessages.slice(0, Math.max(1, messageIndex + 1));
      setLogs(newLogs);
    }
  }, [isOpen, progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f] border-t border-border/50 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FFB703]" />
          <span className="font-mono text-sm font-medium">Simulation Console</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-40 h-2 [&>div]:bg-[#FFB703]" />
            <span className="text-sm font-mono text-[#FFB703]">{progress}%</span>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="h-40 overflow-auto p-4 font-mono text-xs">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}]</span>
            <span className={i === logs.length - 1 ? "text-[#FFB703]" : "text-foreground/80"}>
              {log}
            </span>
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}
