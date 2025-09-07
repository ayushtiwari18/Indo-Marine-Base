import React from "react";
import { OceanHeroSection } from "@/components/HeroSection/OceanHeroSection";
import { PlatformSection } from "@/components/HeroSection/PlatformHeroSection";
import MarineDataDashboard from "@/components/HeroSection/MarineDataDashboard";
import ConservationImpact from "@/components/HeroSection/ConservationImpact";
import MarineTimeline from "@/components/HeroSection/MarineTimeline";
import MarineTestimonials from "@/components/HeroSection/MarineTestimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <OceanHeroSection />
      <PlatformSection />
      <MarineDataDashboard />
      <MarineTimeline />
      <MarineTestimonials />
      <ConservationImpact />
    </div>
  );
};

export default Index;
