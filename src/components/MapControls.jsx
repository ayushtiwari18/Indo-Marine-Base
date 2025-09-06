import { useState } from "react";
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
      color: "text-red-500",
    },
    {
      key: "salinity",
      label: "Salinity",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      key: "biodiversity",
      label: "Biodiversity",
      icon: Fish,
      color: "text-green-500",
    },
    {
      key: "fishing",
      label: "Fishing Zones",
      icon: Waves,
      color: "text-yellow-600",
    },
  ];

  if (userRole !== "public") {
    layerConfigs.push(
      {
        key: "heatmap",
        label: "Heatmap",
        icon: MapPin,
        color: "text-purple-500",
      },
      {
        key: "clustering",
        label: "Data Clustering",
        icon: Layers,
        color: "text-orange-500",
      }
    );
  }
  
  // Add this to your MapControls component
  const tileLayerOptions = [
    {
      name: "OpenStreetMap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    },
    {
      name: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Search locations, species, or coordinates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs">
              Arabian Sea
            </Badge>
            <Badge variant="outline" className="text-xs">
              Bay of Bengal
            </Badge>
            <Badge variant="outline" className="text-xs">
              Kerala Coast
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Layer Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Map Layers
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {layerConfigs.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <div
                key={layer.key}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-4 w-4 ${layer.color}`} />
                  <span className="text-sm font-medium">{layer.label}</span>
                </div>
                <Switch
                  checked={activeLayers[layer.key]}
                  onCheckedChange={(checked) =>
                    handleLayerToggle(layer.key, checked)
                  }
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              TIME RANGE
            </Label>
            <Select
              value={activeFilters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">Last 24 Hours</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              CATEGORY
            </Label>
            <Select
              value={activeFilters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="oceanography">Oceanography</SelectItem>
                <SelectItem value="biodiversity">Biodiversity</SelectItem>
                <SelectItem value="fishing">Fishing Data</SelectItem>
                <SelectItem value="conservation">Conservation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              SEARCH RADIUS ({activeFilters.radius}km)
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
              <Separator />
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">
                  PARAMETER RANGES
                </Label>

                <div className="space-y-2">
                  <Label className="text-xs">
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

                <div className="space-y-2">
                  <Label className="text-xs">
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

                <div className="space-y-2">
                  <Label className="text-xs">
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      {userRole !== "public" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("csv")}
            >
              Export as CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("pdf")}
            >
              Export as PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("png")}
            >
              Export Map Image
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Live Data Status */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Live Data</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Updated 2m ago
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapControls;
