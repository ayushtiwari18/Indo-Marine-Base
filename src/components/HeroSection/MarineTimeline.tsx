import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  achievements: string[];
  badge: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2025",
    title: "Platform Launch",
    description: "Launch of AI-driven unified marine data platform with real-time oceanographic data integration and advanced species identification capabilities.",
    achievements: [
      "Real-time oceanographic monitoring",
      "AI-powered species identification",
      "Global research network integration",
      "Advanced data visualization tools"
    ],
    badge: "Current"
  },
  {
    year: "2024", 
    title: "Research Partnerships",
    description: "Collaboration with CMLRE and marine research institutions for data standardization and cross-platform research initiatives.",
    achievements: [
      "CMLRE partnership established",
      "Data standardization protocols",
      "International research network",
      "Cross-platform data sharing"
    ],
    badge: "Partnership"
  },
  {
    year: "2023",
    title: "Data Integration",
    description: "Development of molecular biodiversity analysis tools and environmental DNA (eDNA) processing capabilities for comprehensive ecosystem assessment.",
    achievements: [
      "Molecular analysis tools",
      "eDNA processing pipeline",
      "Biodiversity assessment algorithms",
      "Ecosystem health metrics"
    ],
    badge: "Innovation"
  },
  {
    year: "2022",
    title: "Foundation",
    description: "Initial oceanographic data collection and comprehensive taxonomic database establishment with focus on marine biodiversity cataloging.",
    achievements: [
      "Oceanographic database setup",
      "Taxonomic classification system",
      "Data collection protocols",
      "Research infrastructure"
    ],
    badge: "Foundation"
  }
];

const MarineTimeline: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-ocean-deep/5 to-ocean-blue/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-aqua bg-clip-text text-transparent">
            Platform Development Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tracking our progress in advancing marine biodiversity research through innovative data integration and AI-driven insights.
          </p>
        </div>

        <div className="relative">
          {/* Ocean-themed timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 ocean-timeline-line rounded-full"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="relative group">
                {/* Marine-themed timeline dot */}
                <div className="absolute left-4 marine-dot w-9 h-9 rounded-full border-4 border-background flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse-glow"></div>
                </div>
                
                {/* Content card */}
                <div className="ml-20">
                  <Card className="bg-white/10 backdrop-blur-md border-ocean-blue/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-wave">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-ocean-aqua">{event.year}</span>
                          <Badge 
                            variant="secondary" 
                            className="bg-gradient-to-r from-ocean-teal/20 to-ocean-blue/20 text-ocean-aqua border-ocean-blue/30"
                          >
                            {event.badge}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {event.achievements.map((achievement, achievementIndex) => (
                          <div 
                            key={achievementIndex}
                            className="flex items-center gap-3 p-3 rounded-lg bg-ocean-blue/10 border border-ocean-blue/20 transition-all duration-300 hover:bg-ocean-blue/20"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-ocean-teal to-ocean-aqua animate-pulse-glow"></div>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-ocean-blue/10 via-ocean-teal/10 to-ocean-aqua/10 border-ocean-blue/30 backdrop-blur-md">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Join the Marine Research Revolution
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Be part of advancing marine biodiversity research with cutting-edge AI and comprehensive data integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-hero-primary">
                  Explore Platform
                </button>
                <button className="btn-hero-secondary">
                  Research Partnerships
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarineTimeline;