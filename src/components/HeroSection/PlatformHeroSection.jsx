"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";

export function PlatformHeroSection() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-background via-background to-cyan-50/30 dark:to-slate-800">
      {/* Ocean wave separator */}
      <div className="ocean-separator absolute top-0 left-0 right-0"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Powered by AI and </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Marine Science
            </span>
          </h2>

          {/* Subtitle */}
          <h3 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6">
            <span>Unifying oceanographic data for </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent font-semibold">
              sustainable marine ecosystems
            </span>
          </h3>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Integrate heterogeneous marine datasets from oceanography, taxonomy,
            morphology, and molecular biology into a single intelligent platform
            for comprehensive ecosystem analysis.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Button
              className="btn-hero-primary text-lg px-10 py-6 relative overflow-hidden group"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight * 2,
                  behavior: "smooth",
                })
              }
            >
              <span className="relative z-10">Explore Platform Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Platform Interface Mockups */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Light mode dashboard */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card rounded-lg p-6 shadow-wave">
                <div className="aspect-video bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Oceanographic Data Dashboard
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time species identification & monitoring
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark mode interface */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card rounded-lg p-6 shadow-wave">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      eDNA Analysis Interface
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Molecular biodiversity visualization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retro Grid Background */}
      <RetroGrid className="opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyan-500/5 dark:to-blue-500/10 pointer-events-none"></div>
    </section>
  );
}
