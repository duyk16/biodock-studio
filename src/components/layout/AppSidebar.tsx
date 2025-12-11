import { Home, FlaskConical, BarChart3, Wrench, Sun, ArrowUpRight, Beaker } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Docking", url: "/docking", icon: FlaskConical },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Utilities", url: "/utilities", icon: Wrench },
];

const dockingSubItems = [
  { title: "AutoDock Vina", url: "/" },
  { title: "DiffDock", url: "/diffdock" },
  { title: "GNINA", url: "/gnina" },
  { title: "SMINA", url: "/smina" },
  { title: "LightDock", url: "/lightdock" },
  { title: "ColabDock", url: "/colabdock" },
  { title: "ParaSurf", url: "/parasurf" },
];

const solubilitySubItems = [
  { title: "FastSolv", url: "/fastsolv", icon: Beaker },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="p-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <FlaskConical className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Docking</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeClassName="bg-muted text-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Molecular Docking Submenu */}
        <SidebarGroup className="mt-2">
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Molecular docking
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {dockingSubItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Solubility Submenu */}
        <SidebarGroup className="mt-2">
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Solubility
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {solubilitySubItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Sun className="h-5 w-5" />
              <span>Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <ArrowUpRight className="h-5 w-5" />
              <span>Upgrade</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
