import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

const Datasets = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const tabsRef = useRef(null);
  const cardsRef = useRef([]);

  // Your existing datasets array
  const datasets = [
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
        "Comprehensive temperature measurements across different depths",
      tags: ["temperature", "depth", "seasonal"],
      isOriginal: true,
      credibility: {
        score: 95,
        citations: 12,
        peerReviewed: true,
        dataQuality: "High",
        institution: "NIOT, Chennai",
      },
      derivedDatasets: [1, 2],
      gradient: "from-cyan-500 to-blue-600",
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
      description: "Complete fish species inventory with population estimates",
      tags: ["fish", "census", "biodiversity"],
      isOriginal: true,
      credibility: {
        score: 88,
        citations: 8,
        peerReviewed: true,
        dataQuality: "High",
        institution: "Central Marine Fisheries Research Institute",
      },
      derivedDatasets: [3, 4],
      gradient: "from-blue-500 to-purple-600",
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
        "High-resolution otolith images with morphometric measurements",
      tags: ["otolith", "morphology", "images"],
      isOriginal: true,
      credibility: {
        score: 92,
        citations: 15,
        peerReviewed: true,
        dataQuality: "Very High",
        institution: "Indian Institute of Science",
      },
      derivedDatasets: [5],
      gradient: "from-purple-500 to-pink-600",
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
      description: "Environmental DNA samples from coral reef ecosystems",
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
      gradient: "from-green-500 to-cyan-600",
    },
    // Add your remaining datasets with gradients...
  ];

  const exportFormats = [
    {
      format: "CSV",
      description: "Comma-separated values",
      icon: <FileText className="h-4 w-4" />,
      extension: ".csv",
    },
    {
      format: "DwC-Core",
      description: "Darwin Core Archive",
      icon: <Database className="h-4 w-4" />,
      extension: ".zip",
    },
    {
      format: "OBIS",
      description: "Ocean Biodiversity Information System",
      icon: <Database className="h-4 w-4" />,
      extension: ".xml",
    },
    {
      format: "NetCDF",
      description: "Network Common Data Form",
      icon: <Database className="h-4 w-4" />,
      extension: ".nc",
    },
  ];

  const categories = [
    "All",
    "Oceanography",
    "Taxonomy",
    "Otolith Morphology",
    "Molecular/eDNA",
  ];

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.from(headerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });

    // Search section animation
    tl.from(
      searchRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Tabs animation
    tl.from(
      tabsRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  const handleExport = (dataset, format) => {
    console.log(`Exporting ${dataset.name} in ${format} format`);
    alert(`Exporting "${dataset.name}" in ${format} format...`);
  };

  const getCredibilityColor = (score) => {
    if (score >= 90)
      return "bg-gradient-to-r from-green-400 to-green-500 text-white";
    if (score >= 80)
      return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
    return "bg-gradient-to-r from-red-400 to-red-500 text-white";
  };

  const CredibilityBadge = ({ credibility }) => (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge
        className={`${getCredibilityColor(
          credibility.score
        )} text-xs border-0 shadow-sm`}
      >
        <Activity className="h-3 w-3 mr-1" />
        {credibility.score}% credible
      </Badge>
      {credibility.peerReviewed && (
        <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs border-0 shadow-sm">
          <Award className="h-3 w-3 mr-1" />
          Peer Reviewed
        </Badge>
      )}
    </div>
  );

  const DatasetCard = ({ dataset, index }) => (
    <div
      ref={(el) => (cardsRef.current[index] = el)}
      className="dashboard-card group cursor-pointer bg-slate-800/50 border-cyan-500/20 hover:border-cyan-400/40 relative overflow-hidden"
    >
      {/* Card header gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dataset.gradient} opacity-60`}
      ></div>

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {dataset.name}
              </h3>
              {!dataset.isOriginal && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs border-0">
                  Derived
                </Badge>
              )}
            </div>
            <CredibilityBadge credibility={dataset.credibility} />
          </div>
          <Badge className="bg-slate-700/50 text-cyan-300 border-cyan-500/30">
            {dataset.category}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed">
          {dataset.description}
        </p>

        {/* Parent dataset info */}
        {!dataset.isOriginal && dataset.parentDataset && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-300 flex items-center">
              <Database className="h-3 w-3 mr-2" />
              Derived from:{" "}
              {datasets.find((d) => d.id === dataset.parentDataset)?.name}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-3">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">
              {dataset.records}
            </div>
            <div className="text-xs text-slate-400">Records</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {dataset.size}
            </div>
            <div className="text-xs text-slate-400">Size</div>
          </div>
        </div>

        {/* Location and Quality */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location:
            </span>
            <span className="text-slate-200">{dataset.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Quality:</span>
            <span className="text-slate-200">
              {dataset.credibility.dataQuality}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {dataset.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              className="bg-slate-700/50 text-cyan-300 border-cyan-500/30 text-xs hover:bg-slate-600/50 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-slate-900 border-cyan-500/20">
              <DialogHeader>
                <DialogTitle className="text-white text-xl">
                  {dataset.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3">
                    Dataset Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <span className="text-slate-400">Institution:</span>
                      <p className="text-slate-200">
                        {dataset.credibility.institution}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400">Citations:</span>
                      <p className="text-slate-200">
                        {dataset.credibility.citations}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400">Data Quality:</span>
                      <p className="text-slate-200">
                        {dataset.credibility.dataQuality}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400">Last Updated:</span>
                      <p className="text-slate-200">{dataset.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                {dataset.credibility.processingMethod && (
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">
                      Processing Method
                    </h4>
                    <p className="text-sm text-slate-300">
                      {dataset.credibility.processingMethod}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-slate-900 border-cyan-500/20"
            >
              {exportFormats.map((format) => (
                <DropdownMenuItem
                  key={format.format}
                  onClick={() => handleExport(dataset, format.format)}
                  className="flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
                >
                  {format.icon}
                  <div className="flex-1">
                    <div className="font-medium">{format.format}</div>
                    <div className="text-xs text-slate-400">
                      {format.description}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {format.extension}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 relative">
      {/* Background floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-32 h-32 bg-cyan-400/3 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute top-96 left-32 w-24 h-24 bg-blue-400/3 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-28 h-28 bg-purple-400/3 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div ref={headerRef} className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Marine Datasets
        </h1>
        <p className="text-slate-300 text-lg">
          Explore our comprehensive collection of marine research data including
          original and derived datasets
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
      </div>

      {/* Search and Filters */}
      <div ref={searchRef} className="dashboard-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-40 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <SelectValue placeholder="Dataset Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="all"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  All Types
                </SelectItem>
                <SelectItem
                  value="original"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Original
                </SelectItem>
                <SelectItem
                  value="derived"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Derived
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="all"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  All Locations
                </SelectItem>
                <SelectItem
                  value="arabian-sea"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Arabian Sea
                </SelectItem>
                <SelectItem
                  value="bay-bengal"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Bay of Bengal
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 bg-slate-800/50 border border-cyan-500/20 rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={
                  viewMode === "table"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-slate-700/50"
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
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-slate-700/50"
                }
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" className="w-full" ref={tabsRef}>
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-cyan-500/20">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category}
            value={category}
            className="space-y-6 mt-8"
          >
            {viewMode === "table" ? (
              <div className="dashboard-card overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-cyan-500/20 hover:bg-slate-800/30">
                        <TableHead className="text-cyan-400 font-semibold">
                          Dataset Name
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
                          Size
                        </TableHead>
                        <TableHead className="text-cyan-400 font-semibold">
                          Credibility
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
                      {filteredDatasets
                        .filter(
                          (dataset) =>
                            category === "All" || dataset.category === category
                        )
                        .map((dataset) => (
                          <TableRow
                            key={dataset.id}
                            className="border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                          >
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-white">
                                    {dataset.name}
                                  </span>
                                  {!dataset.isOriginal && (
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs border-0">
                                      Derived
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-slate-400">
                                  {dataset.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-slate-700/50 text-cyan-300 border-cyan-500/30">
                                {dataset.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-slate-200">
                                <MapPin className="h-3 w-3 text-cyan-400" />
                                {dataset.location}
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-200">
                              {dataset.records}
                            </TableCell>
                            <TableCell className="text-slate-200">
                              {dataset.size}
                            </TableCell>
                            <TableCell>
                              <CredibilityBadge
                                credibility={dataset.credibility}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-slate-200">
                                <Calendar className="h-3 w-3 text-cyan-400" />
                                {dataset.lastUpdated}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  className="bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      Export
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-slate-900 border-cyan-500/20">
                                    {exportFormats.slice(0, 3).map((format) => (
                                      <DropdownMenuItem
                                        key={format.format}
                                        onClick={() =>
                                          handleExport(dataset, format.format)
                                        }
                                        className="text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
                                      >
                                        {format.format}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDatasets
                  .filter(
                    (dataset) =>
                      category === "All" || dataset.category === category
                  )
                  .map((dataset, index) => (
                    <DatasetCard
                      key={dataset.id}
                      dataset={dataset}
                      index={index}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Datasets;
