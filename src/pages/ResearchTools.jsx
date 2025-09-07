"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Microscope,
  BarChart3,
  Brain,
  Camera,
  Database,
  Map,
  Calculator,
  Zap,
  Play,
  Download,
  ExternalLink,
  Star,
  Clock,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ResearchTools = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const tools = [
    {
      id: 1,
      name: "Species Identification AI",
      description:
        "Advanced machine learning tool for automated marine species identification from images and eDNA data.",
      category: "AI/ML",
      type: "Web Tool",
      rating: 4.8,
      users: "2.5K+",
      lastUpdated: "2024-01-15",
      features: [
        "Image Recognition",
        "eDNA Analysis",
        "Confidence Scoring",
        "Batch Processing",
      ],
      requirements: "Browser, Image Files",
      icon: Brain,
      gradient: "from-purple-500 to-indigo-600",
      status: "Popular",
    },
    {
      id: 2,
      name: "Oceanographic Data Analyzer",
      description:
        "Comprehensive tool for analyzing temperature, salinity, and current data with statistical modeling capabilities.",
      category: "Analytics",
      type: "Desktop App",
      rating: 4.6,
      users: "1.8K+",
      lastUpdated: "2024-01-10",
      features: [
        "Time Series Analysis",
        "Spatial Interpolation",
        "Statistical Modeling",
        "Data Visualization",
      ],
      requirements: "Windows/Mac/Linux",
      icon: BarChart3,
      gradient: "from-cyan-500 to-blue-600",
      status: "Featured",
    },
    {
      id: 3,
      name: "Marine Habitat Mapper",
      description:
        "Interactive mapping tool for visualizing and analyzing marine habitat distributions and environmental factors.",
      category: "Mapping",
      type: "Web Tool",
      rating: 4.7,
      users: "3.2K+",
      lastUpdated: "2024-01-12",
      features: [
        "3D Visualization",
        "Habitat Classification",
        "Environmental Overlays",
        "Export Functions",
      ],
      requirements: "Modern Browser, WebGL Support",
      icon: Map,
      gradient: "from-emerald-500 to-teal-600",
      status: "New",
    },
    {
      id: 4,
      name: "Biodiversity Calculator",
      description:
        "Statistical tool for calculating biodiversity indices, species richness, and ecological metrics.",
      category: "Statistics",
      type: "R Package",
      rating: 4.5,
      users: "1.2K+",
      lastUpdated: "2024-01-05",
      features: [
        "Shannon Index",
        "Simpson Index",
        "Species Accumulation Curves",
        "Bootstrap Confidence",
      ],
      requirements: "R 4.0+",
      icon: Calculator,
      gradient: "from-orange-500 to-red-600",
      status: "Stable",
    },
    {
      id: 5,
      name: "eDNA Sequence Processor",
      description:
        "High-performance tool for processing and analyzing environmental DNA sequences from marine samples.",
      category: "Genomics",
      type: "Command Line",
      rating: 4.9,
      users: "950+",
      lastUpdated: "2024-01-08",
      features: [
        "Quality Control",
        "Taxonomic Assignment",
        "Phylogenetic Analysis",
        "Batch Processing",
      ],
      requirements: "Linux/Unix, Python 3.8+",
      icon: Database,
      gradient: "from-pink-500 to-purple-600",
      status: "Professional",
    },
    {
      id: 6,
      name: "Underwater Image Enhancer",
      description:
        "AI-powered tool for enhancing underwater images, correcting color distortion and improving clarity.",
      category: "Image Processing",
      type: "Web Tool",
      rating: 4.4,
      users: "2.1K+",
      lastUpdated: "2024-01-14",
      features: [
        "Color Correction",
        "Noise Reduction",
        "Contrast Enhancement",
        "Batch Processing",
      ],
      requirements: "Browser, Image Files",
      icon: Camera,
      gradient: "from-blue-500 to-cyan-600",
      status: "Beta",
    },
  ];

  const categories = [
    "all",
    "AI/ML",
    "Analytics",
    "Mapping",
    "Statistics",
    "Genomics",
    "Image Processing",
  ];

  const stats = [
    { number: "50+", label: "Research Tools", icon: Microscope },
    { number: "15K+", label: "Active Users", icon: Users },
    { number: "250K+", label: "Analyses Run", icon: Zap },
    { number: "4.7", label: "Avg Rating", icon: Star },
  ];

  const filteredTools = tools.filter(
    (tool) => activeCategory === "all" || tool.category === activeCategory
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Popular":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      case "Featured":
        return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
      case "New":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      case "Beta":
        return "bg-orange-600/20 text-orange-400 border-orange-500/30";
      case "Professional":
        return "bg-purple-600/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-600/20 text-slate-400 border-slate-500/30";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tool-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".tools-grid",
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
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 -left-20 animate-pulse"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 -right-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <Microscope className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Research Tools
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Marine Research
            </span>
            <br />
            <span className="text-white">Toolkit</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Access our comprehensive suite of AI-powered tools and analytical
            software designed for marine research and conservation.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
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

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50"
              }
            >
              {category === "all" ? "All Tools" : category}
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="tool-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge className={getStatusColor(tool.status)}>
                    {tool.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                  {tool.name}
                </h3>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-slate-300">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{tool.users} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      Updated {new Date(tool.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 3 && (
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-400 text-xs"
                      >
                        +{tool.features.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-400">
                    <strong>Requirements:</strong> {tool.requirements}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Type:</strong> {tool.type}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white group/btn"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Launch Tool
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-16 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Microscope className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
              Need a Custom Tool?
            </h2>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Our development team can create specialized tools tailored to your
              specific research needs. From data processing workflows to
              advanced analytical models.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-4 text-lg">
                Request Custom Tool
              </Button>
              <Button
                variant="outline"
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 px-8 py-4 text-lg"
              >
                View Tool Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchTools;
