import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WizardStepProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function WizardStep({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted,
  onClick,
}: WizardStepProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isCompleted && !isActive}
      className={cn(
        "w-full text-left p-4 rounded-lg border-2 transition-all duration-300",
        isActive && "border-[#FFB703] bg-[#FFB703]/10 shadow-[0_0_20px_rgba(255,183,3,0.3)]",
        isCompleted && !isActive && "border-primary/50 bg-primary/5",
        !isActive && !isCompleted && "border-muted bg-muted/30 opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
            isActive && "bg-[#FFB703] text-[#4361EE]",
            isCompleted && !isActive && "bg-primary text-primary-foreground",
            !isActive && !isCompleted && "bg-muted-foreground/30 text-muted-foreground"
          )}
        >
          {isCompleted && !isActive ? <Check className="w-4 h-4" /> : stepNumber}
        </div>
        <div>
          <h3 className={cn(
            "font-semibold",
            isActive && "text-[#FFB703]",
            !isActive && !isCompleted && "text-muted-foreground"
          )}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
}
