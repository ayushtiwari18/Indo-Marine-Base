import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Layers,
  Filter,
  Search,
  Download,
  RefreshCw,
  MapPin,
  Thermometer,
  Droplets,
  Fish,
  Waves,
  Activity,
} from "lucide-react";

const MapControls = ({
  onLayerToggle,
  onFilterChange,
  onSearch,
  onExport,
  onRefresh,
  userRole = "public",
  isRefreshing = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    dateRange: "7days",
    category: "all",
    radius: 50,
    temperature: [20, 35],
    salinity: [30, 40],
    depth: [0, 200],
  });

  const [activeLayers, setActiveLayers] = useState({
    temperature: true,
    salinity: false,
    biodiversity: true,
    fishing: false,
    heatmap: userRole !== "public",
    clustering: false,
  });

  const controlsRef = useRef([]);

  useEffect(() => {
    // GSAP animations for smooth entrance
    gsap.from(controlsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  const handleLayerToggle = (layer, enabled) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: enabled }));
    onLayerToggle?.(layer, enabled);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleExport = (format) => {
    onExport?.(format);
  };

  const layerConfigs = [
    {
      key: "temperature",
      label: "Temperature",
      icon: Thermometer,
      color: "from-red-500 to-orange-500",
    },
    {
      key: "salinity",
      label: "Salinity",
      icon: Droplets,
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "biodiversity",
      label: "Biodiversity",
      icon: Fish,
      color: "from-green-500 to-emerald-500",
    },
    {
      key: "fishing",
      label: "Fishing Zones",
      icon: Waves,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  if (userRole !== "public") {
    layerConfigs.push(
      {
        key: "heatmap",
        label: "Heatmap",
        icon: MapPin,
        color: "from-purple-500 to-violet-500",
      },
      {
        key: "clustering",
        label: "Data Clustering",
        icon: Layers,
        color: "from-orange-500 to-red-500",
      }
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div
        ref={(el) => (controlsRef.current[0] = el)}
        className="dashboard-card"
      >
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Search Locations</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search locations, species, or coordinates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {["Arabian Sea", "Bay of Bengal", "Kerala Coast"].map(
              (location) => (
                <Badge
                  key={location}
                  className="bg-slate-700/50 text-cyan-300 border-cyan-500/30 hover:bg-slate-600/50 cursor-pointer transition-colors"
                >
                  {location}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>

      {/* Layer Controls */}
      <div
        ref={(el) => (controlsRef.current[1] = el)}
        className="dashboard-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Map Layers</h3>
          </div>
          <Button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        <div className="space-y-4">
          {layerConfigs.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <div
                key={layer.key}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center`}
                  >
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-slate-200 font-medium">
                    {layer.label}
                  </span>
                </div>
                <Switch
                  checked={activeLayers[layer.key]}
                  onCheckedChange={(checked) =>
                    handleLayerToggle(layer.key, checked)
                  }
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      <div
        ref={(el) => (controlsRef.current[2] = el)}
        className="dashboard-card"
      >
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Time Range
            </Label>
            <Select
              value={activeFilters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="24hours"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Last 24 Hours
                </SelectItem>
                <SelectItem
                  value="7days"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Last 7 Days
                </SelectItem>
                <SelectItem
                  value="30days"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Last 30 Days
                </SelectItem>
                <SelectItem
                  value="3months"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Last 3 Months
                </SelectItem>
                <SelectItem
                  value="1year"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Last Year
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Category
            </Label>
            <Select
              value={activeFilters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="all"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  All Categories
                </SelectItem>
                <SelectItem
                  value="oceanography"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Oceanography
                </SelectItem>
                <SelectItem
                  value="biodiversity"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Biodiversity
                </SelectItem>
                <SelectItem
                  value="fishing"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Fishing Data
                </SelectItem>
                <SelectItem
                  value="conservation"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Conservation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Search Radius ({activeFilters.radius}km)
            </Label>
            <Slider
              value={[activeFilters.radius]}
              onValueChange={(value) => handleFilterChange("radius", value[0])}
              max={500}
              min={1}
              step={5}
              className="w-full"
            />
          </div>

          {userRole !== "public" && (
            <>
              <Separator className="border-cyan-500/20" />
              <div className="space-y-4">
                <Label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Parameter Ranges
                </Label>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-slate-300 mb-2 block">
                      Temperature (°C): {activeFilters.temperature[0]} -{" "}
                      {activeFilters.temperature[1]}
                    </Label>
                    <Slider
                      value={activeFilters.temperature}
                      onValueChange={(value) =>
                        handleFilterChange("temperature", value)
                      }
                      max={40}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-300 mb-2 block">
                      Salinity (‰): {activeFilters.salinity[0]} -{" "}
                      {activeFilters.salinity[1]}
                    </Label>
                    <Slider
                      value={activeFilters.salinity}
                      onValueChange={(value) =>
                        handleFilterChange("salinity", value)
                      }
                      max={45}
                      min={25}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-300 mb-2 block">
                      Depth (m): {activeFilters.depth[0]} -{" "}
                      {activeFilters.depth[1]}
                    </Label>
                    <Slider
                      value={activeFilters.depth}
                      onValueChange={(value) =>
                        handleFilterChange("depth", value)
                      }
                      max={500}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Export Options */}
      {userRole !== "public" && (
        <div
          ref={(el) => (controlsRef.current[3] = el)}
          className="dashboard-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <Download className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Export Data</h3>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleExport("csv")}
              className="w-full justify-start bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button
              onClick={() => handleExport("pdf")}
              className="w-full justify-start bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button
              onClick={() => handleExport("png")}
              className="w-full justify-start bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Map Image
            </Button>
          </div>
        </div>
      )}

      {/* Live Data Status */}
      <div
        ref={(el) => (controlsRef.current[4] = el)}
        className="dashboard-card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Data
            </span>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            Updated 2m ago
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MapControls;
