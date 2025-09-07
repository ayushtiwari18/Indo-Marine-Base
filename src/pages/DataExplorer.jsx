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
import { Slider } from "@/components/ui/slider";
import {
  BarChart3,
  LineChart,
  PieChart,
  Map,
  Download,
  Filter,
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Globe,
  Layers,
  Calendar,
  Database,
  Zap,
  Eye,
  Settings,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DataExplorer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedDataset, setSelectedDataset] = useState("ocean-temp");
  const [selectedVisualization, setSelectedVisualization] =
    useState("timeseries");
  const [timeRange, setTimeRange] = useState([2020, 2024]);
  const [isPlaying, setIsPlaying] = useState(false);

  const datasets = [
    {
      id: "ocean-temp",
      name: "Ocean Temperature Data",
      type: "Environmental",
      records: "2.5M+",
      timespan: "2000-2024",
      regions: "Global",
      frequency: "Daily",
      description:
        "Global ocean surface and depth temperature measurements from satellite and buoy networks.",
    },
    {
      id: "species-observations",
      name: "Species Observations",
      type: "Biological",
      records: "850K+",
      timespan: "2010-2024",
      regions: "Global",
      frequency: "Irregular",
      description:
        "Marine species sightings and abundance data from research expeditions and citizen science.",
    },
    {
      id: "water-quality",
      name: "Water Quality Parameters",
      type: "Chemical",
      records: "1.8M+",
      timespan: "2015-2024",
      regions: "Coastal Areas",
      frequency: "Weekly",
      description:
        "pH, dissolved oxygen, salinity, and nutrient measurements from monitoring stations.",
    },
    {
      id: "ocean-currents",
      name: "Ocean Current Patterns",
      type: "Physical",
      records: "3.2M+",
      timespan: "2005-2024",
      regions: "Global",
      frequency: "6-hourly",
      description:
        "Ocean current velocity and direction data from satellite altimetry and drifter buoys.",
    },
  ];

  const visualizations = [
    {
      id: "timeseries",
      name: "Time Series",
      icon: LineChart,
      description: "Temporal trends and patterns",
    },
    {
      id: "spatial",
      name: "Spatial Map",
      icon: Map,
      description: "Geographic distribution",
    },
    {
      id: "statistical",
      name: "Statistical",
      icon: BarChart3,
      description: "Statistical summaries",
    },
    {
      id: "correlation",
      name: "Correlation",
      icon: PieChart,
      description: "Variable relationships",
    },
  ];

  const stats = [
    { number: "50TB+", label: "Data Volume", icon: Database },
    { number: "25+", label: "Data Sources", icon: Globe },
    { number: "100K+", label: "Queries/Month", icon: Zap },
    { number: "99.9%", label: "Uptime", icon: Eye },
  ];

  const selectedDatasetInfo = datasets.find((d) => d.id === selectedDataset);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".explorer-card",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".explorer-content",
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
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Interactive Data Explorer
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Data
            </span>
            <br />
            <span className="text-white">Explorer</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore and visualize marine datasets with interactive tools for
            temporal, spatial, and statistical analysis.
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

        <div className="explorer-content grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dataset Selection */}
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  Select Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedDataset}
                  onValueChange={setSelectedDataset}
                >
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {datasets.map((dataset) => (
                      <SelectItem
                        key={dataset.id}
                        value={dataset.id}
                        className="text-white hover:bg-slate-700"
                      >
                        {dataset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedDatasetInfo && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-slate-400">Type:</div>
                      <Badge className="justify-self-start bg-cyan-600/20 text-cyan-400 border-cyan-500/30">
                        {selectedDatasetInfo.type}
                      </Badge>
                      <div className="text-slate-400">Records:</div>
                      <div className="text-white">
                        {selectedDatasetInfo.records}
                      </div>
                      <div className="text-slate-400">Timespan:</div>
                      <div className="text-white">
                        {selectedDatasetInfo.timespan}
                      </div>
                      <div className="text-slate-400">Coverage:</div>
                      <div className="text-white">
                        {selectedDatasetInfo.regions}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedDatasetInfo.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visualization Type */}
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {visualizations.map((viz) => (
                    <Button
                      key={viz.id}
                      variant={
                        selectedVisualization === viz.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedVisualization(viz.id)}
                      className={`flex flex-col h-auto p-4 ${
                        selectedVisualization === viz.id
                          ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                          : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                      }`}
                    >
                      <viz.icon className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">{viz.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Time Range: {timeRange[0]} - {timeRange[1]}
                  </label>
                  <Slider
                    value={timeRange}
                    onValueChange={setTimeRange}
                    min={2000}
                    max={2024}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Geographic Region
                  </label>
                  <Select defaultValue="global">
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem
                        value="global"
                        className="text-white hover:bg-slate-700"
                      >
                        Global
                      </SelectItem>
                      <SelectItem
                        value="atlantic"
                        className="text-white hover:bg-slate-700"
                      >
                        Atlantic Ocean
                      </SelectItem>
                      <SelectItem
                        value="pacific"
                        className="text-white hover:bg-slate-700"
                      >
                        Pacific Ocean
                      </SelectItem>
                      <SelectItem
                        value="indian"
                        className="text-white hover:bg-slate-700"
                      >
                        Indian Ocean
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Search Parameters
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search parameters..."
                      className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Playback Controls */}
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Temporal Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-4"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-center text-sm text-slate-400">
                  Current: January 2023
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-2">
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-cyan-400" />
                  {
                    visualizations.find((v) => v.id === selectedVisualization)
                      ?.name
                  }{" "}
                  Visualization
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                    {React.createElement(
                      visualizations.find((v) => v.id === selectedVisualization)
                        ?.icon || BarChart3,
                      {
                        className: "w-16 h-16 text-cyan-400",
                      }
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Interactive Visualization
                  </h3>
                  <p className="text-slate-400 mb-6">
                    {
                      visualizations.find((v) => v.id === selectedVisualization)
                        ?.description
                    }
                  </p>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                    {selectedDatasetInfo?.name} • {selectedVisualization}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="explorer-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      15.2°C
                    </div>
                    <div className="text-sm text-slate-400">
                      Average Temperature
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      ±2.3°C
                    </div>
                    <div className="text-sm text-slate-400">
                      Standard Deviation
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      1,250
                    </div>
                    <div className="text-sm text-slate-400">Data Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
