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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Eye,
  Download,
  MapPin,
  Calendar,
  Dna,
  Camera,
  Info,
  Star,
  Globe,
  Waves,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SpeciesDatabase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHabitat, setSelectedHabitat] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const species = [
    {
      id: 1,
      name: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      commonName: "Blue Whale",
      habitat: "Pelagic",
      status: "Endangered",
      region: "Global Oceans",
      depth: "0-500m",
      length: "24-30m",
      weight: "150-180 tons",
      discovered: "1758",
      image: "/api/placeholder/300/200",
      description:
        "The largest animal ever known to have lived on Earth, blue whales are magnificent marine mammals.",
      threats: ["Ship strikes", "Entanglement", "Noise pollution"],
      population: "10,000-25,000",
      dnaSequenced: true,
      conservationEfforts:
        "Marine protected areas, shipping lane modifications",
    },
    {
      id: 2,
      name: "Great White Shark",
      scientificName: "Carcharodon carcharias",
      commonName: "Great White Shark",
      habitat: "Coastal",
      status: "Vulnerable",
      region: "Temperate and Tropical Seas",
      depth: "0-1,200m",
      length: "3.4-6.1m",
      weight: "680-1,100kg",
      discovered: "1758",
      image: "/api/placeholder/300/200",
      description:
        "An apex predator found in coastal surface waters of all major oceans.",
      threats: ["Overfishing", "Bycatch", "Habitat loss"],
      population: "3,500-5,000",
      dnaSequenced: true,
      conservationEfforts: "Fishing regulations, marine sanctuaries",
    },
    {
      id: 3,
      name: "Giant Pacific Octopus",
      scientificName: "Enteroctopus dofleini",
      commonName: "Giant Pacific Octopus",
      habitat: "Benthic",
      status: "Least Concern",
      region: "North Pacific",
      depth: "0-2,000m",
      length: "3-5m (arm span)",
      weight: "15-71kg",
      discovered: "1885",
      image: "/api/placeholder/300/200",
      description:
        "The largest species of octopus, known for its intelligence and problem-solving abilities.",
      threats: ["Climate change", "Ocean acidification", "Overfishing"],
      population: "Unknown",
      dnaSequenced: false,
      conservationEfforts: "Habitat protection, sustainable fishing practices",
    },
    {
      id: 4,
      name: "Coral Grouper",
      scientificName: "Plectropomus leopardus",
      commonName: "Coral Grouper",
      habitat: "Coral Reef",
      status: "Near Threatened",
      region: "Indo-Pacific",
      depth: "3-100m",
      length: "70cm",
      weight: "7kg",
      discovered: "1802",
      image: "/api/placeholder/300/200",
      description:
        "A large reef fish found in coral reefs throughout the Indo-Pacific region.",
      threats: ["Overfishing", "Coral bleaching", "Habitat destruction"],
      population: "Declining",
      dnaSequenced: true,
      conservationEfforts: "Marine protected areas, fishing quotas",
    },
    {
      id: 5,
      name: "Leatherback Turtle",
      scientificName: "Dermochelys coriacea",
      commonName: "Leatherback Sea Turtle",
      habitat: "Pelagic",
      status: "Critically Endangered",
      region: "Global Oceans",
      depth: "0-1,280m",
      length: "1.8-2.2m",
      weight: "250-700kg",
      discovered: "1761",
      image: "/api/placeholder/300/200",
      description:
        "The largest of all living turtles and the most widely distributed.",
      threats: ["Plastic pollution", "Climate change", "Coastal development"],
      population: "25,000-42,000 nesting females",
      dnaSequenced: true,
      conservationEfforts: "Nesting beach protection, plastic reduction",
    },
    {
      id: 6,
      name: "Manta Ray",
      scientificName: "Mobula birostris",
      commonName: "Giant Manta Ray",
      habitat: "Pelagic",
      status: "Endangered",
      region: "Tropical and Subtropical Waters",
      depth: "0-1,000m",
      length: "7m wingspan",
      weight: "1,350kg",
      discovered: "1792",
      image: "/api/placeholder/300/200",
      description:
        "The world's largest ray, known for its intelligence and gentle nature.",
      threats: ["Overfishing", "Bycatch", "Habitat degradation"],
      population: "Unknown",
      dnaSequenced: true,
      conservationEfforts:
        "International trade regulations, marine sanctuaries",
    },
  ];

  const stats = [
    { number: "25,000+", label: "Species Catalogued", icon: Dna },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "50TB", label: "Image Data", icon: Camera },
    { number: "95%", label: "ID Accuracy", icon: Star },
  ];

  const habitats = ["all", "Pelagic", "Coastal", "Benthic", "Coral Reef"];
  const statuses = [
    "all",
    "Least Concern",
    "Near Threatened",
    "Vulnerable",
    "Endangered",
    "Critically Endangered",
  ];

  const filteredSpecies = species.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHabitat =
      selectedHabitat === "all" || s.habitat === selectedHabitat;
    const matchesStatus =
      selectedStatus === "all" || s.status === selectedStatus;

    return matchesSearch && matchesHabitat && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Least Concern":
        return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
      case "Near Threatened":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      case "Vulnerable":
        return "bg-orange-600/20 text-orange-400 border-orange-500/30";
      case "Endangered":
        return "bg-red-600/20 text-red-400 border-red-500/30";
      case "Critically Endangered":
        return "bg-red-700/20 text-red-300 border-red-600/30";
      default:
        return "bg-slate-600/20 text-slate-400 border-slate-500/30";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".species-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".species-grid",
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
            <Waves className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Marine Species Database
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Species
            </span>
            <br />
            <span className="text-white">Catalog</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive database of marine species with detailed
            taxonomic information, conservation status, and research data.
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

        {/* Search and Filters */}
        <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search by species name or scientific name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-4">
                <Select
                  value={selectedHabitat}
                  onValueChange={setSelectedHabitat}
                >
                  <SelectTrigger className="w-40 bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Habitat" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {habitats.map((habitat) => (
                      <SelectItem
                        key={habitat}
                        value={habitat}
                        className="text-white hover:bg-slate-700"
                      >
                        {habitat === "all" ? "All Habitats" : habitat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-48 bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {statuses.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="text-white hover:bg-slate-700"
                      >
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Species Grid */}
        <div className="species-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.map((species) => (
            <Card
              key={species.id}
              className="species-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-0">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/60" />
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className={getStatusColor(species.status)}>
                      {species.status}
                    </Badge>
                    {species.dnaSequenced && (
                      <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                        <Dna className="w-3 h-3 mr-1" />
                        DNA
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                    {species.name}
                  </h3>
                  <p className="text-cyan-400 italic text-sm mb-3">
                    {species.scientificName}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {species.habitat}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      {species.region.split(" ")[0]}...
                    </div>
                    <div className="col-span-2">
                      <strong className="text-slate-300">Length:</strong>{" "}
                      {species.length}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {species.description}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSpecies.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No species found
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

export default SpeciesDatabase;
