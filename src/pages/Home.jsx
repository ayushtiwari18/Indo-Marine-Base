import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Database,
  Brain,
  Globe,
  Users,
  Fish,
  Waves,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const newsRef = useRef(null);
  const numbersRef = useRef([]);

  const quickStats = [
    {
      label: "EEZ Size",
      value: "2.02M",
      unit: "km²",
      icon: Waves,
      color: "from-cyan-400 to-blue-500",
    },
    {
      label: "Datasets",
      value: "15,000",
      unit: "+",
      icon: Database,
      color: "from-blue-400 to-purple-500",
    },
    {
      label: "Species Records",
      value: "8,500",
      unit: "+",
      icon: Fish,
      color: "from-green-400 to-cyan-500",
    },
    {
      label: "Research Partners",
      value: "120",
      unit: "+",
      icon: Users,
      color: "from-purple-400 to-pink-500",
    },
  ];

  const highlightCards = [
    {
      title: "Datasets",
      description:
        "Access comprehensive marine datasets including oceanography, taxonomy, and molecular data",
      icon: Database,
      link: "/datasets",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "Visualizations",
      description:
        "Interactive maps and charts for marine data analysis and exploration",
      icon: BarChart3,
      link: "/visualization",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "AI Tools",
      description:
        "Species identification, otolith analysis, and eDNA matching powered by AI",
      icon: Brain,
      link: "/ai-tools",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "APIs",
      description:
        "Programmatic access to marine data with comprehensive documentation",
      icon: Globe,
      link: "/api-access",
      gradient: "from-green-500 to-cyan-600",
      bgGradient: "from-green-500/10 to-cyan-500/10",
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero section animation
    tl.from(heroRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });

    // Stats animation
    tl.from(
      statsRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Cards animation
    tl.from(
      cardsRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // News section
    tl.from(
      newsRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animate numbers
    numbersRef.current.forEach((number, index) => {
      if (number) {
        const targetValue = quickStats[index].value.replace(/[^\d]/g, "");
        gsap.fromTo(
          number,
          { textContent: 0 },
          {
            textContent: targetValue,
            duration: 2,
            delay: 0.5 + index * 0.1,
            snap: { textContent: 1 },
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(this.targets()[0].textContent);
              const formattedValue =
                currentValue >= 1000
                  ? `${(currentValue / 1000).toFixed(
                      currentValue >= 10000 ? 0 : 1
                    )}${currentValue >= 1000000 ? "M" : "K"}`
                  : currentValue.toString();
              number.textContent = formattedValue;
            },
          }
        );
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Background floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute top-96 left-32 w-24 h-24 bg-blue-400/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-28 h-28 bg-purple-400/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 ocean-wave-line"></div>
        <div className="absolute inset-0 ocean-wave-glow"></div>

        {/* Floating spheres in hero */}
        <div className="absolute top-8 right-12 w-16 h-16 bg-white/10 rounded-full blur-sm animate-pulse"></div>
        <div
          className="absolute bottom-12 left-16 w-12 h-12 bg-cyan-300/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            India's Unified Marine Data Platform
          </h1>
          <p className="mb-6 max-w-2xl text-lg text-cyan-50/90 leading-relaxed">
            Comprehensive marine data integration and visualization system for
            research, conservation, and sustainable ocean management across
            India's vast marine ecosystem.
          </p>
          <Button
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link to="/datasets">
              <Database className="mr-2 h-5 w-5" />
              Explore Data
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (statsRef.current[index] = el)}
            className="dashboard-metric-card group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => (numbersRef.current[index] = el)}
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                >
                  0
                </span>
                <span className="text-xl font-bold text-cyan-400">
                  {stat.unit}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Highlight Cards */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlightCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`dashboard-card group cursor-pointer bg-gradient-to-br ${card.bgGradient} border-cyan-500/20 hover:border-cyan-400/40`}
          >
            <div className="mb-4">
              <div
                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
            </div>
            <p className="mb-4 text-slate-300 text-sm leading-relaxed">
              {card.description}
            </p>
            <Button
              className="w-full bg-slate-800/50 hover:bg-slate-700/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
              asChild
            >
              <Link to={card.link}>
                Learn More
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </section>

      {/* News and Updates */}
      <section ref={newsRef} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 dashboard-card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Latest Updates
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-cyan-500/20 hover:border-cyan-400/30 transition-colors">
              <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-white border-0">
                Research
              </Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">
                  New Biodiversity Hotspots Identified
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Advanced AI analysis reveals previously unknown marine
                  biodiversity zones in the Arabian Sea.
                </p>
                <p className="text-cyan-400 text-xs font-medium">
                  Dec 15, 2024
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-cyan-500/20 hover:border-cyan-400/30 transition-colors">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                Dataset
              </Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">
                  Seasonal Oceanographic Data Release
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Comprehensive temperature, salinity, and current data for 2024
                  monsoon season now available.
                </p>
                <p className="text-cyan-400 text-xs font-medium">
                  Dec 12, 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Quick Actions
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <Button
              className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
              asChild
            >
              <Link to="/ai-tools">
                <Brain className="mr-3 h-5 w-5" />
                Analyze Species
              </Link>
            </Button>
            <Button
              className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
              asChild
            >
              <Link to="/visualization">
                <BarChart3 className="mr-3 h-5 w-5" />
                View Analytics
              </Link>
            </Button>
            <Button
              className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
              asChild
            >
              <Link to="/datasets">
                <Database className="mr-3 h-5 w-5" />
                Browse Data
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
