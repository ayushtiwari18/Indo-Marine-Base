"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  LayoutGrid,
  List,
  Download,
  Eye,
  Calendar,
  MapPin,
  ChevronDown,
  FileText,
  Database,
  Award,
  Users,
  ExternalLink,
  Waves,
  Fish,
  Activity,
  Filter,
  TrendingUp,
  Globe,
  BarChart3,
} from "lucide-react";

/* ----------------------------------------------------------------- */
/* STATIC DATA                                                       */
/* ----------------------------------------------------------------- */
const DATASETS = [
  {
    id: 1,
    name: "Arabian Sea Temperature Profiles",
    category: "Oceanography",
    type: "Temperature",
    location: "Arabian Sea",
    timeRange: "2020-2024",
    size: "2.3 GB",
    records: "45,000",
    lastUpdated: "2024-12-10",
    description:
      "Comprehensive temperature measurements across different depths with seasonal variations and thermal stratification analysis.",
    tags: ["temperature", "depth", "seasonal"],
    isOriginal: true,
    credibility: {
      score: 95,
      citations: 12,
      peerReviewed: true,
      dataQuality: "High",
      institution: "NIOT, Chennai",
    },
    derivedDatasets: [2, 3],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: TrendingUp,
  },
  {
    id: 2,
    name: "Bay of Bengal Fish Census",
    category: "Taxonomy",
    type: "Species Count",
    location: "Bay of Bengal",
    timeRange: "2023-2024",
    size: "890 MB",
    records: "12,500",
    lastUpdated: "2024-12-08",
    description:
      "Complete fish species inventory with population estimates, distribution patterns, and biodiversity indices.",
    tags: ["fish", "census", "biodiversity"],
    isOriginal: true,
    credibility: {
      score: 88,
      citations: 8,
      peerReviewed: true,
      dataQuality: "High",
      institution: "Central Marine Fisheries Research Institute",
    },
    derivedDatasets: [4, 5],
    gradient: "from-emerald-500 via-blue-500 to-purple-500",
    icon: Fish,
  },
  {
    id: 3,
    name: "Otolith Morphology Database",
    category: "Otolith Morphology",
    type: "Image Data",
    location: "Indian Ocean",
    timeRange: "2019-2024",
    size: "5.1 GB",
    records: "8,900",
    lastUpdated: "2024-12-05",
    description:
      "High-resolution otolith images with morphometric measurements and species identification markers.",
    tags: ["otolith", "morphology", "images"],
    isOriginal: true,
    credibility: {
      score: 92,
      citations: 15,
      peerReviewed: true,
      dataQuality: "Very High",
      institution: "Indian Institute of Science",
    },
    derivedDatasets: [6],
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    icon: Eye,
  },
  {
    id: 4,
    name: "Coral Reef eDNA Sequences",
    category: "Molecular/eDNA",
    type: "DNA Sequences",
    location: "Andaman Islands",
    timeRange: "2023-2024",
    size: "1.7 GB",
    records: "6,750",
    lastUpdated: "2024-12-03",
    description:
      "Environmental DNA samples from coral reef ecosystems with species identification and biodiversity metrics.",
    tags: ["eDNA", "coral", "sequences"],
    isOriginal: true,
    credibility: {
      score: 90,
      citations: 6,
      peerReviewed: true,
      dataQuality: "High",
      institution: "Zoological Survey of India",
    },
    derivedDatasets: [],
    gradient: "from-green-500 via-emerald-500 to-cyan-500",
    icon: Database,
  },
  {
    id: 5,
    name: "Marine Plankton Distribution",
    category: "Taxonomy",
    type: "Distribution Data",
    location: "Indian Ocean",
    timeRange: "2022-2024",
    size: "1.2 GB",
    records: "18,200",
    lastUpdated: "2024-11-30",
    description:
      "Seasonal plankton distribution patterns across marine zones with temporal and spatial analysis.",
    tags: ["plankton", "distribution", "seasonal"],
    isOriginal: true,
    credibility: {
      score: 87,
      citations: 9,
      peerReviewed: true,
      dataQuality: "High",
      institution: "National Institute of Oceanography",
    },
    derivedDatasets: [],
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    icon: Globe,
  },
  {
    id: 6,
    name: "Coastal Water Quality Metrics",
    category: "Oceanography",
    type: "Water Quality",
    location: "West Coast India",
    timeRange: "2021-2024",
    size: "3.4 GB",
    records: "52,000",
    lastUpdated: "2024-11-28",
    description:
      "Comprehensive water quality assessment including pH, salinity, nutrients, and pollution indicators.",
    tags: ["water-quality", "coastal", "monitoring"],
    isOriginal: true,
    credibility: {
      score: 91,
      citations: 11,
      peerReviewed: true,
      dataQuality: "Very High",
      institution: "Indian National Centre for Ocean Information Services",
    },
    derivedDatasets: [7],
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    icon: BarChart3,
  },
];

