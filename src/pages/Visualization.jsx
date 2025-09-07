import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Map,
  TrendingUp,
  BarChart3,
  Globe,
  Filter,
  Route,
  Activity,
  Waves,
  Fish,
} from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import MapControls from "@/components/MapControls";
import RouteManager from "@/components/RouteManager";
import TemperatureHeatMap from "@/components/TemperatureHeatMap";
import BiodiversityMap from "@/components/BiodiversityMap";
import OceanParametersMap from "@/components/OceanParametersMap";
import TimeSeriesAnalytics from "@/components/TimeSeriesAnalytics";
import BiodiversityAnalytics from "@/components/BiodiversityAnalytics";

const Visualization = () => {
  const [selectedParameter1, setSelectedParameter1] = useState("temperature");
  const [selectedParameter2, setSelectedParameter2] = useState("salinity");
  const [userRole, setUserRole] = useState("researcher");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapFilters, setMapFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const headerRef = useRef(null);
  const controlsRef = useRef(null);
  const tabsRef = useRef(null);
  const cardsRef = useRef([]);

  // Sample data for charts
  const temperatureData = [
    {
      month: "Jan",
      temperature: 28.5,
      depth10m: 28.2,
      depth50m: 26.8,
      depth100m: 24.1,
    },
    {
      month: "Feb",
      temperature: 29.1,
      depth10m: 28.9,
      depth50m: 27.2,
      depth100m: 24.5,
    },
    {
      month: "Mar",
      temperature: 30.2,
      depth10m: 29.8,
      depth50m: 28.1,
      depth100m: 25.2,
    },
    {
      month: "Apr",
      temperature: 31.5,
      depth10m: 31.2,
      depth50m: 29.5,
      depth100m: 26.8,
    },
    {
      month: "May",
      temperature: 32.1,
      depth10m: 31.8,
      depth50m: 30.2,
      depth100m: 27.9,
    },
    {
      month: "Jun",
      temperature: 31.8,
      depth10m: 31.5,
      depth50m: 29.8,
      depth100m: 27.5,
    },
  ];

  const biodiversityData = [
    { location: "Andaman Islands", species: 245, endemic: 28, threatened: 12 },
    { location: "Lakshadweep", species: 189, endemic: 15, threatened: 8 },
    { location: "Gujarat Coast", species: 156, endemic: 9, threatened: 18 },
    { location: "Tamil Nadu Coast", species: 198, endemic: 22, threatened: 15 },
    { location: "West Bengal Coast", species: 134, endemic: 11, threatened: 9 },
  ];

  const fishAbundanceData = [
    {
      year: "2020",
      totalCatch: 3200,
      commercialSpecies: 2800,
      sustainableQuota: 3500,
    },
    {
      year: "2021",
      totalCatch: 3450,
      commercialSpecies: 3100,
      sustainableQuota: 3500,
    },
    {
      year: "2022",
      totalCatch: 3180,
      commercialSpecies: 2950,
      sustainableQuota: 3400,
    },
    {
      year: "2023",
      totalCatch: 3650,
      commercialSpecies: 3250,
      sustainableQuota: 3600,
    },
    {
      year: "2024",
      totalCatch: 3520,
      commercialSpecies: 3180,
      sustainableQuota: 3600,
    },
  ];

  const correlationData = [
    { value: 28.5, salinity: 34.2, fishDensity: 45 },
    { value: 29.1, salinity: 34.5, fishDensity: 52 },
    { value: 30.2, salinity: 34.8, fishDensity: 38 },
    { value: 31.5, salinity: 35.1, fishDensity: 31 },
    { value: 32.1, salinity: 35.4, fishDensity: 28 },
    { value: 31.8, salinity: 35.2, fishDensity: 35 },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.from(headerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });

    // Controls animation
    tl.from(
      controlsRef.current,
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

    // Cards stagger animation
    tl.from(
      cardsRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    return () => tl.kill();
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      if (Math.random() > 0.7) {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLayerToggle = (layer, enabled) => {
    console.log(`Layer ${layer} ${enabled ? "enabled" : "disabled"}`);
  };

  const handleFilterChange = (filters) => {
    setMapFilters(filters);
    console.log("Filters updated:", filters);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleExport = (format) => {
    console.log(`Exporting data as ${format}`);
    alert(`Exporting data as ${format}...`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    console.log("Marker clicked:", marker);
  };

  const handleRouteUpdate = (route) => {
    console.log("Route updated:", route);
  };

  const handleDistanceCalculate = (route) => {
    console.log("Calculating distance for route:", route);
  };

  // Custom chart colors for ocean theme
  const chartColors = {
    primary: "#06b6d4", // cyan-500
    secondary: "#0ea5e9", // sky-500
    accent: "#3b82f6", // blue-500
    success: "#10b981", // emerald-500
    warning: "#f59e0b", // amber-500
    danger: "#ef4444", // red-500
  };

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
      <div ref={headerRef} className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Visualization & Analytics
          </h1>
          <p className="text-slate-300 text-lg">
            Interactive marine data analysis and visualization tools
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>

        <div ref={controlsRef} className="flex items-center gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32 bg-slate-800/50 border-cyan-500/20 text-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-cyan-500/20">
              <SelectItem
                value="2024"
                className="text-slate-200 hover:bg-slate-800"
              >
                2024
              </SelectItem>
              <SelectItem
                value="2023"
                className="text-slate-200 hover:bg-slate-800"
              >
                2023
              </SelectItem>
              <SelectItem
                value="2022"
                className="text-slate-200 hover:bg-slate-800"
              >
                2022
              </SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-slate-800/50 hover:bg-slate-700/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="interactive" className="w-full" ref={tabsRef}>
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-cyan-500/20">
          <TabsTrigger
            value="interactive"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
          >
            Interactive Map
          </TabsTrigger>
          <TabsTrigger
            value="maps"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
          >
            GIS Maps
          </TabsTrigger>
          <TabsTrigger
            value="timeseries"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
          >
            Time Series
          </TabsTrigger>
          <TabsTrigger
            value="biodiversity"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
          >
            Biodiversity
          </TabsTrigger>
          <TabsTrigger
            value="correlation"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
          >
            Correlation
          </TabsTrigger>
        </TabsList>

        {/* Interactive Map Tab */}
        <TabsContent value="interactive" className="space-y-8 mt-8">
          <div className="grid gap-6 lg:grid-cols-4">
            <div
              className="lg:col-span-3"
              ref={(el) => (cardsRef.current[0] = el)}
            >
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                    <Globe className="h-6 w-6 text-cyan-400" />
                    Interactive Ocean Map
                  </h3>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${
                        isRefreshing
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-500"
                      } text-white text-xs border-0`}
                    >
                      {isRefreshing ? (
                        <>
                          <Activity className="h-3 w-3 mr-1 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Activity className="h-3 w-3 mr-1 animate-pulse" />
                          Updated {lastUpdated.toLocaleTimeString()}
                        </>
                      )}
                    </Badge>
                    <Select
                      value={userRole}
                      onValueChange={(value) => setUserRole(value)}
                    >
                      <SelectTrigger className="w-32 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-cyan-500/20">
                        <SelectItem
                          value="public"
                          className="text-slate-200 hover:bg-slate-800"
                        >
                          Public
                        </SelectItem>
                        <SelectItem
                          value="researcher"
                          className="text-slate-200 hover:bg-slate-800"
                        >
                          Researcher
                        </SelectItem>
                        <SelectItem
                          value="admin"
                          className="text-slate-200 hover:bg-slate-800"
                        >
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-cyan-500/20">
                  <InteractiveMap
                    height="h-[600px]"
                    onMarkerClick={handleMarkerClick}
                    userRole={userRole}
                    showControls={true}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6" ref={(el) => (cardsRef.current[1] = el)}>
              <MapControls
                onLayerToggle={handleLayerToggle}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onExport={handleExport}
                onRefresh={handleRefresh}
                userRole={userRole}
                isRefreshing={isRefreshing}
              />
            </div>
          </div>

          {/* Route Planning */}
          <div className="grid gap-6 lg:grid-cols-4">
            <div
              className="lg:col-span-3"
              ref={(el) => (cardsRef.current[2] = el)}
            >
              <div className="dashboard-card">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                  <Route className="h-6 w-6 text-purple-400" />
                  Route Planning & Analysis
                </h3>
                <div className="aspect-[2/1] bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-xl flex items-center justify-center relative overflow-hidden border border-cyan-500/20">
                  <div className="absolute inset-0 ocean-wave-line"></div>
                  <div className="absolute inset-0 ocean-wave-glow"></div>
                  <div className="text-center relative z-10">
                    <Route className="h-16 w-16 mx-auto mb-4 text-cyan-400/60" />
                    <h4 className="text-xl font-semibold mb-2 text-white">
                      Interactive Route Visualization
                    </h4>
                    <p className="text-slate-300">
                      Real-time route visualization with waypoints and distance
                      calculations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={(el) => (cardsRef.current[3] = el)}>
              <RouteManager
                onRouteUpdate={handleRouteUpdate}
                onDistanceCalculate={handleDistanceCalculate}
                userRole={userRole}
              />
            </div>
          </div>

          {/* Real-time Data Dashboard */}
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                label: "Avg Temperature",
                value: "28.5",
                unit: "°C",
                color: "cyan",
                icon: Activity,
              },
              {
                label: "Avg Salinity",
                value: "34.8",
                unit: "‰",
                color: "blue",
                icon: Waves,
              },
              {
                label: "Active Markers",
                value: "245",
                unit: "",
                color: "purple",
                icon: Map,
              },
              {
                label: "Alerts",
                value: "12",
                unit: "",
                color: "red",
                icon: TrendingUp,
              },
            ].map((stat, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[4 + index] = el)}
                className="dashboard-metric-card group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      stat.color === "cyan"
                        ? "from-cyan-500 to-blue-600"
                        : stat.color === "blue"
                        ? "from-blue-500 to-purple-600"
                        : stat.color === "purple"
                        ? "from-purple-500 to-pink-600"
                        : "from-red-500 to-orange-600"
                    } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {isRefreshing ? "~" : stat.value}
                    </span>
                    <span className="text-xl font-bold text-cyan-400">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* GIS Maps Tab */}
        <TabsContent value="maps" className="space-y-8 mt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div
              className="dashboard-card"
              ref={(el) => (cardsRef.current[8] = el)}
            >
              <h3 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                <Map className="h-6 w-6 text-cyan-400" />
                Temperature Heatmap
              </h3>
              <div className="rounded-xl overflow-hidden border border-cyan-500/20">
                <TemperatureHeatMap height="h-64" />
              </div>
              <div className="mt-6 flex justify-between text-sm text-slate-300">
                <span>Min: 24°C</span>
                <span>Avg: 28.5°C</span>
                <span>Max: 32°C</span>
              </div>
              <div className="mt-4">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  <Activity className="h-3 w-3 mr-1 animate-pulse" />
                  Live Data
                </Badge>
              </div>
            </div>

            <div
              className="dashboard-card"
              ref={(el) => (cardsRef.current[9] = el)}
            >
              <h3 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                <Fish className="h-6 w-6 text-blue-400" />
                Biodiversity Hotspots
              </h3>
              <div className="rounded-xl overflow-hidden border border-cyan-500/20">
                <BiodiversityMap height="h-64" />
              </div>
              <div className="mt-6 flex justify-between text-sm text-slate-300">
                <span>Low</span>
                <span>Moderate</span>
                <span>High Density</span>
              </div>
              <div className="mt-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  8,500+ Species
                </Badge>
              </div>
            </div>
          </div>

          <div
            className="dashboard-card"
            ref={(el) => (cardsRef.current[10] = el)}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Ocean Parameters Monitoring
            </h3>
            <div className="rounded-xl overflow-hidden border border-cyan-500/20">
              <OceanParametersMap height="h-80" />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">
                  28.5°C
                </div>
                <div className="text-sm text-slate-400">Avg Temperature</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  34.8‰
                </div>
                <div className="text-sm text-slate-400">Avg Salinity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  7.8 pH
                </div>
                <div className="text-sm text-slate-400">Avg pH Level</div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Time Series Tab */}
        <TabsContent value="timeseries" className="space-y-8 mt-8">
          <div
            className="dashboard-card"
            ref={(el) => (cardsRef.current[11] = el)}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Temperature Trends
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #06b6d4",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke={chartColors.primary}
                    fill={`${chartColors.primary}20`}
                    strokeWidth={2}
                    name="Surface Temperature"
                  />
                  <Area
                    type="monotone"
                    dataKey="depth50m"
                    stroke={chartColors.secondary}
                    fill={`${chartColors.secondary}20`}
                    strokeWidth={2}
                    name="50m Depth"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Biodiversity Tab */}
        <TabsContent value="biodiversity" className="space-y-8 mt-8">
          <div
            className="dashboard-card"
            ref={(el) => (cardsRef.current[12] = el)}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Species Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biodiversityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="location" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #06b6d4",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="species"
                    fill={chartColors.primary}
                    name="Total Species"
                  />
                  <Bar
                    dataKey="endemic"
                    fill={chartColors.accent}
                    name="Endemic Species"
                  />
                  <Bar
                    dataKey="threatened"
                    fill={chartColors.danger}
                    name="Threatened Species"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Correlation Tab */}
        <TabsContent value="correlation" className="space-y-8 mt-8">
          <div
            className="dashboard-card"
            ref={(el) => (cardsRef.current[13] = el)}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Parameter Correlation Dashboard
              </h3>
              <div className="flex items-center gap-4">
                <Select
                  value={selectedParameter1}
                  onValueChange={setSelectedParameter1}
                >
                  <SelectTrigger className="w-40 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-cyan-500/20">
                    <SelectItem
                      value="temperature"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Temperature
                    </SelectItem>
                    <SelectItem
                      value="salinity"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Salinity
                    </SelectItem>
                    <SelectItem
                      value="ph"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      pH Level
                    </SelectItem>
                    <SelectItem
                      value="oxygen"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Oxygen
                    </SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-slate-400">vs</span>
                <Select
                  value={selectedParameter2}
                  onValueChange={setSelectedParameter2}
                >
                  <SelectTrigger className="w-40 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-cyan-500/20">
                    <SelectItem
                      value="salinity"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Salinity
                    </SelectItem>
                    <SelectItem
                      value="fishDensity"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Fish Density
                    </SelectItem>
                    <SelectItem
                      value="ph"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      pH Level
                    </SelectItem>
                    <SelectItem
                      value="oxygen"
                      className="text-slate-200 hover:bg-slate-800"
                    >
                      Oxygen
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="value"
                    name="Temperature (°C)"
                    stroke="#94a3b8"
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #06b6d4",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="salinity"
                    stroke={chartColors.primary}
                    strokeWidth={3}
                    name="Salinity (‰)"
                    dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fishDensity"
                    stroke={chartColors.accent}
                    strokeWidth={3}
                    name="Fish Density"
                    dot={{ fill: chartColors.accent, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 text-sm px-4 py-2 mb-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                Correlation Coefficient: -0.72
              </Badge>
              <p className="text-slate-300 text-sm">
                Strong negative correlation between temperature and fish density
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;
