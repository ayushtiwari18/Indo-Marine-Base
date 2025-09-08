import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
  Activity,
  Anchor,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const numbersRef = useRef([]);

  const quickStats = [
    {
      label: "EEZ Coverage",
      value: "2.02M",
      unit: "km²",
      icon: Waves,
      color: "#06b6d4",
      description: "Exclusive Economic Zone",
    },
    {
      label: "Marine Datasets",
      value: "15,000",
      unit: "+",
      icon: Database,
      color: "#3b82f6",
      description: "Research datasets available",
    },
    {
      label: "Species Records",
      value: "8,500",
      unit: "+",
      icon: Fish,
      color: "#10b981",
      description: "Documented marine species",
    },
    {
      label: "Research Partners",
      value: "120",
      unit: "+",
      icon: Users,
      color: "#8b5cf6",
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
      color: "#06b6d4",
      stats: "15K+ datasets",
      features: ["Oceanography", "Taxonomy", "Environmental", "Real-time"],
    },
    {
      title: "Data Visualization",
      description:
        "Interactive maps, charts, and dashboards for marine data analysis with advanced filtering and real-time updates",
      icon: BarChart3,
      link: "/visualization",
      color: "#3b82f6",
      stats: "50+ chart types",
      features: ["Interactive Maps", "Time Series", "3D Models", "Analytics"],
    },
    {
      title: "AI-Powered Tools",
      description:
        "Advanced machine learning for species identification, habitat analysis, and predictive ocean modeling",
      icon: Brain,
      link: "/ai-tools",
      color: "#8b5cf6",
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
      color: "#10b981",
      stats: "99.9% uptime",
      features: ["REST API", "GraphQL", "WebSocket", "SDKs"],
    },
  ];

  // Use useGSAP instead of useEffect
  useGSAP(
    () => {
      // Ensure elements exist before animating
      if (!heroRef.current) return;

      const tl = gsap.timeline();

      // Hero animation
      gsap.set(heroRef.current, { opacity: 0, y: 50 });
      tl.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Stats animation - filter out null refs
      const validStatsRefs = statsRef.current.filter((ref) => ref !== null);
      if (validStatsRefs.length > 0) {
        gsap.set(validStatsRefs, { opacity: 0, y: 30, scale: 0.95 });
        tl.to(
          validStatsRefs,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
      }

      // Cards animation - filter out null refs
      const validCardsRefs = cardsRef.current.filter((ref) => ref !== null);
      if (validCardsRefs.length > 0) {
        gsap.set(validCardsRefs, { opacity: 0, y: 40 });
        tl.to(
          validCardsRefs,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      // Number animations
      numbersRef.current.forEach((numberEl, index) => {
        if (numberEl && quickStats[index]) {
          const targetValue = parseInt(
            quickStats[index].value.replace(/[^\d]/g, "")
          );

          gsap.fromTo(
            numberEl,
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
                numberEl.textContent = formattedValue;
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  ); // Add scope to containerRef

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "#0f172a", padding: "2rem 1rem" }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="rounded-3xl p-12 text-center"
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(6, 182, 212, 0.4)",
            borderRadius: "1.5rem",
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
              }}
            >
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                animation: "pulse 2s infinite",
              }}
            ></div>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              background:
                "linear-gradient(135deg, #f1f5f9 0%, #22d3ee 50%, #f1f5f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.2",
            }}
          >
            India's Unified Marine Intelligence Platform
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.125rem",
              marginBottom: "2rem",
              maxWidth: "50rem",
              margin: "0 auto 2rem",
            }}
          >
            Advanced marine data integration, AI-powered analysis, and
            comprehensive visualization tools for research, conservation, and
            sustainable ocean management across India's vast marine ecosystem.
          </p>

          <Button
            asChild
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              color: "white",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
              fontSize: "1.1rem",
            }}
          >
            <Link to="/datasets">
              <Database className="mr-2 h-5 w-5" />
              Explore Marine Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {quickStats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "0.75rem",
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}90)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 14px ${stat.color}40`,
                  }}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#06b6d4",
                    animation: "pulse 2s infinite",
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  ref={(el) => {
                    if (el) numbersRef.current[index] = el;
                  }}
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    background: `linear-gradient(135deg, ${stat.color}, #3b82f6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: stat.color,
                  }}
                >
                  {stat.unit}
                </span>
              </div>

              <p
                style={{
                  color: "#f1f5f9",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.label}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {highlightCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                borderRadius: "1rem",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "0.75rem",
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}90)`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    boxShadow: `0 4px 14px ${card.color}40`,
                  }}
                >
                  <card.icon className="h-7 w-7 text-white" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#f1f5f9",
                    }}
                  >
                    {card.title}
                  </h3>
                  <Badge
                    style={{
                      background: "rgba(6, 182, 212, 0.2)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {card.stats}
                  </Badge>
                </div>
              </div>

              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  marginBottom: "1.5rem",
                }}
              >
                {card.description}
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                  }}
                >
                  {card.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "0.375rem",
                          height: "0.375rem",
                          borderRadius: "50%",
                          backgroundColor: "#06b6d4",
                        }}
                      ></div>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                asChild
                style={{
                  width: "100%",
                  background: "rgba(6, 182, 212, 0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                <Link to={card.link}>
                  Explore {card.title.split(" ")[0]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