const EXPORT_FORMATS = [
  {
    format: "CSV",
    description: "Comma-separated values",
    icon: FileText,
    extension: ".csv",
  },
  {
    format: "DwC-Core",
    description: "Darwin Core Archive",
    icon: Database,
    extension: ".zip",
  },
  {
    format: "OBIS",
    description: "Ocean Biodiversity Information System",
    icon: Database,
    extension: ".xml",
  },
  {
    format: "NetCDF",
    description: "Network Common Data Form",
    icon: Database,
    extension: ".nc",
  },
];

const CATEGORIES = [
  "All",
  "Oceanography",
  "Taxonomy",
  "Otolith Morphology",
  "Molecular/eDNA",
];

/* ----------------------------------------------------------------- */
/* HELPER FUNCTIONS                                                  */
/* ----------------------------------------------------------------- */
const getCredibilityColor = (score) => {
  if (score >= 90) return "from-emerald-500 to-green-500";
  if (score >= 80) return "from-amber-500 to-yellow-500";
  return "from-red-500 to-rose-500";
};

const getCredibilityTextColor = (score) => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 80) return "text-amber-400";
  return "text-red-400";
};

/* ----------------------------------------------------------------- */
/* HELPER COMPONENTS                                                 */
/* ----------------------------------------------------------------- */
const CredibilityBadge = ({ credibility }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <div
      className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getCredibilityColor(
        credibility.score
      )} text-white text-xs font-medium shadow-lg`}
    >
      <Activity className="h-3 w-3" />
      {credibility.score}%
    </div>
    {credibility.peerReviewed && (
      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium shadow-lg">
        <Award className="h-3 w-3" />
        Peer Reviewed
      </div>
    )}
  </div>
);

const ExportDropdown = ({ dataset }) => {
  const handleExport = (dataset, format) => {
    console.log(`Exporting ${dataset.name} in ${format} format`);
    // Simulate export process
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Exporting "${dataset.name}" in ${format} format...</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl p-2"
      >
        {EXPORT_FORMATS.map((format) => (
          <DropdownMenuItem
            key={format.format}
            onClick={() => handleExport(dataset, format.format)}
            className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <format.icon className="h-5 w-5 text-blue-400" />
            <div className="flex-1">
              <div className="font-medium text-sm">{format.format}</div>
              <div className="text-xs text-slate-300">{format.description}</div>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
              {format.extension}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DatasetCard = ({ dataset, index }) => {
  const cardRef = useRef(null);
  const IconComponent = dataset.icon;

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-[1.02]"
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${dataset.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Header gradient line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dataset.gradient}`}
      />

      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${dataset.gradient} shadow-lg`}
            >
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {dataset.name}
                </h3>
                {!dataset.isOriginal && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs border-0 shadow-lg">
                    Derived
                  </Badge>
                )}
              </div>
              <Badge className="bg-white/10 text-cyan-300 border-cyan-500/30 backdrop-blur-sm">
                {dataset.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed">
          {dataset.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-lg font-bold text-cyan-400">
              {dataset.records}
            </div>
            <div className="text-xs text-slate-400">Records</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-lg font-bold text-blue-400">
              {dataset.size}
            </div>
            <div className="text-xs text-slate-400">Size</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div
              className={`text-lg font-bold ${getCredibilityTextColor(
                dataset.credibility.score
              )}`}
            >
              {dataset.credibility.score}%
            </div>
            <div className="text-xs text-slate-400">Quality</div>
          </div>
        </div>

        {/* Location and Institution */}
        <div className="space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </span>
            <span className="text-slate-200 font-medium">
              {dataset.location}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Updated
            </span>
            <span className="text-slate-200 font-medium">
              {dataset.lastUpdated}
            </span>
          </div>
        </div>

        {/* Credibility Badge */}
        <CredibilityBadge credibility={dataset.credibility} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {dataset.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              className="bg-white/10 text-cyan-300 border-cyan-500/30 text-xs hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-200">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl rounded-2xl">
              <DialogHeader className="border-b border-white/10 pb-4">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {dataset.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-cyan-400 text-lg">
                      Dataset Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Institution:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.credibility.institution}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Citations:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.credibility.citations}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Data Quality:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.credibility.dataQuality}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time Range:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.timeRange}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-cyan-400 text-lg">
                      Technical Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Records:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.records}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.size}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Updated:</span>
                        <span className="text-slate-200 font-medium">
                          {dataset.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 text-lg mb-3">
                    Description
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {dataset.description}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <ExportDropdown dataset={dataset} />
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------- */
/* MAIN COMPONENT                                                    */
/* ----------------------------------------------------------------- */
const Datasets = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const searchRef = useRef(null);
  const contentRef = useRef(null);

  // Filtered datasets
  const filteredDatasets = useMemo(() => {
    return DATASETS.filter((dataset) => {
      const matchesSearch =
        dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || dataset.category === selectedCategory;

      const matchesType =
        selectedType === "all" ||
        (selectedType === "original" && dataset.isOriginal) ||
        (selectedType === "derived" && !dataset.isOriginal);

      const matchesLocation =
        selectedLocation === "all" ||
        dataset.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedLocation]);

  // Stats calculations
  const stats = useMemo(() => {
    const totalRecords = DATASETS.reduce(
      (sum, dataset) => sum + parseInt(dataset.records.replace(",", "")),
      0
    );
    const avgCredibility =
      DATASETS.reduce((sum, dataset) => sum + dataset.credibility.score, 0) /
      DATASETS.length;
    const peerReviewedCount = DATASETS.filter(
      (dataset) => dataset.credibility.peerReviewed
    ).length;

    return {
      totalDatasets: DATASETS.length,
      totalRecords: totalRecords.toLocaleString(),
      avgCredibility: Math.round(avgCredibility),
      peerReviewedPercent: Math.round(
        (peerReviewedCount / DATASETS.length) * 100
      ),
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      statsRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    tl.from(
      searchRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 space-y-12">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Waves className="h-6 w-6 text-cyan-400" />
            <span className="text-cyan-300 font-medium">
              Marine Research Data Platform
            </span>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Marine Datasets
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of marine research data
            including oceanographic measurements, biodiversity surveys, and
            molecular analysis from Indian Ocean ecosystems.
          </p>

          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: "Total Datasets",
              value: stats.totalDatasets,
              icon: Database,
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              label: "Total Records",
              value: stats.totalRecords,
              icon: BarChart3,
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              label: "Avg. Credibility",
              value: `${stats.avgCredibility}%`,
              icon: Award,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              label: "Peer Reviewed",
              value: `${stats.peerReviewedPercent}%`,
              icon: Users,
              gradient: "from-indigo-500 to-blue-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div ref={searchRef} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search datasets, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-xl">
                  <SelectValue placeholder="Dataset Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 rounded-xl">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="derived">Derived</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-40 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-xl">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 rounded-xl">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="arabian">Arabian Sea</SelectItem>
                  <SelectItem value="bengal">Bay of Bengal</SelectItem>
                  <SelectItem value="indian">Indian Ocean</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={
                    viewMode === "table"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-white transition-all duration-200 rounded-lg"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          {filteredDatasets.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
                <Fish className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No datasets found
              </h3>
              <p className="text-slate-400 text-lg mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedType("all");
                  setSelectedLocation("all");
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg"
              >
                Clear Filters
              </Button>
            </div>
          ) : viewMode === "table" ? (
            <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-cyan-400 font-semibold text-left">
                        Dataset
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Type
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Location
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Records
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Quality
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Updated
                      </TableHead>
                      <TableHead className="text-cyan-400 font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDatasets.map((dataset) => (
                      <TableRow
                        key={dataset.id}
                        className="border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-br ${dataset.gradient} shadow-lg`}
                            >
                              <dataset.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">
                                {dataset.name}
                              </div>
                              <div className="text-xs text-slate-400 max-w-xs truncate">
                                {dataset.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-white/10 text-cyan-300 border-cyan-500/30 backdrop-blur-sm">
                            {dataset.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-slate-200 text-sm">
                            <MapPin className="h-3 w-3 text-cyan-400" />
                            {dataset.location}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-200 font-medium">
                          {dataset.records}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`text-sm font-medium ${getCredibilityTextColor(
                              dataset.credibility.score
                            )}`}
                          >
                            {dataset.credibility.score}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-200 text-sm">
                            {dataset.lastUpdated}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl bg-slate-900/95 backdrop-blur-xl border-cyan-500/20 rounded-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    {dataset.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 mt-4">
                                  <div>
                                    <span className="text-slate-400">
                                      Institution:
                                    </span>
                                    <p className="font-medium">
                                      {dataset.credibility.institution}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">
                                      Citations:
                                    </span>
                                    <p className="font-medium">
                                      {dataset.credibility.citations}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">
                                      Data quality:
                                    </span>
                                    <p className="font-medium">
                                      {dataset.credibility.dataQuality}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">
                                      Last updated:
                                    </span>
                                    <p className="font-medium">
                                      {dataset.lastUpdated}
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <ExportDropdown dataset={dataset} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredDatasets.map((dataset, index) => (
                <DatasetCard key={dataset.id} dataset={dataset} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredDatasets.length > 0 && (
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-slate-400">
              Showing{" "}
              <span className="text-cyan-400 font-medium">
                {filteredDatasets.length}
              </span>{" "}
              of{" "}
              <span className="text-cyan-400 font-medium">
                {DATASETS.length}
              </span>{" "}
              datasets
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Datasets;
