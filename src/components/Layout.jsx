import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { gsap } from "gsap";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";

const Layout = () => {
  const containerRef = useRef(null);
  const spheresRef = useRef([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for initial animations
    const tl = gsap.timeline();

    // Animate background entrance only
    tl.from(backgroundRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate floating spheres without affecting main content
    spheresRef.current.forEach((sphere, index) => {
      if (sphere) {
        // Set initial position
        gsap.set(sphere, {
          x: Math.random() * 200,
          y: Math.random() * 200,
          scale: Math.random() * 0.3 + 0.2,
          opacity: 0.3,
        });

        // Animate floating motion
        gsap.to(sphere, {
          x: `+=${Math.random() * 60 - 30}`,
          y: `+=${Math.random() * 60 - 30}`,
          rotation: 360,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 1,
        });
      }
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-900 text-slate-200 relative overflow-hidden"
    >
      {/* Ocean Background Effects - Separate animation target */}
      <div ref={backgroundRef} className="fixed inset-0 pointer-events-none">
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
        <div className="stars-layer-3"></div>

        {/* Controlled floating spheres */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (spheresRef.current[i] = el)}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/5 blur-sm"
          />
        ))}
      </div>

      <SidebarProvider>
        <div className="min-h-screen flex w-full relative z-10">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <TopNav />
            <main className="flex-1 p-6 relative bg-slate-900 text-slate-200">
              {/* Remove problematic animations from content wrapper */}
              <div className="relative z-20">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
