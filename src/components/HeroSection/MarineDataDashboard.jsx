"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Fish,
  Microscope,
  Users,
  ArrowRight,
  Waves,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MarineDataDashboard = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const platforms = [
    {
      icon: BarChart3,
      title: "Data Visualization Dashboard",
      description:
        "Interactive 3D ocean models with real-time data overlay and responsive analytics",
      features: [
        "Real-time oceanographic trends",
        "3D visualization & modeling",
        "Predictive AI analytics",
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Fish,
      title: "Species Database",
      description:
        "Comprehensive taxonomic information with advanced search and identification tools",
      features: [
        "AI-powered species identification",
        "Interactive image galleries",
        "Taxonomic classification system",
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Microscope,
      title: "Molecular Analysis Hub",
      description:
        "eDNA data processing and analysis with cutting-edge molecular tools",
      features: [
        "Advanced eDNA sequence analysis",
        "Genetic biodiversity mapping",
        "Molecular marker identification",
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Research Collaboration",
      description:
        "Professional networking and project sharing for marine scientists worldwide",
      features: [
        "Global collaborative projects",
        "Secure data sharing protocols",
        "Scientific networking platform",
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards animation
      gsap.fromTo(
        ".platform-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      className="relative w-full py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Simple background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 left-10 animate-pulse"></div>
        <div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 right-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <Waves className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Advanced Marine Intelligence
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Comprehensive Ocean
            </span>
            <br />
            <span className="text-white">Research Platform</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Integrated platforms for oceanographic research, species monitoring,
            and molecular analysis powered by cutting-edge AI technology
          </p>
        </div>

        {/* Platform Cards - Simple Grid Layout */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {platforms.map((platform, index) => (
            <div key={index} className="platform-card group">
              <Card className="relative h-full bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated border sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <CardHeader className="relative z-10 pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${platform.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <platform.icon className="w-10 h-10 text-white" />
                  </div>

                  <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                    {platform.title}
                  </CardTitle>

                  <CardDescription className="text-slate-300 text-lg leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {platform.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-slate-200 flex items-center group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 group-hover/item:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover/item:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-white transition-all duration-300 h-12 text-lg font-semibold group"
                  >
                    <span>Explore Platform</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Start Your Research Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarineDataDashboard;
