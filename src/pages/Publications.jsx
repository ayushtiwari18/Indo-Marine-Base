"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Filter,
  Download,
  ExternalLink,
  Calendar,
  Users,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const sectionRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const publications = [
    {
      id: 1,
      title: "AI-Driven Marine Biodiversity Assessment in the Indian Ocean",
      authors: ["Dr. Sarah Chen", "Prof. Ahmed Rahman", "Dr. Maria Santos"],
      journal: "Marine Ecology Progress Series",
      year: 2024,
      type: "Research Article",
      citations: 45,
      doi: "10.3354/meps14589",
      abstract:
        "This study presents a comprehensive analysis of marine biodiversity patterns using advanced AI algorithms and eDNA sequencing data from 150 sampling sites across the Indian Ocean.",
      tags: ["AI", "Biodiversity", "Indian Ocean", "eDNA"],
      impact: "High Impact",
      openAccess: true,
    },
    {
      id: 2,
      title: "Deep Learning Applications in Oceanographic Data Processing",
      authors: [
        "Prof. Lakshmi Nair",
        "Dr. James Mitchell",
        "Dr. Robert Thompson",
      ],
      journal: "Ocean Science Journal",
      year: 2024,
      type: "Review Article",
      citations: 78,
      doi: "10.1007/s12601-024-0056-8",
      abstract:
        "A comprehensive review of deep learning methodologies applied to oceanographic data analysis, including temperature, salinity, and current predictions.",
      tags: ["Deep Learning", "Oceanography", "Data Processing"],
      impact: "High Impact",
      openAccess: false,
    },
    {
      id: 3,
      title: "Molecular Markers for Coral Reef Health Assessment",
      authors: ["Dr. Maria Santos", "Dr. James Mitchell"],
      journal: "Coral Reefs",
      year: 2023,
      type: "Research Article",
      citations: 32,
      doi: "10.1007/s00338-023-02345-1",
      abstract:
        "Development of novel molecular markers for rapid assessment of coral reef health status using environmental DNA techniques.",
      tags: ["Coral Reefs", "Molecular Biology", "Conservation"],
      impact: "Medium Impact",
      openAccess: true,
    },
    {
      id: 4,
      title: "Climate Change Impacts on Marine Food Webs",
      authors: ["Dr. Robert Thompson", "Prof. Ahmed Rahman"],
      journal: "Global Change Biology",
      year: 2023,
      type: "Research Article",
      citations: 89,
      doi: "10.1111/gcb.16789",
      abstract:
        "Long-term analysis of climate change effects on marine food web structures across different oceanic regions.",
      tags: ["Climate Change", "Food Webs", "Marine Ecology"],
      impact: "High Impact",
      openAccess: true,
    },
    {
      id: 5,
      title: "Sustainable Fisheries Management Using Predictive Analytics",
      authors: ["Dr. Sarah Chen", "Prof. Lakshmi Nair"],
      journal: "Fisheries Research",
      year: 2023,
      type: "Applied Research",
      citations: 23,
      doi: "10.1016/j.fishres.2023.106542",
      abstract:
        "Implementation of predictive analytics models for sustainable fisheries management and stock assessment.",
      tags: ["Fisheries", "Sustainability", "Predictive Analytics"],
      impact: "Medium Impact",
      openAccess: false,
    },
  ];

  const stats = [
    { number: "150+", label: "Publications", icon: FileText },
    { number: "1,200+", label: "Citations", icon: Award },
    { number: "25", label: "Journals", icon: BookOpen },
    { number: "8.5", label: "Avg Impact Factor", icon: TrendingUp },
  ];

  const filters = ["all", "2024", "2023", "High Impact", "Open Access"];

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      pub.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" ||
      pub.year.toString() === selectedFilter ||
      pub.impact === selectedFilter ||
      (selectedFilter === "Open Access" && pub.openAccess);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pub-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".publications-grid",
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".stat-card",
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
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
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Research Publications
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Scientific
            </span>
            <br />
            <span className="text-white">Publications</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive collection of peer-reviewed research
            publications in marine science and oceanography.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Search and Filter */}
        <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search publications, authors, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={
                      selectedFilter === filter
                        ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50"
                    }
                  >
                    {filter === "all" ? "All Publications" : filter}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publications Grid */}
        <div className="publications-grid space-y-6">
          {filteredPublications.map((publication) => (
            <Card
              key={publication.id}
              className="pub-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                          {publication.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            className={`${
                              publication.impact === "High Impact"
                                ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                                : "bg-blue-600/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {publication.impact}
                          </Badge>
                          {publication.openAccess && (
                            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30">
                              Open Access
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className="border-slate-600 text-slate-400"
                          >
                            {publication.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-slate-300 text-sm mb-2">
                        <strong>Authors:</strong>{" "}
                        {publication.authors.join(", ")}
                      </p>
                      <p className="text-slate-300 text-sm mb-2">
                        <strong>Published in:</strong> {publication.journal} (
                        {publication.year})
                      </p>
                      <p className="text-slate-300 text-sm">
                        <strong>DOI:</strong> {publication.doi}
                      </p>
                    </div>

                    <p className="text-slate-200 leading-relaxed mb-4">
                      {publication.abstract}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {publication.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-48 flex lg:flex-col gap-4">
                    <div className="text-center lg:mb-4">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">
                        {publication.citations}
                      </div>
                      <div className="text-sm text-slate-400">Citations</div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white group/btn"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 group/btn"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Online
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No publications found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
