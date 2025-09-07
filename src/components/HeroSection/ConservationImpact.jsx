"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
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

// Floating background elements
function ImpactFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="impact-float impact-float-1"></div>
      <div className="impact-float impact-float-2"></div>
      <div className="impact-float impact-float-3"></div>
      <div className="impact-float impact-float-4"></div>
      <div className="impact-float impact-float-5"></div>
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }) {
  const nodeRef = useRef();
  const [displayValue, setDisplayValue] = React.useState(0);
  const isInView = useInView(nodeRef, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
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
    if (end.includes("/")) return end; // For 24/7
    return Math.floor(value);
  };

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}
      {formatValue(displayValue)}
      {suffix}
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
      color: "from-cyan-500 to-teal-600",
      bgGradient: "from-cyan-500/10 to-teal-600/10",
    },
    {
      number: "150+",
      label: "Research Partners",
      description: "Global institutions",
      icon: Globe,
      color: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-600/10",
    },
    {
      number: "45",
      label: "Countries",
      description: "Contributing data",
      icon: TrendingUp,
      color: "from-teal-500 to-emerald-600",
      bgGradient: "from-teal-500/10 to-emerald-600/10",
    },
    {
      number: "99.2%",
      label: "Data Accuracy",
      description: "AI-verified insights",
      icon: Shield,
      color: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-500/10 to-green-600/10",
    },
    {
      number: "50TB",
      label: "Data Storage",
      description: "Oceanographic datasets",
      icon: Activity,
      color: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-500/10 to-blue-600/10",
    },
    {
      number: "24/7",
      label: "Monitoring",
      description: "Real-time data collection",
      icon: Clock,
      color: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-500/10 to-indigo-600/10",
    },
    {
      number: "500+",
      label: "Publications",
      description: "Research papers supported",
      icon: FileText,
      color: "from-pink-500 to-purple-600",
      bgGradient: "from-pink-500/10 to-purple-600/10",
    },
    {
      number: "95%",
      label: "Uptime",
      description: "Platform reliability",
      icon: Zap,
      color: "from-orange-500 to-pink-600",
      bgGradient: "from-orange-500/10 to-pink-600/10",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0, scale: 0.8 },
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

      // Stats cards stagger animation
      gsap.fromTo(
        ".impact-card",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements animation
      gsap.to(".impact-float", {
        y: "+=35",
        rotation: "+=360",
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "power3.out",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-blue-950/40 to-cyan-950/20 overflow-hidden"
    >
      {/* Floating background elements */}
      <ImpactFloatingElements />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5"></div>

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
            className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 mb-8"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Impact Metrics
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Comprehensive Marine
            </span>
            <br />
            <span className="text-cyan-100">Intelligence Platform</span>
          </h2>

          <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
            Empowering researchers and policymakers with actionable marine
            biodiversity insights through cutting-edge technology
          </p>
        </motion.div>

        {/* Enhanced Impact Statistics */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="impact-card group"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="relative h-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                {/* Card background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Animated border sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <CardContent className="relative z-10 p-8 text-center h-full flex flex-col justify-between">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Number */}
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    <AnimatedCounter
                      end={stat.number}
                      duration={2 + index * 0.1}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-xl font-semibold text-cyan-100 mb-2 group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-cyan-200/80 group-hover:text-cyan-100/90 transition-colors duration-300">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          ref={ctaRef}
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="relative bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-cyan-400/30 overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 animate-pulse"></div>

            {/* Animated waves background */}
            <div className="absolute inset-0 opacity-10">
              <div className="cta-waves"></div>
            </div>

            <CardContent className="relative z-10 p-12 text-center">
              <motion.div
                className="mb-8"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                  <Waves className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <h3 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Advanced Marine Research Platform
              </h3>

              <p className="text-xl md:text-2xl text-cyan-200/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                Partner with CMLRE to advance marine biodiversity research
                through comprehensive data analytics and AI-driven insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
                >
                  Start Research Collaboration
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-12 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300"
                >
                  Access Public Datasets
                </Button>
              </div>

              {/* Partner logos or additional info could go here */}
              <div className="mt-12 flex items-center justify-center gap-8 text-cyan-300/60">
                <div className="text-sm">
                  Trusted by 150+ institutions worldwide
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ConservationImpact;
