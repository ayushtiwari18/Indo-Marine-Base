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

// Background floating elements
function FloatingOceanElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="dashboard-floating-1"></div>
      <div className="dashboard-floating-2"></div>
      <div className="dashboard-floating-3"></div>
      <div className="dashboard-floating-4"></div>
    </div>
  );
}

const MarineDataDashboard = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
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
      bgGradient: "from-cyan-500/10 to-blue-600/5",
      delay: 0.1,
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
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-500/10 to-indigo-600/5",
      delay: 0.2,
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
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-500/10 to-purple-600/5",
      delay: 0.3,
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
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-500/10 to-cyan-600/5",
      delay: 0.4,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements animation
      gsap.to(
        ".dashboard-floating-1, .dashboard-floating-2, .dashboard-floating-3, .dashboard-floating-4",
        {
          y: "+=30",
          rotation: "+=360",
          duration: 8,
          ease: "none",
          repeat: -1,
          yoyo: true,
          stagger: 2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "power3.out",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-slate-900 via-blue-950 to-cyan-950 overflow-hidden"
    >
      {/* Floating background elements */}
      <FloatingOceanElements />

      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="ocean-waves"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Advanced Marine Intelligence
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Comprehensive Ocean
            </span>
            <br />
            <span className="text-cyan-100">Research Platform</span>
          </h2>

          <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
            Integrated platforms for oceanographic research, species monitoring,
            and molecular analysis powered by cutting-edge AI technology
          </p>
        </motion.div>

        {/* Enhanced Platform Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="relative h-full bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden">
                {/* Card background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <CardHeader className="relative z-10 pb-4">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${platform.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <platform.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl md:text-3xl font-bold text-cyan-100 mb-4 group-hover:text-white transition-colors duration-300">
                    {platform.title}
                  </CardTitle>

                  <CardDescription className="text-cyan-200/80 text-lg leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {platform.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="text-cyan-100/90 flex items-center group/item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          delay: platform.delay + featureIndex * 0.1,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 group-hover/item:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover/item:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 hover:border-cyan-400 transition-all duration-300 group-hover:border-cyan-300 h-12 text-lg font-semibold"
                  >
                    <span>Explore Platform</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Start Your Research Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarineDataDashboard;
