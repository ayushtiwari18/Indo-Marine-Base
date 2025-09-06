// components/MapControls.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Search, Layers, Filter } from "lucide-react";

const MapControls = ({
  onLayerToggle,
  onFilterChange,
  onSearch,
  onExport,
  onRefresh,
  userRole,
  isRefreshing,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [layers, setLayers] = useState({
    temperature: true,
    salinity: false,
    biodiversity: false,
    fishDensity: false,
    bathymetry: false,
  });

  const [filters, setFilters] = useState({
    temperatureMin: 20,
    temperatureMax: 35,
    salinityMin: 30,
    salinityMax: 40,
    depthMin: 0,
    depthMax: 1000,
  });

  const handleLayerToggle = (layer) => {
    const newLayers = { ...layers, [layer]: !layers[layer] };
    setLayers(newLayers);
    onLayerToggle && onLayerToggle(layer, newLayers[layer]);
  };

  const handleSearch = () => {
    onSearch && onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search & Navigation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations, stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-8 text-sm"
            />
          </div>
          <Button onClick={handleSearch} size="sm" className="w-full">
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Layer Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Map Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(layers).map(([layer, enabled]) => (
            <div key={layer} className="flex items-center justify-between">
              <span className="text-sm capitalize">
                {layer.replace(/([A-Z])/g, " $1")}
              </span>
              <Switch
                checked={enabled}
                onCheckedChange={() => handleLayerToggle(layer)}
                size="sm"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Data Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Temperature Range (°C)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.temperatureMin}
                onChange={(e) =>
                  handleFilterChange("temperatureMin", e.target.value)
                }
                className="text-xs"
                size="sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.temperatureMax}
                onChange={(e) =>
                  handleFilterChange("temperatureMax", e.target.value)
                }
                className="text-xs"
                size="sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Salinity Range (‰)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.salinityMin}
                onChange={(e) =>
                  handleFilterChange("salinityMin", e.target.value)
                }
                className="text-xs"
                size="sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.salinityMax}
                onChange={(e) =>
                  handleFilterChange("salinityMax", e.target.value)
                }
                className="text-xs"
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="w-full"
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>

          {userRole !== "public" && (
            <>
              <Button
                onClick={() => onExport && onExport("csv")}
                className="w-full"
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => onExport && onExport("json")}
                className="w-full"
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Status</span>
            <Badge
              variant={isRefreshing ? "secondary" : "outline"}
              className="text-xs"
            >
              {isRefreshing ? "Updating" : "Live"}
            </Badge>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">Role</span>
            <Badge variant="outline" className="text-xs capitalize">
              {userRole}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapControls;
