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
import { Play, Zap, Clock, CheckCircle, XCircle } from "lucide-react";

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
        <h2 className="text-2xl font-bold">Interactive API Testing</h2>
        <p className="text-slate-600">
          Test our API endpoints directly from your browser with real-time
          responses
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Request Builder */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b bg-slate-50">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Request Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Endpoint Selection */}
            <div className="space-y-2">
              <Label>Select Endpoint</Label>
              <Select
                value={selectedEndpoint}
                onValueChange={setSelectedEndpoint}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(endpoints).map(([key, endpoint]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
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
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    endpoints[selectedEndpoint].method === "GET"
                      ? "secondary"
                      : "default"
                  }
                >
                  {endpoints[selectedEndpoint].method}
                </Badge>
                <code className="text-sm bg-white px-2 py-1 rounded border">
                  {endpoints[selectedEndpoint].url}
                </code>
              </div>
              <p className="text-sm text-slate-600">
                {endpoints[selectedEndpoint].name}
              </p>
            </div>

            {/* Parameters */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Parameters</Label>
              {endpoints[selectedEndpoint].parameters.map((param) => (
                <div key={param.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={param.name}>{param.name}</Label>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">
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
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${param.name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {param.options.map((option) => (
                          <SelectItem key={option} value={option}>
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
                    />
                  ) : param.type === "number" ? (
                    <Input
                      type="number"
                      placeholder={param.default?.toString()}
                      onChange={(e) =>
                        updateParameter(param.name, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder={param.placeholder}
                      onChange={(e) =>
                        updateParameter(param.name, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Test Button */}
            <Button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600"
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
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b bg-slate-50">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                Response
              </div>
              {response && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <Badge variant="secondary">
                    {response.meta?.response_time || "0.12s"}
                  </Badge>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {response ? (
              <Tabs defaultValue="response" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="raw">Raw JSON</TabsTrigger>
                </TabsList>

                <TabsContent value="response" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">200 OK</Badge>
                      <span className="text-sm text-slate-600">
                        Response time: {response.meta?.response_time}
                      </span>
                    </div>

                    {response.data.results && (
                      <div>
                        <h4 className="font-semibold mb-3">
                          Results ({response.data.results.length} of{" "}
                          {response.data.total || "N/A"})
                        </h4>
                        <div className="space-y-3">
                          {response.data.results
                            .slice(0, 3)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="p-3 bg-slate-50 rounded-lg"
                              >
                                <div className="grid gap-2 text-sm">
                                  {Object.entries(item)
                                    .slice(0, 4)
                                    .map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex justify-between"
                                      >
                                        <span className="font-medium text-slate-600">
                                          {key}:
                                        </span>
                                        <span className="text-right">
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
                        <h4 className="font-semibold mb-3">AI Predictions</h4>
                        <div className="space-y-3">
                          {response.data.predictions.map((pred, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-50 rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">
                                  {pred.common_name || pred.species}
                                </span>
                                <Badge variant="secondary">
                                  {(pred.probability * 100).toFixed(1)}%
                                </Badge>
                              </div>
                              {pred.species && (
                                <div className="text-sm text-slate-600">
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
                        <span className="font-medium">Content-Type:</span>
                        <div className="text-slate-600">application/json</div>
                      </div>
                      <div>
                        <span className="font-medium">API-Version:</span>
                        <div className="text-slate-600">
                          {response.meta?.api_version}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">
                          Rate-Limit-Remaining:
                        </span>
                        <div className="text-slate-600">4,847</div>
                      </div>
                      <div>
                        <span className="font-medium">Response-Time:</span>
                        <div className="text-slate-600">
                          {response.meta?.response_time}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="raw" className="p-0">
                  <pre className="p-6 text-sm overflow-auto bg-slate-900 text-slate-100 max-h-96">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-12 text-center text-slate-500">
                <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Test API" to see the response here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Testing Examples */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle>Quick Test Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() => {
                setSelectedEndpoint("datasets");
                setParameters({ category: "marine-biology", limit: 10 });
              }}
            >
              <div>
                <div className="font-medium">Marine Biology Data</div>
                <div className="text-sm text-slate-600">
                  Get marine biology datasets
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() => {
                setSelectedEndpoint("species");
                setParameters({ q: "dolphin", location: "pacific ocean" });
              }}
            >
              <div>
                <div className="font-medium">Pacific Dolphins</div>
                <div className="text-sm text-slate-600">
                  Search for dolphin species
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() => {
                setSelectedEndpoint("analyze");
                setParameters({ analysis_type: "species_identification" });
              }}
            >
              <div>
                <div className="font-medium">Species ID</div>
                <div className="text-sm text-slate-600">
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
