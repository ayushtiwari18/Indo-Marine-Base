import { useState, useEffect } from "react";
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
import { Map, TrendingUp, BarChart3, Globe, Filter, Route } from "lucide-react";
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

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate data refresh
      if (Math.random() > 0.7) {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
      }
    }, 30000); // Refresh every 30 seconds

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
    // Simulate export
    const link = document.createElement("a");
    link.href = "#";
    link.download = `ocean-data.${format}`;
    link.click();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visualization & Analytics</h1>
          <p className="text-muted-foreground">
            Interactive marine data analysis and visualization tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="interactive" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="interactive">Interactive Map</TabsTrigger>
          <TabsTrigger value="maps">GIS Maps</TabsTrigger>
          <TabsTrigger value="timeseries">Time Series</TabsTrigger>
          <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
        </TabsList>
        {/* Interactive Map Tab */}
        <TabsContent value="interactive" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Interactive Ocean Map
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isRefreshing ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {isRefreshing
                          ? "Updating..."
                          : `Updated ${lastUpdated.toLocaleTimeString()}`}
                      </Badge>
                      <Select
                        value={userRole}
                        onValueChange={(value) => setUserRole(value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="researcher">Researcher</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <InteractiveMap
                    height="h-[600px]"
                    onMarkerClick={handleMarkerClick}
                    userRole={userRole}
                    showControls={true}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
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
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-accent" />
                    Route Planning & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/1] bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <Route className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                      <h3 className="text-xl font-semibold mb-2">
                        Interactive Route Visualization
                      </h3>
                      <p className="text-muted-foreground">
                        Real-time route visualization with waypoints and
                        distance calculations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <RouteManager
                onRouteUpdate={handleRouteUpdate}
                onDistanceCalculate={handleDistanceCalculate}
                userRole={userRole}
              />
            </div>
          </div>

          {/* Real-time Data Dashboard */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {isRefreshing ? "~" : "28.5"}°C
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Temperature
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      {isRefreshing ? "~" : "34.8"}‰
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Salinity
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-secondary">
                      {isRefreshing ? "~" : "245"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Markers
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-destructive">
                      {isRefreshing ? "~" : "12"}
                    </div>
                    <div className="text-sm text-muted-foreground">Alerts</div>
                  </div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* GIS Maps Tab */}
        <TabsContent value="maps" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Temperature Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TemperatureHeatMap height="h-64" />
                <div className="mt-4 flex justify-between text-sm">
                  <span>Min: 24°C</span>
                  <span>Avg: 28.5°C</span>
                  <span>Max: 32°C</span>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary">Live Data</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Biodiversity Hotspots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BiodiversityMap height="h-64" />
                <div className="mt-4 flex justify-between text-sm">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High Density</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline">8,500+ Species</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ocean Parameters Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <OceanParametersMap height="h-80" />
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">28.5°C</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Temperature
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">34.8‰</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Salinity
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    7.8 pH
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg pH Level
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Series Tab */}
        <TabsContent value="timeseries" className="space-y-6">
          <TimeSeriesAnalytics />
        </TabsContent>

        {/* Biodiversity Tab */}
        <TabsContent value="biodiversity" className="space-y-6">
          <BiodiversityAnalytics />
        </TabsContent>
        
        {/* Correlation Tab */}
        <TabsContent value="correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Correlation Dashboard</CardTitle>
              <div className="flex items-center gap-4">
                <Select
                  value={selectedParameter1}
                  onValueChange={setSelectedParameter1}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="salinity">Salinity</SelectItem>
                    <SelectItem value="ph">pH Level</SelectItem>
                    <SelectItem value="oxygen">Oxygen</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">vs</span>
                <Select
                  value={selectedParameter2}
                  onValueChange={setSelectedParameter2}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salinity">Salinity</SelectItem>
                    <SelectItem value="fishDensity">Fish Density</SelectItem>
                    <SelectItem value="ph">pH Level</SelectItem>
                    <SelectItem value="oxygen">Oxygen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="value" name="Temperature (°C)" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="salinity"
                    stroke="hsl(var(--primary))"
                    name="Salinity (‰)"
                  />
                  <Line
                    type="monotone"
                    dataKey="fishDensity"
                    stroke="hsl(var(--accent))"
                    name="Fish Density"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <Badge variant="secondary">
                  Correlation Coefficient: -0.72
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Strong negative correlation between temperature and fish
                  density
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;
