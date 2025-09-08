import React from "react";

import { OceanHeroSection } from "@/components/HeroSection/OceanHeroSection";
import { PlatformSection } from "@/components/HeroSection/PlatformHeroSection";
import MarineDataDashboard from "@/components/HeroSection/MarineDataDashboard";
import ConservationImpact from "@/components/HeroSection/ConservationImpact";
import MarineTimeline from "@/components/HeroSection/MarineTimeline";
import MarineTestimonials from "@/components/HeroSection/MarineTestimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <main className="w-full">
        <OceanHeroSection />
        <div className="bg-slate-900">
          <PlatformSection />
          <MarineDataDashboard />
          <MarineTimeline />
          <MarineTestimonials />
          <ConservationImpact />
        </div>
      </main>
    </div>
  );
};

export default Index;
