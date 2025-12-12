import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface TrajectoryViewerProps {
  isSimulating: boolean;
  progress: number;
  showResults?: boolean;
}

export function TrajectoryViewer({ isSimulating, progress, showResults }: TrajectoryViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frame, setFrame] = useState([0]);

  const totalFrames = 1000;
  const currentFrame = Math.floor((frame[0] / 100) * totalFrames);

  // Show results state - completed simulation
  if (showResults && !isSimulating) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-[#0a0a0f] border border-border/50">
        <div className="aspect-video flex items-center justify-center relative">
          <div className="absolute top-3 right-3 px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
            ✓ Simulation Complete
          </div>
          {/* Animated protein result */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#4361EE]/40 to-[#FFB703]/30 blur-2xl absolute animate-pulse" />
            <svg viewBox="0 0 100 100" className="w-48 h-48 relative z-10">
              <defs>
                <linearGradient id="proteinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4361EE" />
                  <stop offset="100%" stopColor="#FFB703" />
                </linearGradient>
              </defs>
              <path
                d="M50 10 C70 20, 80 40, 70 60 C60 80, 40 80, 30 60 C20 40, 30 20, 50 10"
                fill="none"
                stroke="url(#proteinGrad)"
                strokeWidth="3"
              />
              <path
                d="M30 30 Q50 50, 70 30 Q80 50, 60 70 Q40 80, 30 60 Q20 40, 30 30"
                fill="none"
                stroke="#FFB703"
                strokeWidth="2.5"
              />
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + Math.cos(i * 0.52) * 30}
                  cy={50 + Math.sin(i * 0.52) * 25}
                  r="4"
                  fill={i % 2 === 0 ? "#4361EE" : "#FFB703"}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </svg>
          </div>
          <div className="absolute top-3 left-3 text-xs font-mono text-muted-foreground">
            Frame: {currentFrame} / {totalFrames}
          </div>
          <div className="absolute bottom-16 left-4 right-4 grid grid-cols-3 gap-2">
            <div className="bg-[#4361EE]/20 rounded p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Total Frames</p>
              <p className="font-mono text-sm text-[#4361EE]">{totalFrames}</p>
            </div>
            <div className="bg-[#FFB703]/20 rounded p-2 text-center">
              <p className="text-[10px] text-muted-foreground">RMSD Final</p>
              <p className="font-mono text-sm text-[#FFB703]">2.34 Å</p>
            </div>
            <div className="bg-green-500/20 rounded p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Status</p>
              <p className="font-mono text-sm text-green-400">Done</p>
            </div>
          </div>
        </div>
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="space-y-3">
            <Slider
              value={frame}
              onValueChange={setFrame}
              max={100}
              step={0.1}
              className="[&_[role=slider]]:bg-[#FFB703] [&_[role=slider]]:border-[#FFB703] [&_.bg-primary]:bg-[#FFB703]"
            />
            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 bg-[#FFB703] hover:bg-[#FFB703]/90 text-[#4361EE]"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#0a0a0f] border border-border/50">
      {/* 3D Viewer Placeholder */}
      <div className="aspect-video flex items-center justify-center relative">
        {isSimulating ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#FFB703]/30 border-t-[#FFB703] animate-spin" />
            <p className="text-[#FFB703] font-medium">Simulating...</p>
            <p className="text-sm text-muted-foreground mt-1">{progress}% complete</p>
          </div>
        ) : (
          <>
            {/* Mock protein structure */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4361EE]/30 to-[#FFB703]/20 blur-xl absolute" />
              <svg viewBox="0 0 100 100" className="w-40 h-40 relative z-10">
                <path
                  d="M50 10 C70 20, 80 40, 70 60 C60 80, 40 80, 30 60 C20 40, 30 20, 50 10"
                  fill="none"
                  stroke="#4361EE"
                  strokeWidth="3"
                  className="animate-pulse"
                />
                <path
                  d="M30 30 Q50 50, 70 30 Q80 50, 60 70 Q40 80, 30 60 Q20 40, 30 30"
                  fill="none"
                  stroke="#FFB703"
                  strokeWidth="2"
                  opacity="0.7"
                />
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={30 + Math.cos(i * 0.8) * 25}
                    cy={50 + Math.sin(i * 0.8) * 20}
                    r="3"
                    fill="#FFB703"
                  />
                ))}
              </svg>
            </div>
            <div className="absolute top-3 left-3 text-xs font-mono text-muted-foreground">
              Frame: {currentFrame} / {totalFrames}
            </div>
          </>
        )}
      </div>

      {/* Video Controls */}
      {!isSimulating && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="space-y-3">
            <Slider
              value={frame}
              onValueChange={setFrame}
              max={100}
              step={0.1}
              className="[&_[role=slider]]:bg-[#FFB703] [&_[role=slider]]:border-[#FFB703] [&_.bg-primary]:bg-[#FFB703]"
            />
            <div className="flex items-center justify-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 bg-[#FFB703] hover:bg-[#FFB703]/90 text-[#4361EE]"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
