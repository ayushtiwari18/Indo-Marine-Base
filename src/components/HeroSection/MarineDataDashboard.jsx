import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Fish, Microscope, Users } from "lucide-react";

const MarineDataDashboard = () => {
  const platforms = [
    {
      icon: BarChart3,
      title: "Data Visualization Dashboard",
      description:
        "Interactive 3D ocean models with real-time data overlay and responsive analytics",
      features: [
        "Real-time oceanographic trends",
        "3D visualization",
        "Predictive modeling",
      ],
      color: "from-ocean-teal to-ocean-aqua",
    },
    {
      icon: Fish,
      title: "Species Database",
      description:
        "Comprehensive taxonomic information with advanced search and identification tools",
      features: [
        "Taxonomic classification",
        "Image galleries",
        "Species identification AI",
      ],
      color: "from-ocean-blue to-ocean-teal",
    },
    {
      icon: Microscope,
      title: "Molecular Analysis Hub",
      description:
        "eDNA data processing and analysis with cutting-edge molecular tools",
      features: [
        "eDNA sequence analysis",
        "Biodiversity mapping",
        "Genetic markers",
      ],
      color: "from-ocean-deep to-ocean-blue",
    },
    {
      icon: Users,
      title: "Research Collaboration",
      description:
        "Professional networking and project sharing for marine scientists worldwide",
      features: [
        "Collaborative projects",
        "Data sharing",
        "Scientific networking",
      ],
      color: "from-ocean-aqua to-ocean-surface",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-ocean-deep via-ocean-blue to-ocean-teal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Marine Intelligence
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Integrated platforms for oceanographic research, species monitoring,
            and molecular analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((platform, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center mb-4 animate-pulse-glow`}
                >
                  <platform.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {platform.title}
                </CardTitle>
                <CardDescription className="text-cyan-100 text-lg">
                  {platform.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {platform.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-cyan-50 flex items-center"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-ocean-deep transition-all duration-300"
                >
                  Explore Platform
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarineDataDashboard;
