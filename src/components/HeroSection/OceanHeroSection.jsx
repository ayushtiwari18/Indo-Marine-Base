"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";

export function OceanHeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [bgColor, setBgColor] = useState("rgba(0, 0, 0, 1)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Smooth transition from black to deep ocean blue
      const scrollProgress = Math.min(currentScrollY / 500, 1);
      const r = Math.floor(11 * (1 - scrollProgress) + 30 * scrollProgress);
      const g = Math.floor(20 * (1 - scrollProgress) + 64 * scrollProgress);
      const b = Math.floor(38 * (1 - scrollProgress) + 140 * scrollProgress);

      setBgColor(`rgba(${r}, ${g}, ${b}, 1)`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative transition-all duration-500 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="marineParticles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#40E0D0"
          speed={0.8}
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          Marine Data Intelligence
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-200 mb-8">
          Platform
        </h2>

        {/* Ocean-inspired gradient lines */}
        <div className="w-full max-w-4xl mx-auto h-32 relative mb-8">
          <div className="wave-line w-3/4 top-0" />
          <div className="wave-line-solid w-3/4 top-0" />
          <div
            className="absolute inset-x-32 top-4 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[3px] w-2/4 blur-sm animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute inset-x-32 top-4 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-2/4" />
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Empowering marine biodiversity research through AI-driven
          oceanographic, fisheries, and molecular data integration for
          sustainable ocean management.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="btn-hero-primary">Explore Data Platform</Button>
          <Button className="btn-hero-secondary">View Research Tools</Button>
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-black opacity-20"></div>
    </div>
  );
}
