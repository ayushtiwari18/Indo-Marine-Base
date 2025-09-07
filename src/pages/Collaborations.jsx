"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Globe,
  Building,
  MapPin,
  ExternalLink,
  Mail,
  Calendar,
  Award,
  Handshake,
  Network,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Collaborations = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("institutions");

  const institutions = [
    {
      id: 1,
      name: "Woods Hole Oceanographic Institution",
      location: "Massachusetts, USA",
      type: "Research Institution",
      partnership: "Strategic Partnership",
      since: 2020,
      projects: 12,
      description:
        "Collaborative research on deep-sea biodiversity and climate change impacts on marine ecosystems.",
      focus: ["Deep Sea Research", "Climate Change", "Marine Biology"],
      logo: "/api/placeholder/80/80",
      website: "https://whoi.edu",
      status: "Active",
    },
    {
      id: 2,
      name: "National Institute of Oceanography",
      location: "Goa, India",
      type: "Government Research Institute",
      partnership: "Research Collaboration",
      since: 2019,
      projects: 18,
      description:
        "Joint initiatives in oceanographic data collection and marine living resources assessment.",
      focus: ["Oceanography", "Data Collection", "Marine Resources"],
      logo: "/api/placeholder/80/80",
      website: "https://nio.org",
      status: "Active",
    },
    {
      id: 3,
      name: "Scripps Institution of Oceanography",
      location: "California, USA",
      type: "Academic Institution",
      partnership: "Research Partnership",
      since: 2021,
      projects: 8,
      description:
        "Collaborative studies on marine biodiversity using advanced AI and machine learning techniques.",
      focus: ["AI Research", "Biodiversity", "Machine Learning"],
      logo: "/api/placeholder/80/80",
      website: "https://scripps.ucsd.edu",
      status: "Active",
    },
    {
      id: 4,
      name: "Australian Institute of Marine Science",
      location: "Queensland, Australia",
      type: "Research Institution",
      partnership: "Data Sharing Agreement",
      since: 2022,
      projects: 6,
      description:
        "Shared research on coral reef ecosystems and marine conservation strategies.",
      focus: ["Coral Reefs", "Conservation", "Data Sharing"],
      logo: "/api/placeholder/80/80",
      website: "https://aims.gov.au",
      status: "Active",
    },
  ];

  const researchers = [
    {
      id: 1,
      name: "Dr. Elena Rodriguez",
      position: "Senior Marine Biologist",
      institution: "University of Barcelona",
      location: "Spain",
      expertise: ["Marine Genomics", "Species Identification", "eDNA Analysis"],
      collaborations: 5,
      publications: 23,
      avatar: "/api/placeholder/64/64",
      email: "elena.rodriguez@ub.edu",
      status: "Active Collaborator",
    },
    {
      id: 2,
      name: "Prof. Hiroshi Tanaka",
      position: "Professor of Oceanography",
      institution: "Tokyo University of Marine Science",
      location: "Japan",
      expertise: ["Ocean Modeling", "Climate Science", "Data Analytics"],
      collaborations: 8,
      publications: 45,
      avatar: "/api/placeholder/64/64",
      email: "h.tanaka@tumst.ac.jp",
      status: "Active Collaborator",
    },
    {
      id: 3,
      name: "Dr. Sophie Laurent",
      position: "Research Director",
      institution: "French Institute for Sea Research",
      location: "France",
      expertise: ["Deep Sea Exploration", "Marine Ecology", "Biodiversity"],
      collaborations: 7,
      publications: 34,
      avatar: "/api/placeholder/64/64",
      email: "sophie.laurent@ifremer.fr",
      status: "Active Collaborator",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Global Marine Biodiversity Assessment",
      partners: ["Woods Hole", "Scripps", "NIO"],
      duration: "2023-2025",
      budget: "$2.5M",
      status: "Ongoing",
      description:
        "Comprehensive assessment of marine biodiversity patterns across different oceanic regions using AI-driven analysis.",
      goals: [
        "Species mapping",
        "Biodiversity hotspots",
        "Conservation priorities",
      ],
    },
    {
      id: 2,
      title: "Ocean Data Integration Platform",
      partners: ["AIMS", "NIO", "TUMST"],
      duration: "2022-2024",
      budget: "$1.8M",
      status: "Near Completion",
      description:
        "Development of integrated platform for ocean data sharing and collaborative research.",
      goals: ["Data standardization", "Platform development", "Global access"],
    },
    {
      id: 3,
      title: "Climate Impact on Marine Ecosystems",
      partners: ["Woods Hole", "University of Barcelona"],
      duration: "2024-2026",
      budget: "$3.2M",
      status: "Planning",
      description:
        "Long-term study of climate change impacts on marine food webs and ecosystem dynamics.",
      goals: ["Climate modeling", "Ecosystem analysis", "Impact assessment"],
    },
  ];

  const stats = [
    { number: "45+", label: "Partner Institutions", icon: Building },
    { number: "120+", label: "Researchers", icon: Users },
    { number: "28", label: "Countries", icon: Globe },
    { number: "85+", label: "Joint Projects", icon: Handshake },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collab-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".collaborations-content",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderInstitutions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {institutions.map((institution) => (
        <Card
          key={institution.id}
          className="collab-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardContent className="relative z-10 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                  {institution.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400 text-sm">
                    {institution.location}
                  </span>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/30">
                    {institution.partnership}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-400"
                  >
                    Since {institution.since}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-4 leading-relaxed">
              {institution.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {institution.focus.map((area, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 text-xs"
                >
                  {area}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm text-slate-400">
                <span>
                  <strong className="text-cyan-400">
                    {institution.projects}
                  </strong>{" "}
                  Projects
                </span>
                <span className="text-emerald-400">● {institution.status}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 group/btn"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderResearchers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {researchers.map((researcher) => (
        <Card
          key={researcher.id}
          className="collab-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardContent className="relative z-10 p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
              {researcher.name}
            </h3>

            <p className="text-cyan-400 text-sm font-medium mb-1">
              {researcher.position}
            </p>
            <p className="text-slate-400 text-sm mb-4">
              {researcher.institution}
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">
                {researcher.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4 justify-center">
              {researcher.expertise.slice(0, 2).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex justify-center gap-4 text-sm text-slate-400 mb-4">
              <span>
                <strong className="text-cyan-400">
                  {researcher.collaborations}
                </strong>{" "}
                Projects
              </span>
              <span>
                <strong className="text-cyan-400">
                  {researcher.publications}
                </strong>{" "}
                Papers
              </span>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="collab-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardContent className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <Badge
                    className={`${
                      project.status === "Ongoing"
                        ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                        : project.status === "Near Completion"
                        ? "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
                        : "bg-blue-600/20 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                    Project Goals:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.goals.map((goal, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 text-xs"
                      >
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-slate-400">
                  <strong>Partners:</strong> {project.partners.join(", ")}
                </div>
              </div>

              <div className="lg:w-48 flex lg:flex-col gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {project.budget}
                  </div>
                  <div className="text-sm text-slate-400">Total Budget</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-semibold text-white mb-1">
                    {project.duration}
                  </div>
                  <div className="text-sm text-slate-400">Duration</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 -right-20 animate-pulse"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 -left-20 animate-pulse"
          style={{ animationDelay: "3s" }}
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
            <Network className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Global Partnerships
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Research
            </span>
            <br />
            <span className="text-white">Collaborations</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Building bridges across continents to advance marine science through
            collaborative research and data sharing.
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

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            {
              key: "institutions",
              label: "Partner Institutions",
              icon: Building,
            },
            {
              key: "researchers",
              label: "Collaborating Researchers",
              icon: Users,
            },
            { key: "projects", label: "Joint Projects", icon: Handshake },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => setActiveTab(tab.key)}
              className={
                activeTab === tab.key
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50"
              }
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="collaborations-content">
          {activeTab === "institutions" && renderInstitutions()}
          {activeTab === "researchers" && renderResearchers()}
          {activeTab === "projects" && renderProjects()}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
