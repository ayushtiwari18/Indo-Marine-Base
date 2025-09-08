import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, User, Settings, ChevronDown, Menu } from "lucide-react";

export function TopNav({ onToggleSidebar }) {
  const navRef = useRef(null);

  useEffect(() => {
    // Minimal animation that doesn't affect layout
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <header
      ref={navRef}
      className="flex h-16 items-center gap-4 bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/20 px-6 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/90 pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-8 right-32 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-4 right-64 w-1.5 h-1.5 bg-cyan-300/20 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="flex items-center gap-4 relative z-10 w-full">
        {/* Mobile sidebar trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop sidebar trigger */}
        <div className="hidden lg:block">
          <SidebarTrigger className="text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-colors" />
        </div>

        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
            <Input
              placeholder="Search datasets, species..."
              className="pl-9 bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:bg-slate-800/70 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-all duration-300"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-700/50">
            <Avatar className="w-8 h-8 border-2 border-cyan-400/30 ring-2 ring-cyan-400/10">
              <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-sm font-semibold">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm hidden sm:block">
              <p className="text-slate-200 font-medium">Dr. Marina</p>
              <p className="text-slate-400 text-xs">Marine Researcher</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 ml-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
