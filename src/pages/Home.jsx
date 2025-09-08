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
  Activity,
  Anchor,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const newsRef = useRef(null);
  const numbersRef = useRef([]);
  const floatingRef = useRef([]);

  const quickStats = [
    {
      label: "EEZ Coverage",
      value: "2.02M",
      unit: "km²",
      icon: Waves,
      color: "from-cyan-400 to-blue-500",
      description: "Exclusive Economic Zone",
    },
    {
      label: "Marine Datasets",
      value: "15,000",
      unit: "+",
      icon: Database,
      color: "from-blue-400 to-purple-500",
      description: "Research datasets available",
    },
    {
      label: "Species Records",
      value: "8,500",
      unit: "+",
      icon: Fish,
      color: "from-green-400 to-cyan-500",
      description: "Documented marine species",
    },
    {
      label: "Research Partners",
      value: "120",
      unit: "+",
      icon: Users,
      color: "from-purple-400 to-pink-500",
      description: "Collaborative institutions",
    },
  ];

  const highlightCards = [
    {
      title: "Marine Datasets",
      description:
        "Access comprehensive oceanographic data, species databases, and environmental monitoring records from India's marine ecosystem",
      icon: Database,
      link: "/datasets",
      gradient: "from-cyan-500 to-blue-600",
      stats: "15K+ datasets",
      features: ["Oceanography", "Taxonomy", "Environmental", "Real-time"],
    },
    {
      title: "Data Visualization",
      description:
        "Interactive maps, charts, and dashboards for marine data analysis with advanced filtering and real-time updates",
      icon: BarChart3,
      link: "/visualization",
      gradient: "from-blue-500 to-purple-600",
      stats: "50+ chart types",
      features: ["Interactive Maps", "Time Series", "3D Models", "Analytics"],
    },
    {
      title: "AI-Powered Tools",
      description:
        "Advanced machine learning for species identification, habitat analysis, and predictive ocean modeling",
      icon: Brain,
      link: "/ai-tools",
      gradient: "from-purple-500 to-pink-600",
      stats: "95% accuracy",
      features: [
        "Species ID",
        "Otolith Analysis",
        "eDNA Matching",
        "Predictions",
      ],
    },
    {
      title: "Developer APIs",
      description:
        "RESTful APIs with comprehensive documentation for integrating marine data into your applications",
      icon: Globe,
      link: "/api-access",
      gradient: "from-green-500 to-cyan-600",
      stats: "99.9% uptime",
      features: ["REST API", "GraphQL", "WebSocket", "SDKs"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero animation
      tl.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      // Stats animation
      tl.from(
        statsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      // Cards animation
      tl.from(
        cardsRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Number animations
      numbersRef.current.forEach((number, index) => {
        if (number) {
          const targetValue = quickStats[index].value.replace(/[^\d]/g, "");
          gsap.fromTo(
            number,
            { textContent: 0 },
            {
              textContent: targetValue,
              duration: 2.5,
              delay: 1 + index * 0.2,
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={(el) => (floatingRef.current[0] = el)}
          className="absolute top-32 right-20 w-32 h-32 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.03) 70%, transparent 100%)",
          }}
        ></div>
        <div
          ref={(el) => (floatingRef.current[1] = el)}
          className="absolute top-96 left-32 w-24 h-24 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 70%, transparent 100%)",
          }}
        ></div>
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative overflow-hidden rounded-3xl p-12"
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            boxShadow: "0 8px 32px rgba(6, 182, 212, 0.15)",
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
                }}
              >
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#22c55e" }}
              ></div>
            </div>

            <h1
              className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, #f1f5f9 0%, #22d3ee 50%, #f1f5f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              India's Unified Marine Intelligence Platform
            </h1>
            <p
              className="mb-8 max-w-3xl text-lg leading-relaxed"
              style={{ color: "#cbd5e1" }}
            >
              Advanced marine data integration, AI-powered analysis, and
              comprehensive visualization tools for research, conservation, and
              sustainable ocean management across India's vast marine ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
                }}
              >
                <Link to="/datasets">
                  <Database className="mr-2 h-5 w-5" />
                  Explore Marine Data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {quickStats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                boxShadow: "0 8px 25px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color
                      .replace("from-", "#")
                      .replace(" to-", ", #")
                      .replace("cyan-400", "06b6d4")
                      .replace("blue-500", "3b82f6")
                      .replace("purple-500", "8b5cf6")
                      .replace("green-400", "22c55e")
                      .replace("pink-500", "ec4899")})`,
                    boxShadow: "0 4px 14px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#06b6d4" }}
                ></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={(el) => (numbersRef.current[index] = el)}
                    className="text-3xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    0
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#06b6d4" }}
                  >
                    {stat.unit}
                  </span>
                </div>
                <p className="font-semibold" style={{ color: "#f1f5f9" }}>
                  {stat.label}
                </p>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Cards */}
        <section
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {highlightCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                boxShadow: "0 8px 25px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div className="mb-6">
                <div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradient
                      .replace("from-", "#")
                      .replace(" to-", ", #")
                      .replace("cyan-500", "06b6d4")
                      .replace("blue-600", "2563eb")
                      .replace("purple-600", "9333ea")
                      .replace("pink-600", "dc2626")
                      .replace("green-500", "22c55e")})`,
                    boxShadow: "0 4px 14px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <card.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#f1f5f9" }}
                  >
                    {card.title}
                  </h3>
                  <Badge
                    className="text-xs"
                    style={{
                      background: "rgba(6, 182, 212, 0.2)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                    }}
                  >
                    {card.stats}
                  </Badge>
                </div>
              </div>

              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ color: "#cbd5e1" }}
              >
                {card.description}
              </p>

              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "#06b6d4" }}
                      ></div>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full transition-all duration-300"
                asChild
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "0.5rem",
                }}
              >
                <Link to={card.link}>
                  Explore {card.title.split(" ")[0]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            boxShadow: "0 8px 32px rgba(6, 182, 212, 0.15)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
                }}
              >
                <Waves className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Ready to Explore India's Marine Data?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: "#cbd5e1" }}
            >
              Join researchers, conservationists, and developers using our
              platform to understand and protect India's marine ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
                }}
              >
                <Link to="/datasets">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
