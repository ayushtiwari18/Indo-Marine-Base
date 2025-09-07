"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Database,
  Brain,
  ArrowRight,
  Sparkles,
  Waves,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MarineTimeline = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const timelineEvents = [
    {
      year: "2025",
      title: "Platform Launch",
      description:
        "Launch of AI-driven unified marine data platform with real-time oceanographic data integration and advanced species identification capabilities.",
      achievements: [
        "Real-time oceanographic monitoring",
        "AI-powered species identification",
        "Global research network integration",
        "Advanced data visualization tools",
      ],
      badge: "Current",
      badgeColor: "bg-emerald-500",
      icon: Brain,
    },
    {
      year: "2024",
      title: "Research Partnerships",
      description:
        "Collaboration with CMLRE and marine research institutions for data standardization and cross-platform research initiatives.",
      achievements: [
        "CMLRE partnership established",
        "Data standardization protocols",
        "International research network",
        "Cross-platform data sharing",
      ],
      badge: "Partnership",
      badgeColor: "bg-blue-500",
      icon: Users,
    },
    {
      year: "2023",
      title: "Data Integration",
      description:
        "Development of molecular biodiversity analysis tools and environmental DNA (eDNA) processing capabilities for comprehensive ecosystem assessment.",
      achievements: [
        "Molecular analysis tools",
        "eDNA processing pipeline",
        "Biodiversity assessment algorithms",
        "Ecosystem health metrics",
      ],
      badge: "Innovation",
      badgeColor: "bg-purple-500",
      icon: Database,
    },
    {
      year: "2022",
      title: "Foundation",
      description:
        "Initial oceanographic data collection and comprehensive taxonomic database establishment with focus on marine biodiversity cataloging.",
      achievements: [
        "Oceanographic database setup",
        "Taxonomic classification system",
        "Data collection protocols",
        "Research infrastructure",
      ],
      badge: "Foundation",
      badgeColor: "bg-teal-500",
      icon: Calendar,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Simple card animations
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-gradient-to-b from-slate-900 via-blue-950 to-cyan-950 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Development Timeline
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Platform Evolution
            </span>
            <br />
            <span className="text-cyan-100">Journey</span>
          </h2>

          <p className="text-xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
            Tracking our progress in advancing marine biodiversity research
            through innovative data integration and AI-driven insights.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="timeline-item relative">
                {/* Timeline dot */}
                <div className="absolute left-4 w-9 h-9 rounded-full bg-slate-800 border-4 border-cyan-400 flex items-center justify-center z-10">
                  <event.icon className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Content */}
                <div className="ml-20">
                  <Card className="bg-slate-800/60 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold text-cyan-400">
                          {event.year}
                        </span>
                        <Badge className={`${event.badgeColor} text-white`}>
                          {event.badge}
                        </Badge>
                        <Waves className="w-6 h-6 text-cyan-400/50 ml-auto" />
                      </div>

                      <h3 className="text-2xl font-bold text-cyan-100 mb-3">
                        {event.title}
                      </h3>

                      <p className="text-cyan-200/80 leading-relaxed">
                        {event.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {event.achievements.map(
                          (achievement, achievementIndex) => (
                            <div
                              key={achievementIndex}
                              className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-cyan-600/20"
                            >
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <span className="text-cyan-100/90 text-sm">
                                {achievement}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="bg-slate-800/40 backdrop-blur-sm border border-cyan-400/30">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                <Waves className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-cyan-100">
                Join the Marine Research Revolution
              </h3>

              <p className="text-cyan-200/80 mb-8 max-w-2xl mx-auto">
                Be part of advancing marine biodiversity research with
                cutting-edge AI and comprehensive data integration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-3">
                  Explore Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
                >
                  Research Partnerships
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarineTimeline;
