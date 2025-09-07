"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Globe,
  Database,
  Shield,
  Clock,
  FileText,
  Activity,
  Zap,
  ArrowRight,
  Waves,
  Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Simplified floating elements that won't conflict with your CSS
function ImpactFloatingElements() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute w-32 h-32 rounded-full opacity-10"
        style={{
          top: "20%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)",
          animation: "float-gentle 8s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute w-24 h-24 rounded-full opacity-10"
        style={{
          top: "60%",
          right: "15%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)",
          animation: "float-gentle 8s ease-in-out infinite 2s",
        }}
      ></div>
      <div
        className="absolute w-20 h-20 rounded-full opacity-10"
        style={{
          top: "80%",
          left: "70%",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent)",
          animation: "float-gentle 8s ease-in-out infinite 4s",
        }}
      ></div>
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ end, duration = 2 }) {
  const nodeRef = useRef();
  const [displayValue, setDisplayValue] = React.useState(0);
  const isInView = useInView(nodeRef, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const numericEnd = parseFloat(end.toString().replace(/[^\d.]/g, ""));

    gsap.fromTo(
      node,
      { innerHTML: 0 },
      {
        innerHTML: numericEnd,
        duration: duration,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function () {
          const currentValue = parseFloat(this.targets()[0].innerHTML);
          setDisplayValue(currentValue);
        },
      }
    );
  }, [isInView, end, duration]);

  const formatValue = (value) => {
    if (end.includes("M+")) return `${Math.floor(value)}M+`;
    if (end.includes("+")) return `${Math.floor(value)}+`;
    if (end.includes("%")) return `${value.toFixed(1)}%`;
    if (end.includes("TB")) return `${Math.floor(value)}TB`;
    if (end.includes("/")) return end;
    return Math.floor(value);
  };

  return (
    <span ref={nodeRef} className="tabular-nums">
      {formatValue(displayValue)}
    </span>
  );
}

const ConservationImpact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    {
      number: "2M+",
      label: "Species Records",
      description: "Catalogued marine organisms",
      icon: Database,
    },
    {
      number: "150+",
      label: "Research Partners",
      description: "Global institutions",
      icon: Globe,
    },
    {
      number: "45",
      label: "Countries",
      description: "Contributing data",
      icon: TrendingUp,
    },
    {
      number: "99.2%",
      label: "Data Accuracy",
      description: "AI-verified insights",
      icon: Shield,
    },
    {
      number: "50TB",
      label: "Data Storage",
      description: "Oceanographic datasets",
      icon: Activity,
    },
    {
      number: "24/7",
      label: "Monitoring",
      description: "Real-time data collection",
      icon: Clock,
    },
    {
      number: "500+",
      label: "Publications",
      description: "Research papers supported",
      icon: FileText,
    },
    {
      number: "95%",
      label: "Uptime",
      description: "Platform reliability",
      icon: Zap,
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

      // Stats cards animation
      gsap.fromTo(
        ".impact-stat-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Add the keyframes for gentle floating animation */}
      <style jsx>{`
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.2;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Floating background elements */}
        <ImpactFloatingElements />

        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-blue-900/8 to-slate-900/10"
          style={{ zIndex: 2 }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Impact Metrics
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                Comprehensive Marine
              </span>
              <br />
              <span className="text-white">Intelligence Platform</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Empowering researchers and policymakers with actionable marine
              biodiversity insights through cutting-edge technology
            </p>
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="impact-stat-card relative h-full bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="relative z-10 p-6 text-center h-full flex flex-col justify-between">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    <AnimatedCounter
                      end={stat.number}
                      duration={2 + index * 0.1}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div ref={ctaRef} className="relative">
            <Card className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
              <CardContent className="relative z-10 p-12 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                    <Waves className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Marine Intelligence Platform
                </h3>

                <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Partner with CMLRE to advance marine biodiversity research
                  through comprehensive data analytics and AI-driven insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button className="ocean-btn-primary px-12 py-4 text-lg font-semibold">
                    Start Research Collaboration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    className="ocean-btn-secondary px-12 py-4 text-lg font-semibold"
                  >
                    Access Public Datasets
                  </Button>
                </div>

                <div className="mt-12 text-slate-400">
                  <div className="text-sm">
                    Trusted by 150+ institutions worldwide
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConservationImpact;
