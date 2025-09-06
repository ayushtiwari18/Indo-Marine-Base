import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from "recharts";
import {
  Fish,
  Leaf,
  AlertTriangle,
  Shield,
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Globe,
} from "lucide-react";

const BiodiversityAnalytics = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTaxonomy, setSelectedTaxonomy] = useState("all");
  const [conservationFilter, setConservationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEndemic, setShowEndemic] = useState(true);
  const [threatLevel, setThreatLevel] = useState([0, 5]);
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Enhanced biodiversity data with more comprehensive metrics
  const biodiversityRegions = [
    {
      id: "andaman",
      location: "Andaman Islands",
      lat: 11.7401,
      lng: 92.6586,
      species: 245,
      endemic: 28,
      threatened: 12,
      criticallyEndangered: 3,
      endangered: 5,
      vulnerable: 4,
      shannonIndex: 3.24,
      simpsonIndex: 0.89,
      speciesRichness: 245,
      evenness: 0.78,
      habitatTypes: ["coral_reef", "mangrove", "tropical_forest"],
      totalArea: 8249,
      protectedArea: 1987,
      marineSpecies: 156,
      terrestrialSpecies: 89,
      threats: ["climate_change", "pollution", "overfishing"],
      conservationEfforts: 85,
      lastSurvey: "2024-08-15",
    },
    {
      id: "lakshadweep",
      location: "Lakshadweep",
      lat: 10.5667,
      lng: 72.6417,
      species: 189,
      endemic: 15,
      threatened: 8,
      criticallyEndangered: 2,
      endangered: 3,
      vulnerable: 3,
      shannonIndex: 2.98,
      simpsonIndex: 0.85,
      speciesRichness: 189,
      evenness: 0.72,
      habitatTypes: ["coral_reef", "lagoon"],
      totalArea: 32,
      protectedArea: 28,
      marineSpecies: 145,
      terrestrialSpecies: 44,
      threats: ["coral_bleaching", "sea_level_rise"],
      conservationEfforts: 92,
      lastSurvey: "2024-09-02",
    },
    {
      id: "mannar",
      location: "Gulf of Mannar",
      lat: 9.0,
      lng: 79.0,
      species: 198,
      endemic: 22,
      threatened: 15,
      criticallyEndangered: 4,
      endangered: 6,
      vulnerable: 5,
      shannonIndex: 3.15,
      simpsonIndex: 0.87,
      speciesRichness: 198,
      evenness: 0.75,
      habitatTypes: ["seagrass", "coral_reef", "mangrove"],
      totalArea: 10500,
      protectedArea: 560,
      marineSpecies: 142,
      terrestrialSpecies: 56,
      threats: ["fishing_pressure", "coastal_development"],
      conservationEfforts: 78,
      lastSurvey: "2024-07-20",
    },
    {
      id: "gujarat",
      location: "Gujarat Coast",
      lat: 22.2587,
      lng: 71.1924,
      species: 156,
      endemic: 9,
      threatened: 18,
      criticallyEndangered: 5,
      endangered: 7,
      vulnerable: 6,
      shannonIndex: 2.87,
      simpsonIndex: 0.82,
      speciesRichness: 156,
      evenness: 0.69,
      habitatTypes: ["mudflat", "salt_marsh", "mangrove"],
      totalArea: 1600,
      protectedArea: 162,
      marineSpecies: 98,
      terrestrialSpecies: 58,
      threats: ["industrial_pollution", "habitat_loss"],
      conservationEfforts: 65,
      lastSurvey: "2024-06-10",
    },
    {
      id: "sundarbans",
      location: "Sundarbans",
      lat: 21.9497,
      lng: 89.1833,
      species: 134,
      endemic: 11,
      threatened: 9,
      criticallyEndangered: 2,
      endangered: 4,
      vulnerable: 3,
      shannonIndex: 2.76,
      simpsonIndex: 0.79,
      speciesRichness: 134,
      evenness: 0.66,
      habitatTypes: ["mangrove", "estuarine"],
      totalArea: 10000,
      protectedArea: 4143,
      marineSpecies: 89,
      terrestrialSpecies: 45,
      threats: ["cyclones", "salinity_intrusion"],
      conservationEfforts: 88,
      lastSurvey: "2024-08-30",
    },
  ];

  // Species taxonomy breakdown
  const taxonomyData = [
    { name: "Fish", count: 456, percentage: 52, color: "#3b82f6", endemic: 45 },
    {
      name: "Corals",
      count: 189,
      percentage: 22,
      color: "#ef4444",
      endemic: 23,
    },
    {
      name: "Mollusks",
      count: 123,
      percentage: 14,
      color: "#22c55e",
      endemic: 15,
    },
    {
      name: "Crustaceans",
      count: 89,
      percentage: 10,
      color: "#f59e0b",
      endemic: 12,
    },
    {
      name: "Seaweeds",
      count: 34,
      percentage: 4,
      color: "#8b5cf6",
      endemic: 8,
    },
    {
      name: "Marine Mammals",
      count: 23,
      percentage: 3,
      color: "#06b6d4",
      endemic: 2,
    },
  ];

  // Threat assessment data
  const threatData = [
    { threat: "Climate Change", severity: 4.2, regions: 5, species: 234 },
    { threat: "Pollution", severity: 3.8, regions: 4, species: 189 },
    { threat: "Overfishing", severity: 3.5, regions: 3, species: 156 },
    { threat: "Habitat Loss", severity: 4.0, regions: 3, species: 167 },
    { threat: "Invasive Species", severity: 2.8, regions: 2, species: 89 },
    { threat: "Ocean Acidification", severity: 3.9, regions: 5, species: 201 },
  ];

  // Conservation status distribution
  const conservationData = [
    { status: "Least Concern", count: 578, color: "#22c55e" },
    { status: "Near Threatened", count: 134, color: "#eab308" },
    { status: "Vulnerable", count: 89, color: "#f97316" },
    { status: "Endangered", count: 45, color: "#ef4444" },
    { status: "Critically Endangered", count: 23, color: "#dc2626" },
    { status: "Data Deficient", count: 78, color: "#6b7280" },
  ];

  // Biodiversity indices over time
  const indicesData = [
    { year: "2019", shannon: 3.15, simpson: 0.87, richness: 234 },
    { year: "2020", shannon: 3.08, simpson: 0.85, richness: 228 },
    { year: "2021", shannon: 3.12, simpson: 0.86, richness: 231 },
    { year: "2022", shannon: 3.18, simpson: 0.88, richness: 238 },
    { year: "2023", shannon: 3.22, simpson: 0.89, richness: 245 },
    { year: "2024", shannon: 3.24, simpson: 0.89, richness: 247 },
  ];

  // Species discovery timeline
  const discoveryData = [
    { year: "2020", newSpecies: 12, reclassified: 3 },
    { year: "2021", newSpecies: 8, reclassified: 5 },
    { year: "2022", newSpecies: 15, reclassified: 2 },
    { year: "2023", newSpecies: 11, reclassified: 4 },
    { year: "2024", newSpecies: 9, reclassified: 1 },
  ];

  const filteredRegions = biodiversityRegions.filter((region) => {
    if (selectedRegion !== "all" && region.id !== selectedRegion) return false;
    if (
      searchTerm &&
      !region.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const calculateBiodiversityMetrics = () => {
    const totalSpecies = filteredRegions.reduce(
      (sum, region) => sum + region.species,
      0
    );
    const totalEndemic = filteredRegions.reduce(
      (sum, region) => sum + region.endemic,
      0
    );
    const totalThreatened = filteredRegions.reduce(
      (sum, region) => sum + region.threatened,
      0
    );
    const avgShannonIndex =
      filteredRegions.reduce((sum, region) => sum + region.shannonIndex, 0) /
      filteredRegions.length;

    return {
      totalSpecies,
      totalEndemic,
      totalThreatened,
      avgShannonIndex: avgShannonIndex.toFixed(2),
      endemicPercentage: ((totalEndemic / totalSpecies) * 100).toFixed(1),
      threatPercentage: ((totalThreatened / totalSpecies) * 100).toFixed(1),
    };
  };

  const metrics = calculateBiodiversityMetrics();

  // Real-time simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate small changes in species counts
    }, 10000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const handleExport = (format) => {
    const exportData = filteredRegions.map((region) => ({
      Location: region.location,
      "Total Species": region.species,
      "Endemic Species": region.endemic,
      "Threatened Species": region.threatened,
      "Shannon Index": region.shannonIndex,
      "Simpson Index": region.simpsonIndex,
      "Conservation Efforts": region.conservationEfforts,
      "Protected Area %": (
        (region.protectedArea / region.totalArea) *
        100
      ).toFixed(1),
    }));

    if (format === "csv") {
      const csv = [
        Object.keys(exportData[0]).join(","),
        ...exportData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `biodiversity-analysis-${selectedRegion}.csv`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Controls Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fish className="h-5 w-5 text-primary" />
              <CardTitle>Marine Biodiversity Analytics</CardTitle>
              {isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  Live Monitoring
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="realtime-bio">Real-time</Label>
              <Switch
                id="realtime-bio"
                checked={isRealTime}
                onCheckedChange={setIsRealTime}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {biodiversityRegions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedTaxonomy}
              onValueChange={setSelectedTaxonomy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Taxonomy Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="fish">Fish</SelectItem>
                <SelectItem value="corals">Corals</SelectItem>
                <SelectItem value="mollusks">Mollusks</SelectItem>
                <SelectItem value="crustaceans">Crustaceans</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={conservationFilter}
              onValueChange={setConservationFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Conservation Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="threatened">Threatened</SelectItem>
                <SelectItem value="endemic">Endemic Only</SelectItem>
                <SelectItem value="protected">In Protected Areas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <div className="flex items-center gap-2">
              <Switch checked={showEndemic} onCheckedChange={setShowEndemic} />
              <Label>Highlight Endemic Species</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {metrics.totalSpecies}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Species
                </div>
              </div>
              <Fish className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {metrics.totalEndemic}
                </div>
                <div className="text-sm text-muted-foreground">
                  Endemic Species
                </div>
              </div>
              <Leaf className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {metrics.totalThreatened}
                </div>
                <div className="text-sm text-muted-foreground">Threatened</div>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.avgShannonIndex}
                </div>
                <div className="text-sm text-muted-foreground">
                  Shannon Index
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {metrics.endemicPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Endemic Rate
                </div>
              </div>
              <Globe className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {metrics.threatPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">Threat Rate</div>
              </div>
              <Shield className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="conservation">Conservation</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="indices">Indices</TabsTrigger>
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Species Distribution by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredRegions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="location"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="species"
                      fill="#3b82f6"
                      name="Total Species"
                    />
                    {showEndemic && (
                      <Bar
                        dataKey="endemic"
                        fill="#22c55e"
                        name="Endemic Species"
                      />
                    )}
                    <Bar
                      dataKey="threatened"
                      fill="#ef4444"
                      name="Threatened Species"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Biodiversity Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={filteredRegions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shannonIndex" name="Shannon Index" />
                    <YAxis dataKey="species" name="Species Count" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="species" fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Taxonomy Tab */}
        <TabsContent value="taxonomy" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Species Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taxonomyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {taxonomyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxonomic Groups Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taxonomyData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" name="Total Count" />
                    <Bar dataKey="endemic" fill="#22c55e" name="Endemic" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conservation Tab */}
        <TabsContent value="conservation" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conservation Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={conservationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, count }) => `${status}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {conservationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conservation Efforts by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredRegions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="location"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="conservationEfforts"
                      fill="#22c55e"
                      name="Conservation Score"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Threats Tab */}
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Assessment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={threatData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="threat" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="severity"
                    fill="#ef4444"
                    name="Severity Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Indices Tab */}
        <TabsContent value="indices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biodiversity Indices Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={indicesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="shannon"
                    stroke="#3b82f6"
                    name="Shannon Index"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="simpson"
                    stroke="#22c55e"
                    name="Simpson Index"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="richness"
                    stroke="#f59e0b"
                    name="Species Richness"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discovery Tab */}
        <TabsContent value="discovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Species Discovery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={discoveryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newSpecies" fill="#3b82f6" name="New Species" />
                  <Bar
                    dataKey="reclassified"
                    fill="#22c55e"
                    name="Reclassified"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BiodiversityAnalytics;
