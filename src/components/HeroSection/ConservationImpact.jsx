import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ConservationImpact = () => {
  const stats = [
    {
      number: "2M+",
      label: "Species Records",
      description: "Catalogued marine organisms",
    },
    {
      number: "150+",
      label: "Research Partners",
      description: "Global institutions",
    },
    { number: "45", label: "Countries", description: "Contributing data" },
    {
      number: "99.2%",
      label: "Data Accuracy",
      description: "AI-verified insights",
    },
    {
      number: "50TB",
      label: "Data Storage",
      description: "Oceanographic datasets",
    },
    {
      number: "24/7",
      label: "Monitoring",
      description: "Real-time data collection",
    },
    {
      number: "500+",
      label: "Publications",
      description: "Research papers supported",
    },
    { number: "95%", label: "Uptime", description: "Platform reliability" },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-ocean-teal to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Marine Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering researchers and policymakers with actionable marine
            biodiversity insights
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-card/50 backdrop-blur-sm border-ocean-aqua/20 hover:bg-card/70 transition-all duration-300 transform hover:scale-105 animate-drift"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl font-bold text-ocean-teal mb-2 animate-pulse-glow">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-ocean-deep to-ocean-blue rounded-3xl p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Advanced Marine Research Platform
          </h3>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Partner with CMLRE to advance marine biodiversity research through
            comprehensive data analytics and AI-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero-primary">
              Start Research Collaboration
            </Button>
            <Button className="btn-hero-secondary">
              Access Public Datasets
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConservationImpact;
