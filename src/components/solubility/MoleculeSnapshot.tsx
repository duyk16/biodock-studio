import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom } from "lucide-react";

interface MoleculeSnapshotProps {
  smiles: string;
}

export function MoleculeSnapshot({ smiles }: MoleculeSnapshotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;

    // Simple mock molecule structure based on SMILES length
    const atomCount = Math.min(Math.max(smiles.length / 3, 3), 8);
    const atoms: { x: number; y: number; z: number; color: string }[] = [];
    
    for (let i = 0; i < atomCount; i++) {
      const angle = (i / atomCount) * Math.PI * 2;
      atoms.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6,
        z: Math.sin(angle) * radius * 0.8,
        color: i % 3 === 0 ? "#EF4444" : i % 3 === 1 ? "#3B82F6" : "#6B7280",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotationRef.current += 0.02;

      // Sort atoms by z-depth for proper rendering
      const rotatedAtoms = atoms.map((atom, index) => {
        const cosR = Math.cos(rotationRef.current);
        const sinR = Math.sin(rotationRef.current);
        const newX = atom.x * cosR - atom.z * sinR;
        const newZ = atom.x * sinR + atom.z * cosR;
        return { ...atom, x: newX, z: newZ, index };
      }).sort((a, b) => a.z - b.z);

      // Draw bonds
      ctx.strokeStyle = "hsl(210, 15%, 75%)";
      ctx.lineWidth = 2;
      for (let i = 0; i < rotatedAtoms.length; i++) {
        const next = rotatedAtoms[(i + 1) % rotatedAtoms.length];
        const curr = rotatedAtoms[i];
        ctx.beginPath();
        ctx.moveTo(centerX + curr.x, centerY + curr.y);
        ctx.lineTo(centerX + next.x, centerY + next.y);
        ctx.stroke();
      }

      // Draw atoms
      rotatedAtoms.forEach((atom) => {
        const scale = (atom.z + radius) / (radius * 2);
        const size = 6 + scale * 6;
        
        ctx.beginPath();
        ctx.arc(centerX + atom.x, centerY + atom.y, size, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.globalAlpha = 0.5 + scale * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [smiles]);

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Atom className="h-4 w-4 text-primary" />
          Molecule Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="rounded-lg bg-viewer p-2">
          <canvas
            ref={canvasRef}
            width={160}
            height={120}
            className="rounded"
          />
        </div>
      </CardContent>
    </Card>
  );
}
