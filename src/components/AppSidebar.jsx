import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
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
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Datasets", url: "/datasets", icon: Database },
  { title: "Visualization", url: "/visualization", icon: BarChart3 },
  { title: "AI Tools", url: "/ai-tools", icon: Brain },
  { title: "API Access", url: "/api-access", icon: Globe },
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "Outreach", url: "/outreach", icon: Heart },
];

export function AppSidebar() {
  const location = useLocation();
  const logoRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Use a more reliable approach with setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }

      // Menu items animation using a single ref
      if (menuRef.current) {
        const menuItems = menuRef.current.querySelectorAll("[data-menu-item]");
        gsap.fromTo(
          menuItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf([logoRef.current, menuRef.current]);
    };
  }, [location.pathname]);

  return (
    <Sidebar className="border-r-0">
      <div className="h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-cyan-500/20 relative overflow-hidden">
        {/* Background Ocean Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-10 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl"></div>
          <div className="absolute top-40 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 -left-6 w-28 h-28 bg-cyan-300/5 rounded-full blur-xl"></div>
        </div>

        {/* Header - Fixed at top */}
        <SidebarHeader className="border-b border-cyan-500/20 p-6 relative z-10 flex-shrink-0">
          <div ref={logoRef} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Waves className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-75"></div>
            </div>
            <div>
              <h2 className="font-bold text-xl text-white mb-0.5">
                OceanVista
              </h2>
              <p className="text-sm text-cyan-400/80">Marine Data Platform</p>
            </div>
          </div>
        </SidebarHeader>

        {/* Main Content - Expandable area */}
        <SidebarContent className="flex-1 flex flex-col relative z-10 overflow-hidden">
          <SidebarGroup className="flex-1 flex flex-col">
            <SidebarGroupLabel className="text-cyan-400/60 text-xs font-semibold uppercase tracking-wider px-6 py-4 flex-shrink-0">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent className="flex-1 px-3 overflow-y-auto">
              <SidebarMenu ref={menuRef} className="space-y-1 pb-4">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title} data-menu-item>
                      <SidebarMenuButton asChild className="h-auto p-0">
                        <NavLink
                          to={item.url}
                          className={`
                            group flex items-center gap-3 px-4 py-3 rounded-xl mx-2 transition-all duration-300 relative
                            ${
                              isActive
                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg"
                                : "text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                            }
                          `}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                          )}

                          {/* Icon with glow effect */}
                          <div
                            className={`
                            relative p-2 rounded-lg transition-all duration-300
                            ${
                              isActive
                                ? "bg-cyan-500/20 shadow-lg shadow-cyan-500/25"
                                : "group-hover:bg-slate-700/50"
                            }
                          `}
                          >
                            <item.icon className="h-5 w-5" />
                            {isActive && (
                              <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur animate-pulse"></div>
                            )}
                          </div>

                          <span className="font-medium">{item.title}</span>

                          {/* Hover effect */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-xl transition-all duration-300"></div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Bottom Card - Pinned to bottom */}
          <div className="flex-shrink-0 p-4 relative z-10">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center">
                <Database className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-cyan-300 font-semibold mb-1 text-sm">
                Research Hub
              </h3>
              <p className="text-slate-400 text-xs mb-3">
                Access marine research
              </p>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                Explore
              </button>
            </div>
          </div>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
