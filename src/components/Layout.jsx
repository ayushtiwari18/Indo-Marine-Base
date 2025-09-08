import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { gsap } from "gsap";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";

const Layout = () => {
  const containerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Simplified GSAP animations - only for background effects
    const ctx = gsap.context(() => {
      // Animate only floating elements, not layout components
      gsap.to(".floating-sphere", {
        y: "+=20",
        x: "+=10",
        rotation: 180,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 2,
      });

      // Background stars animation
      gsap.to(".stars-layer-1, .stars-layer-2, .stars-layer-3", {
        backgroundPosition: "200px 0px",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900">
      {/* Background Effects - Fixed positioning with consistent theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Consistent dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>

        {/* Subtle ocean theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5"></div>

        {/* Stars layers with consistent colors */}
        <div className="stars-layer-1 opacity-30"></div>
        <div className="stars-layer-2 opacity-20"></div>
        <div className="stars-layer-3 opacity-10"></div>

        {/* Controlled floating spheres */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="floating-sphere absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/8 to-blue-500/4 blur-sm"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
            }}
          />
        ))}
      </div>

      <SidebarProvider>
        {/* Sidebar - Fixed positioning */}
        <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
          <AppSidebar />
        </div>

        {/* Main Content Area */}
        <div className="main-content-area bg-slate-900 relative z-10">
          {/* Top Navigation */}
          <div className="dashboard-topnav">
            <TopNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>

          {/* Main Content */}
          <main className="dashboard-content content-wrapper bg-slate-900 min-h-[calc(100vh-80px-64px)]">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
