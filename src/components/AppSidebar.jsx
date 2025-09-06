import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Database,
  BarChart3,
  Brain,
  Globe,
  Shield,
  Heart,
  Waves,
} from "lucide-react";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Datasets", url: "/datasets", icon: Database },
  { title: "Visualization", url: "/visualization", icon: BarChart3 },
  { title: "AI Tools", url: "/ai-tools", icon: Brain },
  { title: "API Access", url: "/api-access", icon: Globe },
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "Outreach", url: "/outreach", icon: Heart },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Waves className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-bold text-lg">OceanVista</h2>
            <p className="text-xs text-muted-foreground">
              Marine Data Platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
