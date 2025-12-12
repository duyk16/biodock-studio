import { useState, useEffect } from "react";
import { Atom } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { WizardStep } from "@/components/gromacs/WizardStep";
import { TopologyStep } from "@/components/gromacs/TopologyStep";
import { BoxStep } from "@/components/gromacs/BoxStep";
import { RunStep } from "@/components/gromacs/RunStep";
import { TrajectoryViewer } from "@/components/gromacs/TrajectoryViewer";
import { TelemetryCharts } from "@/components/gromacs/TelemetryCharts";
import { ConsoleDrawer } from "@/components/gromacs/ConsoleDrawer";

const steps = [
  { id: 1, title: "Topology", description: "Upload structure & select force field" },
  { id: 2, title: "Box Setup", description: "Configure simulation box & solvation" },
  { id: 3, title: "Run", description: "Set parameters & start simulation" },
];

export default function GROMACS() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConsole, setShowConsole] = useState(false);

  const handleCompleteStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < 3) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setShowConsole(true);
    setProgress(0);
  };

  useEffect(() => {
    if (isSimulating && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((p) => Math.min(p + Math.random() * 3 + 1, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setTimeout(() => {
        setIsSimulating(false);
      }, 500);
    }
  }, [isSimulating, progress]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Left Panel - Wizard */}
          <div className="w-full lg:w-96 border-r border-border bg-card/30 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-[#4361EE] text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Atom className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">GROMACS MD</h1>
                  <p className="text-sm text-white/70">Molecular Dynamics</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-3 flex-1 overflow-auto">
              {steps.map((step) => (
                <WizardStep
                  key={step.id}
                  stepNumber={step.id}
                  title={step.title}
                  description={step.description}
                  isActive={currentStep === step.id}
                  isCompleted={completedSteps.includes(step.id)}
                  onClick={() => {
                    if (completedSteps.includes(step.id) || step.id <= currentStep) {
                      setCurrentStep(step.id);
                    }
                  }}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="p-4 border-t border-border">
              {currentStep === 1 && (
                <TopologyStep onComplete={() => handleCompleteStep(1)} />
              )}
              {currentStep === 2 && (
                <BoxStep onComplete={() => handleCompleteStep(2)} />
              )}
              {currentStep === 3 && (
                <RunStep onStart={handleStartSimulation} />
              )}
            </div>
          </div>

          {/* Right Panel - Monitor */}
          <div className="flex-1 p-6 space-y-6 bg-background">
            <TrajectoryViewer isSimulating={isSimulating} progress={progress} />
            <TelemetryCharts progress={progress} />
          </div>
        </main>

        <ConsoleDrawer
          isOpen={showConsole}
          onClose={() => setShowConsole(false)}
          progress={progress}
        />
      </div>
    </SidebarProvider>
  );
}
