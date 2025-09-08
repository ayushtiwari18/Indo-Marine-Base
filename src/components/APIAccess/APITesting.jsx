import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Waves,
  TestTube,
  Database,
  Activity,
} from "lucide-react";

export const APITesting = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("datasets");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [parameters, setParameters] = useState({});

  const endpoints = {
    datasets: {
      name: "List Datasets",
      method: "GET",
      url: "/api/v2/datasets",
      parameters: [
        {
          name: "category",
          type: "select",
          options: ["oceanography", "marine-biology", "climate"],
          required: false,
        },
        { name: "limit", type: "number", default: 20, required: false },
        { name: "location", type: "text", required: false },
      ],
    },
    species: {
      name: "Species Search",
      method: "GET",
      url: "/api/v2/species/search",
      parameters: [
        {
          name: "q",
          type: "text",
          placeholder: "Enter species name",
          required: true,
        },
        {
          name: "location",
          type: "text",
          placeholder: "e.g., Pacific Ocean",
          required: false,
        },
        {
          name: "status",
          type: "select",
          options: ["endangered", "vulnerable", "stable"],
          required: false,
        },
      ],
    },
    analyze: {
      name: "Image Analysis",
      method: "POST",
      url: "/api/v2/analyze/image",
      parameters: [
        { name: "image", type: "file", accept: "image/*", required: true },
        {
          name: "analysis_type",
          type: "select",
          options: ["species_identification", "habitat_analysis"],
          required: true,
        },
      ],
    },
  };

  const mockResponses = {
    datasets: {
      status: "success",
      data: {
        results: [
          {
            id: "ds_001",
            title: "Pacific Ocean Temperature Monitoring 2024",
            category: "oceanography",
            description:
              "Comprehensive temperature data from Pacific monitoring stations",
            created_at: "2024-01-15T10:30:00Z",
            size: "2.3 GB",
          },
          {
            id: "ds_002",
            title: "Marine Biodiversity Survey - Coral Triangle",
            category: "marine-biology",
            description:
              "Species count and distribution data from coral reef ecosystems",
            created_at: "2024-02-20T14:15:00Z",
            size: "856 MB",
          },
        ],
        total: 147,
        page: 1,
        per_page: 20,
      },
      meta: {
        response_time: "0.12s",
        api_version: "2.1.0",
      },
    },
    species: {
      status: "success",
      data: {
        results: [
          {
            id: "sp_001",
            scientific_name: "Carcharodon carcharias",
            common_name: "Great White Shark",
            conservation_status: "vulnerable",
            habitats: ["coastal waters", "open ocean"],
            population_trend: "decreasing",
            length_range: "4.0-6.1 meters",
          },
          {
            id: "sp_002",
            scientific_name: "Carcharhinus leucas",
            common_name: "Bull Shark",
            conservation_status: "near threatened",
            habitats: ["coastal waters", "rivers", "estuaries"],
            population_trend: "stable",
            length_range: "2.0-3.5 meters",
          },
        ],
        total: 23,
        query: "shark",
      },
      meta: {
        response_time: "0.08s",
        api_version: "2.1.0",
      },
    },
    analyze: {
      status: "success",
      data: {
        confidence: 0.94,
        analysis_type: "species_identification",
        predictions: [
          {
            species: "Chelonia mydas",
            common_name: "Green Sea Turtle",
            probability: 0.94,
            bounding_box: { x: 120, y: 80, width: 340, height: 280 },
          },
          {
            species: "Caretta caretta",
            common_name: "Loggerhead Sea Turtle",
            probability: 0.06,
            bounding_box: { x: 115, y: 75, width: 350, height: 290 },
          },
        ],
        processed_at: "2024-12-15T10:45:33Z",
      },
      meta: {
        response_time: "2.34s",
        api_version: "2.1.0",
      },
    },
  };

  const handleTest = async () => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1500)
    );

    setResponse(mockResponses[selectedEndpoint]);
    setIsLoading(false);
  };

  const updateParameter = (name, value) => {
    setParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <TestTube className="h-6 w-6 text-cyan-400" />
          Interactive API Testing
        </h2>
        <p className="text-slate-400">
          Test our API endpoints directly from your browser with real-time
          responses
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Request Builder */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <CardHeader className="border-b border-slate-700/30 bg-slate-800/20">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Zap className="h-5 w-5 text-cyan-400" />
              Request Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Endpoint Selection */}
            <div className="space-y-2">
              <Label className="text-slate-200">Select Endpoint</Label>
              <Select
                value={selectedEndpoint}
                onValueChange={setSelectedEndpoint}
              >
                <SelectTrigger className="bg-slate-700/30 border-slate-600/30 text-slate-200 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {Object.entries(endpoints).map(([key, endpoint]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="text-slate-200 focus:bg-slate-700 focus:text-cyan-400"
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "outline" : "default"
                          }
                          className={
                            endpoint.method === "GET"
                              ? "border-green-500/30 text-green-400 bg-green-500/10"
                              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        {endpoint.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Endpoint Info */}
            <div className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    endpoints[selectedEndpoint].method === "GET"
                      ? "outline"
                      : "default"
                  }
                  className={
                    endpoints[selectedEndpoint].method === "GET"
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  }
                >
                  {endpoints[selectedEndpoint].method}
                </Badge>
                <code className="text-sm bg-slate-800/50 border border-slate-600/30 text-cyan-300 px-2 py-1 rounded">
                  {endpoints[selectedEndpoint].url}
                </code>
              </div>
              <p className="text-sm text-slate-400">
                {endpoints[selectedEndpoint].name}
              </p>
            </div>

            {/* Parameters */}
            <div className="space-y-4">
              <Label className="text-base font-semibold text-slate-200">
                Parameters
              </Label>
              {endpoints[selectedEndpoint].parameters.map((param) => (
                <div key={param.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={param.name} className="text-slate-300">
                      {param.name}
                    </Label>
                    {param.required && (
                      <Badge
                        variant="destructive"
                        className="text-xs bg-red-500/20 text-red-400 border-red-500/30"
                      >
                        Required
                      </Badge>
                    )}
                  </div>

                  {param.type === "select" ? (
                    <Select
                      onValueChange={(value) =>
                        updateParameter(param.name, value)
                      }
                    >
                      <SelectTrigger className="bg-slate-700/30 border-slate-600/30 text-slate-200 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20">
                        <SelectValue placeholder={`Select ${param.name}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {param.options.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="text-slate-200 focus:bg-slate-700 focus:text-cyan-400"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : param.type === "file" ? (
                    <Input
                      type="file"
                      accept={param.accept}
                      onChange={(e) =>
                        updateParameter(param.name, e.target.files[0])
                      }
                      className="bg-slate-700/30 border-slate-600/30 text-slate-200 file:bg-slate-600 file:text-slate-200 file:border-0 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  ) : param.type === "number" ? (
                    <Input
                      type="number"
                      placeholder={param.default?.toString()}
                      onChange={(e) =>
                        updateParameter(param.name, e.target.value)
                      }
                      className="bg-slate-700/30 border-slate-600/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder={param.placeholder}
                      onChange={(e) =>
                        updateParameter(param.name, e.target.value)
                      }
                      className="bg-slate-700/30 border-slate-600/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Test Button */}
            <Button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-semibold"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Test API
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Response Viewer */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <CardHeader className="border-b border-slate-700/30 bg-slate-800/20">
            <CardTitle className="flex items-center justify-between text-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                Response
              </div>
              {response && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-400 bg-green-500/10"
                  >
                    {response.meta?.response_time || "0.12s"}
                  </Badge>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {response ? (
              <Tabs defaultValue="response" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-slate-700/30 bg-slate-800/20">
                  <TabsTrigger
                    value="response"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                  >
                    Response
                  </TabsTrigger>
                  <TabsTrigger
                    value="headers"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                  >
                    Headers
                  </TabsTrigger>
                  <TabsTrigger
                    value="raw"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                  >
                    Raw JSON
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="response" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        200 OK
                      </Badge>
                      <span className="text-sm text-slate-400">
                        Response time: {response.meta?.response_time}
                      </span>
                    </div>

                    {response.data.results && (
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-200">
                          Results ({response.data.results.length} of{" "}
                          {response.data.total || "N/A"})
                        </h4>
                        <div className="space-y-3">
                          {response.data.results
                            .slice(0, 3)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="p-3 bg-slate-700/30 border border-slate-600/20 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"
                              >
                                <div className="grid gap-2 text-sm">
                                  {Object.entries(item)
                                    .slice(0, 4)
                                    .map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex justify-between"
                                      >
                                        <span className="font-medium text-slate-400">
                                          {key}:
                                        </span>
                                        <span className="text-right text-slate-200">
                                          {Array.isArray(value)
                                            ? value.join(", ")
                                            : value?.toString()}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {response.data.predictions && (
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-200">
                          AI Predictions
                        </h4>
                        <div className="space-y-3">
                          {response.data.predictions.map((pred, index) => (
                            <div
                              key={index}
                              className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-200">
                                  {pred.common_name || pred.species}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                                >
                                  {(pred.probability * 100).toFixed(1)}%
                                </Badge>
                              </div>
                              {pred.species && (
                                <div className="text-sm text-slate-400">
                                  <em>{pred.species}</em>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="headers" className="p-6">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-200">
                          Content-Type:
                        </span>
                        <div className="text-slate-400">application/json</div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-200">
                          API-Version:
                        </span>
                        <div className="text-slate-400">
                          {response.meta?.api_version}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-200">
                          Rate-Limit-Remaining:
                        </span>
                        <div className="text-slate-400">4,847</div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-200">
                          Response-Time:
                        </span>
                        <div className="text-slate-400">
                          {response.meta?.response_time}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="raw" className="p-0">
                  <pre className="p-6 text-sm overflow-auto bg-slate-900 text-slate-100 max-h-96 border-t border-slate-700/30">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-12 text-center text-slate-500">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50 text-cyan-400/30" />
                <p className="text-slate-400">
                  Click "Test API" to see the response here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Testing Examples */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Waves className="h-5 w-5 text-cyan-400" />
            Quick Test Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 hover:border-cyan-400/50 transition-all duration-300"
              onClick={() => {
                setSelectedEndpoint("datasets");
                setParameters({ category: "marine-biology", limit: 10 });
              }}
            >
              <div>
                <div className="font-medium flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-400" />
                  Marine Biology Data
                </div>
                <div className="text-sm text-slate-400">
                  Get marine biology datasets
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 hover:border-cyan-400/50 transition-all duration-300"
              onClick={() => {
                setSelectedEndpoint("species");
                setParameters({ q: "dolphin", location: "pacific ocean" });
              }}
            >
              <div>
                <div className="font-medium flex items-center gap-2">
                  <Waves className="h-4 w-4 text-blue-400" />
                  Pacific Dolphins
                </div>
                <div className="text-sm text-slate-400">
                  Search for dolphin species
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 hover:border-cyan-400/50 transition-all duration-300"
              onClick={() => {
                setSelectedEndpoint("analyze");
                setParameters({ analysis_type: "species_identification" });
              }}
            >
              <div>
                <div className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  Species ID
                </div>
                <div className="text-sm text-slate-400">
                  Identify species from image
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
