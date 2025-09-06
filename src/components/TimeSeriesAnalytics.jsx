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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Waves,
  Thermometer,
  Fish,
} from "lucide-react";

const TimeSeriesAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedParameters, setSelectedParameters] = useState([
    "temperature",
    "salinity",
  ]);
  const [showTrendlines, setShowTrendlines] = useState(true);
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Extended time series data
  const generateTimeSeriesData = (months) => {
    const data = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });

      // Simulate seasonal patterns
      const seasonalTemp =
        28 + 3 * Math.sin(((date.getMonth() + 1) * Math.PI) / 6);
      const seasonalSalinity =
        34.5 + 0.5 * Math.cos(((date.getMonth() + 1) * Math.PI) / 6);

      data.push({
        month,
        fullDate: date.toISOString().split("T")[0],
        temperature: Number(
          (seasonalTemp + (Math.random() - 0.5) * 2).toFixed(1)
        ),
        salinity: Number(
          (seasonalSalinity + (Math.random() - 0.5) * 0.8).toFixed(1)
        ),
        ph: Number((8.0 + (Math.random() - 0.5) * 0.4).toFixed(2)),
        oxygen: Number((6.5 + (Math.random() - 0.5) * 1.0).toFixed(1)),
        fishDensity: Number((45 + (Math.random() - 0.5) * 20).toFixed(0)),
        planktonCount: Number((120 + (Math.random() - 0.5) * 40).toFixed(0)),
        depth10m: Number(
          (seasonalTemp - 0.3 + (Math.random() - 0.5) * 1).toFixed(1)
        ),
        depth50m: Number(
          (seasonalTemp - 2.0 + (Math.random() - 0.5) * 1.5).toFixed(1)
        ),
        depth100m: Number(
          (seasonalTemp - 4.5 + (Math.random() - 0.5) * 2).toFixed(1)
        ),
        totalCatch: Math.floor(3000 + (Math.random() - 0.5) * 1000),
        commercialSpecies: Math.floor(2700 + (Math.random() - 0.5) * 800),
        sustainableQuota: 3500,
      });
    }
    return data;
  };

  const timeRanges = {
    "3months": 3,
    "6months": 6,
    "1year": 12,
    "2years": 24,
    "5years": 60,
  };

  const [timeSeriesData, setTimeSeriesData] = useState(() =>
    generateTimeSeriesData(timeRanges[timeRange])
  );

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setTimeSeriesData((prev) => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1];

        // Update last data point with small variations
        newData[newData.length - 1] = {
          ...lastPoint,
          temperature: Number(
            (lastPoint.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)
          ),
          salinity: Number(
            (lastPoint.salinity + (Math.random() - 0.5) * 0.1).toFixed(1)
          ),
          fishDensity: Math.max(
            0,
            lastPoint.fishDensity + Math.floor((Math.random() - 0.5) * 5)
          ),
        };

        return newData;
      });
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  // Update data when time range changes
  useEffect(() => {
    setTimeSeriesData(generateTimeSeriesData(timeRanges[timeRange]));
  }, [timeRange]);

  const parameterConfig = {
    temperature: {
      color: "#ef4444",
      name: "Temperature (°C)",
      icon: Thermometer,
    },
    salinity: { color: "#3b82f6", name: "Salinity (‰)", icon: Waves },
    ph: { color: "#8b5cf6", name: "pH Level", icon: Activity },
    oxygen: { color: "#22c55e", name: "Oxygen (mg/L)", icon: Activity },
    fishDensity: { color: "#f59e0b", name: "Fish Density", icon: Fish },
    planktonCount: { color: "#06b6d4", name: "Plankton Count", icon: Activity },
  };

  const handleParameterToggle = (parameter) => {
    setSelectedParameters((prev) =>
      prev.includes(parameter)
        ? prev.filter((p) => p !== parameter)
        : [...prev, parameter]
    );
  };

  const handleExport = (format) => {
    const dataToExport = timeSeriesData.map((item) => ({
      Date: item.fullDate,
      Temperature: item.temperature,
      Salinity: item.salinity,
      pH: item.ph,
      Oxygen: item.oxygen,
      "Fish Density": item.fishDensity,
      "Plankton Count": item.planktonCount,
    }));

    if (format === "csv") {
      const csv = [
        Object.keys(dataToExport[0]).join(","),
        ...dataToExport.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ocean-timeseries-${timeRange}.csv`;
      link.click();
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg shadow-lg p-3">
          <p className="font-semibold">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Time Series Analytics</CardTitle>
              {isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  Live Data
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="realtime">Real-time</Label>
              <Switch
                id="realtime"
                checked={isRealTime}
                onCheckedChange={setIsRealTime}
              />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                  <SelectItem value="5years">5 Years</SelectItem>
                </SelectContent>
              </Select>
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
          <div className="flex flex-wrap gap-2">
            {Object.entries(parameterConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={
                  selectedParameters.includes(key) ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleParameterToggle(key)}
              >
                <config.icon className="h-4 w-4 mr-2" />
                {config.name}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <div className="flex items-center gap-2">
              <Switch
                checked={showTrendlines}
                onCheckedChange={setShowTrendlines}
              />
              <Label>Show Trendlines</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="multiparameter" className="w-full">
        <TabsList>
          <TabsTrigger value="multiparameter">
            Multi-Parameter Analysis
          </TabsTrigger>
          <TabsTrigger value="temperature">Temperature by Depth</TabsTrigger>
          <TabsTrigger value="fishing">Fishing & Abundance</TabsTrigger>
          <TabsTrigger value="correlation">Parameter Correlation</TabsTrigger>
        </TabsList>

        {/* Multi-Parameter Chart */}
        <TabsContent value="multiparameter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ocean Parameters Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {selectedParameters.map((param) => (
                    <Line
                      key={param}
                      type="monotone"
                      dataKey={param}
                      stroke={parameterConfig[param].color}
                      name={parameterConfig[param].name}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))}
                  <Brush dataKey="month" height={30} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Temperature by Depth */}
        <TabsContent value="temperature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                Temperature Trends by Depth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="depth10m"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef444420"
                    name="Surface (10m)"
                  />
                  <Area
                    type="monotone"
                    dataKey="depth50m"
                    stackId="2"
                    stroke="#f97316"
                    fill="#f9731620"
                    name="Mid-depth (50m)"
                  />
                  <Area
                    type="monotone"
                    dataKey="depth100m"
                    stackId="3"
                    stroke="#3b82f6"
                    fill="#3b82f620"
                    name="Deep (100m)"
                  />
                  {showTrendlines && (
                    <ReferenceLine y={28} stroke="#666" strokeDasharray="5 5" />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fishing & Abundance */}
        <TabsContent value="fishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fish className="h-5 w-5 text-blue-600" />
                Fish Abundance & Catch Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="sustainableQuota"
                    fill="#e5e7eb"
                    stroke="#9ca3af"
                    name="Sustainable Quota"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="totalCatch"
                    fill="#3b82f6"
                    name="Total Catch (kg)"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="commercialSpecies"
                    fill="#10b981"
                    name="Commercial Species (kg)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="fishDensity"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Fish Density"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parameter Correlation */}
        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Correlation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    name="Temperature"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="fishDensity"
                    stroke="#f59e0b"
                    name="Fish Density"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="planktonCount"
                    stroke="#06b6d4"
                    name="Plankton Count"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <Badge variant="secondary">Temp vs Fish: -0.72</Badge>
                  <p className="text-xs text-muted-foreground">
                    Strong negative
                  </p>
                </div>
                <div>
                  <Badge variant="secondary">Temp vs Plankton: 0.45</Badge>
                  <p className="text-xs text-muted-foreground">
                    Moderate positive
                  </p>
                </div>
                <div>
                  <Badge variant="secondary">Fish vs Plankton: 0.38</Badge>
                  <p className="text-xs text-muted-foreground">Weak positive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {timeSeriesData[timeSeriesData.length - 1]?.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Temp
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-cyan-600">
                  {timeSeriesData[timeSeriesData.length - 1]?.salinity}‰
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Salinity
                </div>
              </div>
              <Waves className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {timeSeriesData[timeSeriesData.length - 1]?.fishDensity}
                </div>
                <div className="text-sm text-muted-foreground">
                  Fish Density
                </div>
              </div>
              <Fish className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {Math.round(
                    timeSeriesData.reduce(
                      (acc, curr) => acc + curr.totalCatch,
                      0
                    ) /
                      timeSeriesData.length /
                      1000
                  )}
                  K
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Monthly Catch
                </div>
              </div>
              <Activity className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeSeriesAnalytics;
