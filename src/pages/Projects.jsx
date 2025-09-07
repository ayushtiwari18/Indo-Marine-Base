"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Folder,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  ExternalLink,
  FileText,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "AI-Powered Marine Species Classification",
      description:
        "Development of advanced machine learning algorithms for automated marine species identification using underwater imagery and eDNA data.",
      status: "Active",
      progress: 75,
      startDate: "2023-01-15",
      endDate: "2024-12-31",
      budget: "$850,000",
      team: ["Dr. Sarah Chen", "Prof. Ahmed Rahman", "Dr. Maria Santos"],
      tags: ["AI/ML", "Species Classification", "Computer Vision"],
      objectives: [
        "Develop CNN models for species recognition",
        "Create comprehensive training dataset",
        "Implement real-time classification system",
        "Validate accuracy across different marine environments",
      ],
      deliverables: [
        { name: "Species Classification Model", status: "completed" },
        { name: "Training Dataset", status: "completed" },
        { name: "Real-time Processing System", status: "in-progress" },
        { name: "Validation Report", status: "pending" },
      ],
      funding: "National Science Foundation",
      impact: "High",
    },
    {
      id: 2,
      title: "Ocean Data Integration Platform",
      description:
        "Building a comprehensive platform for integrating and analyzing oceanographic data from multiple sources including satellites, sensors, and research vessels.",
      status: "Active",
      progress: 60,
      startDate: "2023-03-01",
      endDate: "2025-02-28",
      budget: "$1,200,000",
      team: ["Prof. Lakshmi Nair", "Dr. James Mitchell", "Dr. Robert Thompson"],
      tags: ["Data Integration", "Oceanography", "Platform Development"],
      objectives: [
        "Design scalable data architecture",
        "Implement data ingestion pipelines",
        "Develop analytical tools and dashboards",
        "Ensure data quality and standardization",
      ],
      deliverables: [
        { name: "System Architecture", status: "completed" },
        { name: "Data Ingestion Module", status: "completed" },
        { name: "Analytics Dashboard", status: "in-progress" },
        { name: "Quality Assurance System", status: "in-progress" },
      ],
      funding: "European Union Horizon 2020",
      impact: "High",
    },
    {
      id: 3,
      title: "Climate Change Impact Assessment",
      description:
        "Comprehensive study of climate change effects on marine ecosystems using historical data analysis and predictive modeling.",
      status: "Planning",
      progress: 15,
      startDate: "2024-06-01",
      endDate: "2027-05-31",
      budget: "$2,100,000",
      team: [
        "Dr. Elena Rodriguez",
        "Prof. Hiroshi Tanaka",
        "Dr. Sophie Laurent",
      ],
      tags: ["Climate Change", "Ecosystem Modeling", "Predictive Analytics"],
      objectives: [
        "Analyze historical climate and marine data",
        "Develop predictive ecosystem models",
        "Assess vulnerability of marine species",
        "Provide conservation recommendations",
      ],
      deliverables: [
        { name: "Literature Review", status: "completed" },
        { name: "Data Collection Framework", status: "in-progress" },
        { name: "Modeling Framework", status: "pending" },
        { name: "Impact Assessment Report", status: "pending" },
      ],
      funding: "International Climate Research Fund",
      impact: "Very High",
    },
    {
      id: 4,
      title: "Coral Reef Health Monitoring System",
      description:
        "Development of an automated monitoring system for coral reef health using IoT sensors, underwater drones, and molecular analysis.",
      status: "Completed",
      progress: 100,
      startDate: "2022-04-01",
      endDate: "2023-12-31",
      budget: "$650,000",
      team: ["Dr. Maria Santos", "Dr. James Mitchell"],
      tags: ["Coral Reefs", "IoT", "Health Monitoring"],
      objectives: [
        "Deploy IoT sensor networks",
        "Develop underwater drone technology",
        "Create health assessment algorithms",
        "Establish monitoring protocols",
      ],
      deliverables: [
        { name: "IoT Sensor Network", status: "completed" },
        { name: "Drone Deployment System", status: "completed" },
        { name: "Health Assessment Algorithms", status: "completed" },
        { name: "Monitoring Protocol Manual", status: "completed" },
      ],
      funding: "Ocean Conservation Foundation",
      impact: "High",
    },
    {
      id: 5,
      title: "Sustainable Fisheries Data Platform",
      description:
        "Creating a data-driven platform to support sustainable fisheries management through catch analysis, stock assessment, and economic modeling.",
      status: "Active",
      progress: 40,
      startDate: "2023-09-01",
      endDate: "2025-08-31",
      budget: "$950,000",
      team: ["Dr. Sarah Chen", "Prof. Lakshmi Nair", "Dr. Robert Thompson"],
      tags: ["Fisheries", "Sustainability", "Economic Modeling"],
      objectives: [
        "Collect and integrate fisheries data",
        "Develop stock assessment models",
        "Create economic impact analysis tools",
        "Build stakeholder engagement platform",
      ],
      deliverables: [
        { name: "Data Integration System", status: "completed" },
        { name: "Stock Assessment Models", status: "in-progress" },
        { name: "Economic Analysis Tools", status: "pending" },
        { name: "Stakeholder Platform", status: "pending" },
      ],
      funding: "World Bank Blue Economy Initiative",
      impact: "High",
    },
    {
      id: 6,
      title: "Marine Microplastic Detection System",
      description:
        "Advanced system for detecting and quantifying microplastics in marine environments using spectroscopy and machine learning.",
      status: "Active",
      progress: 30,
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      budget: "$750,000",
      team: ["Dr. Elena Rodriguez", "Dr. Maria Santos"],
      tags: ["Microplastics", "Pollution", "Detection Technology"],
      objectives: [
        "Develop spectroscopic detection methods",
        "Train ML models for plastic identification",
        "Create portable detection devices",
        "Establish monitoring protocols",
      ],
      deliverables: [
        { name: "Detection Algorithm", status: "in-progress" },
        { name: "Prototype Device", status: "in-progress" },
        { name: "Field Testing", status: "pending" },
        { name: "Final System", status: "pending" },
      ],
      funding: "Environmental Protection Agency",
      impact: "Medium",
    },
  ];

  const stats = [
    { number: "25+", label: "Active Projects", icon: Folder },
    { number: "$12.5M", label: "Total Funding", icon: TrendingUp },
    { number: "85+", label: "Researchers", icon: Users },
    { number: "95%", label: "Success Rate", icon: Target },
  ];

  const filters = ["all", "Active", "Planning", "Completed"];

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.status === activeFilter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <PlayCircle className="w-4 h-4" />;
      case "Planning":
        return <Clock className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
      case "Planning":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      case "Completed":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDeliverableStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-progress":
        return "text-yellow-400";
      case "pending":
        return "text-slate-400";
      default:
        return "text-slate-400";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-grid",
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
            <Folder className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Research Projects
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Marine Research
            </span>
            <br />
            <span className="text-white">Projects</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive portfolio of marine research initiatives
            spanning AI, oceanography, and conservation science.
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

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50"
              }
            >
              {filter === "all" ? "All Projects" : filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid space-y-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <Badge
                        className={`flex items-center gap-1 ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">
                          Progress
                        </span>
                        <span className="text-sm text-cyan-400 font-semibold">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Team */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                        Research Team:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-slate-600 text-slate-300 text-xs"
                          >
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-3">
                        Key Objectives:
                      </h4>
                      <ul className="space-y-2">
                        {project.objectives
                          .slice(0, 3)
                          .map((objective, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-slate-300 text-sm"
                            >
                              <Target className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Project Details */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Project Details
                      </h4>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Budget:</span>
                          <span className="text-cyan-400 font-semibold">
                            {project.budget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white">
                            {new Date(project.startDate).getFullYear()} -{" "}
                            {new Date(project.endDate).getFullYear()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Funding:</span>
                          <span className="text-white text-right max-w-32">
                            {project.funding}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Impact:</span>
                          <Badge
                            className={
                              project.impact === "Very High"
                                ? "bg-red-600/20 text-red-400 border-red-500/30"
                                : "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                            }
                          >
                            {project.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Deliverables
                      </h4>

                      <div className="space-y-3">
                        {project.deliverables.map((deliverable, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-slate-300 text-sm">
                              {deliverable.name}
                            </span>
                            <span
                              className={`text-xs font-medium ${getDeliverableStatusColor(
                                deliverable.status
                              )}`}
                            >
                              {deliverable.status.replace("-", " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No projects found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filter selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
