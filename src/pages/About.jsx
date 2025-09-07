"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Waves,
  Users,
  Target,
  Award,
  Globe,
  Database,
  Brain,
  Microscope,
  ArrowRight,
  Play,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { number: "2M+", label: "Species Records", icon: Database },
    { number: "150+", label: "Global Partners", icon: Globe },
    { number: "45", label: "Countries", icon: Users },
    { number: "99.2%", label: "Data Accuracy", icon: Award },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description:
        "Advanced machine learning algorithms for marine data analysis and species identification.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description:
        "Extensive collection of oceanographic and biodiversity data from global research institutions.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Microscope,
      title: "Research Excellence",
      description:
        "Cutting-edge molecular analysis tools and eDNA processing capabilities.",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description:
        "Worldwide network of marine researchers and conservation organizations.",
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        ".stat-card",
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
          },
        }
      );

      // Feature cards animation
      gsap.fromTo(
        ".feature-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 -left-20 animate-pulse"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 -right-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <Target className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              About Our Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Advancing Marine
            </span>
            <br />
            <span className="text-white">Research Excellence</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            The Marine Intelligence Platform represents a paradigm shift in
            oceanographic research, combining AI-driven analytics with
            comprehensive biodiversity data to accelerate marine conservation
            efforts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl group">
              Explore Our Mission
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl group"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="stat-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Platform{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover the advanced features that make our platform the premier
              choice for marine research and conservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="relative z-10 p-8">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-blue-500/5 to-cyan-500/3"></div>

            <CardContent className="relative z-10 p-12 text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                  <Waves className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our Mission
              </h2>

              <p className="text-xl md:text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
                To democratize marine research through innovative technology,
                fostering global collaboration in ocean conservation and
                sustainable marine resource management for future generations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
