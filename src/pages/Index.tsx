import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TagBadge } from "@/components/docking/TagBadge";
import { ReceptorUpload } from "@/components/docking/ReceptorUpload";
import { LigandInput } from "@/components/docking/LigandInput";
import { DockingParameters } from "@/components/docking/DockingParameters";
import { MoleculeViewer } from "@/components/docking/MoleculeViewer";
import { PoseList } from "@/components/docking/PoseList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Beaker, Quote, Share2, Info, History } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 overflow-auto">
          {/* Header Section */}
          <header className="relative overflow-hidden border-b border-border bg-card px-8 py-10">
            {/* Background molecular decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-10">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-primary/20 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                AutoDock Vina
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Physics-based molecular docking for predicting protein-ligand binding modes with binding affinity scores
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <TagBadge>protein</TagBadge>
                <TagBadge>small molecule</TagBadge>
                <TagBadge>molecular docking</TagBadge>
                <TagBadge>binding affinity</TagBadge>
                <TagBadge>physics-based</TagBadge>
                <TagBadge>drug discovery</TagBadge>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-5">
            {/* Input Panel */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Input</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Beaker className="mr-1.5 h-3.5 w-3.5" />
                      Examples
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Quote className="mr-1.5 h-3.5 w-3.5" />
                      Cite
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Job Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Job name</label>
                    <Input
                      placeholder="Enter job name..."
                      defaultValue="test"
                      className="bg-muted/30"
                    />
                  </div>

                  {/* Receptor Upload */}
                  <ReceptorUpload />

                  {/* Ligand Input */}
                  <LigandInput />

                  {/* Docking Parameters */}
                  <DockingParameters />

                  {/* Submit Section */}
                  <div className="flex items-center justify-between border-t border-border pt-5">
                    <div className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">25</span>
                      <span>/</span>
                      <span>42</span>
                    </div>
                    <Button className="px-6">
                      Submit job
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Output</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Share2 className="mr-1.5 h-3.5 w-3.5" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Info className="mr-1.5 h-3.5 w-3.5" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <History className="mr-1.5 h-3.5 w-3.5" />
                      History
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                  {/* 3D Viewer */}
                  <div className="lg:col-span-3">
                    <MoleculeViewer />
                  </div>

                  {/* Pose List */}
                  <div className="lg:col-span-2">
                    <PoseList />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
