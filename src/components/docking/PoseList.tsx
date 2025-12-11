import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Pose {
  id: number;
  affinity: number;
}

const mockPoses: Pose[] = [
  { id: 1, affinity: -9.056 },
  { id: 2, affinity: -7.573 },
  { id: 3, affinity: -7.285 },
  { id: 4, affinity: -7.130 },
  { id: 5, affinity: -7.048 },
  { id: 6, affinity: -7.007 },
  { id: 7, affinity: -6.847 },
  { id: 8, affinity: -6.718 },
  { id: 9, affinity: -6.376 },
];

interface PoseListProps {
  onPoseSelect?: (poseId: number) => void;
}

export function PoseList({ onPoseSelect }: PoseListProps) {
  const [selectedPose, setSelectedPose] = useState<number>(1);
  const [viewAllPoses, setViewAllPoses] = useState(false);

  const handlePoseClick = (poseId: number) => {
    setSelectedPose(poseId);
    onPoseSelect?.(poseId);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Presets</span>
        </div>
        <Select defaultValue="default">
          <SelectTrigger className="w-full bg-muted/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="cartoon">Cartoon</SelectItem>
            <SelectItem value="surface">Surface</SelectItem>
            <SelectItem value="stick">Stick</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">View all poses</span>
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <Checkbox checked={viewAllPoses} onCheckedChange={(checked) => setViewAllPoses(!!checked)} />
      </div>

      <div className="space-y-1.5">
        {mockPoses.map((pose) => (
          <button
            key={pose.id}
            onClick={() => handlePoseClick(pose.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all",
              selectedPose === pose.id
                ? "border-primary bg-primary/5 text-foreground"
                : "border-transparent bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <span className="font-medium">Pose {pose.id}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs">({pose.affinity.toFixed(3)})</span>
              {selectedPose === pose.id && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
